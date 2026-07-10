import { useMemo, useState } from 'react'
import { Controls } from './components/Controls'
import { Results } from './components/Results'
import { SidebarFooter } from './components/SidebarFooter'
import { SvgPreview } from './components/SvgPreview'
import { TopBar } from './components/TopBar'
import {
  calculateGrid,
  type AlignX,
  type AlignY,
  type PlateMode,
} from './geometry/calculateGrid'
import { generateSvg } from './geometry/generateSvg'
import { fromMm, toMm, type Unit } from './geometry/units'
import { useTheme } from './hooks/useTheme'
import './styles.css'

const DEFAULT_WIDTH_MM = 510
const DEFAULT_DEPTH_MM = 375

export default function App() {
  const { preference, cyclePreference } = useTheme()
  const [unit, setUnit] = useState<Unit>('mm')
  const [width, setWidth] = useState(DEFAULT_WIDTH_MM)
  const [depth, setDepth] = useState(DEFAULT_DEPTH_MM)
  const [clearance, setClearance] = useState(0)
  const [plateMode, setPlateMode] = useState<PlateMode>('drawer')
  const [alignX, setAlignX] = useState<AlignX>('center')
  const [alignY, setAlignY] = useState<AlignY>('center')

  function handleUnitChange(next: Unit) {
    if (next === unit) return
    setWidth(Number(fromMm(toMm(width, unit), next).toFixed(6)))
    setDepth(Number(fromMm(toMm(depth, unit), next).toFixed(6)))
    setClearance(Number(fromMm(toMm(clearance, unit), next).toFixed(6)))
    setUnit(next)
  }

  function handleReset() {
    setUnit('mm')
    setWidth(DEFAULT_WIDTH_MM)
    setDepth(DEFAULT_DEPTH_MM)
    setClearance(0)
    setPlateMode('drawer')
    setAlignX('center')
    setAlignY('center')
  }

  function handleAlignChange(nextX: AlignX, nextY: AlignY) {
    setAlignX(nextX)
    setAlignY(nextY)
  }

  const layout = useMemo(
    () =>
      calculateGrid({
        widthMm: toMm(width, unit),
        depthMm: toMm(depth, unit),
        clearanceMm: toMm(clearance, unit),
        plateMode,
        alignX,
        alignY,
      }),
    [width, depth, clearance, unit, plateMode, alignX, alignY],
  )

  const svg = useMemo(() => generateSvg(layout), [layout])
  const empty = layout.cells === 0

  function handleDownload() {
    if (empty) return
    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `gridfinity-baseplate-${layout.columns}x${layout.rows}.svg`
    anchor.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="app-shell">
      <TopBar
        onReset={handleReset}
        onDownload={handleDownload}
        downloadDisabled={empty}
        themePreference={preference}
        onThemeCycle={cyclePreference}
      />

      <div className="main-content">
        <aside className="sidebar">
          <Controls
            width={width}
            depth={depth}
            clearance={clearance}
            unit={unit}
            plateMode={plateMode}
            alignX={alignX}
            alignY={alignY}
            onWidthChange={setWidth}
            onDepthChange={setDepth}
            onClearanceChange={setClearance}
            onUnitChange={handleUnitChange}
            onPlateModeChange={setPlateMode}
            onAlignChange={handleAlignChange}
          />
          <Results layout={layout} unit={unit} />
          <SidebarFooter />
        </aside>

        <SvgPreview svg={svg} empty={empty} layout={layout} unit={unit} />
      </div>
    </div>
  )
}
