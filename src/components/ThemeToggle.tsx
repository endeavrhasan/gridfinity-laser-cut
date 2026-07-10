interface ThemeToggleProps {
  preference: 'system' | 'light' | 'dark'
  onCycle: () => void
}

export function ThemeToggle({ preference, onCycle }: ThemeToggleProps) {
  const label =
    preference === 'system'
      ? 'System'
      : preference === 'light'
        ? 'Light'
        : 'Dark'

  return (
    <button
      type="button"
      className="btn btn-theme"
      onClick={onCycle}
      title="Cycle theme: System → Light → Dark"
      aria-label={`Theme: ${label}. Click to change.`}
    >
      {label}
    </button>
  )
}
