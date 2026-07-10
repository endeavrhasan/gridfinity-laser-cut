export type Unit = 'mm' | 'in'

const MM_PER_INCH = 25.4

/** Convert a length in the given unit to millimetres. */
export function toMm(value: number, unit: Unit): number {
  return unit === 'in' ? value * MM_PER_INCH : value
}

/** Convert a length in millimetres to the given display unit. */
export function fromMm(valueMm: number, unit: Unit): number {
  return unit === 'in' ? valueMm / MM_PER_INCH : valueMm
}

/** Format a millimetre value for display in the selected unit. */
export function formatLength(valueMm: number, unit: Unit, digits = 2): string {
  const value = fromMm(valueMm, unit)
  const rounded =
    unit === 'mm' && Number.isInteger(value)
      ? String(value)
      : value.toFixed(digits).replace(/\.?0+$/, '')
  return `${rounded} ${unit}`
}
