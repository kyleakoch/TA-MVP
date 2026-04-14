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

If you still get a 404 at `https://<user>.github.io/<repo>/`, the deploy workflow usually did not run or failed.

1. Go to **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Open **Actions** and confirm `Deploy Next.js static export to GitHub Pages` is green on your **default branch**.
4. If it failed before, use **Run workflow** to retry.

### Common failure causes fixed here

- Workflow watched only `main`, but your default branch was different.
- Workflow used `npm ci` without a lockfile.

The workflow now:

- listens on all branches but deploys only from the repo default branch
- uses `npm install`
- uploads `out/` (contains `index.html`) to Pages
