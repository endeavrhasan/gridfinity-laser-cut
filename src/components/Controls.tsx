import type { AlignX, AlignY, PlateMode } from '../geometry/calculateGrid'
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
  onAlignXChange: (align: AlignX) => void
  onAlignYChange: (align: AlignY) => void
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
  onAlignXChange,
  onAlignYChange,
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
            <small>
              Outer plate fills usable drawer dimensions; align the grid below.
            </small>
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

      {plateMode === 'drawer' && (
        <fieldset className="alignment">
          <legend>Grid alignment</legend>
          <p className="hint">
            Preview is top-down: back is at the top, front at the bottom.
          </p>

          <div className="field-row">
            <label>Width</label>
            <div className="segmented segmented-3" role="group" aria-label="Width alignment">
              <button
                type="button"
                className={alignX === 'left' ? 'active' : ''}
                onClick={() => onAlignXChange('left')}
              >
                Left
              </button>
              <button
                type="button"
                className={alignX === 'center' ? 'active' : ''}
                onClick={() => onAlignXChange('center')}
              >
                Center
              </button>
              <button
                type="button"
                className={alignX === 'right' ? 'active' : ''}
                onClick={() => onAlignXChange('right')}
              >
                Right
              </button>
            </div>
          </div>

          <div className="field-row">
            <label>Depth</label>
            <div className="segmented segmented-3" role="group" aria-label="Depth alignment">
              <button
                type="button"
                className={alignY === 'front' ? 'active' : ''}
                onClick={() => onAlignYChange('front')}
              >
                Front
              </button>
              <button
                type="button"
                className={alignY === 'center' ? 'active' : ''}
                onClick={() => onAlignYChange('center')}
              >
                Center
              </button>
              <button
                type="button"
                className={alignY === 'back' ? 'active' : ''}
                onClick={() => onAlignYChange('back')}
              >
                Back
              </button>
            </div>
          </div>
        </fieldset>
      )}
    </section>
  )
}
