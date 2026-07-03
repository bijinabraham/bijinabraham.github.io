# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the Blueprint v2 portfolio to https://bijinabraham.github.io as a static Next.js 15 site.

**Architecture:** Single-page Next.js 15 App Router site with static export to GitHub Pages via Actions. Sections are React components composed on the home page. Palette, typography, and hairline conventions defined once as CSS custom properties on `:root`. Motion mixes Framer Motion 11 (orchestrated transitions) with native CSS (hovers, palette swaps) and IntersectionObserver (scroll reveals). Two client-side state layers: `useMode` for elevation/section view toggle, `usePalette` for optional palette switcher. Content lives in typed data files under `lib/content/` (no CMS at v1). The mockup at `mockups/blueprint-v2.html` is the source of truth for visual details: when in doubt, open it in a browser and compare.

**Tech Stack:** Next.js 15 (App Router, `output: 'export'`), TypeScript strict, Tailwind CSS 3, CSS Modules, Framer Motion 11, `next/font` (Fraunces variable, JetBrains Mono, Inter, Caveat), inline SVG, Vitest for the small logic surface, GitHub Actions with the official Pages action for deploy.

**Reference documents:**
- Design spec: [`docs/superpowers/specs/2026-07-04-portfolio-design.md`](../specs/2026-07-04-portfolio-design.md)
- Reference mockup (source of truth for visual details): [`mockups/blueprint-v2.html`](../../../mockups/blueprint-v2.html)
- Resume for content: `/Users/babraham/Downloads/Bijin Abraham - Resume.pdf`

**Conventions to follow throughout:**
- No em or en dashes anywhere in user-facing copy. Periods, commas, colons, or middle dots.
- Palette is FT Salmon + navy + oxblood. Locked. Alternates in the switcher only.
- Push convention on this machine: `GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null git push origin main`
- Dev server: `NODE_OPTIONS='' npx next dev` (matches the Bijin Beyond Borders convention; safe elsewhere).

---

## File structure

Locked before Task 1 so decomposition decisions do not leak into individual tasks.

| Path                                              | Responsibility                                                       |
| ------------------------------------------------- | -------------------------------------------------------------------- |
| `next.config.ts`                                  | Static export config, base path (none), image config.                 |
| `tsconfig.json`                                   | Strict TS. Path alias `@/*` for imports.                              |
| `tailwind.config.ts`                              | Content globs, theme extends with palette tokens for utility use.     |
| `postcss.config.mjs`                              | Tailwind + autoprefixer.                                              |
| `package.json`                                    | Scripts: `dev`, `build`, `lint`, `test`.                              |
| `.github/workflows/deploy.yml`                    | Build + deploy via official Pages action.                             |
| `app/layout.tsx`                                  | Root layout, fonts, metadata, `<html>` shell.                         |
| `app/page.tsx`                                    | Home page: composes all section components in order.                  |
| `app/globals.css`                                 | Palette tokens on `:root`, alternate palettes, base resets, grid overlay CSS, font family assignments. |
| `app/not-found.tsx`                               | 404 page in the site's design language.                               |
| `components/GridOverlay.tsx`                      | Fixed 80px grid overlay behind content.                               |
| `components/Crosshair.tsx`                        | Mouse-following crosshair cursor (desktop only).                      |
| `components/Nav.tsx` + `.module.css`              | Fixed top nav with logo, menu, view toggle, palette switcher.         |
| `components/ViewToggle.tsx` + `.module.css`       | Elevation / Section segmented control.                                |
| `components/PaletteSwitcher.tsx` + `.module.css`  | Swatch strip that sets `body[data-palette]`.                          |
| `components/Hero.tsx` + `.module.css`             | Two-column hero with mode-aware content and portrait SVG.             |
| `components/hero/PortraitSVG.tsx`                 | The portrait diagram; renders mode-aware callouts.                    |
| `components/Career.tsx` + `.module.css`           | Dual-track SVG career trajectory with people-leadership span.         |
| `components/Metrics.tsx` + `.module.css`          | 4-cell dimensional grid.                                              |
| `components/Skills.tsx` + `.module.css`           | Material-specifications table.                                        |
| `components/Projects.tsx` + `.module.css`         | Expandable project cards.                                             |
| `components/projects/AtlasDetail.tsx`             | Atlas architecture SVG.                                               |
| `components/projects/SculpturaDetail.tsx`         | Sculptura architecture SVG.                                           |
| `components/projects/PsychShortsDetail.tsx`       | Psychology Traits Shorts architecture SVG.                            |
| `components/projects/BBBDetail.tsx`               | Bijin Beyond Borders architecture SVG.                                |
| `components/Writing.tsx` + `.module.css`          | Post index list.                                                      |
| `components/Contact.tsx` + `.module.css`          | Title-block contact section.                                          |
| `components/Footer.tsx` + `.module.css`           | Footer.                                                               |
| `lib/content/experience.ts`                       | Career roles data.                                                    |
| `lib/content/metrics.ts`                          | Metric cells data.                                                    |
| `lib/content/skills.ts`                           | Skills matrix data.                                                   |
| `lib/content/projects.ts`                         | Project metadata (title, description, status, stack, detail slug).    |
| `lib/content/writing.ts`                          | Writing post metadata.                                                |
| `lib/hooks/useMode.ts`                            | Elevation / Section state via body attribute.                         |
| `lib/hooks/usePalette.ts`                         | Palette state via body attribute.                                     |
| `lib/hooks/useReveal.ts`                          | IntersectionObserver-based reveal hook.                               |
| `lib/motion/variants.ts`                          | Shared Framer Motion variants (rise, fade-up, cross-fade).            |
| `lib/content/experience.test.ts`                  | Vitest: verify each role has required fields.                         |
| `lib/content/projects.test.ts`                    | Vitest: verify each project has required fields, live projects have a URL. |
| `lib/hooks/useMode.test.ts`                       | Vitest + Testing Library: toggle behavior.                            |
| `vitest.config.ts`                                | Vitest with jsdom, path alias.                                        |
| `public/favicon.svg`                              | Inline SVG favicon in brand palette.                                  |
| `public/og.png`                                   | Open Graph image (built in Task 6.3, can defer).                      |
| `.eslintrc.json`                                  | Next lint config.                                                     |

**Content decisions locked in Task 5.x will populate the `lib/content/*` files with real values from the resume PDF and existing mockup. When editing content in the future, only those files need to change.**

---

## Milestone 1: Foundation (skeleton runs, blank canvas)

Goal at the end of Milestone 1: `npm run dev` shows a blank warm paper canvas with the grid overlay visible, fonts loaded, and the palette tokens applied. No components yet.

### Task 1.1: Scaffold Next.js 15 with TypeScript

**Files:**
- Create: `~/Projects/portfolio/package.json`, `tsconfig.json`, `next.config.ts`, `next-env.d.ts`, `app/layout.tsx`, `app/page.tsx`
- Modify: `~/Projects/portfolio/.gitignore` (already exists, verify Next.js entries)

- [ ] **Step 1: Verify no clash with existing files**

Run:
```bash
cd ~/Projects/portfolio && ls -la
```
Expected: shows `docs/`, `mockups/`, `README.md`, `.gitignore`, `.git/`. No `app/`, `node_modules/`, or `package.json` yet.

- [ ] **Step 2: Scaffold Next.js in place**

Run:
```bash
cd ~/Projects/portfolio && npx create-next-app@latest . --typescript --app --no-eslint --tailwind --no-src-dir --import-alias "@/*" --use-npm
```

When prompted about existing files (`.gitignore`, `README.md`), answer:
- `.gitignore`: overwrite (we will restore our version in the next step)
- `README.md`: keep ours (do NOT overwrite)

- [ ] **Step 3: Restore our `.gitignore` additions**

Run:
```bash
cat >> ~/Projects/portfolio/.gitignore <<'EOF'

# scratch
scratch/
tmp/
EOF
```

- [ ] **Step 4: Verify scaffold**

Run:
```bash
cd ~/Projects/portfolio && NODE_OPTIONS='' npx next dev
```

Open http://localhost:3000. Expected: Next.js starter page loads. Stop the dev server (Ctrl+C).

- [ ] **Step 5: Commit**

```bash
cd ~/Projects/portfolio
git add .
git commit -m "chore: scaffold Next.js 15 with TypeScript, App Router, Tailwind"
```

### Task 1.2: Configure static export and strip starter content

**Files:**
- Modify: `next.config.ts`, `app/page.tsx`, `app/layout.tsx`, `app/globals.css`
- Delete: `app/favicon.ico` (will be replaced with SVG later), `public/*.svg` (starter assets)

- [ ] **Step 1: Update next.config.ts for static export**

Replace `next.config.ts` contents:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: false,
};

export default nextConfig;
```

- [ ] **Step 2: Strip starter content from `app/page.tsx`**

Replace contents:

```tsx
export default function Home() {
  return <main />;
}
```

- [ ] **Step 3: Strip starter content from `app/layout.tsx`**

Replace contents:

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bijin Abraham",
  description: "Manager, Solutions Engineering at Confluent. Streaming systems by day, ships product on weekends.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 4: Clear `app/globals.css`**

Replace contents with just the Tailwind directives (rest goes in later):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 5: Remove starter public assets**

Run:
```bash
cd ~/Projects/portfolio && rm -f public/next.svg public/vercel.svg public/file.svg public/globe.svg public/window.svg app/favicon.ico
```

- [ ] **Step 6: Verify build works with static export**

Run:
```bash
cd ~/Projects/portfolio && NODE_OPTIONS='' npx next build
```

Expected: build completes, produces `out/` folder. No errors.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: configure static export and strip Next.js starter content"
```

### Task 1.3: Add fonts via next/font

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Update `app/layout.tsx` to load fonts**

Replace contents:

```tsx
import type { Metadata } from "next";
import { Fraunces, JetBrains_Mono, Inter, Caveat } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bijin Abraham",
  description:
    "Manager, Solutions Engineering at Confluent. Streaming systems by day, ships product on weekends.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${jetbrains.variable} ${inter.variable} ${caveat.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Verify build**

Run:
```bash
cd ~/Projects/portfolio && NODE_OPTIONS='' npx next build
```

Expected: build succeeds, fonts downloaded during build.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: load Fraunces, JetBrains Mono, Inter, Caveat via next/font"
```

### Task 1.4: Add palette tokens and base styles in globals.css

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Replace `app/globals.css` with full token set and base styles**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Locked palette: FT Salmon paper + navy ink + oxblood accent */
  --paper: #fff1e5;
  --paper-2: #fbe4cf;
  --paper-3: #f5d3b1;
  --ink: #0a1929;
  --ink-2: #152a45;
  --dim: #6a7688;
  --hair: #d8c8b3;
  --hair-2: #e4d5bf;
  --accent: #8b2818;
  --accent-2: #5a1a0c;
  --accent-warm: #a83e26;
  --signal: #2f7a8c;
}

/* Alternate palettes (activated via body[data-palette]) */
body[data-palette="salmon"] {
  --paper: #fff1e5; --paper-2: #fbe4cf; --paper-3: #f5d3b1;
  --ink: #0a1929; --ink-2: #152a45; --dim: #6a7688;
  --hair: #d8c8b3; --hair-2: #e4d5bf;
  --accent: #a63c00; --accent-2: #6b2400; --accent-warm: #c65b1e;
  --signal: #2f7a8c;
}
body[data-palette="manila"] {
  --paper: #ecdfba; --paper-2: #dfcf9d; --paper-3: #cebc7f;
  --ink: #1c1a15; --ink-2: #2f2b1e; --dim: #6b6250;
  --hair: #b8a878; --hair-2: #c8b988;
  --accent: #8b2818; --accent-2: #5a1a0c; --accent-warm: #a83e26;
  --signal: #4a3320;
}
body[data-palette="vellum"] {
  --paper: #fafaf6; --paper-2: #eeeee8; --paper-3: #e0e0d8;
  --ink: #0d0d0e; --ink-2: #2b2b2b; --dim: #7a7570;
  --hair: #d1cec4; --hair-2: #e2dfd3;
  --accent: #1e5f4b; --accent-2: #113a2d; --accent-warm: #3a8a70;
  --signal: #8a5a2e;
}
body[data-palette="steel"] {
  --paper: #eef2f7; --paper-2: #dde5ee; --paper-3: #cad5e2;
  --ink: #0f172a; --ink-2: #1e293b; --dim: #64748b;
  --hair: #b6c0cf; --hair-2: #c8d1de;
  --accent: #2563eb; --accent-2: #1e40af; --accent-warm: #4f7cff;
  --signal: #b8481f;
}
body[data-palette="prussian"] {
  --paper: #f4ede0; --paper-2: #e6dcc5; --paper-3: #d8cba8;
  --ink: #0c1e3a; --ink-2: #182f52; --dim: #5c6a83;
  --hair: #b8b09a; --hair-2: #c9c1a8;
  --accent: #003a70; --accent-2: #00224a; --accent-warm: #2b5c94;
  --signal: #8a6a3e;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  background: var(--paper);
  color: var(--ink);
  font-family: var(--font-sans), system-ui, sans-serif;
  overflow-x: hidden;
}

a {
  color: inherit;
  text-decoration: none;
}

::selection {
  background: var(--ink);
  color: var(--paper);
}

/* Grid overlay lives on body::before via a wrapper class so it stays consistent */
body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  background:
    radial-gradient(ellipse at 20% 10%, rgba(150, 120, 80, 0.06), transparent 60%),
    radial-gradient(ellipse at 80% 90%, rgba(120, 80, 50, 0.05), transparent 60%);
  mix-blend-mode: multiply;
}
```

- [ ] **Step 2: Confirm palette in browser**

Run:
```bash
cd ~/Projects/portfolio && NODE_OPTIONS='' npx next dev
```

Open http://localhost:3000. Expected: warm salmon-cream background, no visible content (main is empty). Very subtle radial shading in corners. Stop the dev server.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: add palette tokens, alternate palettes, base resets"
```

### Task 1.5: Add GridOverlay component

**Files:**
- Create: `components/GridOverlay.tsx`
- Modify: `app/globals.css` (add grid overlay class), `app/layout.tsx` (render component)

- [ ] **Step 1: Add grid overlay CSS to `app/globals.css`**

Append to `app/globals.css`:

```css
.grid-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 2;
  background:
    linear-gradient(90deg, rgba(120, 100, 70, 0.055) 1px, transparent 1px) 0 0 / 80px 80px,
    linear-gradient(180deg, rgba(120, 100, 70, 0.055) 1px, transparent 1px) 0 0 / 80px 80px;
}
```

- [ ] **Step 2: Create `components/GridOverlay.tsx`**

