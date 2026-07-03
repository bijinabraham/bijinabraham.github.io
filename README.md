# bijinabraham.github.io

Personal portfolio site for Bijin Abraham. Live at [bijinabraham.github.io](https://bijinabraham.github.io).

## Direction

**Blueprint** &middot; editorial + technical drawing. Warm paper canvas (FT Salmon), deep navy ink, oxblood accent. Dual positioning (Manager + IC) via an elevation/section view toggle in the nav.

## Stack

- Next.js 16 (App Router, static export)
- TypeScript
- Tailwind CSS 4 + CSS Modules
- Framer Motion 11
- `next/font` for Fraunces, JetBrains Mono, Inter, Caveat
- Inline SVG for all diagrams

## Local development

```bash
npm install
NODE_OPTIONS='' npx next dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
```

Static export lands in `out/`.

## Tests

```bash
npm test
```

## Deploy

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds the site and deploys via the official Pages action. Live at `https://bijinabraham.github.io`.

## Conventions

- No em or en dashes anywhere in user-facing copy. Periods, commas, colons, or middle dots.
- Palette is locked; alternate palettes exist in `app/globals.css` under `body[data-palette=...]` but the switcher UI is not rendered in production.
- Section content lives in typed data files under `lib/content/`.
