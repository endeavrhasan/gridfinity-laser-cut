import type { GridLayout } from '../geometry/calculateGrid'
import { formatLength, type Unit } from '../geometry/units'

export interface ResultsProps {
  layout: GridLayout
  unit: Unit
}

export function Results({ layout, unit }: ResultsProps) {
  if (layout.cells === 0) {
    return (
      <section className="sidebar-section" aria-labelledby="info-heading">
        <h2 id="info-heading" className="section-label">
          Grid Info
        </h2>
        <p className="empty">
          No complete Gridfinity cells fit. Increase the drawer size or reduce
          margins.
        </p>
      </section>
    )
  }

  return (
    <section className="sidebar-section" aria-labelledby="info-heading">
      <h2 id="info-heading" className="section-label">
        Grid Info
      </h2>
      <dl className="metrics">
        <div className="info-row">
          <dt>Grid Units</dt>
          <dd>
            {layout.columns} × {layout.rows}
          </dd>
        </div>
        <div className="info-row">
          <dt>Baseplate Width</dt>
          <dd>{formatLength(layout.plateWidthMm, unit)}</dd>
        </div>
        <div className="info-row">
          <dt>Baseplate Height</dt>
          <dd>{formatLength(layout.plateDepthMm, unit)}</dd>
        </div>
        <div className="info-row">
          <dt>X Margin</dt>
          <dd>{formatLength(layout.marginLeftMm, unit)}</dd>
        </div>
        <div className="info-row">
          <dt>Y Margin</dt>
          <dd>{formatLength(layout.marginTopMm, unit)}</dd>
        </div>
        <div className="info-row">
          <dt>Total cells</dt>
          <dd>{layout.cells}</dd>
        </div>
        <div className="info-row">
          <dt>Grid size</dt>
          <dd>
            {formatLength(layout.gridWidthMm, unit)} ×{' '}
            {formatLength(layout.gridDepthMm, unit)}
          </dd>
        </div>
      </dl>
    </section>
  )
}
