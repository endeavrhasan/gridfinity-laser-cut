import { describe, expect, it } from 'vitest'
import { calculateGrid } from '../calculateGrid'
import { CUTOUT_CORNER_RADIUS_MM, CUTOUT_SIZE_MM, GRID_PITCH_MM } from '../constants'
import { generateSvg } from '../generateSvg'

describe('generateSvg', () => {
  const acceptanceLayout = calculateGrid({
    widthMm: 510,
    depthMm: 375,
    clearanceMm: 0,
    plateMode: 'drawer',
  })

  it('uses physical mm width and height attributes', () => {
    const svg = generateSvg(acceptanceLayout)
    expect(svg).toContain('width="510mm"')
    expect(svg).toContain('height="375mm"')
  })

  it('uses a matching millimetre viewBox with no px conversion', () => {
    const svg = generateSvg(acceptanceLayout)
    expect(svg).toContain('viewBox="0 0 510 375"')
    expect(svg).not.toMatch(/width="\d+px"/)
    expect(svg).not.toMatch(/height="\d+px"/)
  })

  it('emits one cutout rect per cell', () => {
    const svg = generateSvg(acceptanceLayout)
    const cutoutRects = svg.match(/<rect[^>]*rx="/g) ?? []
    expect(cutoutRects).toHaveLength(96)
    expect(acceptanceLayout.cells).toBe(12 * 8)
  })

  it('places the first cutout at the correct inset for the acceptance case', () => {
    const svg = generateSvg(acceptanceLayout)
    const inset = (GRID_PITCH_MM - CUTOUT_SIZE_MM) / 2
    const expectedX = 3 + inset // offsetX + inset ≈ 5.45
    const expectedY = 19.5 + inset // ≈ 21.95

    expect(acceptanceLayout.cutouts[0].x).toBeCloseTo(expectedX, 10)
    expect(acceptanceLayout.cutouts[0].y).toBeCloseTo(expectedY, 10)
    expect(acceptanceLayout.cutouts[0].size).toBe(CUTOUT_SIZE_MM)
    expect(acceptanceLayout.cutouts[0].radius).toBe(CUTOUT_CORNER_RADIUS_MM)

    // SVG attributes are rounded to avoid float noise (5.45 / 21.95)
    expect(svg).toContain('x="5.45"')
    expect(svg).toContain('y="21.95"')
    expect(svg).toContain(`width="${CUTOUT_SIZE_MM}"`)
    expect(svg).toContain(`height="${CUTOUT_SIZE_MM}"`)
  })

  it('includes the cutout corner radius', () => {
    const svg = generateSvg(acceptanceLayout)
    expect(svg).toContain(`rx="${CUTOUT_CORNER_RADIUS_MM}"`)
    expect(svg).toContain(`ry="${CUTOUT_CORNER_RADIUS_MM}"`)
  })

  it('matches grid size for grid-only plate mode', () => {
    const layout = calculateGrid({
      widthMm: 510,
      depthMm: 375,
      clearanceMm: 0,
      plateMode: 'grid',
    })
    const svg = generateSvg(layout)

    expect(svg).toContain('width="504mm"')
    expect(svg).toContain('height="336mm"')
    expect(svg).toContain('viewBox="0 0 504 336"')
  })
})
