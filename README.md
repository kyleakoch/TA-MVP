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

## GitHub Pages notes

- For a repo site like `https://<user>.github.io/TA-MVP/`, the app needs a base path (`/TA-MVP`).
- `next.config.ts` auto-detects this in GitHub Actions using `GITHUB_REPOSITORY` and `GITHUB_ACTIONS`.
- Publish the **contents of `out/`** to your Pages branch (or use a Pages workflow that deploys `out/`).