```tsx
export function GridOverlay() {
  return <div className="grid-overlay" aria-hidden="true" />;
}
```

- [ ] **Step 3: Render in `app/layout.tsx`**

Update the body of layout.tsx:

```tsx
<body>
  <GridOverlay />
  {children}
</body>
```

Add the import:

```tsx
import { GridOverlay } from "@/components/GridOverlay";
```

- [ ] **Step 4: Verify in browser**

Run `NODE_OPTIONS='' npx next dev`. Open http://localhost:3000. Expected: fine 80x80 grid overlay visible across the paper canvas.

- [ ] **Step 5: Commit**

```bash
git add components/GridOverlay.tsx app/globals.css app/layout.tsx
git commit -m "feat: add fixed 80px grid overlay"
```

### Task 1.6: Add Crosshair cursor component (desktop only)

**Files:**
- Create: `components/Crosshair.tsx`, `components/Crosshair.module.css`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create `components/Crosshair.module.css`**

```css
.wrap {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 100;
  mix-blend-mode: multiply;
}
.h {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--ink);
  opacity: 0.28;
}
.v {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  background: var(--ink);
  opacity: 0.28;
}

/* Hide crosshair on touch devices */
@media (hover: none), (pointer: coarse) {
  .wrap { display: none; }
}
```

- [ ] **Step 2: Create `components/Crosshair.tsx`**

```tsx
"use client";

import { useEffect, useRef } from "react";
import styles from "./Crosshair.module.css";

export function Crosshair() {
  const hRef = useRef<HTMLDivElement>(null);
  const vRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function move(e: MouseEvent) {
      if (hRef.current) hRef.current.style.top = `${e.clientY}px`;
      if (vRef.current) vRef.current.style.left = `${e.clientX}px`;
    }
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className={styles.wrap} aria-hidden="true">
      <div ref={hRef} className={styles.h} />
      <div ref={vRef} className={styles.v} />
    </div>
  );
}
```

- [ ] **Step 3: Render in `app/layout.tsx`**

Add import and place inside body:

```tsx
import { Crosshair } from "@/components/Crosshair";
```

Body:

```tsx
<body>
  <GridOverlay />
  {children}
  <Crosshair />
</body>
```

- [ ] **Step 4: Verify in browser**

Run dev server. Move mouse: expect two thin ink lines following cursor. On touch device or narrow viewport with `pointer: coarse` emulation, expect no crosshair.

- [ ] **Step 5: Commit**

```bash
git add components/Crosshair.tsx components/Crosshair.module.css app/layout.tsx
git commit -m "feat: add crosshair cursor for desktop"
```

### Task 1.7: Set up Vitest

**Files:**
- Create: `vitest.config.ts`, `test/setup.ts`
- Modify: `package.json`, `tsconfig.json`

- [ ] **Step 1: Install test deps**

```bash
cd ~/Projects/portfolio && npm install --save-dev vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- [ ] **Step 2: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./test/setup.ts"],
    globals: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
```

- [ ] **Step 3: Create `test/setup.ts`**

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 4: Add test script to `package.json`**

Under `"scripts"`, add: `"test": "vitest run"` and `"test:watch": "vitest"`.

- [ ] **Step 5: Verify Vitest runs**

Run:
```bash
cd ~/Projects/portfolio && npm test
```
Expected: "No test files found" (not an error, just informational).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: set up Vitest with jsdom and Testing Library"
```

---

## Milestone 2: Static composition (all sections render, no interactivity)

Goal at the end of Milestone 2: all eight sections render on the home page with real content, matching the mockup visually. No view toggle, no palette switcher, no motion, no expand-collapse. Everything static.

### Task 2.1: Content data files (experience, metrics, skills, projects, writing)

**Files:**
- Create: `lib/content/experience.ts`, `lib/content/metrics.ts`, `lib/content/skills.ts`, `lib/content/projects.ts`, `lib/content/writing.ts`
- Create: `lib/content/experience.test.ts`, `lib/content/projects.test.ts`

- [ ] **Step 1: Write `lib/content/experience.ts`**

```ts
export type Role = {
  title: string;
  company: string;
  location: string;
  start: string; // e.g. "2026-01" or "2017"
  end: string | "present";
  bullets: string[];
  awards?: string[];
  isCurrent?: boolean;
};

export const experience: Role[] = [
  {
    title: "Manager, Solutions Engineering",
    company: "Confluent",
    location: "Americas · Remote",
    start: "2026-01",
    end: "present",
    isCurrent: true,
    awards: ["Acq SEM of the Year, Americas", "President's Club FY25"],
    bullets: [
      "Own the SE org for New Logo Acquisition and consumption-based growth across the Americas.",
      "Own forecast accuracy, pipeline health, deal inspection, and strategic opportunity reviews.",
      "Coach, mentor, and develop a diverse team of Solutions Engineers.",
      "Partner with VPs, RSDs, and AEs to align technical strategy and accelerate deal progression.",
      "Oversee customer consumption, production adoption, and value realisation for long-term retention.",
      "Closed $1.1M across 15 new logos, 137% quota every quarter with zero missed quarters.",
    ],
  },
  {
    title: "Team Lead, Solutions Engineering",
    company: "Confluent",
    location: "Americas · Remote",
    start: "2024-01",
    end: "2026-02",
    awards: ["Q1 Key Contributor AMER", "Culture Champion Award"],
    bullets: [
      "Led a 12-member pre-sales SE team across Strategic, Enterprise, Mid-Market, and SMB.",
      "Drove $1.2M in new land and expansion revenue in Q4 FY25.",
      "Sponsored the workstream that delivered 15 reusable enablement artifacts across the SE org.",
      "Built a structured onboarding framework adopted across multiple teams, cut time-to-live by 50%.",
      "Achieved 95% team engagement score, highest in the organisation, in Q2 2025.",
      "Led hiring initiatives to scale the team from 15 to 37 members across AMER, EMEA, APAC.",
    ],
  },
  {
    title: "Solutions Engineer",
    company: "Confluent",
    location: "Global",
    start: "2023",
    end: "2024",
    bullets: [
      "Worked across AMER, EMEA, and APAC on Enterprise and Strategic accounts.",
      "Designed scalable streaming solutions on Confluent Platform and Kafka.",
      "Ran customer and partner workshops on streaming architecture, data integration, best practices.",
    ],
  },
  {
    title: "Senior Consultant",
    company: "Deloitte",
    location: "Remote",
    start: "2022",
    end: "2023",
    bullets: [
      "Drove digital adoption strategies, change management, and enablement program design.",
    ],
  },
  {
    title: "Senior Solutions Engineer",
    company: "Whatfix",
    location: "Bangalore",
    start: "2020",
    end: "2022",
    bullets: [
      "Designed and implemented customised digital adoption solutions.",
      "Trained and mentored junior team members.",
      "Managed projects end to end from scoping to go-live.",
    ],
  },
  {
    title: "Technical Support Engineer",
    company: "HP Inc.",
    location: "Bangalore",
    start: "2017",
    end: "2018",
    bullets: ["Where it started."],
  },
];
```

- [ ] **Step 2: Write `lib/content/experience.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { experience } from "./experience";

describe("experience", () => {
  it("has at least one role", () => {
    expect(experience.length).toBeGreaterThan(0);
  });

  it("has exactly one current role", () => {
    const current = experience.filter((r) => r.isCurrent);
    expect(current).toHaveLength(1);
  });

  it("every role has non-empty required fields", () => {
    for (const role of experience) {
      expect(role.title).toBeTruthy();
      expect(role.company).toBeTruthy();
      expect(role.location).toBeTruthy();
      expect(role.start).toBeTruthy();
      expect(role.end).toBeTruthy();
      expect(role.bullets.length).toBeGreaterThan(0);
    }
  });

  it("no user-facing string contains em or en dashes", () => {
    for (const role of experience) {
      const strings = [role.title, role.company, role.location, ...role.bullets, ...(role.awards ?? [])];
      for (const s of strings) {
        expect(s).not.toMatch(/[··]/);
      }
    }
  });
});
```

- [ ] **Step 3: Write `lib/content/metrics.ts`**

```ts
export type Metric = {
  label: string;
  value: string; // may include HTML-ish markers like <em>X</em> to italicise the number
  caption: string;
};

export const metrics: Metric[] = [
  { label: "ARR closed",           value: "<em>$1.1</em>M",  caption: "15 new logos, current role" },
  { label: "Quota, every quarter", value: "<em>137</em>%",   caption: "zero missed since Jan 2026" },
  { label: "Team scaled",          value: "15 to <em>37</em>", caption: "across AMER, EMEA, APAC" },
  { label: "Time-to-live",         value: "−<em>50</em>%", caption: "via onboarding framework" },
];
```

- [ ] **Step 4: Write `lib/content/skills.ts`**

```ts
export type SkillLevel = 1 | 2 | 3 | 4;

export type Skill = {
  name: string;
  detail?: string; // shown as italic subtitle
  level: SkillLevel;
  sme?: boolean;
  note: string;
};

export type SkillCategory = {
  name: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    name: "Streaming and data platforms",
    skills: [
      { name: "Apache Kafka", detail: "brokers, clients, connect", level: 4, sme: true, note: "Daily driver for 3+ years. SME across producer and consumer tuning, exactly-once, tiered storage." },
      { name: "Confluent Cloud and Platform", level: 4, sme: true, note: "RBAC, Schema Registry, Stream Governance, ksqlDB, Tableflow." },
      { name: "Apache Flink", detail: "SQL and DataStream", level: 3, note: "Production POCs. Watermarks, state, exactly-once end to end." },
      { name: "CDC", detail: "Debezium, Golden Gate, Fivetran", level: 3, note: "Delivered 5+ enterprise CDC pipelines. Oracle, Postgres, MySQL sources." },
      { name: "GenAI and LLM integration", detail: "agents, RAG, tool use", level: 4, sme: true, note: "SME workstream sponsor. 15 reusable artifacts shipped across the SE org, reuse-tracked." },
    ],
  },
  {
    name: "Cloud and infra",
    skills: [
      { name: "AWS", detail: "EKS, MSK, IAM, S3", level: 3, note: "Primary cloud for customer deployments. Comfortable in console and Terraform." },
      { name: "Kubernetes", level: 3, note: "Deploying Confluent for K8s, operator patterns, resource tuning." },
      { name: "Docker and Compose", level: 3, note: "Local dev environments, demo stacks, CI test rigs." },
    ],
  },
  {
    name: "Languages and tools",
    skills: [
      { name: "Python", level: 3, note: "POCs, integration scripts, enablement artifacts. Daily use." },
      { name: "TypeScript / JavaScript", level: 3, note: "Full-stack for side projects (Next.js, React Native)." },
      { name: "SQL and Streaming SQL", level: 3, note: "Flink SQL, ksqlDB, Snowflake, Postgres." },
    ],
  },
  {
    name: "Leadership and management",
    skills: [
      { name: "People management", level: 4, sme: true, note: "12-member team, 95% engagement score (highest in org)." },
      { name: "Hiring and onboarding", level: 4, sme: true, note: "Scaled team 15 to 37 across 3 theatres. Onboarding framework cut time-to-live 50%." },
      { name: "Coaching and mentorship", level: 4, sme: true, note: "1:1s, career plans, technical uplift. Two direct reports promoted this year." },
    ],
  },
  {
    name: "Go-to-market",
    skills: [
      { name: "MEDDPICC and forecasting", level: 3, note: "Own pipeline health, deal inspection. Zero missed quarters." },
      { name: "Enterprise demos and POCs", level: 4, sme: true, note: "Delivered 100+ enterprise demos. Still runs the technical POCs personally." },
      { name: "Executive communication", level: 3, note: "Regular business reviews with VPs and CXOs." },
    ],
  },
];
```

- [ ] **Step 5: Write `lib/content/projects.ts`**

```ts
export type Project = {
  slug: "atlas" | "sculptura" | "psych-shorts" | "bbb";
  num: string; // "01"
  title: string; // may include HTML-ish <em>X</em> for italic accent
  description: string;
  status: string;
  url?: string;
  stack: string;
  choices: string[];
};

export const projects: Project[] = [
  {
    slug: "atlas",
    num: "01",
    title: "<em>Atlas</em>",
    description: "Mobile strength and workout tracker. Offline-first. Own your data.",
    status: "Shipped, production",
    stack: "React Native · Expo · TypeScript · SQLite · Reanimated 3",
    choices: [
      "Offline-first, on-device SQLite. No accounts, no backend, no data leaves the phone.",
      "React Native + Expo for one-codebase iOS and Android without the Expo lock-in.",
      "Body-part to exercise to set model. Optimised for how you actually train.",
      "Charts (weight, volume, PRs) deferred to v2. Deliberately shipped the smaller thing first.",
    ],
  },
  {
    slug: "sculptura",
    num: "02",
    title: "<em>Sculptura</em>",
    description: "Custom foam tool insert manufacturer. Real client. Real revenue.",
    status: "Live, dsculptura.in",
    url: "https://dsculptura.in",
    stack: "Next.js 15 · TypeScript · Sanity · Framer Motion · Vercel · Resend",
    choices: [
      "Doubled quote requests within 6 weeks of launch.",
      "Client updates gallery and process copy through Sanity themselves. Zero-touch handoff.",
      "Framer Motion for tactile hover and scroll motion that matches the physicality of the product.",
      "Deployed on Vercel with ISR for gallery revalidation. Zero server maintenance.",
    ],
  },
  {
    slug: "psych-shorts",
    num: "03",
    title: "Psychology Traits <em>Shorts</em>",
    description: "Autonomous YouTube Shorts pipeline for cognitive-bias videos.",
    status: "Autonomous, 28 of 28 tests",
    stack: "TypeScript · Node · FFmpeg · YouTube Data API · GH Actions · OpenAI",
    choices: [
      "Wanted to prove a full content pipeline could be autonomous after 2 hours of setup.",
      "Every step is tested. 28 of 28 green means adding a bias seeds a video without touching code.",
      "Deliberate rate-limiting so the channel does not look like a spam bot.",
      "Stack chosen for portability. Whole thing runs on free GitHub Actions.",
    ],
  },
  {
    slug: "bbb",
    num: "04",
    title: "Bijin Beyond <em>Borders</em>",
    description: "Personal site fusing travels, adrenaline pursuits, and side work. The playground.",
    status: "Live, maintained",
    stack: "Next.js 15 · TypeScript · Framer Motion · Lenis · D3 · Tailwind · CSS Modules",
    choices: [
      "Static Next.js export, zero backend, zero database. Content lives in TypeScript data files.",
      "D3 orthographic globe with hoverable polaroid photo cards on visited cities. Globe freezes on hover.",
      "Per-sport adrenaline pages with intensity-wave canvas, text scramble, idle-glitch effects.",
      "Custom cursor with three context states, PhotoTrail on About page.",
      "OKLCH-only colour system. No hex, no gradient text, no border-radius above 4px on structure.",
    ],
  },
];
```

- [ ] **Step 6: Write `lib/content/projects.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { projects } from "./projects";

