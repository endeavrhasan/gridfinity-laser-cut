import {
  CUTOUT_CORNER_RADIUS_MM,
  CUTOUT_SIZE_MM,
  GRID_PITCH_MM,
} from './constants'

export type PlateMode = 'drawer' | 'grid'
export type AlignX = 'left' | 'center' | 'right'
export type AlignY = 'front' | 'center' | 'back'

export interface CalculateGridInput {
  /** Drawer / space width in millimetres. */
  widthMm: number
  /** Drawer / space depth in millimetres. */
  depthMm: number
  /** Edge clearance per side in millimetres. */
  clearanceMm: number
  plateMode: PlateMode
  /** Horizontal grid alignment within the plate (drawer mode). */
  alignX?: AlignX
  /** Depth grid alignment within the plate (drawer mode). Front = bottom of SVG. */
  alignY?: AlignY
}

export interface Cutout {
  x: number
  y: number
  size: number
  radius: number
}

export interface GridLayout {
  columns: number
  rows: number
  cells: number
  gridWidthMm: number
  gridDepthMm: number
  plateWidthMm: number
  plateDepthMm: number
  offsetXMm: number
  offsetYMm: number
  unusedWidthMm: number
  unusedDepthMm: number
  marginLeftMm: number
  marginRightMm: number
  marginTopMm: number
  marginBottomMm: number
  cutouts: Cutout[]
}

function offsetAlongAxis(
  unused: number,
  align: 'start' | 'center' | 'end',
): number {
  if (align === 'start') return 0
  if (align === 'end') return unused
  return unused / 2
}

/**
 * Calculate the maximum complete Gridfinity grid that fits the usable drawer
 * area, and the plate/cutout layout for SVG generation. All values in mm.
 *
 * Preview convention (top-down): top of SVG = back of drawer, bottom = front.
 */
export function calculateGrid(input: CalculateGridInput): GridLayout {
  const clearance = Math.max(0, input.clearanceMm)
  const usableW = Math.max(0, input.widthMm - 2 * clearance)
  const usableD = Math.max(0, input.depthMm - 2 * clearance)

  const columns = Math.floor(usableW / GRID_PITCH_MM)
  const rows = Math.floor(usableD / GRID_PITCH_MM)
  const cells = columns * rows

  const gridWidthMm = columns * GRID_PITCH_MM
  const gridDepthMm = rows * GRID_PITCH_MM

  const plateWidthMm = input.plateMode === 'drawer' ? usableW : gridWidthMm
  const plateDepthMm = input.plateMode === 'drawer' ? usableD : gridDepthMm

  const unusedWidthMm = plateWidthMm - gridWidthMm
  const unusedDepthMm = plateDepthMm - gridDepthMm

  const alignX = input.alignX ?? 'center'
  const alignY = input.alignY ?? 'center'

  const offsetXMm =
    input.plateMode === 'drawer'
      ? offsetAlongAxis(
          unusedWidthMm,
          alignX === 'left' ? 'start' : alignX === 'right' ? 'end' : 'center',
        )
      : 0

  // Y grows downward; back is the top of the SVG.
  const offsetYMm =
    input.plateMode === 'drawer'
      ? offsetAlongAxis(
          unusedDepthMm,
          alignY === 'back' ? 'start' : alignY === 'front' ? 'end' : 'center',
        )
      : 0

  const inset = (GRID_PITCH_MM - CUTOUT_SIZE_MM) / 2
  const cutouts: Cutout[] = []

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      cutouts.push({
        x: offsetXMm + c * GRID_PITCH_MM + inset,
        y: offsetYMm + r * GRID_PITCH_MM + inset,
        size: CUTOUT_SIZE_MM,
        radius: CUTOUT_CORNER_RADIUS_MM,
      })
    }
  }

  return {
    columns,
    rows,
    cells,
    gridWidthMm,
    gridDepthMm,
    plateWidthMm,
    plateDepthMm,
    offsetXMm,
    offsetYMm,
    unusedWidthMm,
    unusedDepthMm,
    marginLeftMm: offsetXMm,
    marginRightMm: unusedWidthMm - offsetXMm,
    marginTopMm: offsetYMm,
    marginBottomMm: unusedDepthMm - offsetYMm,
    cutouts,
  }
}
