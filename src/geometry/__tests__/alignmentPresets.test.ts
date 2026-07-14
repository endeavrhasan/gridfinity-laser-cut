import { describe, expect, it } from 'vitest'
import {
  ALIGNMENT_GRID,
  alignmentFromPreset,
  presetFromAlignment,
} from '../alignmentPresets'

describe('alignmentPresets', () => {
  it('round-trips centered', () => {
    expect(presetFromAlignment('center', 'center')).toBe('centered')
    expect(alignmentFromPreset('centered')).toEqual({
      alignX: 'center',
      alignY: 'center',
    })
  })

  it('maps corner presets', () => {
    expect(alignmentFromPreset('front-left')).toEqual({
      alignX: 'left',
      alignY: 'front',
    })
    expect(presetFromAlignment('right', 'back')).toBe('back-right')
  })

  it('orders the 3x3 grid with back on top and front on bottom', () => {
    expect(ALIGNMENT_GRID.map((preset) => preset.id)).toEqual([
      'back-left',
      'back',
      'back-right',
      'left',
      'centered',
      'right',
      'front-left',
      'front',
      'front-right',
    ])
  })
})
