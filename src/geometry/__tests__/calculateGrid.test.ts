import { describe, expect, it } from 'vitest'
import { calculateGrid } from '../calculateGrid'
import { GRID_PITCH_MM } from '../constants'
import { toMm } from '../units'

describe('calculateGrid', () => {
  it('matches the acceptance case (510×375 mm, clearance 0, drawer)', () => {
    const layout = calculateGrid({
      widthMm: 510,
      depthMm: 375,
      clearanceMm: 0,
      plateMode: 'drawer',
    })

    expect(layout.columns).toBe(12)
    expect(layout.rows).toBe(8)
    expect(layout.cells).toBe(96)
    expect(layout.gridWidthMm).toBe(504)
    expect(layout.gridDepthMm).toBe(336)
    expect(layout.plateWidthMm).toBe(510)
    expect(layout.plateDepthMm).toBe(375)
    expect(layout.offsetXMm).toBe(3)
    expect(layout.offsetYMm).toBe(19.5)
    expect(layout.unusedWidthMm).toBe(6)
    expect(layout.unusedDepthMm).toBe(39)
    expect(layout.marginLeftMm).toBe(3)
    expect(layout.marginRightMm).toBe(3)
    expect(layout.marginTopMm).toBe(19.5)
    expect(layout.marginBottomMm).toBe(19.5)
    expect(layout.cutouts).toHaveLength(96)
  })

  it('uses exact grid size and zero offsets in grid-only mode', () => {
    const layout = calculateGrid({
      widthMm: 510,
      depthMm: 375,
      clearanceMm: 0,
      plateMode: 'grid',
    })

    expect(layout.columns).toBe(12)
    expect(layout.rows).toBe(8)
    expect(layout.plateWidthMm).toBe(504)
    expect(layout.plateDepthMm).toBe(336)
    expect(layout.offsetXMm).toBe(0)
    expect(layout.offsetYMm).toBe(0)
    expect(layout.unusedWidthMm).toBe(0)
    expect(layout.unusedDepthMm).toBe(0)
  })

  it('reduces usable size with clearance and can drop a column/row', () => {
    // 510 - 2*20 = 470 → floor(470/42)=11; 375 - 2*20 = 335 → floor(335/42)=7
    const layout = calculateGrid({
      widthMm: 510,
      depthMm: 375,
      clearanceMm: 20,
      plateMode: 'drawer',
    })

    expect(layout.columns).toBe(11)
    expect(layout.rows).toBe(7)
    expect(layout.cells).toBe(77)
    expect(layout.plateWidthMm).toBe(470)
    expect(layout.plateDepthMm).toBe(335)
    expect(layout.gridWidthMm).toBe(11 * GRID_PITCH_MM)
    expect(layout.gridDepthMm).toBe(7 * GRID_PITCH_MM)
  })

  it('accepts inch-equivalent inputs converted to mm before calc', () => {
    // 510 mm and 375 mm expressed via inch conversion
    const widthMm = toMm(510 / 25.4, 'in')
    const depthMm = toMm(375 / 25.4, 'in')

    const layout = calculateGrid({
      widthMm,
      depthMm,
      clearanceMm: 0,
      plateMode: 'drawer',
    })

    expect(layout.columns).toBe(12)
    expect(layout.rows).toBe(8)
    expect(layout.cells).toBe(96)
  })

  it('returns zero grid when usable size is below one pitch', () => {
    const layout = calculateGrid({
      widthMm: 40,
      depthMm: 40,
      clearanceMm: 0,
      plateMode: 'drawer',
    })

    expect(layout.columns).toBe(0)
    expect(layout.rows).toBe(0)
    expect(layout.cells).toBe(0)
    expect(layout.cutouts).toHaveLength(0)
    expect(layout.gridWidthMm).toBe(0)
    expect(layout.gridDepthMm).toBe(0)
  })

  it('has zero unused space when drawer is an exact multiple of pitch', () => {
    const layout = calculateGrid({
      widthMm: 5 * GRID_PITCH_MM,
      depthMm: 3 * GRID_PITCH_MM,
      clearanceMm: 0,
      plateMode: 'drawer',
    })

    expect(layout.columns).toBe(5)
    expect(layout.rows).toBe(3)
    expect(layout.unusedWidthMm).toBe(0)
    expect(layout.unusedDepthMm).toBe(0)
    expect(layout.offsetXMm).toBe(0)
    expect(layout.offsetYMm).toBe(0)
  })
})