describe("projects", () => {
  it("has exactly four v1 projects", () => {
    expect(projects).toHaveLength(4);
  });

  it("each project has required fields", () => {
    for (const p of projects) {
      expect(p.slug).toBeTruthy();
      expect(p.num).toMatch(/^\d{2}$/);
      expect(p.title).toBeTruthy();
      expect(p.description).toBeTruthy();
      expect(p.status).toBeTruthy();
      expect(p.stack).toBeTruthy();
      expect(p.choices.length).toBeGreaterThan(0);
    }
  });

  it("slugs are unique", () => {
    const slugs = new Set(projects.map((p) => p.slug));
    expect(slugs.size).toBe(projects.length);
  });

  it("no user-facing string contains em or en dashes", () => {
    for (const p of projects) {
      const strings = [p.description, p.status, p.stack, ...p.choices];
      for (const s of strings) {
        expect(s).not.toMatch(/[··]/);
      }
    }
  });
});
```

- [ ] **Step 7: Write `lib/content/writing.ts`**

```ts
export type Post = {
  date: string;   // "2026-06-04"
  title: string;  // may include <em>X</em>
  excerpt: string;
  tag: string;
};

export const posts: Post[] = [
  {
    date: "2026-06-04",
    title: "On <em>compression</em> in producer configs",
    excerpt: "Everyone reaches for gzip. lz4 was the right answer more often than I expected, and here is the benchmark that made me stop debating it.",
    tag: "Streaming",
  },
  {
    date: "2026-04-19",
    title: "Hiring SEs who ship, not just <em>slide</em>",
    excerpt: "A rubric I built for interviewing SEs that filters out slide-deck people from architects who can actually build.",
    tag: "Leadership",
  },
  {
    date: "2026-02-11",
    title: "Onboarding that <em>halved</em> our time-to-live",
    excerpt: "The framework we adopted across the SE org, exactly the shape it needed to be, and the two things I would change next time.",
    tag: "Leadership",
  },
  {
    date: "2025-11-28",
    title: "The <em>demo</em> as design artifact",
    excerpt: "A working POC teaches you three things the deck cannot. This is why I still write the code for the demos I lead.",
    tag: "Pre-sales, Craft",
  },
  {
    date: "2025-09-02",
    title: "Building an <em>artifact</em> library that people actually use",
    excerpt: "The 15-artifact enablement library I sponsored, why the reuse rate mattered more than the total count, and what killed the ones that failed.",
    tag: "Enablement, SME",
  },
];
```

- [ ] **Step 8: Run tests**

```bash
cd ~/Projects/portfolio && npm test
```
Expected: all tests green.

- [ ] **Step 9: Commit**

```bash
git add lib/content/
git commit -m "feat: add content data files for experience, metrics, skills, projects, writing"
```

### Task 2.2: Nav skeleton

**Files:**
- Create: `components/Nav.tsx`, `components/Nav.module.css`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/Nav.module.css`**

```css
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 22px 40px;
  background: linear-gradient(180deg, var(--paper) 60%, transparent 100%);
  border-bottom: 1px solid var(--hair);
}
.logo {
  font-family: var(--font-fraunces);
  font-size: 22px;
  font-weight: 500;
  letter-spacing: -0.01em;
}
.logo em {
  font-style: italic;
  color: var(--accent);
  font-weight: 400;
}
.mid {
  display: flex;
  align-items: center;
  gap: 32px;
}
.menu {
  list-style: none;
  display: flex;
  gap: 28px;
  padding: 0;
  margin: 0;
}
.menu li a {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--dim);
  position: relative;
  padding-bottom: 3px;
  transition: color 0.3s ease;
}
.menu li a::before {
  content: "· ";
  color: var(--hair);
}
.menu li a:hover {
  color: var(--ink);
}
```

- [ ] **Step 2: Create `components/Nav.tsx`**

```tsx
import styles from "./Nav.module.css";

export function Nav() {
  return (
    <nav className={styles.nav} aria-label="Primary">
      <a href="#" className={styles.logo}>
        Bijin <em>Abraham</em>
      </a>
      <div className={styles.mid}>
        <ul className={styles.menu}>
          <li><a href="#work">Work</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#writing">Writing</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}
```

- [ ] **Step 3: Render in `app/page.tsx`**

```tsx
import { Nav } from "@/components/Nav";

export default function Home() {
  return (
    <main>
      <Nav />
      <div style={{ minHeight: "200vh" }} />
    </main>
  );
}
```

The tall placeholder div gives scroll room so the fixed nav is visible without a section behind it.

- [ ] **Step 4: Verify against mockup**

Run dev server. Open http://localhost:3000. Compare nav to `mockups/blueprint-v2.html` nav (open both side by side). Expected: matches logo, menu items, dimensions, border.

- [ ] **Step 5: Commit**

```bash
git add components/Nav.tsx components/Nav.module.css app/page.tsx
git commit -m "feat: add Nav skeleton (no toggle or palette switcher yet)"
```

### Task 2.3: Hero (elevation content only, static, no portrait yet)

**Files:**
- Create: `components/Hero.tsx`, `components/Hero.module.css`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/Hero.module.css`**

```css
.hero {
  min-height: 100vh;
  padding: 130px 40px 80px;
  position: relative;
  z-index: 3;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}
@media (max-width: 900px) {
  .hero {
    grid-template-columns: 1fr;
    padding-top: 180px;
  }
}
.stamp {
  position: absolute;
  top: 120px;
  right: 40px;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.2em;
  color: var(--dim);
  text-transform: uppercase;
  text-align: right;
  line-height: 1.75;
}
.stamp .k { color: var(--dim); margin-right: 8px; }
.stamp .v { color: var(--ink); }
.stamp .sec { padding-top: 6px; border-top: 1px solid var(--hair-2); margin-top: 6px; }
.left { position: relative; }
.eyebrow {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.2em;
  color: var(--dim);
  text-transform: uppercase;
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  gap: 14px;
}
.eyebrow .hair { flex: none; width: 38px; height: 1px; background: var(--ink); }
.display {
  font-family: var(--font-fraunces);
  font-weight: 400;
  font-size: clamp(56px, 9vw, 138px);
  line-height: 1;
  letter-spacing: -0.03em;
  color: var(--ink);
  position: relative;
}
.display .word { display: block; overflow: hidden; padding: 0.04em 0 0.14em 0; margin: 0 0 -0.14em 0; }
.display em { font-style: italic; color: var(--accent); font-weight: 400; }
.display .underline { display: block; width: 220px; height: 2px; background: var(--ink); margin-top: 14px; }
.roleLine {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.12em;
  color: var(--dim);
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 32px;
}
.roleLine .arrow { color: var(--accent); }
.body {
  font-family: var(--font-fraunces);
  font-weight: 300;
  font-size: 19px;
  line-height: 1.55;
  color: var(--ink-2);
  margin-top: 18px;
  max-width: 520px;
}
.body em { font-style: italic; color: var(--accent); }
.cta { margin-top: 28px; display: flex; gap: 16px; }
.btn {
  font-family: var(--font-mono);
  font-size: 11.5px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 15px 22px;
  color: var(--paper);
  background: var(--ink);
  border: 1px solid var(--ink);
  display: inline-flex;
  gap: 14px;
  cursor: pointer;
  align-items: center;
  transition: all 0.3s ease;
  text-decoration: none;
}
.btn:hover { background: var(--accent); border-color: var(--accent); }
.btn.ghost { background: transparent; color: var(--ink); }
.btn.ghost:hover { background: var(--ink); color: var(--paper); }
.right {
  position: relative;
  height: 78vh;
  min-height: 600px;
}
```

- [ ] **Step 2: Create `components/Hero.tsx`**

```tsx
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.stamp}>
        <div><span className="k">Doc №</span><span className="v">CV-2026-BA</span></div>
        <div><span className="k">Rev.</span><span className="v">1.4</span></div>
        <div><span className="k">View</span><span className="v">Elevation</span></div>
        <div className="sec"><span className="k">Drawn by</span><span className="v">Self</span></div>
      </div>

      <div className={styles.left}>
        <div className={styles.eyebrow}>
          <span className="hair" />Fig. 01 · Portrait, elevation
        </div>
        <h1 className={styles.display}>
          <span className="word"><span>Bijin</span></span>
          <span className="word"><span><em>Abraham</em></span></span>
          <span className="underline" />
        </h1>
        <div className={styles.roleLine}>
          <span className="arrow">▸</span>
          Manager · Solutions Engineering · Confluent · AMER
        </div>
        <p className={styles.body}>
          7+ years drawing streaming systems for the world&rsquo;s largest data flows, currently leading the Solutions Engineering team for <em>New Logo Acquisition</em> across the Americas. People and pipeline, owned end to end.
        </p>
        <div className={styles.cta}>
          <a href="#work" className={styles.btn}>See the trajectory →</a>
          <a href="#contact" className={`${styles.btn} ${styles.ghost}`}>Hire me to lead →</a>
        </div>
      </div>

      <div className={styles.right}>
        {/* PortraitSVG goes here in Task 2.4 */}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Render Hero in `app/page.tsx`**

Replace the placeholder div:

```tsx
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
    </main>
  );
}
```

- [ ] **Step 4: Verify against mockup**

Run dev server. Compare Hero to `mockups/blueprint-v2.html` in Elevation mode. Expect: same eyebrow, display name (Bijin Abraham with italic accent), underline, role line, body copy, two CTA buttons, top-right doc stamp. Right column is empty for now.

- [ ] **Step 5: Commit**

```bash
git add components/Hero.tsx components/Hero.module.css app/page.tsx
git commit -m "feat: add Hero with static Elevation content and doc stamp"
```

### Task 2.4: Portrait SVG diagram

**Files:**
- Create: `components/hero/PortraitSVG.tsx`
- Modify: `components/Hero.tsx`

- [ ] **Step 1: Create `components/hero/PortraitSVG.tsx`**

Port the SVG structure from the mockup (`mockups/blueprint-v2.html` lines around 500 to 580). For now, only render the Elevation-mode callouts. Section-mode callouts wired in Task 3.4.

```tsx
type Mode = "elevation" | "section";

export function PortraitSVG({ mode = "elevation" }: { mode?: Mode }) {
  return (
    <svg viewBox="0 0 600 600" preserveAspectRatio="xMidYMid meet" style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
      {/* Corner marks */}
      <path d="M20 20 L60 20 M20 20 L20 60" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
      <path d="M580 20 L540 20 M580 20 L580 60" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
      <path d="M20 580 L60 580 M20 580 L20 540" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
      <path d="M580 580 L540 580 M580 580 L580 540" fill="none" stroke="var(--ink)" strokeWidth="1.5" />

      {/* Portrait outline */}
      <g transform="translate(300 320)">
        <path d="M-160 180 L-100 20 L100 20 L160 180" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
        <path d="M-30 20 L-30 -30 L30 -30 L30 20" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
        <circle cx="0" cy="-120" r="90" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
        <line x1="-90" y1="-120" x2="90" y2="-120" stroke="var(--hair)" strokeWidth="1" strokeDasharray="2 3" />
        <line x1="0" y1="-210" x2="0" y2="180" stroke="var(--hair)" strokeWidth="1" strokeDasharray="2 3" />
      </g>

      {/* Shared dimension line */}
      <g>
        <line x1="60" y1="130" x2="180" y2="130" stroke="var(--dim)" strokeWidth="1" />
        <line x1="60" y1="125" x2="60" y2="135" stroke="var(--dim)" />
        <line x1="180" y1="125" x2="180" y2="135" stroke="var(--dim)" />
        <text x="120" y="122" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.12em" textTransform="uppercase" fill="var(--dim)">
          7+ YR <tspan fill="var(--ink)" fontWeight="500">EXPERIENCE</tspan>
        </text>
      </g>

      {/* ELEVATION callouts */}
      {mode === "elevation" && (
        <g>
          <g>
            <line x1="420" y1="200" x2="540" y2="200" stroke="var(--dim)" strokeWidth="1" />
            <line x1="420" y1="195" x2="420" y2="205" stroke="var(--dim)" />
            <line x1="540" y1="195" x2="540" y2="205" stroke="var(--dim)" />
            <text x="480" y="192" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.12em" textTransform="uppercase" fill="var(--dim)">
              137% <tspan fill="var(--ink)" fontWeight="500">QUOTA</tspan>
            </text>
          </g>
          <g>
            <line x1="300" y1="200" x2="470" y2="120" stroke="var(--accent)" strokeWidth="1" />
            <circle cx="300" cy="200" r="3" fill="var(--accent)" />
            <text x="478" y="112" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.12em" textTransform="uppercase" fill="var(--dim)">SE Manager, AMER</text>
            <text x="478" y="134" fontFamily="var(--font-fraunces)" fontSize="14" fontStyle="italic" fill="var(--ink-2)">37 SEs · 3 theatres</text>
          </g>
          <g>
            <path d="M 210 260 L 75 260 L 75 232" fill="none" stroke="var(--ink)" strokeWidth="1" />
            <circle cx="210" cy="260" r="3" fill="var(--ink)" />
            <text x="80" y="230" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.12em" textTransform="uppercase" fill="var(--dim)">People + pipeline</text>
            <text x="80" y="252" fontFamily="var(--font-fraunces)" fontSize="14" fontStyle="italic" fill="var(--ink-2)">hires, forecasts, coach</text>
          </g>
          <g>
            <line x1="360" y1="300" x2="510" y2="360" stroke="var(--ink)" strokeWidth="1" />
            <circle cx="360" cy="300" r="3" fill="var(--ink)" />
            <text x="518" y="352" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.12em" textTransform="uppercase" fill="var(--dim)">$1.1M closed</text>
            <text x="518" y="374" fontFamily="var(--font-fraunces)" fontSize="14" fontStyle="italic" fill="var(--ink-2)">15 new logos</text>
          </g>
        </g>
      )}

      {/* Title block bottom right */}
      <g>
        <line x1="360" y1="530" x2="580" y2="530" stroke="var(--ink)" strokeWidth="1" />
        <line x1="360" y1="560" x2="580" y2="560" stroke="var(--ink)" strokeWidth="1" />
        <line x1="360" y1="530" x2="360" y2="560" stroke="var(--ink)" />
        <line x1="470" y1="530" x2="470" y2="560" stroke="var(--ink)" />
        <line x1="580" y1="530" x2="580" y2="560" stroke="var(--ink)" />
        <text x="370" y="548" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.12em" textTransform="uppercase" fill="var(--dim)">View</text>
        <text x="410" y="548" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.12em" textTransform="uppercase" fontWeight="500" fill="var(--ink)">
          {mode === "elevation" ? "Elev." : "Sect."}
        </text>
        <text x="480" y="548" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.12em" textTransform="uppercase" fill="var(--dim)">Sheet</text>
        <text x="520" y="548" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.12em" textTransform="uppercase" fontWeight="500" fill="var(--ink)">01/07</text>
      </g>
    </svg>
  );
}
```

