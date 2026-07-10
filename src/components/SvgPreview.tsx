interface SvgPreviewProps {
  svg: string
  empty: boolean
}

export function SvgPreview({ svg, empty }: SvgPreviewProps) {
  return (
    <section className="panel preview" aria-labelledby="preview-heading">
      <h2 id="preview-heading">Preview</h2>
      {empty ? (
        <p className="empty">Nothing to preview until at least one cell fits.</p>
      ) : (
        <div
          className="svg-frame"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      )}
    </section>
  )
}
