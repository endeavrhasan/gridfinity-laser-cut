import { describe, expect, it } from 'vitest'
import {
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
})
