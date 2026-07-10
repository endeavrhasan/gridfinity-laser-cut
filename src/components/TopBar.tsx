import { ThemeToggle } from './ThemeToggle'

interface TopBarProps {
  onReset: () => void
  onDownload: () => void
  downloadDisabled: boolean
  themePreference: 'system' | 'light' | 'dark'
  onThemeCycle: () => void
}

function LogoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x="2" y="2" width="4.5" height="4.5" rx="0.5" fill="currentColor" />
      <rect x="7.75" y="2" width="4.5" height="4.5" rx="0.5" fill="currentColor" />
      <rect x="13.5" y="2" width="4.5" height="4.5" rx="0.5" fill="currentColor" />
      <rect x="2" y="7.75" width="4.5" height="4.5" rx="0.5" fill="currentColor" />
      <rect x="7.75" y="7.75" width="4.5" height="4.5" rx="0.5" fill="currentColor" />
      <rect x="13.5" y="7.75" width="4.5" height="4.5" rx="0.5" fill="currentColor" />
      <rect x="2" y="13.5" width="4.5" height="4.5" rx="0.5" fill="currentColor" />
      <rect x="7.75" y="13.5" width="4.5" height="4.5" rx="0.5" fill="currentColor" />
      <rect x="13.5" y="13.5" width="4.5" height="4.5" rx="0.5" fill="currentColor" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M8 2v8m0 0L5 7.5M8 10l3-2.5M3 13h10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function TopBar({
  onReset,
  onDownload,
  downloadDisabled,
  themePreference,
  onThemeCycle,
}: TopBarProps) {
  return (
    <header className="top-bar">
      <div className="brand">
        <div className="brand-logo">
          <LogoIcon />
        </div>
        <h1 className="brand-title">Gridfinity Laser Cut Base Generator</h1>
      </div>
      <div className="top-actions">
        <button type="button" className="btn" onClick={onReset}>
          Reset
        </button>
        <ThemeToggle preference={themePreference} onCycle={onThemeCycle} />
        <button
          type="button"
          className="btn btn-primary"
          onClick={onDownload}
          disabled={downloadDisabled}
        >
          <DownloadIcon />
          Download SVG
        </button>
      </div>
    </header>
  )
}
