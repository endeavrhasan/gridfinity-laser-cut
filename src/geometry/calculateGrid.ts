import {
  CUTOUT_CORNER_RADIUS_MM,
  CUTOUT_SIZE_MM,
  GRID_PITCH_MM,
} from './constants'

export type PlateMode = 'drawer' | 'grid'

export interface CalculateGridInput {
  /** Drawer / space width in millimetres. */
  widthMm: number
  /** Drawer / space depth in millimetres. */
  depthMm: number
  /** Edge clearance per side in millimetres. */
  clearanceMm: number
  plateMode: PlateMode
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

/**
 * Calculate the maximum complete Gridfinity grid that fits the usable drawer
 * area, and the plate/cutout layout for SVG generation. All values in mm.
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

  const offsetXMm =
    input.plateMode === 'drawer' ? (plateWidthMm - gridWidthMm) / 2 : 0
  const offsetYMm =
    input.plateMode === 'drawer' ? (plateDepthMm - gridDepthMm) / 2 : 0

  const unusedWidthMm = plateWidthMm - gridWidthMm
  const unusedDepthMm = plateDepthMm - gridDepthMm

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
    marginRightMm: offsetXMm,
    marginTopMm: offsetYMm,
    marginBottomMm: offsetYMm,
    cutouts,
  }
}
