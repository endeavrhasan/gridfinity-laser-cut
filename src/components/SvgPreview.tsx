import { formatLength, type Unit } from '../geometry/units'
import type { GridLayout } from '../geometry/calculateGrid'

interface SvgPreviewProps {
  svg: string
  empty: boolean
  layout: GridLayout
  unit: Unit
}

export function SvgPreview({ svg, empty, layout, unit }: SvgPreviewProps) {
  return (
    <section className="preview-canvas" aria-label="Baseplate preview">
      <div className="preview-meta" aria-hidden={!empty}>
        <span>
          EXTENTS:{' '}
          {formatLength(layout.plateWidthMm, unit).replace(` ${unit}`, '')} ×{' '}
          {formatLength(layout.plateDepthMm, unit).replace(` ${unit}`, '')}
        </span>
        <span>OBJECTS: {layout.cells} UNITS</span>
        <span>
          GRID: {layout.columns} × {layout.rows}
        </span>
      </div>

      <div className="preview-stage">
        {empty ? (
          <p className="empty">
            Nothing to preview until at least one cell fits.
          </p>
        ) : (
          <div
            className="svg-frame"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        )}
      </div>
    </section>
  )
}
