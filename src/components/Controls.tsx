import type { PlateMode } from '../geometry/calculateGrid'
import type { Unit } from '../geometry/units'

export interface ControlsProps {
  width: number
  depth: number
  clearance: number
  unit: Unit
  plateMode: PlateMode
  onWidthChange: (value: number) => void
  onDepthChange: (value: number) => void
  onClearanceChange: (value: number) => void
  onUnitChange: (unit: Unit) => void
  onPlateModeChange: (mode: PlateMode) => void
}

export function Controls({
  width,
  depth,
  clearance,
  unit,
  plateMode,
  onWidthChange,
  onDepthChange,
  onClearanceChange,
  onUnitChange,
  onPlateModeChange,
}: ControlsProps) {
  const unitLabel = unit === 'mm' ? 'mm' : 'in'

  return (
    <section className="panel controls" aria-labelledby="controls-heading">
      <h2 id="controls-heading">Drawer size</h2>

      <div className="field-row">
        <label htmlFor="unit">Units</label>
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

      <div className="field-grid">
        <div className="field">
          <label htmlFor="width">Width ({unitLabel})</label>
          <input
            id="width"
            type="number"
            min={0}
            step="any"
            value={width}
            onChange={(e) => onWidthChange(Number(e.target.value))}
          />
        </div>
        <div className="field">
          <label htmlFor="depth">Depth ({unitLabel})</label>
          <input
            id="depth"
            type="number"
            min={0}
            step="any"
            value={depth}
            onChange={(e) => onDepthChange(Number(e.target.value))}
          />
        </div>
        <div className="field">
          <label htmlFor="clearance">Edge clearance per side ({unitLabel})</label>
          <input
            id="clearance"
            type="number"
            min={0}
            step="any"
            value={clearance}
            onChange={(e) => onClearanceChange(Number(e.target.value))}
          />
        </div>
      </div>

      <fieldset className="plate-mode">
        <legend>Plate outline</legend>
        <label className="radio">
          <input
            type="radio"
            name="plateMode"
            value="drawer"
            checked={plateMode === 'drawer'}
            onChange={() => onPlateModeChange('drawer')}
          />
          <span>
            <strong>Drawer size</strong>
            <small>Outer plate fills usable drawer dimensions; grid is centred.</small>
          </span>
        </label>
        <label className="radio">
          <input
            type="radio"
            name="plateMode"
            value="grid"
            checked={plateMode === 'grid'}
            onChange={() => onPlateModeChange('grid')}
          />
          <span>
            <strong>Grid only</strong>
            <small>Outer plate matches the exact Gridfinity grid size.</small>
          </span>
        </label>
      </fieldset>
    </section>
  )
}