- [ ] **Step 2: Render `PortraitSVG` in Hero right column**

Update `components/Hero.tsx`:

```tsx
import { PortraitSVG } from "./hero/PortraitSVG";
```

Replace the placeholder comment in the right column:

```tsx
<div className={styles.right}>
  <PortraitSVG mode="elevation" />
</div>
```

- [ ] **Step 3: Verify against mockup**

Compare portrait diagram to mockup Elevation mode. Expect: head, shoulders, neck, corner marks, four callouts (dimension, SE Manager, People + pipeline via L-bend, $1.1M closed), title block.

- [ ] **Step 4: Commit**

```bash
git add components/hero/PortraitSVG.tsx components/Hero.tsx
git commit -m "feat: add Portrait SVG with Elevation callouts"
```

### Task 2.5: Career trajectory

**Files:**
- Create: `components/Career.tsx`, `components/Career.module.css`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/Career.module.css`**

```css
.section {
  position: relative;
  z-index: 3;
  padding: 110px 40px;
  border-top: 1px solid var(--hair);
}
.head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 60px;
  gap: 40px;
}
.head h2 {
  font-family: var(--font-fraunces);
  font-weight: 400;
  font-size: clamp(36px, 5vw, 68px);
  letter-spacing: -0.02em;
  line-height: 1.05;
  max-width: 800px;
}
.head h2 em { font-style: italic; color: var(--accent); font-weight: 400; }
.head .meta {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--dim);
  text-align: right;
  flex: none;
}
.wrap { max-width: 1200px; margin: 0 auto; position: relative; }
.svg { width: 100%; height: 560px; }
.legend {
  display: flex;
  gap: 32px;
  justify-content: center;
  margin-top: 36px;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  color: var(--dim);
  text-transform: uppercase;
}
.legend .lg { display: inline-flex; align-items: center; gap: 10px; }
.legend .sw { width: 22px; height: 2px; }
.legend .sw.p { background: var(--accent); }
.legend .sw.t {
  background: var(--signal);
  background-image: linear-gradient(90deg, var(--signal) 60%, transparent 60%);
  background-size: 8px 100%;
}
```

- [ ] **Step 2: Create `components/Career.tsx`**

Port the trajectory SVG from the mockup (career section). Include the leadership span, Team Lead accent styling, right-side "Technical Depth" callout.

```tsx
import styles from "./Career.module.css";

export function Career() {
  return (
    <section className={styles.section} id="work">
      <div className={styles.head}>
        <h2>The <em>trajectory</em>, drawn on two axes.</h2>
        <div className={styles.meta}>Fig. 02 · Timeline<br />1cm = 1yr</div>
      </div>
      <div className={styles.wrap}>
        <svg viewBox="0 -40 1200 600" preserveAspectRatio="none" className={styles.svg}>
          {/* baseline */}
          <line x1="80" y1="480" x2="1120" y2="480" stroke="var(--hair)" />
          {/* year ticks */}
          {[{ x: 120, y: 2017 }, { x: 290, y: 2020 }, { x: 470, y: 2022 }, { x: 620, y: 2023 }, { x: 810, y: 2024 }, { x: 1020, y: 2026 }].map((t) => (
            <g key={t.y}>
              <line x1={t.x} y1="475" x2={t.x} y2="485" stroke="var(--dim)" />
              <text x={t.x} y="506" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10.5" letterSpacing="0.12em" fill="var(--dim)" textTransform="uppercase">{t.y}</text>
            </g>
          ))}

          {/* Tech track (dashed teal) */}
          <path fill="none" stroke="var(--signal)" strokeWidth="1.5" strokeDasharray="6 4"
            d="M120 430 C 200 420, 260 380, 290 350 C 340 320, 420 300, 470 270 C 520 250, 590 220, 620 180 C 680 160, 740 130, 810 110 C 880 105, 960 105, 1020 105" />

          {/* People/leadership track (solid rust) */}
          <path fill="none" stroke="var(--accent)" strokeWidth="2"
            d="M290 450 C 350 440, 420 435, 470 420 C 540 400, 590 370, 620 320 C 680 260, 740 180, 810 130 C 870 80, 960 50, 1020 40" />

          {/* Nodes */}
          <g>
            <circle cx="120" cy="430" r="6" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5" />
            <text x="105" y="410" textAnchor="end" fontFamily="var(--font-fraunces)" fontSize="18" fontWeight="500" fill="var(--ink)">HP Inc.</text>
            <text x="105" y="392" textAnchor="end" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.1em" fill="var(--dim)">Tech Support</text>
          </g>
          <g>
            <circle cx="290" cy="350" r="6" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5" />
            <text x="305" y="332" fontFamily="var(--font-fraunces)" fontSize="18" fontWeight="500" fill="var(--ink)">Whatfix</text>
            <text x="305" y="316" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.1em" fill="var(--dim)">Senior SE</text>
          </g>
          <g>
            <circle cx="470" cy="270" r="6" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5" />
            <text x="485" y="252" fontFamily="var(--font-fraunces)" fontSize="18" fontWeight="500" fill="var(--ink)">Deloitte</text>
            <text x="485" y="236" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.1em" fill="var(--dim)">Senior Consultant</text>
          </g>
          <g>
            <circle cx="620" cy="180" r="6" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5" />
            <text x="635" y="162" fontFamily="var(--font-fraunces)" fontSize="18" fontWeight="500" fill="var(--ink)">Confluent</text>
            <text x="635" y="146" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.1em" fill="var(--dim)">SE, Global</text>
          </g>
          <g>
            <circle cx="810" cy="110" r="8" fill="var(--paper)" stroke="var(--accent)" strokeWidth="2" />
            <text x="825" y="90" fontFamily="var(--font-fraunces)" fontSize="18" fontWeight="500" fill="var(--accent)">Team Lead, SE</text>
            <text x="825" y="74" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.1em" fill="var(--dim)">Confluent AMER</text>
          </g>
          <g>
            <circle cx="1020" cy="40" r="9" fill="var(--accent)" stroke="var(--accent)" strokeWidth="1.5" />
            <text x="1035" y="22" fontFamily="var(--font-fraunces)" fontSize="18" fontWeight="500" fill="var(--accent)">Manager, SE</text>
            <text x="1035" y="6" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.1em" fill="var(--dim)">Confluent AMER · Current</text>
          </g>

          {/* Y axis annotations */}
          <line x1="80" y1="40" x2="80" y2="480" stroke="var(--hair)" strokeDasharray="2 3" />
          <text x="66" y="45" textAnchor="end" fontFamily="var(--font-mono)" fontSize="10.5" letterSpacing="0.12em" fill="var(--dim)">EXPERT</text>
          <text x="66" y="215" textAnchor="end" fontFamily="var(--font-mono)" fontSize="10.5" letterSpacing="0.12em" fill="var(--dim)">SR IC</text>
          <text x="66" y="345" textAnchor="end" fontFamily="var(--font-mono)" fontSize="10.5" letterSpacing="0.12em" fill="var(--dim)">MID</text>
          <text x="66" y="470" textAnchor="end" fontFamily="var(--font-mono)" fontSize="10.5" letterSpacing="0.12em" fill="var(--dim)">JUNIOR</text>

          {/* Leadership span (Team Lead to Manager) */}
          <line x1="810" y1="-22" x2="1020" y2="-22" stroke="var(--accent)" strokeWidth="2" />
          <line x1="810" y1="-26" x2="810" y2="-18" stroke="var(--accent)" strokeWidth="1.5" />
          <line x1="1020" y1="-26" x2="1020" y2="-18" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="915" y="-30" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10.5" letterSpacing="0.12em" fill="var(--accent)">People Leadership Scope</text>

          {/* Tech track callout */}
          <text x="1035" y="105" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.1em" fill="var(--signal)">Technical Depth</text>
          <text x="1035" y="120" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.1em" fill="var(--signal)">Still Rising · SME</text>
        </svg>
        <div className={styles.legend}>
          <span className="lg"><span className="sw p" />People and leadership scope</span>
          <span className="lg"><span className="sw t" />Technical depth and IC craft</span>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Render in `app/page.tsx`**

```tsx
import { Career } from "@/components/Career";
```

Add after `<Hero />`:

```tsx
<Career />
```

- [ ] **Step 4: Verify against mockup**

Compare Career section side by side with mockup. Expect: both tracks visible, six nodes, Team Lead accent-ringed, Manager filled accent, leadership span bracket at top, Y-axis labels, legend below.

- [ ] **Step 5: Commit**

```bash
git add components/Career.tsx components/Career.module.css app/page.tsx
git commit -m "feat: add Career trajectory with dual tracks and leadership span"
```

### Task 2.6: Metrics grid

**Files:**
- Create: `components/Metrics.tsx`, `components/Metrics.module.css`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/Metrics.module.css`**

```css
.section {
  padding: 80px 40px 100px;
  border-top: 1px solid var(--hair);
  position: relative;
  z-index: 3;
}
.head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 60px;
  gap: 40px;
}
.head h2 {
  font-family: var(--font-fraunces);
  font-weight: 400;
  font-size: clamp(36px, 5vw, 68px);
  letter-spacing: -0.02em;
}
.head h2 em { font-style: italic; color: var(--accent); font-weight: 400; }
.head .meta {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--dim);
}
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: var(--hair);
  border: 1px solid var(--hair);
}
@media (max-width: 900px) {
  .grid { grid-template-columns: 1fr 1fr; }
}
.cell {
  background: var(--paper);
  padding: 36px 26px;
  position: relative;
}
.cell::before {
  content: "";
  position: absolute;
  top: 12px;
  right: 14px;
  width: 12px;
  height: 12px;
  border-top: 1px solid var(--dim);
  border-right: 1px solid var(--dim);
}
.cell .k {
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.15em;
  color: var(--dim);
  text-transform: uppercase;
  margin-bottom: 16px;
}
.cell .v {
  font-family: var(--font-fraunces);
  font-size: 56px;
  font-weight: 400;
  letter-spacing: -0.02em;
  line-height: 0.95;
  color: var(--ink);
}
.cell .v em { font-style: italic; color: var(--accent); font-weight: 400; margin-right: 0.08em; }
.cell .n {
  font-family: var(--font-fraunces);
  font-style: italic;
  font-size: 13px;
  color: var(--dim);
  margin-top: 14px;
}
```

- [ ] **Step 2: Create `components/Metrics.tsx`**

```tsx
import { metrics } from "@/lib/content/metrics";
import styles from "./Metrics.module.css";

export function Metrics() {
  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <h2>By the <em>numbers</em>.</h2>
        <div className={styles.meta}>Fig. 03 · Dimensions</div>
      </div>
      <div className={styles.grid}>
        {metrics.map((m) => (
          <div className={styles.cell} key={m.label}>
            <div className="k">{m.label}</div>
            <div className="v" dangerouslySetInnerHTML={{ __html: m.value }} />
            <div className="n">{m.caption}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

`dangerouslySetInnerHTML` here is safe: `metrics.ts` is content we control and it only contains `<em>` italic wrappers.

- [ ] **Step 3: Render in `app/page.tsx`**

```tsx
import { Metrics } from "@/components/Metrics";
```

Add after `<Career />`:

```tsx
<Metrics />
```

- [ ] **Step 4: Verify against mockup**

Expect 4-cell grid, each with mono label, big italic-accent number, italic Fraunces caption, small corner mark top-right.

- [ ] **Step 5: Commit**

```bash
git add components/Metrics.tsx components/Metrics.module.css app/page.tsx
git commit -m "feat: add Metrics grid"
```

### Task 2.7: Skills matrix

**Files:**
- Create: `components/Skills.tsx`, `components/Skills.module.css`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/Skills.module.css`**

Port the `.matrix` styles from the mockup. Full CSS:

```css
.section {
  padding: 120px 40px;
  border-top: 1px solid var(--hair);
  position: relative;
  z-index: 3;
}
.head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 60px;
  gap: 40px;
}
.head h2 {
  font-family: var(--font-fraunces);
  font-weight: 400;
  font-size: clamp(36px, 5vw, 68px);
  letter-spacing: -0.02em;
}
.head h2 em { font-style: italic; color: var(--accent); font-weight: 400; }
.head .meta {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--dim);
}
.matrix { max-width: 1200px; margin: 0 auto; }
.matrix table { width: 100%; border-collapse: collapse; }
.matrix caption {
  text-align: left;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.15em;
  color: var(--dim);
  text-transform: uppercase;
  margin-bottom: 14px;
}
.matrix thead th {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--dim);
  text-align: left;
  padding: 10px 12px;
  border-bottom: 1.5px solid var(--ink);
  font-weight: 400;
}
.matrix thead th.level { text-align: center; width: 60px; }
.matrix thead th.notes { text-align: left; width: 280px; }
.matrix tbody tr { border-bottom: 1px solid var(--hair-2); }
.matrix tbody tr:hover { background: rgba(255, 240, 220, 0.4); }
.matrix tbody td { padding: 14px 12px; vertical-align: middle; }
.matrix .cat {
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent);
  font-weight: 500;
  padding-top: 26px;
}
.matrix .skill {
  font-family: var(--font-fraunces);
  font-size: 17px;
  font-weight: 400;
  color: var(--ink);
}
.matrix .skill em { font-style: italic; color: var(--dim); font-size: 12px; margin-left: 8px; }
.matrix .cell { text-align: center; position: relative; }
.matrix .box {
  width: 22px;
  height: 22px;
  margin: 0 auto;
  border: 1.2px solid var(--ink);
  background: var(--paper);
}
.matrix .filled { background: var(--ink); }
.matrix .accent { background: var(--accent); border-color: var(--accent); }
.matrix .note {
  font-family: var(--font-fraunces);
  font-style: italic;
  font-size: 13.5px;
  color: var(--dim);
}
.matrix .key {
  display: flex;
  gap: 22px;
  justify-content: flex-end;
  margin-top: 22px;
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--dim);
}
.matrix .key .k { display: inline-flex; gap: 8px; align-items: center; }
.matrix .key .sw { width: 14px; height: 14px; border: 1px solid var(--ink); }
.matrix .key .sw.f { background: var(--ink); }
.matrix .key .sw.a { background: var(--accent); border-color: var(--accent); }
```

- [ ] **Step 2: Create `components/Skills.tsx`**

```tsx
import { skillCategories, SkillLevel } from "@/lib/content/skills";
import styles from "./Skills.module.css";

