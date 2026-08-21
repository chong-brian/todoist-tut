# Create React App → Vite migration

This project was migrated off `react-scripts` (Create React App) to **Vite + Vitest**
to eliminate the large tree of vulnerable transitive build dependencies that were
generating 160+ Dependabot alerts.

## What changed
- **Removed** `react-scripts` (and its webpack/babel/eslint toolchain) and `node-sass`.
- **Added** `vite`, `@vitejs/plugin-react`, `sass`, `vitest`, `jsdom`.
- `vite.config.js` allows JSX in `.js` files (classic runtime) so **no components were renamed**.
- `public/index.html` → root `index.html` with a `<script type="module" src="/src/index.js">` entry.
- **firebase `^6` → `^8`** — identical namespaced API (`firebase.initializeApp`, `firebase.firestore()`),
  so **zero app-code changes**; v8 drops the native `grpc` module that can't build on modern Node.
- `react` / `react-dom` `16.13.1` → `^16.14.0` (adds the JSX runtime; still React 16).
- Test tooling moved to **Vitest** (`npm test`), with a sample `app.test.js`.
- Dependency count dropped from ~1,000+ packages to ~200.

## Verified
`npm install`, `npm run build` (Vite), and `npm test` (Vitest) all pass.

## Scripts
- `npm run dev` – start dev server (port 3000)
- `npm run build` – production build to `build/`
- `npm run preview` – preview the build
- `npm test` – run Vitest
