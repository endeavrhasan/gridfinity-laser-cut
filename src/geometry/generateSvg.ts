import type { GridLayout } from './calculateGrid'

function formatMm(value: number): string {
  // Avoid floating-point noise in attributes while preserving needed precision.
  return Number(value.toFixed(4)).toString()
}

/**
 * Build a laser-ready SVG string from a grid layout.
 * Uses real physical millimetre dimensions (not pixels/DPI).
 */
export function generateSvg(layout: GridLayout): string {
  const w = formatMm(layout.plateWidthMm)
  const h = formatMm(layout.plateDepthMm)

  const lines: string[] = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}mm" height="${h}mm" viewBox="0 0 ${w} ${h}">`,
    `  <rect x="0" y="0" width="${w}" height="${h}" fill="none" stroke="black" stroke-width="0.1" />`,
  ]

  for (const cutout of layout.cutouts) {
    const x = formatMm(cutout.x)
    const y = formatMm(cutout.y)
    const size = formatMm(cutout.size)
    const r = formatMm(cutout.radius)
    lines.push(
      `  <rect x="${x}" y="${y}" width="${size}" height="${size}" rx="${r}" ry="${r}" fill="none" stroke="black" stroke-width="0.1" />`,
    )
  }

  lines.push('</svg>')
  return lines.join('\n')
}
