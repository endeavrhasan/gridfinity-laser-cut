interface DownloadButtonProps {
  svg: string
  columns: number
  rows: number
  disabled: boolean
}

export function DownloadButton({
  svg,
  columns,
  rows,
  disabled,
}: DownloadButtonProps) {
  function handleDownload() {
    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `gridfinity-baseplate-${columns}x${rows}.svg`
    anchor.click()
    URL.revokeObjectURL(url)
  }

  return (
    <button
      type="button"
      className="download"
      onClick={handleDownload}
      disabled={disabled}
    >
      Download SVG
    </button>
  )
}
