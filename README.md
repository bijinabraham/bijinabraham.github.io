# bijinabraham.github.io

Personal portfolio site for Bijin Abraham.

**Live:** [bijinabraham.github.io](https://bijinabraham.github.io)

## Design

Editorial + technical drawing. Warm paper canvas, deep navy ink, oxblood accent. Every diagram (hero portrait, career trajectory, skills matrix, project architectures) is drawn as inline SVG in the site&rsquo;s own visual language.

The site holds two positioning modes behind a single toggle in the nav:
- **Elevation** &middot; the outside view. Manager scope, pipeline, people leadership.
- **Section** &middot; the inside view. IC craft, streaming architecture, code.

Same substance, different framing.

## Stack

- **[Next.js 16](https://nextjs.org)** with the App Router, static export (`output: "export"`)
- **TypeScript** (strict)
- **Tailwind CSS 4** + CSS Modules
- **Framer Motion 11** for orchestrated transitions
- **`next/font`** for Fraunces, JetBrains Mono, Inter, Caveat
- Inline SVG for every diagram (no chart library)
- **Vitest** + Testing Library for the small logic surface

## Structure

```
app/
  layout.tsx        root layout, fonts, metadata
  page.tsx          composes every section
  globals.css       palette tokens, base resets

components/
  Nav, Hero, Career, Metrics, Skills,
  Projects, Writing, Contact, Footer
  hero/PortraitSVG.tsx      abstract portrait with mode callouts
  projects/*Detail.tsx      one architecture SVG per project

lib/
  content/          typed data files (single source of truth for site copy)
  hooks/            useMode, usePalette, useReveal, SiteStateProvider

.github/workflows/
  deploy.yml        build + deploy via official GitHub Pages actions
```

## Local development

```bash
npm install
NODE_OPTIONS='' npx next dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build     # static export to out/
npm test          # Vitest suite (data + hook logic)
```

## Deploy

Every push to `main` triggers `.github/workflows/deploy.yml`, which builds the site and publishes via `actions/deploy-pages@v4`. The live URL is [bijinabraham.github.io](https://bijinabraham.github.io).

## Conventions

- No em or en dashes in user-facing copy. Use periods, commas, colons, or middle dots.
- Palette is locked in production. Alternate palettes exist as `body[data-palette=...]` overrides in `globals.css` and a dormant `PaletteSwitcher` component is available for design exploration.
- Content lives in `lib/content/*.ts`. Editing copy never requires touching component code.
- Reveals use one shared `useReveal` (IntersectionObserver, fires once). No scroll-linked animations.

## License

[MIT](LICENSE)
