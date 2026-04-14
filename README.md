# That's Available MVP

Next.js + TypeScript + Tailwind MVP for naming preflight checks.

## Local development

```bash
npm install
npm run dev
```

## Static build (GitHub Pages compatible)

```bash
npm run build
```

This project is configured with `output: "export"`, so build artifacts are emitted as static files in `out/` including `index.html`.

## GitHub Pages setup (important)

If you see your README rendered as a website page, Pages is serving your repository files instead of the Next build output.

1. Go to **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Ensure the workflow `.github/workflows/deploy-pages.yml` runs successfully on `main`.
4. Open the deployed URL from the workflow summary (it should serve the app, not README text).

## Why this works

- `next.config.ts` exports static files to `out/`.
- The workflow uploads `out/` as the Pages artifact.
- GitHub Pages then serves the generated `index.html` and assets.
