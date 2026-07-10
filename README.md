# Gridfinity Baseplate SVG

A static client-side tool that calculates the maximum Gridfinity grid for a drawer and downloads a laser-ready SVG baseplate.

## Stack

- React + TypeScript + Vite
- Vitest for geometry and SVG tests
- No backend, database, or authentication

## Usage

```bash
npm install
npm run dev
```

Open the local URL, enter drawer width/depth, choose millimetres or inches, optionally set edge clearance, pick a plate outline mode, then download the SVG.

```bash
npm test
npm run build
```

## Geometry constants

Centralised in `src/geometry/constants.ts`:

| Constant | Value |
| --- | --- |
| Grid pitch | 42 mm |
| Laser cutout size | 37.1 mm square |
| Cutout corner radius | 1.6 mm |

All internal calculations use millimetres. SVG export uses physical units, e.g. `width="510mm"` with a matching millimetre `viewBox`.

## Plate modes

- **Drawer size** — outer plate fills the usable drawer area (after clearance); the grid is centred.
- **Grid only** — outer plate matches the exact Gridfinity grid dimensions.

## Architecture

- `src/geometry/calculateGrid.ts` — pure grid fit and layout math
- `src/geometry/generateSvg.ts` — pure SVG string generation
- React UI only collects inputs and displays shared layout/SVG output

Live preview and download both use `generateSvg`.