function Box({ filled, sme }: { filled: boolean; sme?: boolean }) {
  let cls = styles.box;
  if (filled && sme) cls = `${cls} ${styles.accent}`;
  else if (filled) cls = `${cls} ${styles.filled}`;
  return <div className={cls} />;
}

export function Skills() {
  const levels: SkillLevel[] = [1, 2, 3, 4];
  return (
    <section className={styles.section} id="skills">
      <div className={styles.head}>
        <h2><em>Material</em> specifications.</h2>
        <div className={styles.meta}>Fig. 04 · Skill depth matrix</div>
      </div>
      <div className={styles.matrix}>
        <table>
          <caption>L1 exposure · L2 working · L3 production · L4 SME / coach</caption>
          <thead>
            <tr>
              <th style={{ width: 280 }}>Skill</th>
              <th className="level">L1</th>
              <th className="level">L2</th>
              <th className="level">L3</th>
              <th className="level">L4</th>
              <th className="notes">Notes</th>
            </tr>
          </thead>
          <tbody>
            {skillCategories.map((cat) => (
              <>
                <tr key={`cat-${cat.name}`}>
                  <td className="cat" colSpan={6}>{cat.name}</td>
                </tr>
                {cat.skills.map((s) => (
                  <tr key={s.name}>
                    <td className="skill">
                      {s.name}{s.detail && <em>({s.detail})</em>}
                    </td>
                    {levels.map((lv) => (
                      <td key={lv} className="cell">
                        <Box filled={s.level >= lv} sme={s.sme && s.level >= lv && lv === 4} />
                      </td>
                    ))}
                    <td className="note">{s.note}</td>
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
        <div className="key">
          <span className="k"><span className="sw" /> empty · not yet</span>
          <span className="k"><span className="sw f" /> filled · at this level</span>
          <span className="k"><span className="sw a" /> highlighted · SME</span>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Render in `app/page.tsx`**

```tsx
import { Skills } from "@/components/Skills";
```

Add after `<Metrics />`:

```tsx
<Skills />
```

- [ ] **Step 4: Verify against mockup**

Expect a table with category header rows in accent uppercase mono, skill rows with 4 filled/empty boxes, SME rows highlighted in accent color, notes column with italic Fraunces.

- [ ] **Step 5: Commit**

```bash
git add components/Skills.tsx components/Skills.module.css app/page.tsx
git commit -m "feat: add Skills matrix"
```

### Task 2.8: Projects list (no detail expansion yet)

**Files:**
- Create: `components/Projects.tsx`, `components/Projects.module.css`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/Projects.module.css`**

```css
.section {
  padding: 120px 40px;
  border-top: 1px solid var(--hair);
  background: var(--paper-2);
  position: relative;
  z-index: 3;
}
.head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 60px;
  gap: 40px;
}
.head h2 {
  font-family: var(--font-fraunces);
  font-weight: 400;
  font-size: clamp(36px, 5vw, 68px);
  letter-spacing: -0.02em;
}
.head h2 em { font-style: italic; color: var(--accent); font-weight: 400; }
.head .meta {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--dim);
}
.list { max-width: 1400px; margin: 0 auto; display: flex; flex-direction: column; gap: 20px; }
.card {
  background: var(--paper);
  border: 1px solid var(--hair);
  position: relative;
  overflow: hidden;
}
.card .headRow {
  display: grid;
  grid-template-columns: 180px 1fr 260px 130px;
  gap: 32px;
  align-items: center;
  padding: 28px 32px;
  cursor: pointer;
  transition: background 0.3s ease;
}
.card .headRow:hover { background: rgba(255, 240, 220, 0.35); }
.card .num {
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.2em;
  color: var(--dim);
  text-transform: uppercase;
}
.card h3 {
  font-family: var(--font-fraunces);
  font-weight: 500;
  font-size: 34px;
  letter-spacing: -0.01em;
  margin: 0;
}
.card h3 em { font-style: italic; color: var(--accent); font-weight: 400; }
.card p {
  font-family: var(--font-fraunces);
  font-weight: 300;
  font-size: 15px;
  line-height: 1.5;
  color: var(--ink-2);
  margin: 0;
}
.card .status {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.15em;
  color: var(--accent);
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.card .status::before {
  content: "";
  width: 6px;
  height: 6px;
  background: var(--accent);
  border-radius: 50%;
}
.card .expand {
  justify-self: end;
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.15em;
  color: var(--dim);
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 8px;
}
@media (max-width: 900px) {
  .card .headRow { grid-template-columns: 1fr; gap: 12px; }
}
```

- [ ] **Step 2: Create `components/Projects.tsx`** (list only, no expand yet)

```tsx
import { projects } from "@/lib/content/projects";
import styles from "./Projects.module.css";

export function Projects() {
  return (
    <section className={styles.section} id="projects">
      <div className={styles.head}>
        <h2>Nights and <em>weekends</em>.</h2>
        <div className={styles.meta}>Fig. 05 · Side work<br />click a row for detail drawing</div>
      </div>
      <div className={styles.list}>
        {projects.map((p) => (
          <article className={styles.card} key={p.slug}>
            <div className={styles.headRow}>
              <div className={styles.num}>Proj. {p.num}</div>
              <div>
                <h3 dangerouslySetInnerHTML={{ __html: p.title }} />
                <p>{p.description}</p>
              </div>
              <div className={styles.status}>{p.status}</div>
              <div className={styles.expand}>Detail <span>▾</span></div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Render in `app/page.tsx`**

```tsx
import { Projects } from "@/components/Projects";
```

Add after `<Skills />`:

```tsx
<Projects />
```

- [ ] **Step 4: Verify against mockup**

Expect four project cards on paper-2 background, each with number, title with italic accent, description, live-pill status, expand chevron. Clicking does nothing yet.

- [ ] **Step 5: Commit**

```bash
git add components/Projects.tsx components/Projects.module.css app/page.tsx
git commit -m "feat: add Projects list (no expand yet)"
```

### Task 2.9: Writing list

**Files:**
- Create: `components/Writing.tsx`, `components/Writing.module.css`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/Writing.module.css`**

```css
.section {
  padding: 120px 40px;
  border-top: 1px solid var(--hair);
  position: relative;
  z-index: 3;
}
.head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 60px;
  gap: 40px;
}
.head h2 {
  font-family: var(--font-fraunces);
  font-weight: 400;
  font-size: clamp(36px, 5vw, 68px);
  letter-spacing: -0.02em;
}
.head h2 em { font-style: italic; color: var(--accent); font-weight: 400; }
.head .meta {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--dim);
}
.list { max-width: 1000px; margin: 0 auto; }
.post {
  display: grid;
  grid-template-columns: 120px 1fr 200px;
  align-items: baseline;
  gap: 36px;
  padding: 28px 0;
  border-top: 1px solid var(--hair-2);
  cursor: pointer;
  transition: padding-left 0.35s ease;
}
.post:last-child { border-bottom: 1px solid var(--hair-2); }
.post:hover { padding-left: 18px; }
.post .date {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.12em;
  color: var(--dim);
  text-transform: uppercase;
}
.post h3 {
  font-family: var(--font-fraunces);
  font-weight: 400;
  font-size: 26px;
  letter-spacing: -0.01em;
  line-height: 1.2;
  margin-bottom: 6px;
}
.post h3 em { font-style: italic; color: var(--accent); }
.post .excerpt {
  font-family: var(--font-fraunces);
  font-weight: 300;
  font-style: italic;
  font-size: 14px;
  color: var(--dim);
}
.post .tag {
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.12em;
  color: var(--accent);
  text-transform: uppercase;
  text-align: right;
}
```

- [ ] **Step 2: Create `components/Writing.tsx`**

```tsx
import { posts } from "@/lib/content/writing";
import styles from "./Writing.module.css";

export function Writing() {
  return (
    <section className={styles.section} id="writing">
      <div className={styles.head}>
        <h2>Notes on <em>practice</em>.</h2>
        <div className={styles.meta}>Fig. 06 · Writing<br />occasional, opinionated</div>
      </div>
      <div className={styles.list}>
        {posts.map((p) => (
          <div className={styles.post} key={p.title}>
            <div className="date">{p.date}</div>
            <div>
              <h3 dangerouslySetInnerHTML={{ __html: p.title }} />
              <div className="excerpt">{p.excerpt}</div>
            </div>
            <div className="tag">{p.tag}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Render in `app/page.tsx`**

```tsx
import { Writing } from "@/components/Writing";
```

Add after `<Projects />`:

```tsx
<Writing />
```

- [ ] **Step 4: Verify against mockup**

Expect list of five posts with date (mono), title + italic-dim excerpt, right-aligned accent tag. Hover indents the row.

- [ ] **Step 5: Commit**

```bash
git add components/Writing.tsx components/Writing.module.css app/page.tsx
git commit -m "feat: add Writing post index"
```

### Task 2.10: Contact title block

**Files:**
- Create: `components/Contact.tsx`, `components/Contact.module.css`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/Contact.module.css`**

```css
.section {
  padding: 120px 40px;
  border-top: 1px solid var(--hair);
  background: var(--paper-2);
  position: relative;
  z-index: 3;
}
.head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 60px;
  gap: 40px;
}
.head h2 {
  font-family: var(--font-fraunces);
  font-weight: 400;
  font-size: clamp(36px, 5vw, 68px);
  letter-spacing: -0.02em;
}
.head h2 em { font-style: italic; color: var(--accent); font-weight: 400; }
.head .meta {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--dim);
}
.block {
  max-width: 1200px;
  margin: 0 auto;
  border: 2px solid var(--ink);
  background: var(--paper);
}
.tbhd {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 26px 32px;
  border-bottom: 2px solid var(--ink);
  align-items: end;
}
.tbhd .name {
  font-family: var(--font-fraunces);
  font-weight: 500;
  font-size: 64px;
  letter-spacing: -0.02em;
  line-height: 0.95;
}
.tbhd .name em { font-style: italic; color: var(--accent); }
.tbhd .meta2 {
  text-align: right;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.15em;
  color: var(--dim);
  text-transform: uppercase;
  line-height: 1.9;
}
.tbhd .meta2 .v { color: var(--ink); }
.tbbody { display: grid; grid-template-columns: 1fr 1fr 1fr; }
.cell {
  padding: 24px 32px;
  border-right: 1px solid var(--ink);
}
.cell:last-child { border-right: none; }
.cell .k {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.2em;
  color: var(--dim);
  text-transform: uppercase;
  margin-bottom: 10px;
}
.cell .v {
  font-family: var(--font-fraunces);
  font-size: 20px;
  font-weight: 400;
  line-height: 1.35;
}
.cell .v a {
  border-bottom: 1px solid var(--hair);
  transition: border-color 0.2s;
}
.cell .v a:hover { border-color: var(--ink); }
.cell .v .small {
  font-size: 14px;
  color: var(--dim);
  display: block;
  margin-top: 6px;
  font-style: italic;
}
.tbft {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  border-top: 2px solid var(--ink);
}
.tbft .cell {
  padding: 14px 22px;
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.15em;
  color: var(--dim);
  text-transform: uppercase;
  border-right: 1px solid var(--ink);
}
.tbft .cell:last-child { border-right: none; }
.tbft .cell .lbl { color: var(--dim); margin-right: 8px; }
.tbft .cell .val { color: var(--ink); }
@media (max-width: 900px) {
  .tbhd { grid-template-columns: 1fr; gap: 20px; }
  .tbhd .meta2 { text-align: left; }
  .tbbody { grid-template-columns: 1fr; }
  .cell { border-right: none; border-bottom: 1px solid var(--ink); }
  .tbft { grid-template-columns: 1fr; }
  .tbft .cell { border-right: none; border-bottom: 1px solid var(--ink); }
}
```

- [ ] **Step 2: Create `components/Contact.tsx`**

```tsx
import styles from "./Contact.module.css";

export function Contact() {
  return (
    <section className={styles.section} id="contact">
      <div className={styles.head}>
        <h2>Get in <em>touch</em>.</h2>
        <div className={styles.meta}>Fig. 08 · Title block<br />drawing complete</div>
      </div>
      <div className={styles.block}>
        <div className={styles.tbhd}>
          <div className="name">Bijin <em>Abraham</em></div>
          <div className="meta2">
            <div><span className="k">Discipline</span> <span className="v">Solutions engineering</span></div>
            <div><span className="k">Location</span> <span className="v">Bangalore, IN</span></div>
            <div><span className="k">Availability</span> <span className="v">Open to conversations</span></div>
          </div>
        </div>
        <div className={styles.tbbody}>
          <div className={styles.cell}>
            <div className="k">Email</div>
            <div className="v"><a href="mailto:bjabraham07@gmail.com">bjabraham07@gmail.com</a><span className="small">best for opportunities</span></div>
          </div>
          <div className={styles.cell}>
            <div className="k">LinkedIn</div>
            <div className="v"><a href="https://linkedin.com/in/bijinabraham">/in/bijinabraham</a><span className="small">roles and recruiters</span></div>
          </div>
          <div className={styles.cell}>
            <div className="k">GitHub</div>
            <div className="v"><a href="https://github.com/bijinabraham">/bijinabraham</a><span className="small">code and side work</span></div>
          </div>
        </div>
        <div className={styles.tbft}>
          <div className={styles.cell}><span className="lbl">Drawing</span><span className="val">Portfolio · v.1</span></div>
          <div className={styles.cell}><span className="lbl">Sheet</span><span className="val">08 of 08</span></div>
          <div className={styles.cell}><span className="lbl">Rev.</span><span className="val">1.4 · 2026-07</span></div>
          <div className={styles.cell}><span className="lbl">By</span><span className="val">Self</span></div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Render in `app/page.tsx`**

```tsx
import { Contact } from "@/components/Contact";
```

Add after `<Writing />`:

```tsx
<Contact />
```

- [ ] **Step 4: Verify against mockup**

Expect a bordered title-block with name, metadata header, three-cell contact body, four-cell drawing metadata footer.

- [ ] **Step 5: Commit**

```bash
git add components/Contact.tsx components/Contact.module.css app/page.tsx
git commit -m "feat: add Contact title block"
```

### Task 2.11: Footer

**Files:**
- Create: `components/Footer.tsx`, `components/Footer.module.css`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/Footer.module.css`**

```css
.footer {
  padding: 60px 40px 40px;
  border-top: 1px solid var(--hair);
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--dim);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
  z-index: 3;
  position: relative;
}
```

- [ ] **Step 2: Create `components/Footer.tsx`**

```tsx
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <span>Bijin Abraham · 2026 · Blueprint v.2</span>
      <span>Drawn in Bangalore</span>
    </footer>
  );
}
```

- [ ] **Step 3: Render in `app/page.tsx`**

```tsx
import { Footer } from "@/components/Footer";
```

Add after `<Contact />`:

```tsx
<Footer />
```

- [ ] **Step 4: Verify against mockup**

Expect small mono uppercase footer with two spans, one left, one right.

- [ ] **Step 5: Full mockup comparison and commit**

Open `mockups/blueprint-v2.html` and the local dev site side by side. Scroll through both. Note any static-visual differences.

If everything matches, commit:

```bash
git add components/Footer.tsx components/Footer.module.css app/page.tsx
git commit -m "feat: add Footer, complete static composition of all sections"
```

---

## Milestone 3: Interactive (view toggle, palette switcher, project expand)

Goal at the end of Milestone 3: view toggle swaps hero content and portrait callouts, palette switcher live-swaps colors, project cards expand to reveal architecture drawings and design-choice bullets.

### Task 3.1: `useMode` hook

**Files:**
- Create: `lib/hooks/useMode.ts`, `lib/hooks/useMode.test.ts`

- [ ] **Step 1: Write failing test `lib/hooks/useMode.test.ts`**

```ts
import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useMode } from "./useMode";

describe("useMode", () => {
  beforeEach(() => {
    document.body.removeAttribute("data-mode");
  });

  it("defaults to elevation", () => {
    const { result } = renderHook(() => useMode());
    expect(result.current.mode).toBe("elevation");
    expect(document.body.dataset.mode).toBe("elevation");
  });

  it("switches to section and updates body attribute", () => {
    const { result } = renderHook(() => useMode());
    act(() => result.current.setMode("section"));
    expect(result.current.mode).toBe("section");
    expect(document.body.dataset.mode).toBe("section");
  });

  it("toggles between elevation and section", () => {
    const { result } = renderHook(() => useMode());
    act(() => result.current.toggle());
    expect(result.current.mode).toBe("section");
    act(() => result.current.toggle());
    expect(result.current.mode).toBe("elevation");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd ~/Projects/portfolio && npx vitest run lib/hooks/useMode.test.ts
```
Expected: FAIL, "useMode is not defined" or module not found.

- [ ] **Step 3: Create `lib/hooks/useMode.ts`**

```ts
"use client";

import { useCallback, useEffect, useState } from "react";

export type Mode = "elevation" | "section";

export function useMode(initial: Mode = "elevation") {
  const [mode, setModeState] = useState<Mode>(initial);

  useEffect(() => {
    document.body.dataset.mode = mode;
  }, [mode]);

  const setMode = useCallback((m: Mode) => setModeState(m), []);
  const toggle = useCallback(
    () => setModeState((m) => (m === "elevation" ? "section" : "elevation")),
    [],
  );

  return { mode, setMode, toggle };
}
```

- [ ] **Step 4: Run test to verify pass**

```bash
npx vitest run lib/hooks/useMode.test.ts
```
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add lib/hooks/useMode.ts lib/hooks/useMode.test.ts
git commit -m "feat: add useMode hook for Elevation/Section state"
```

### Task 3.2: ViewToggle component

**Files:**
- Create: `components/ViewToggle.tsx`, `components/ViewToggle.module.css`

- [ ] **Step 1: Create `components/ViewToggle.module.css`**

Port the `.view-toggle` styles from the mockup:

```css
.toggle {
  display: inline-flex;
  align-items: center;
  gap: 0;
  border: 1px solid var(--ink);
  background: var(--paper);
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  overflow: hidden;
  position: relative;
}
.toggle .lbl {
  padding: 9px 12px 9px 14px;
  color: var(--dim);
  border-right: 1px solid var(--hair);
  background: var(--paper-2);
}
.toggle button {
  border: 0;
  background: transparent;
  padding: 9px 14px;
  cursor: pointer;
  font: inherit;
  letter-spacing: inherit;
  text-transform: inherit;
  color: var(--dim);
  transition: color 0.3s ease, background 0.3s ease;
}
.toggle button.active { color: var(--paper); background: var(--ink); }
.toggle button:not(.active):hover { color: var(--ink); background: var(--paper-3); }
```

- [ ] **Step 2: Create `components/ViewToggle.tsx`**

```tsx
"use client";

import type { Mode } from "@/lib/hooks/useMode";
import styles from "./ViewToggle.module.css";

export function ViewToggle({
  mode,
  onChange,
}: {
  mode: Mode;
  onChange: (m: Mode) => void;
}) {
  return (
    <div className={styles.toggle} role="group" aria-label="View mode">
      <span className={styles.lbl}>View</span>
      <button
        className={mode === "elevation" ? styles.active : ""}
        aria-pressed={mode === "elevation"}
        onClick={() => onChange("elevation")}
      >
        Elevation
      </button>
      <button
        className={mode === "section" ? styles.active : ""}
        aria-pressed={mode === "section"}
        onClick={() => onChange("section")}
      >
        Section
      </button>
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/ViewToggle.tsx components/ViewToggle.module.css
git commit -m "feat: add ViewToggle segmented control"
```

### Task 3.3: PaletteSwitcher component and hook

**Files:**
- Create: `lib/hooks/usePalette.ts`, `components/PaletteSwitcher.tsx`, `components/PaletteSwitcher.module.css`

- [ ] **Step 1: Create `lib/hooks/usePalette.ts`**

```ts
"use client";

import { useCallback, useEffect, useState } from "react";

export type Palette = "original" | "salmon" | "manila" | "vellum" | "steel" | "prussian";

export function usePalette(initial: Palette = "original") {
  const [palette, setPaletteState] = useState<Palette>(initial);

  useEffect(() => {
    if (palette === "original") document.body.removeAttribute("data-palette");
    else document.body.setAttribute("data-palette", palette);
  }, [palette]);

  const setPalette = useCallback((p: Palette) => setPaletteState(p), []);

  return { palette, setPalette };
}
```

- [ ] **Step 2: Create `components/PaletteSwitcher.module.css`**

```css
.wrap {
  display: inline-flex;
  align-items: center;
  gap: 0;
  border: 1px solid var(--ink);
  background: var(--paper);
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  overflow: hidden;
}
.lbl {
  padding: 9px 12px 9px 14px;
  color: var(--dim);
  border-right: 1px solid var(--hair);
  background: var(--paper-2);
}
.swatches {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
}
.sw {
  width: 22px;
  height: 22px;
  border: 1px solid var(--ink);
  padding: 0;
  cursor: pointer;
  border-radius: 50%;
  background: currentColor;
  position: relative;
  transition: transform 0.2s ease;
}
.sw:hover { transform: scale(1.12); }
.active { outline: 2px solid var(--ink); outline-offset: 2px; }
```

- [ ] **Step 3: Create `components/PaletteSwitcher.tsx`**

```tsx
"use client";

import type { Palette } from "@/lib/hooks/usePalette";
import styles from "./PaletteSwitcher.module.css";

const options: Array<{ id: Palette; color: string; title: string }> = [
  { id: "original", color: "#8b2818", title: "FT Salmon and Oxblood (default)" },
  { id: "salmon",   color: "#a63c00", title: "FT Salmon and rust (comparison)" },
  { id: "manila",   color: "#8b2818", title: "Manila and oxblood" },
  { id: "vellum",   color: "#1e5f4b", title: "Vellum and forest" },
  { id: "steel",    color: "#2563eb", title: "Steel and electric blue" },
  { id: "prussian", color: "#003a70", title: "Paper and prussian blue" },
];

export function PaletteSwitcher({
  palette,
  onChange,
}: {
  palette: Palette;
  onChange: (p: Palette) => void;
}) {
  return (
    <div className={styles.wrap} role="group" aria-label="Colour palette">
      <span className={styles.lbl}>Palette</span>
      <div className={styles.swatches}>
        {options.map((o) => (
          <button
            key={o.id}
            className={`${styles.sw} ${palette === o.id ? styles.active : ""}`}
            style={{ color: o.color }}
            title={o.title}
            aria-label={o.title}
            aria-pressed={palette === o.id}
            onClick={() => onChange(o.id)}
          />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add lib/hooks/usePalette.ts components/PaletteSwitcher.tsx components/PaletteSwitcher.module.css
git commit -m "feat: add usePalette hook and PaletteSwitcher swatch strip"
```

### Task 3.4: Wire view toggle and palette switcher into Nav

**Files:**
- Modify: `components/Nav.tsx`, `components/Nav.module.css`, `app/page.tsx`, `components/Hero.tsx`

- [ ] **Step 1: Convert `components/Nav.tsx` to a client component that owns mode + palette state and renders both controls**

The state must live above Nav so Hero can consume it too. Lift state to page-level and pass via context or props.

Choose: React context. Create `lib/hooks/SiteStateProvider.tsx`.

- [ ] **Step 2: Create `lib/hooks/SiteStateProvider.tsx`**

```tsx
"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useMode, type Mode } from "./useMode";
import { usePalette, type Palette } from "./usePalette";

type SiteState = {
  mode: Mode;
  setMode: (m: Mode) => void;
  palette: Palette;
  setPalette: (p: Palette) => void;
};

const Ctx = createContext<SiteState | null>(null);

export function SiteStateProvider({ children }: { children: ReactNode }) {
  const { mode, setMode } = useMode();
  const { palette, setPalette } = usePalette();
  return (
    <Ctx.Provider value={{ mode, setMode, palette, setPalette }}>
      {children}
    </Ctx.Provider>
  );
}

export function useSiteState() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useSiteState must be used inside <SiteStateProvider>");
  return v;
}
```

- [ ] **Step 3: Wrap `app/page.tsx` in the provider**

```tsx
import { SiteStateProvider } from "@/lib/hooks/SiteStateProvider";
// ...

export default function Home() {
  return (
    <SiteStateProvider>
      <main>
        <Nav />
        <Hero />
        <Career />
        <Metrics />
        <Skills />
        <Projects />
        <Writing />
        <Contact />
        <Footer />
      </main>
    </SiteStateProvider>
  );
}
```

- [ ] **Step 4: Update `components/Nav.tsx` to consume state and render both controls**

Convert to client component:

```tsx
"use client";

import styles from "./Nav.module.css";
import { ViewToggle } from "./ViewToggle";
import { PaletteSwitcher } from "./PaletteSwitcher";
import { useSiteState } from "@/lib/hooks/SiteStateProvider";

export function Nav() {
  const { mode, setMode, palette, setPalette } = useSiteState();
  return (
    <nav className={styles.nav} aria-label="Primary">
      <a href="#" className={styles.logo}>
        Bijin <em>Abraham</em>
      </a>
      <div className={styles.mid}>
        <ul className={styles.menu}>
          <li><a href="#work">Work</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#writing">Writing</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <ViewToggle mode={mode} onChange={setMode} />
        <PaletteSwitcher palette={palette} onChange={setPalette} />
      </div>
    </nav>
  );
}
```

- [ ] **Step 5: Verify in browser**

Dev server. Click Elevation / Section: body[data-mode] should toggle (inspect element). Click palette swatches: body[data-palette] should update and the whole page should recolor.

- [ ] **Step 6: Commit**

```bash
git add lib/hooks/SiteStateProvider.tsx components/Nav.tsx app/page.tsx
git commit -m "feat: lift mode+palette state and wire toggles into Nav"
```

### Task 3.5: Mode-aware Hero content

**Files:**
- Modify: `components/Hero.tsx`, `components/Hero.module.css`, `components/hero/PortraitSVG.tsx`

- [ ] **Step 1: Update `components/Hero.tsx` to render both mode content blocks and switch via context**

```tsx
"use client";

import styles from "./Hero.module.css";
import { PortraitSVG } from "./hero/PortraitSVG";
import { useSiteState } from "@/lib/hooks/SiteStateProvider";

export function Hero() {
  const { mode } = useSiteState();
  return (
    <section className={styles.hero}>
      <div className={styles.stamp}>
        <div><span className="k">Doc №</span><span className="v">CV-2026-BA</span></div>
        <div><span className="k">Rev.</span><span className="v">1.4</span></div>
        <div><span className="k">View</span><span className="v">{mode === "elevation" ? "Elevation" : "Section"}</span></div>
        <div className="sec"><span className="k">Drawn by</span><span className="v">Self</span></div>
      </div>

      <div className={styles.left}>
        <div className={styles.eyebrow}>
          <span className="hair" />Fig. 01 · Portrait, {mode}
        </div>
        <h1 className={styles.display}>
          <span className="word"><span>Bijin</span></span>
          <span className="word"><span><em>Abraham</em></span></span>
          <span className="underline" />
        </h1>

        {mode === "elevation" ? (
          <>
            <div className={styles.roleLine}>
              <span className="arrow">▸</span>
              Manager · Solutions Engineering · Confluent · AMER
            </div>
            <p className={styles.body}>
              7+ years drawing streaming systems for the world&rsquo;s largest data flows, currently leading the Solutions Engineering team for <em>New Logo Acquisition</em> across the Americas. People and pipeline, owned end to end.
            </p>
            <div className={styles.cta}>
              <a href="#work" className={styles.btn}>See the trajectory →</a>
              <a href="#contact" className={`${styles.btn} ${styles.ghost}`}>Hire me to lead →</a>
            </div>
          </>
        ) : (
          <>
            <div className={styles.roleLine}>
              <span className="arrow">▸</span>
              Solutions Architect · Kafka · Flink · Streaming Systems
            </div>
            <p className={styles.body}>
              7+ years designing streaming architectures on Confluent and Kafka for the world&rsquo;s biggest enterprises. Ships production systems, writes the code, draws the diagrams, and still runs the <em>demos</em> myself.
            </p>
            <div className={styles.cta}>
              <a href="#projects" className={styles.btn}>See the projects →</a>
              <a href="#contact" className={`${styles.btn} ${styles.ghost}`}>Hire me to build →</a>
            </div>
          </>
        )}
      </div>

      <div className={styles.right}>
        <PortraitSVG mode={mode} />
      </div>
    </section>
  );
}
```

Note: the Section CTA points to `#projects` (not `#notes`) since Field Notes is deferred. When Field Notes ships, update this CTA.

- [ ] **Step 2: Update `components/hero/PortraitSVG.tsx` to render Section-mode callouts too**

Add a matching block for section-mode after the elevation block:

```tsx
{mode === "section" && (
  <g>
    <g>
      <line x1="420" y1="200" x2="540" y2="200" stroke="var(--dim)" strokeWidth="1" />
      <line x1="420" y1="195" x2="420" y2="205" stroke="var(--dim)" />
      <line x1="540" y1="195" x2="540" y2="205" stroke="var(--dim)" />
      <text x="480" y="192" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.12em" textTransform="uppercase" fill="var(--dim)">
        3+ <tspan fill="var(--ink)" fontWeight="500">YR CONFLUENT</tspan>
      </text>
    </g>
    <g>
      <line x1="300" y1="200" x2="470" y2="120" stroke="var(--accent)" strokeWidth="1" />
      <circle cx="300" cy="200" r="3" fill="var(--accent)" />
      <text x="478" y="112" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.12em" textTransform="uppercase" fill="var(--dim)">Streaming Architect</text>
      <text x="478" y="134" fontFamily="var(--font-fraunces)" fontSize="14" fontStyle="italic" fill="var(--ink-2)">Kafka · Flink · CDC</text>
    </g>
    <g>
      <path d="M 210 260 L 75 260 L 75 232" fill="none" stroke="var(--ink)" strokeWidth="1" />
      <circle cx="210" cy="260" r="3" fill="var(--ink)" />
      <text x="80" y="230" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.12em" textTransform="uppercase" fill="var(--dim)">POCs and workshops</text>
      <text x="80" y="252" fontFamily="var(--font-fraunces)" fontSize="14" fontStyle="italic" fill="var(--ink-2)">code, demo, deliver</text>
    </g>
    <g>
      <line x1="360" y1="300" x2="510" y2="360" stroke="var(--ink)" strokeWidth="1" />
      <circle cx="360" cy="300" r="3" fill="var(--ink)" />
      <text x="518" y="352" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.12em" textTransform="uppercase" fill="var(--dim)">Ships weekends</text>
      <text x="518" y="374" fontFamily="var(--font-fraunces)" fontSize="14" fontStyle="italic" fill="var(--ink-2)">6 live side projects</text>
    </g>
  </g>
)}
```

- [ ] **Step 3: Verify in browser**

Click Elevation / Section in the nav. Hero should swap tagline, body, CTAs, and portrait callouts. Doc stamp view label updates. Eyebrow text updates.

- [ ] **Step 4: Commit**

```bash
git add components/Hero.tsx components/hero/PortraitSVG.tsx
git commit -m "feat: mode-aware Hero content and Portrait callouts"
```

### Task 3.6: Project card expand with detail drawings

**Files:**
- Create: `components/projects/AtlasDetail.tsx`, `components/projects/SculpturaDetail.tsx`, `components/projects/PsychShortsDetail.tsx`, `components/projects/BBBDetail.tsx`
- Modify: `components/Projects.tsx`, `components/Projects.module.css`

- [ ] **Step 1: Create the four detail SVG components**

Port each project's architecture SVG from the mockup into its own component. Each component just returns the SVG.

`components/projects/AtlasDetail.tsx`:

```tsx
export function AtlasDetail() {
  return (
    <svg viewBox="0 0 560 260" style={{ width: "100%", height: "auto" }}>
      <defs>
        <marker id="ar-atlas" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={6} markerHeight={6} orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="var(--dim)" />
        </marker>
      </defs>
      {/* Phone shell */}
      <rect x="20" y="20" width="120" height="220" fill="var(--paper-2)" stroke="var(--ink)" />
      <text x="80" y="45" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--ink)" letterSpacing="0.15em">EXPO · RN</text>
      <line x1="30" y1="55" x2="130" y2="55" stroke="var(--hair)" />
      <rect x="30" y="70" width="100" height="30" fill="var(--paper)" stroke="var(--dim)" />
      <text x="80" y="88" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--dim)">SETS · REPS</text>
      <rect x="30" y="108" width="100" height="30" fill="var(--paper)" stroke="var(--dim)" />
      <text x="80" y="126" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--dim)">TIMER</text>
      <rect x="30" y="146" width="100" height="30" fill="var(--paper)" stroke="var(--dim)" />
      <text x="80" y="164" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--dim)">HISTORY</text>
      <rect x="30" y="184" width="100" height="30" fill="var(--paper-2)" stroke="var(--dim)" strokeDasharray="3 3" />
      <text x="80" y="202" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--dim)">CHARTS</text>
      {/* Arrow */}
      <line x1="140" y1="130" x2="240" y2="130" stroke="var(--dim)" strokeWidth="1" markerEnd="url(#ar-atlas)" />
      <text x="190" y="123" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--dim)">async storage</text>
      {/* SQLite */}
      <rect x="240" y="100" width="170" height="80" fill="rgba(139,40,24,0.10)" stroke="var(--accent)" />
      <text x="325" y="130" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--accent)" letterSpacing="0.1em">SQLITE</text>
      <text x="325" y="150" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--dim)">exercises · sessions · sets</text>
      <text x="325" y="166" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--dim)">local · encrypted</text>
      {/* No sync */}
      <line x1="410" y1="140" x2="440" y2="140" stroke="var(--dim)" strokeWidth="1" strokeDasharray="4 4" />
      <rect x="440" y="105" width="110" height="70" fill="var(--paper)" stroke="var(--dim)" strokeDasharray="3 3" />
      <text x="495" y="132" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--dim)">CLOUD SYNC</text>
      <text x="495" y="146" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--dim)">(deliberately none)</text>
      <text x="495" y="162" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--accent)">privacy by absence</text>
    </svg>
  );
}
```

`components/projects/SculpturaDetail.tsx`:

Port the Sculptura SVG from `mockups/blueprint-v2.html` (search for `Sculptura` in the file). Keep exact coordinates and text. Structure:

```tsx
export function SculpturaDetail() {
  return (
    <svg viewBox="0 0 500 260" style={{ width: "100%", height: "auto" }}>
      <defs>
        <marker id="ar-sculp" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={6} markerHeight={6} orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="var(--dim)" />
        </marker>
      </defs>
      {/* Copy the Sculptura detail SVG contents from the mockup as-is */}
      {/* ... */}
    </svg>
  );
}
```

Copy the exact SVG children from the mockup (inside `AtlasDetail`'s analogue), converting attributes to JSX (`stroke-width` to `strokeWidth`, `stroke-dasharray` to `strokeDasharray`, `text-anchor` to `textAnchor`, etc). Use style props for fonts, not inline `style="font-family:..."` strings.

`components/projects/PsychShortsDetail.tsx`: same treatment for the Psych Shorts SVG in the mockup.

`components/projects/BBBDetail.tsx`: same treatment for the BBB SVG in the mockup.

- [ ] **Step 2: Extend `components/Projects.module.css` for the detail row**

Append:

```css
.card.open .detail { max-height: 800px; }
.detail {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s ease;
}
.detailInner {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 40px;
  padding: 20px 32px 36px;
  border-top: 1px dashed var(--hair-2);
}
@media (max-width: 900px) {
  .detailInner { grid-template-columns: 1fr; }
}
.detailInner .arch h4 {
  font-family: var(--font-fraunces);
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 14px;
  letter-spacing: 0.02em;
}
.detailInner .arch ul {
  list-style: none;
  font-family: var(--font-fraunces);
  font-weight: 300;
  font-size: 14.5px;
  line-height: 1.7;
  color: var(--ink-2);
  padding: 0;
  margin: 0;
}
.detailInner .arch ul li {
  padding-left: 18px;
  position: relative;
}
.detailInner .arch ul li::before {
  content: "›";
  position: absolute;
  left: 0;
  color: var(--accent);
}
.detailInner .stack {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--dim);
  letter-spacing: 0.05em;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px dashed var(--hair-2);
}
.chev { display: inline-block; transition: transform 0.3s ease; }
.card.open .chev { transform: rotate(180deg); }
```

- [ ] **Step 3: Update `components/Projects.tsx` to handle expand state and render details**

```tsx
"use client";

import { useState } from "react";
import { projects } from "@/lib/content/projects";
import styles from "./Projects.module.css";
import { AtlasDetail } from "./projects/AtlasDetail";
import { SculpturaDetail } from "./projects/SculpturaDetail";
import { PsychShortsDetail } from "./projects/PsychShortsDetail";
import { BBBDetail } from "./projects/BBBDetail";

const details: Record<string, () => React.ReactElement> = {
  atlas: AtlasDetail,
  sculptura: SculpturaDetail,
  "psych-shorts": PsychShortsDetail,
  bbb: BBBDetail,
};

export function Projects() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  return (
    <section className={styles.section} id="projects">
      <div className={styles.head}>
        <h2>Nights and <em>weekends</em>.</h2>
        <div className={styles.meta}>Fig. 05 · Side work<br />click a row for detail drawing</div>
      </div>
      <div className={styles.list}>
        {projects.map((p) => {
          const isOpen = openSlug === p.slug;
          const Detail = details[p.slug];
          return (
            <article
              className={`${styles.card} ${isOpen ? styles.open : ""}`}
              key={p.slug}
            >
              <div
                className={styles.headRow}
                onClick={() => setOpenSlug(isOpen ? null : p.slug)}
                role="button"
                aria-expanded={isOpen}
              >
                <div className={styles.num}>Proj. {p.num}</div>
                <div>
                  <h3 dangerouslySetInnerHTML={{ __html: p.title }} />
                  <p>{p.description}</p>
                </div>
                <div className={styles.status}>{p.status}</div>
                <div className={styles.expand}>Detail <span className={styles.chev}>▾</span></div>
              </div>
              <div className={styles.detail}>
                <div className={styles.detailInner}>
                  {Detail && <Detail />}
                  <div className="arch">
                    <h4>Design choices worth defending</h4>
                    <ul>
                      {p.choices.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                    <div className={styles.stack}>Stack: {p.stack}</div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Verify in browser**

Click each project row. Expect: detail expands with architecture drawing on left, "Design choices worth defending" bullets and stack row on right. Chevron rotates. Click again to close. Only one open at a time (single-selection state).

- [ ] **Step 5: Commit**

```bash
git add components/projects/ components/Projects.tsx components/Projects.module.css
git commit -m "feat: project card expand with architecture detail drawings"
```

---

## Milestone 4: Motion (animations wired up)

Goal at the end of Milestone 4: all signature motion from the spec is live. Hero name rises, underline draws, portrait strokes draw in, career paths draw in on scroll, sections reveal on scroll.

### Task 4.1: `useReveal` hook

**Files:**
- Create: `lib/hooks/useReveal.ts`

- [ ] **Step 1: Create `lib/hooks/useReveal.ts`**

```ts
"use client";

import { useEffect, useRef, useState } from "react";

export function useReveal<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.2,
) {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setSeen(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, seen]);

  return { ref, seen };
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/hooks/useReveal.ts
git commit -m "feat: add useReveal IntersectionObserver hook"
```

### Task 4.2: Hero name rise and underline draw

**Files:**
- Modify: `components/Hero.module.css`, `components/Hero.tsx`

- [ ] **Step 1: Add keyframes and animation classes to `components/Hero.module.css`**

Append:

```css
@keyframes rise {
  from { transform: translateY(120%); }
  to { transform: none; }
}
.display .word span {
  display: inline-block;
  transform: translateY(120%);
  animation: rise 1.1s cubic-bezier(0.2, 0.7, 0.15, 1) forwards;
}
.display .word:nth-child(2) span { animation-delay: 0.12s; }

@keyframes drawUL {
  from { width: 0; }
  to { width: 220px; }
}
.display .underline {
  width: 0;
  animation: drawUL 1.1s cubic-bezier(0.7, 0.1, 0.2, 1) forwards 0.9s;
}
```

- [ ] **Step 2: Verify in browser**

Refresh the page. The name should rise from below with the two words staggered, and the underline should draw after.

- [ ] **Step 3: Commit**

```bash
git add components/Hero.module.css
git commit -m "feat: Hero name rise and underline draw on load"
```

### Task 4.3: Portrait SVG stroke-draw on load

**Files:**
- Modify: `components/hero/PortraitSVG.tsx`

- [ ] **Step 1: Add stroke-dasharray drawing via CSS-in-JS or a style tag**

Import a small module CSS for the SVG or use CSS-in-JS. Simplest: add a `<style>` tag inside the component with the animations scoped by class.

Add a module CSS at `components/hero/PortraitSVG.module.css`:

```css
.draw { stroke-dasharray: 2000; stroke-dashoffset: 2000; animation: draw 2.2s ease-out forwards; }
.draw2 { animation-delay: 0.4s; }
.draw3 { animation-delay: 0.8s; }
.fadeIn { opacity: 0; animation: fadeIn 0.6s ease forwards; }
.f1 { animation-delay: 1.4s; }
.f2 { animation-delay: 1.6s; }
.f3 { animation-delay: 1.8s; }
.f4 { animation-delay: 2.0s; }
@keyframes draw { to { stroke-dashoffset: 0; } }
@keyframes fadeIn { to { opacity: 1; } }
```

- [ ] **Step 2: Apply classes to portrait outline paths and callouts**

Import styles in `PortraitSVG.tsx`:

```tsx
import styles from "./PortraitSVG.module.css";
```

Apply `className={styles.draw}` to the corner marks and portrait outline paths. Apply `className={`${styles.fadeIn} ${styles.f1}`}` to the first callout group, `f2` to the second, etc.

- [ ] **Step 3: Verify in browser**

Refresh. Expect: corner marks and portrait outline strokes draw in over 2s, then callouts fade in one by one.

- [ ] **Step 4: Commit**

```bash
git add components/hero/PortraitSVG.tsx components/hero/PortraitSVG.module.css
git commit -m "feat: Portrait SVG stroke-draw and staggered callout reveals"
```

### Task 4.4: Career trajectory paths draw on scroll

**Files:**
- Modify: `components/Career.tsx`, `components/Career.module.css`

- [ ] **Step 1: Add draw animation styles to `Career.module.css`**

```css
.pathAnim {
  stroke-dasharray: 3000;
  stroke-dashoffset: 3000;
  transition: stroke-dashoffset 2s ease;
}
.on { stroke-dashoffset: 0 !important; }
```

- [ ] **Step 2: Convert `Career.tsx` to client component using `useReveal`**

```tsx
"use client";

import { useReveal } from "@/lib/hooks/useReveal";
import styles from "./Career.module.css";

export function Career() {
  const { ref, seen } = useReveal<HTMLDivElement>(0.25);
  // Apply `${styles.pathAnim} ${seen ? styles.on : ""}` to both trajectory paths
  return (
    <section className={styles.section} id="work">
      {/* ...head... */}
      <div className={styles.wrap} ref={ref}>
        <svg /* ... */>
          {/* year ticks */}
          {/* trajectory paths use className={`${styles.pathAnim} ${seen ? styles.on : ""}`} */}
          {/* nodes and rest unchanged */}
        </svg>
        <div className={styles.legend}>{/* ...legend... */}</div>
      </div>
    </section>
  );
}
```

Apply the `pathAnim` + conditional `on` class to both `<path>` elements that render the trajectory tracks (the tech track and the people track).

- [ ] **Step 3: Verify in browser**

Scroll to career section. Expect: both trajectory paths draw in from left to right when the section enters the viewport.

- [ ] **Step 4: Commit**

```bash
git add components/Career.tsx components/Career.module.css
git commit -m "feat: Career trajectory paths draw in on scroll"
```

### Task 4.5: Metric cells reveal on scroll

**Files:**
- Modify: `components/Metrics.tsx`, `components/Metrics.module.css`

- [ ] **Step 1: Add reveal styles**

Append to `Metrics.module.css`:

```css
.cell {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.cell.on { opacity: 1; transform: none; }
```

- [ ] **Step 2: Update `Metrics.tsx` to use `useReveal` per cell (or per grid)**

Simpler: reveal the grid at once, with per-cell CSS delays.

```tsx
"use client";

import { metrics } from "@/lib/content/metrics";
import { useReveal } from "@/lib/hooks/useReveal";
import styles from "./Metrics.module.css";

export function Metrics() {
  const { ref, seen } = useReveal<HTMLDivElement>(0.3);
  return (
    <section className={styles.section}>
      {/* head */}
      <div className={styles.grid} ref={ref}>
        {metrics.map((m, i) => (
          <div
            className={`${styles.cell} ${seen ? styles.on : ""}`}
            key={m.label}
            style={{ transitionDelay: `${i * 0.08}s` }}
          >
            <div className="k">{m.label}</div>
            <div className="v" dangerouslySetInnerHTML={{ __html: m.value }} />
            <div className="n">{m.caption}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify**

Scroll to metrics. Cells fade up one after another.

- [ ] **Step 4: Commit**

```bash
git add components/Metrics.tsx components/Metrics.module.css
git commit -m "feat: Metric cells fade-up on scroll with stagger"
```

### Task 4.6: Skills rows, Projects cards, Writing rows reveal on scroll

**Files:**
- Modify: `components/Skills.tsx`, `components/Skills.module.css`, `components/Projects.tsx`, `components/Projects.module.css`, `components/Writing.tsx`, `components/Writing.module.css`

- [ ] **Step 1: Apply the same reveal pattern**

For each of the three sections, add:

```css
.row {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.row.on { opacity: 1; transform: none; }
```

Use `useReveal` on the wrapping list container. Give each child a staggered `transitionDelay`. Naming: for Skills use `.row`, for Projects use `.cardOn`, for Writing use `.postOn`; classes are scoped so no clashes.

Apply the pattern to:
- Skills: each `tbody tr` (skip category rows or reveal them too, your call)
- Projects: each `<article class="card">`
- Writing: each `.post`

- [ ] **Step 2: Verify**

Scroll through the page. Expect each section's rows or cards to fade up as they enter the viewport.

- [ ] **Step 3: Commit**

```bash
git add components/Skills.tsx components/Skills.module.css components/Projects.tsx components/Projects.module.css components/Writing.tsx components/Writing.module.css
git commit -m "feat: reveal-on-scroll for Skills rows, Project cards, Writing posts"
```

### Task 4.7: Mode swap smooth cross-fade

**Files:**
- Modify: `components/Hero.module.css`, `components/Hero.tsx`

- [ ] **Step 1: Add cross-fade CSS**

Append:

```css
.modeContent { transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.3, 0.7, 0.2, 1); }
```

- [ ] **Step 2: Wrap mode-specific blocks in a keyed div**

Change the mode conditional in `Hero.tsx`:

```tsx
<div key={mode} className={styles.modeContent}>
  {mode === "elevation" ? (<> /* elevation content */ </>) : (<> /* section content */ </>)}
</div>
```

Using `key={mode}` forces React to unmount + remount the block on toggle, triggering the CSS transition. For a real cross-fade with both blocks visible during transition, use Framer Motion `AnimatePresence`; for v1 the keyed remount is enough.

If a real cross-fade is required, install Framer Motion and use `AnimatePresence` with `initial={{ opacity: 0 }}` / `animate={{ opacity: 1 }}` / `exit={{ opacity: 0 }}` for each mode block.

Decision for v1: keyed remount is fine; upgrade to `AnimatePresence` later if it feels choppy.

- [ ] **Step 3: Verify**

Toggle Elevation / Section. Content should smoothly cross-fade.

- [ ] **Step 4: Commit**

```bash
git add components/Hero.module.css components/Hero.tsx
git commit -m "feat: mode swap cross-fade"
```

### Task 4.8: Manual polish pass and commit checkpoint

- [ ] **Step 1: Compare live site to mockup end to end**

Open both. Scroll and interact.

Check:
- All hover states feel right (buttons, nav, project rows, writing rows)
- Palette swatches work and the site actually recolors
- View toggle affects Hero (content + callouts + doc stamp)
- All reveals happen at the right scroll position
- No console errors

- [ ] **Step 2: Fix any drift you notice**

If a color, spacing, or motion feels off compared to the mockup, adjust the corresponding CSS module and commit.

- [ ] **Step 3: Commit "Milestone 4 complete"**

```bash
git commit --allow-empty -m "chore: Milestone 4 complete, motion wired up"
```

---

## Milestone 5: Deploy (live on GitHub Pages)

Goal: `https://bijinabraham.github.io` serves the built site.

### Task 5.1: Deploy workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Write the workflow**

```yaml
name: Deploy to Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - run: npm ci

      - run: npm run build

      - uses: actions/configure-pages@v5

      - uses: actions/upload-pages-artifact@v3
        with:
          path: out

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Ensure `.nojekyll` is generated**

Create `public/.nojekyll` (empty file) so GitHub Pages does not run Jekyll on the exported site:

```bash
touch ~/Projects/portfolio/public/.nojekyll
```

- [ ] **Step 3: Add build script check**

Confirm `package.json` has `"build": "next build"` (default from scaffold). Verify:

```bash
cd ~/Projects/portfolio && npm run build
```

Expected: builds successfully to `out/`.

- [ ] **Step 4: Commit**

```bash
git add .github/workflows/deploy.yml public/.nojekyll
git commit -m "ci: add GitHub Pages deploy workflow"
```

### Task 5.2: Enable Pages on the repo (manual)

- [ ] **Step 1: Confirm Pages source is set to GitHub Actions**

Visit https://github.com/bijinabraham/bijinabraham.github.io/settings/pages

Under "Build and deployment", set Source to "GitHub Actions".

- [ ] **Step 2: Push to trigger first deploy**

```bash
cd ~/Projects/portfolio
GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null git push origin main
```

- [ ] **Step 3: Watch the deploy**

Open https://github.com/bijinabraham/bijinabraham.github.io/actions

Wait for the workflow to succeed. If it fails, read the log, fix, push, retry.

- [ ] **Step 4: Verify live site**

Open https://bijinabraham.github.io

Expected: full portfolio loads. Toggle works. Palette switcher works. Projects expand.

- [ ] **Step 5: Note the live URL somewhere durable**

Update `README.md` if needed to confirm the deployed URL. Commit if changed.

---

## Milestone 6: Polish

Goal: meta tags, favicon, accessibility check, mobile responsiveness verified.

### Task 6.1: Meta tags and OG placeholder

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Expand metadata in `app/layout.tsx`**

```tsx
export const metadata: Metadata = {
  metadataBase: new URL("https://bijinabraham.github.io"),
  title: "Bijin Abraham",
  description: "Manager, Solutions Engineering at Confluent. Streaming systems by day, ships product on weekends.",
  authors: [{ name: "Bijin Abraham" }],
  openGraph: {
    title: "Bijin Abraham",
    description: "Streaming systems by day, ships product on weekends.",
    url: "https://bijinabraham.github.io",
    siteName: "Bijin Abraham",
    type: "website",
    // images: [{ url: "/og.png", width: 1200, height: 630, alt: "Bijin Abraham" }], // Task 6.3
  },
  twitter: {
    card: "summary_large_image",
    title: "Bijin Abraham",
    description: "Streaming systems by day, ships product on weekends.",
  },
  robots: { index: true, follow: true },
};
```

- [ ] **Step 2: Commit**

```bash
git add app/layout.tsx
git commit -m "chore: add meta tags and OG scaffold"
```

### Task 6.2: SVG favicon

**Files:**
- Create: `public/favicon.svg`

- [ ] **Step 1: Create `public/favicon.svg`**

Small typographic favicon "B" in oxblood on paper:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="#fff1e5"/>
  <text x="32" y="46" font-family="serif" font-size="48" text-anchor="middle" fill="#8b2818" font-style="italic">B</text>
</svg>
```

- [ ] **Step 2: Reference in metadata**

Add to `metadata.icons`:

```tsx
icons: { icon: "/favicon.svg" },
```

- [ ] **Step 3: Verify in browser tab**

Reload dev server. Tab shows the oxblood B on salmon paper.

- [ ] **Step 4: Commit**

```bash
git add public/favicon.svg app/layout.tsx
git commit -m "chore: add SVG favicon"
```

### Task 6.3: OG image (optional, defer if needed)

- [ ] **Option A: Ship without OG image**

Skip this task. Leave the images: `[]` commented in metadata.

- [ ] **Option B: Generate a plain OG image**

Use a design tool (Figma, or `og:image` at build time via `next/og`) to produce a 1200x630 PNG using the site's palette and typography. Save to `public/og.png`. Uncomment the `openGraph.images` entry.

Commit and deploy.

### Task 6.4: Accessibility pass

- [ ] **Step 1: Install axe browser extension**

Chrome/Edge/Firefox axe DevTools extension.

- [ ] **Step 2: Run axe on the live page**

Load http://localhost:3000, open DevTools, run axe scan.

Expected: zero critical violations. Fix any that appear.

Common candidates to check:
- Sufficient color contrast on `--dim` text.
- Focus visibility on toggle buttons and links.
- ARIA on toggle group (already added).
- Alt / aria-hidden on decorative SVGs (portrait SVG is decorative; add `aria-hidden` to its `<svg>` or a wrapping description).

- [ ] **Step 3: Keyboard navigation check**

Tab through the page. Every interactive element (nav links, toggles, palette swatches, project rows, contact links) must receive visible focus. If not, add `:focus-visible` outline styles.

- [ ] **Step 4: Commit any fixes**

```bash
git add -A
git commit -m "a11y: fix contrast and focus issues from axe scan"
```

### Task 6.5: Mobile responsive check

- [ ] **Step 1: Open Chrome DevTools device toolbar**

Test at 375px (iPhone SE), 414px (iPhone Pro Max), 768px (iPad), 1024px, 1440px, 1920px.

Expected: no horizontal scroll, all sections stack cleanly, portrait and detail SVGs scale sensibly.

- [ ] **Step 2: Fix any breaks**

Likely candidates:
- Nav crowding on small screens (may need hamburger; if too much for v1, hide the toggle labels).
- Metrics grid drops to 2 columns (already handled).
- Career SVG viewBox is fixed; on very small screens it may look thin. Consider `overflow-x: auto` on the wrapper or a min-width.
- Project detail grid stacks to 1 column (already handled).
- Contact title block stacks (already handled).

- [ ] **Step 3: Commit fixes**

```bash
git add -A
git commit -m "responsive: fix mobile-only layout issues"
```

### Task 6.6: Lighthouse pass

- [ ] **Step 1: Run Lighthouse on the deployed URL**

Chrome DevTools > Lighthouse > Analyze https://bijinabraham.github.io

Expected: Performance > 90, Accessibility > 95, Best Practices > 95, SEO > 90.

- [ ] **Step 2: Address any red flags**

Common issues:
- Fonts not preloaded (next/font handles this).
- Missing `<html lang>` (already set).
- Missing meta description (already set).
- Cumulative Layout Shift from font swap (Fraunces is a big font; verify `display: swap` and adjust size-adjust if needed).

- [ ] **Step 3: Push any fixes and re-run Lighthouse**

```bash
GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null git push origin main
```

Wait for Actions to complete, then re-run Lighthouse.

### Task 6.7: Final review and celebration commit

- [ ] **Step 1: Read the site end to end on a fresh browser**

Fresh incognito window. Load https://bijinabraham.github.io. Scroll through as a first-time visitor.

Does it feel like the mockup? Does the toggle work? Do the reveals feel timed right?

- [ ] **Step 2: Note any punch-list items for v1.1**

Add a `POST-LAUNCH.md` if there are known small improvements:
- Field Notes enablement (already documented in mockup)
- Real writing content
- Custom domain
- OG image if not shipped

- [ ] **Step 3: Tag v1**

```bash
git tag v1.0
GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null git push origin v1.0
```

Done.

---

## Notes and pitfalls

- **The mockup is the source of truth.** When implementation and mockup disagree visually, port from the mockup unless there's a documented spec reason.
- **Don't ship placeholder writing content as if it's real.** If the writing posts don't get real bodies before launch, hide the section or clearly label them as "coming".
- **`dangerouslySetInnerHTML` is used only on content-controlled data files** (metrics.value, projects.title, posts.title). Never accept user input into these.
- **CSS custom properties in JSX SVG:** `fill="var(--ink)"` works because it becomes a computed style. Do not use `style={{ fill: "var(--ink)" }}` unless you also need dynamic values.
- **Framer Motion is imported per-file, not globally.** Only files that need orchestrated motion import it.
- **Static export limitations:** no dynamic routes, no server actions, no API routes. All content is baked at build time.
- **GitHub Pages user-page repo:** deploys to root URL. No `basePath` config needed. Do not set `basePath` in `next.config.ts` (unlike a project-page repo like `bijin-beyond-borders`).

---

## Field Notes: post-launch enablement (deferred)

The Field Notes section is scoped out of v1 but the content is already in the mockup. To ship it later:

1. Port the section content from `mockups/blueprint-v2.html` into a new `components/FieldNotes.tsx` + `.module.css`.
2. Split the three notebook pages into separate components under `components/fieldnotes/`.
3. Add to `app/page.tsx` between `Writing` and `Contact`.
4. Add `<li><a href="#notes">Field Notes</a></li>` to the nav (between Writing and Contact).
5. Update the Section-mode Hero CTA back to "See the field notes".
6. Bump section numbering: Contact stays Fig. 08, Field Notes is Fig. 07.
7. Consider adding Caveat handwriting annotations (already loaded, just need CSS).

This can be a single small PR post-launch.
