import { useMemo, useState } from 'react'
import { Controls } from './components/Controls'
import { DownloadButton } from './components/DownloadButton'
import { Results } from './components/Results'
import { SvgPreview } from './components/SvgPreview'
import {
  calculateGrid,
  type AlignX,
  type AlignY,
  type PlateMode,
} from './geometry/calculateGrid'
import { generateSvg } from './geometry/generateSvg'
import { fromMm, toMm, type Unit } from './geometry/units'
import './styles.css'

const DEFAULT_WIDTH_MM = 510
const DEFAULT_DEPTH_MM = 375

export default function App() {
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

  return (
    <div className="app">
      <header className="header">
        <h1>Gridfinity Baseplate SVG</h1>
        <p>
          Enter a drawer size to generate a laser-cuttable Gridfinity baseplate
          SVG.
        </p>
      </header>

      <main className="layout">
        <div className="sidebar">
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
            onAlignXChange={setAlignX}
            onAlignYChange={setAlignY}
          />
          <Results layout={layout} unit={unit} />
          <DownloadButton
            svg={svg}
            columns={layout.columns}
            rows={layout.rows}
            disabled={empty}
          />
        </div>
        <SvgPreview svg={svg} empty={empty} />
      </main>
    </div>
  )
}
