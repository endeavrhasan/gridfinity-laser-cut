import type { AlignX, AlignY, PlateMode } from '../geometry/calculateGrid'
import {
  ALIGNMENT_GRID,
  presetFromAlignment,
} from '../geometry/alignmentPresets'
import type { Unit } from '../geometry/units'

export interface ControlsProps {
  width: number
  depth: number
  clearance: number
  unit: Unit
  plateMode: PlateMode
  alignX: AlignX
  alignY: AlignY
  onWidthChange: (value: number) => void
  onDepthChange: (value: number) => void
  onClearanceChange: (value: number) => void
  onUnitChange: (unit: Unit) => void
  onPlateModeChange: (mode: PlateMode) => void
  onAlignChange: (alignX: AlignX, alignY: AlignY) => void
}

export function Controls({
  width,
  depth,
  clearance,
  unit,
  plateMode,
  alignX,
  alignY,
  onWidthChange,
  onDepthChange,
  onClearanceChange,
  onUnitChange,
  onPlateModeChange,
  onAlignChange,
}: ControlsProps) {
  const unitLabel = unit === 'mm' ? 'mm' : 'in'
  const alignmentId = presetFromAlignment(alignX, alignY)

  return (
    <>
      <section className="sidebar-section" aria-labelledby="dims-heading">
        <h2 id="dims-heading" className="section-label">
          Workspace Dimensions
        </h2>
        <div className="section-content">
          <div className="field">
            <label className="field-label" htmlFor="unit">
              Units
            </label>
            <div className="segmented" role="group" aria-label="Units">
              <button
                type="button"
                className={unit === 'mm' ? 'active' : ''}
                onClick={() => onUnitChange('mm')}
              >
                mm
              </button>
              <button
                type="button"
                className={unit === 'in' ? 'active' : ''}
                onClick={() => onUnitChange('in')}
              >
                inches
              </button>
            </div>
          </div>

          <div className="field">
            <label className="field-label" htmlFor="width">
              Width
            </label>
            <div className="input-box">
              <input
                id="width"
                type="number"
                min={0}
                step="any"
                value={width}
                onChange={(e) => onWidthChange(Number(e.target.value))}
              />
              <span className="input-suffix">{unitLabel}</span>
            </div>
          </div>

          <div className="field">
            <label className="field-label" htmlFor="depth">
              Height
            </label>
            <div className="input-box">
              <input
                id="depth"
                type="number"
                min={0}
                step="any"
                value={depth}
                onChange={(e) => onDepthChange(Number(e.target.value))}
              />
              <span className="input-suffix">{unitLabel}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="sidebar-section" aria-labelledby="settings-heading">
        <h2 id="settings-heading" className="section-label">
          Grid Settings
        </h2>
        <div className="section-content">
          <div className="field">
            <label className="field-label" htmlFor="clearance">
              Margins
            </label>
            <div className="input-box">
              <input
                id="clearance"
                type="number"
                min={0}
                step="any"
                value={clearance}
                onChange={(e) => onClearanceChange(Number(e.target.value))}
              />
              <span className="input-suffix">{unitLabel}</span>
            </div>
          </div>

          <div className="field">
            <label className="field-label" htmlFor="plateMode">
              Plate outline
            </label>
            <div className="segmented" role="group" aria-label="Plate outline">
              <button
                type="button"
                className={plateMode === 'drawer' ? 'active' : ''}
                onClick={() => onPlateModeChange('drawer')}
              >
                Drawer
              </button>
              <button
                type="button"
                className={plateMode === 'grid' ? 'active' : ''}
                onClick={() => onPlateModeChange('grid')}
              >
                Grid only
              </button>
            </div>
          </div>

          {plateMode === 'drawer' && (
            <div className="field">
              <span className="field-label" id="alignment-label">
                Alignment
              </span>
              <div
                className="alignment-picker"
                role="radiogroup"
                aria-labelledby="alignment-label"
              >
                {ALIGNMENT_GRID.map((preset) => {
                  const selected = preset.id === alignmentId
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      aria-label={preset.label}
                      className={
                        selected
                          ? 'alignment-cell selected'
                          : 'alignment-cell'
                      }
                      onClick={() =>
                        onAlignChange(preset.alignX, preset.alignY)
                      }
                    >
                      <span className="alignment-dot" />
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
