# bijinabraham.github.io

Personal portfolio site for Bijin Abraham. Deploys to https://bijinabraham.github.io.

## Direction

**Blueprint v2** · editorial + technical drawing. Warm paper canvas, deep navy ink, oxblood accent. Dual positioning (Manager + IC) via an in-nav elevation/section view toggle.

See the design spec: [`docs/superpowers/specs/2026-07-04-portfolio-design.md`](docs/superpowers/specs/2026-07-04-portfolio-design.md).

Interactive reference mockup: [`mockups/blueprint-v2.html`](mockups/blueprint-v2.html). Open in a browser to feel the palette, motion, and section flow. This is the source of truth for the visual identity until the real Next.js implementation replaces it.

## Repo status

Design phase. No implementation yet.

Next steps:
1. Review the spec
2. Generate implementation plan (via `writing-plans` workflow)
3. Scaffold Next.js 15 with static export
4. Port sections from the mockup
5. Wire GitHub Pages deploy via Actions
6. Ship

## Stack (planned)

- Next.js 15, App Router, `output: 'export'`
- TypeScript
- Tailwind CSS 3 + CSS Modules
- Framer Motion 11
- Inline SVG for diagrams
- `next/font` for Fraunces + JetBrains Mono + Inter + Caveat

## Local mockup

```bash
open mockups/blueprint-v2.html
```

Try the palette swatches (nav, top-right) and the Elevation/Section toggle.

## Conventions

- No em or en dashes anywhere in user-facing copy. Use periods, commas, colons, or middle dots.
- Palette locked to FT Salmon paper + deep navy ink + oxblood accent. Alternates preserved in the mockup swatch strip for exploration.
