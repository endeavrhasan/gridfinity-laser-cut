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

`npm run build` writes production files to `dist/`. That folder is what must be published — not the repo root.

## Deploy (Hostinger)

This is a Vite app. Browsers cannot run `/src/main.tsx` directly. If the live site loads that file (often with MIME type `text/plain`), the source tree was uploaded instead of the build output, and the page will stay blank.

### Option A — GitHub deploy in hPanel (recommended)

1. Deploy as a **Node.js / frontend web app** (or equivalent Git deploy with a build step), not a raw static file sync of the repo.
2. Set:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
3. Redeploy from the `production` branch.
4. Confirm the live HTML references `/assets/index-….js`, not `/src/main.tsx`.

### Option B — Manual upload

```bash
npm install
npm run build
```

Upload the **contents** of `dist/` (including `index.html` and `assets/`) to the site document root (`public_html`). Do not upload `src/`, `package.json`, or the repo-root `index.html`.

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
