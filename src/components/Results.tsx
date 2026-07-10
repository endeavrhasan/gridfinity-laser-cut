import type { GridLayout } from '../geometry/calculateGrid'
import { formatLength, type Unit } from '../geometry/units'

export interface ResultsProps {
  layout: GridLayout
  unit: Unit
}

export function Results({ layout, unit }: ResultsProps) {
  if (layout.cells === 0) {
    return (
      <section className="panel results" aria-labelledby="results-heading">
        <h2 id="results-heading">Results</h2>
        <p className="empty">
          No complete Gridfinity cells fit. Increase the drawer size or reduce
          clearance.
        </p>
      </section>
    )
  }

  return (
    <section className="panel results" aria-labelledby="results-heading">
      <h2 id="results-heading">Results</h2>
      <dl className="metrics">
        <div>
          <dt>Columns</dt>
          <dd>{layout.columns}</dd>
        </div>
        <div>
          <dt>Rows</dt>
          <dd>{layout.rows}</dd>
        </div>
        <div>
          <dt>Total cells</dt>
          <dd>{layout.cells}</dd>
        </div>
        <div>
          <dt>Grid size</dt>
          <dd>
            {formatLength(layout.gridWidthMm, unit)} ×{' '}
            {formatLength(layout.gridDepthMm, unit)}
          </dd>
        </div>
        <div>
          <dt>Plate size</dt>
          <dd>
            {formatLength(layout.plateWidthMm, unit)} ×{' '}
            {formatLength(layout.plateDepthMm, unit)}
          </dd>
        </div>
        <div>
          <dt>Unused space</dt>
          <dd>
            {formatLength(layout.unusedWidthMm, unit)} ×{' '}
            {formatLength(layout.unusedDepthMm, unit)}
          </dd>
        </div>
        <div>
          <dt>Horizontal margins</dt>
          <dd>
            {formatLength(layout.marginLeftMm, unit)} each side
          </dd>
        </div>
        <div>
          <dt>Vertical margins</dt>
          <dd>
            {formatLength(layout.marginTopMm, unit)} each side
          </dd>
        </div>
      </dl>
    </section>
  )
}
