import type { AlignX, AlignY } from '../geometry/calculateGrid'

export interface AlignmentPreset {
  id: string
  label: string
  alignX: AlignX
  alignY: AlignY
}

export const ALIGNMENT_PRESETS: AlignmentPreset[] = [
  { id: 'centered', label: 'Centered', alignX: 'center', alignY: 'center' },
  { id: 'left', label: 'Left', alignX: 'left', alignY: 'center' },
  { id: 'right', label: 'Right', alignX: 'right', alignY: 'center' },
  { id: 'front', label: 'Front', alignX: 'center', alignY: 'front' },
  { id: 'back', label: 'Back', alignX: 'center', alignY: 'back' },
  { id: 'front-left', label: 'Front Left', alignX: 'left', alignY: 'front' },
  { id: 'front-right', label: 'Front Right', alignX: 'right', alignY: 'front' },
  { id: 'back-left', label: 'Back Left', alignX: 'left', alignY: 'back' },
  { id: 'back-right', label: 'Back Right', alignX: 'right', alignY: 'back' },
]

/** 3×3 grid order matching the top-down preview (top = back, bottom = front). */
export const ALIGNMENT_GRID: AlignmentPreset[] = [
  { id: 'back-left', label: 'Back Left', alignX: 'left', alignY: 'back' },
  { id: 'back', label: 'Back', alignX: 'center', alignY: 'back' },
  { id: 'back-right', label: 'Back Right', alignX: 'right', alignY: 'back' },
  { id: 'left', label: 'Left', alignX: 'left', alignY: 'center' },
  { id: 'centered', label: 'Centered', alignX: 'center', alignY: 'center' },
  { id: 'right', label: 'Right', alignX: 'right', alignY: 'center' },
  { id: 'front-left', label: 'Front Left', alignX: 'left', alignY: 'front' },
  { id: 'front', label: 'Front', alignX: 'center', alignY: 'front' },
  { id: 'front-right', label: 'Front Right', alignX: 'right', alignY: 'front' },
]

export function presetFromAlignment(alignX: AlignX, alignY: AlignY): string {
  const match = ALIGNMENT_PRESETS.find(
    (preset) => preset.alignX === alignX && preset.alignY === alignY,
  )
  return match?.id ?? 'centered'
}

export function alignmentFromPreset(id: string): {
  alignX: AlignX
  alignY: AlignY
} {
  const match = ALIGNMENT_PRESETS.find((preset) => preset.id === id)
  return match
    ? { alignX: match.alignX, alignY: match.alignY }
    : { alignX: 'center', alignY: 'center' }
}
