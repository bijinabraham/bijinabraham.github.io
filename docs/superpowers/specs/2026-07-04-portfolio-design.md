# Portfolio Site · Design Spec

**Repo:** `bijinabraham/bijinabraham.github.io`
**Deploy URL:** https://bijinabraham.github.io
**Direction:** Blueprint v2 (editorial + technical drawing)
**Approved:** 2026-07-04
**Reference mockup:** [`mockups/blueprint-v2.html`](../../../mockups/blueprint-v2.html) · the source of truth for palette, motion, and layout decisions.

---

## Purpose

Personal portfolio for Bijin Abraham. Three audiences, ranked:

1. **Peers** (other engineers and founders) · primary. Success is share-worthy craft.
2. **Recruiters and hiring managers** · secondary. Substance must stay visible; both Manager and IC-track roles must be viable pitches.
3. **Consulting clients** · tertiary. Contact obvious, work credible.

The site is peer-first so it should reward close reading, feel distinct, and not look templated.

---

## Dual positioning: Manager + IC

Core constraint. Bijin is currently Manager, Solutions Engineering at Confluent, but wants to remain a viable candidate for senior IC roles (Solutions Architect, Streaming SME, etc). A one-hat portfolio kills half the funnel.

**Approach: elevation / section view toggle** in the nav.

- **Elevation** (default): Manager framing. Copy emphasises leadership, scope, pipeline ownership. Portrait diagram callouts read "SE Manager, AMER", "People + pipeline", "$1.1M closed".
- **Section**: IC framing. Copy emphasises streaming architecture, code, running the demos. Portrait diagram callouts read "Streaming Architect", "POCs + workshops", "Ships weekends".

Both modes share the same career trajectory, metrics, skills matrix, projects, writing, and contact. The toggle changes framing, not substance.

Rationale for calling this "elevation" and "section": these are architectural drawing conventions (multiple views of the same building). Fits the Blueprint aesthetic natively without feeling like a gimmick.

---

## Visual identity

### Palette (locked)

Custom properties on `:root`. All colors chosen to feel editorial-technical (Financial Times paper meets architect's drawing) and distinct from common AI-tool palettes (particularly warm-cream + rust which reads as Anthropic Claude).

| Token            | Value      | Purpose                                              |
| ---------------- | ---------- | ---------------------------------------------------- |
| `--paper`        | `#fff1e5`  | Primary background. FT Salmon pink-cream.            |
| `--paper-2`      | `#fbe4cf`  | Section alt background.                              |
| `--paper-3`      | `#f5d3b1`  | Deeper alt for interactive states.                   |
| `--ink`          | `#0a1929`  | Primary text and lines. Deep navy.                   |
| `--ink-2`        | `#152a45`  | Secondary text.                                      |
| `--dim`          | `#6a7688`  | Tertiary text, subtitles, dim UI.                    |
| `--hair`         | `#d8c8b3`  | Fine hairline color for grid, dividers.              |
| `--hair-2`       | `#e4d5bf`  | Even softer hairlines.                               |
| `--accent`       | `#8b2818`  | Oxblood red. Primary accent, current-role, italics.  |
| `--accent-2`     | `#5a1a0c`  | Dark oxblood for hover / deep emphasis.              |
| `--accent-warm`  | `#a83e26`  | Warm oxblood for warm accents.                       |
| `--signal`       | `#2f7a8c`  | Teal. Secondary color used only for the IC / tech-depth track in the career diagram. |

Alternative palettes remain in the mockup as switchable swatches (`data-palette="salmon|manila|vellum|steel|prussian"`) for future exploration but are not shipped by default.

### Grid overlay

Fixed on body:

```css
background:
  linear-gradient(90deg, rgba(120,100,70,0.055) 1px, transparent 1px) 0 0 / 80px 80px,
  linear-gradient(180deg, rgba(120,100,70,0.055) 1px, transparent 1px) 0 0 / 80px 80px;
```

80px squares, very low opacity, non-interactive. Reinforces the drafting-paper feel.

### Typography

- **Display serif:** Fraunces (variable). Weights 300, 400, 500, 700. Italic used liberally for emphasis and accent.
- **Body:** Fraunces 300, 15 to 19px.
- **UI / mono:** JetBrains Mono. Weights 300, 400, 500.
- **Body sans (sparingly):** Inter. Used only for UI utility (buttons, tags).
- **Handwritten accent (deferred):** Caveat, for one or two hand-annotation moments in the Field Notes section.

Type scale:

- Hero display: `clamp(56px, 9vw, 138px)` Fraunces regular, tight line-height with word-level padding to prevent italic descender clip.
- Section headings: `clamp(36px, 5vw, 68px)` Fraunces regular, italic accent color spans.
- Body prose: 15 to 19px Fraunces 300, 1.5 line-height.
- Callout labels: 10 to 12px JetBrains Mono, 0.15em letter-spacing, uppercase.
- Metric numbers: 56px Fraunces italic in accent, with `margin-right: 0.08em` on `<em>` to prevent unit-symbol collision.

### Custom cursor

Fine crosshair. Two 1px fixed lines that follow the mouse (`h` horizontal, `v` vertical) with `mix-blend-mode: multiply` so they read as ink on paper. No dot, no ring. Desktop only (mobile keeps native).

---

## Information architecture

The v1 site (top to bottom):

1. **Nav** (fixed)
2. **Hero**
3. **Career trajectory** (Fig. 02)
4. **Metrics** (Fig. 03)
5. **Skills matrix** (Fig. 04)
6. **Projects** (Fig. 05)
7. **Writing** (Fig. 06)
8. **Contact** (Fig. 08)
9. **Footer**

Section header meta uses "Fig. NN" numbering as an architectural drawing convention.

### Deferred: Field Notes (Fig. 07)

Engineering-notebook section with real architecture drawings (CDC pipeline, real-time agent, Kafka producer tuning snippet). Code is already written and lives in the reference mockup behind a `<template data-section="field-notes">` wrapper so it does not render.

Enabled post-launch when there are 3+ polished notes worth showing. When enabling:

1. Delete the two `<template ...>` and `</template>` tags around the section.
2. Uncomment the `<li><a href="#notes">Field Notes</a></li>` line in the nav.

Kept in the file (not deleted) so it can ship in a single small commit.

---

## Motion system

The site is animation-forward. Motion is coherent (all diagrams draw themselves in, everything reveals with the same easing family) and never overwhelming.

### Signature moves

- **Hero name rise.** Two lines ("Bijin" / "Abraham") each wrapped in `.word { overflow:hidden; padding:0.04em 0 0.14em 0; margin:0 0 -0.14em 0; }`. Inner span translates from `translateY(120%)` to identity on 1.1s cubic-bezier. Padding + negative margin gives italic descenders room without breaking the tight visual line-height.
- **Underline draw.** After the name settles, a 2px underline animates from `width:0` to `width:220px` in 1.1s.
- **SVG stroke draw-in.** Portrait outline, career trajectory, project detail drawings, and (deferred) field-notes architecture diagrams all use `stroke-dasharray: 2000; stroke-dashoffset: 2000 to 0` on scroll enter. 2.0 to 2.2s ease-out.
- **Diagram callouts fade-in.** Staggered 200ms delays.
- **View toggle cross-fade.** Elevation and Section content blocks both live in the DOM; toggling `body[data-mode]` cross-fades them via opacity + subtle translateY in 0.5s.
- **Palette switch.** Instant. Sets `body[data-palette]` which overrides CSS custom properties on `:root` scope. No transition; the swap is the effect.
- **Metric cell reveal.** Fade + translateY on scroll, staggered per cell.
- **Project card expand.** Click header row toggles `.open` class. `.detail { max-height: 0 to 800px; transition: max-height 0.5s ease; }`. Chevron rotates 180deg.
- **Writing / role row hover.** `padding-left: 0 to 18px` on 0.35s cubic-bezier for an indent-on-hover effect.
- **Skill row hover.** Row background tint change.

### Timing

- Reveal transitions: 0.7 to 1.1s, `cubic-bezier(.15,.7,.15,1)`.
- Micro-interactions: 0.2 to 0.3s, ease.
- Path draws: 2.0 to 2.2s, ease-out.

### Motion library

- **Framer Motion 11** for orchestrated multi-element transitions (mode swap, hero sequence).
- **Native CSS** for hover, palette switch, most reveals.
- **IntersectionObserver** for scroll-triggered animations. Not scroll-linked (no parallax, no scrub). Everything is trigger-and-play, which is faster and less finicky on mobile.

---

## Section design contracts

Each section, top to bottom. All layout details are captured in the mockup; this doc records intent and constraints for the implementation.

### Section 1: Hero

Two-column grid. Left = content. Right = SVG portrait diagram.

**Left column:**
- Eyebrow: `Fig. 01 · Portrait, {mode}` (mono).
- Display name: "Bijin Abraham" over two lines with rise animation and drawn underline.
- Role line: mode-specific title, prefixed by a rust arrow.
- Body: Fraunces 300, 19px, max-width 520px, italic-accent phrases.
- CTAs: two buttons. Elevation says "See the trajectory" + "Hire me to lead". Section says "See the field notes" + "Hire me to build" (Field Notes is deferred; either update the label at v1 or point that CTA elsewhere until Field Notes ships).

**Right column:** SVG portrait diagram, 600x600 viewBox.
- Abstract head (circle) + shoulders (trapezoid) + neck (rectangle) + interior guides.
- Corner registration marks that draw on load.
- Dimension line at top: "7+ yr experience".
- Second dimension line: elevation shows "137% quota", section shows "3+ yr Confluent".
- Three mode-aware callouts. Two on the right use straight diagonals. One on the left uses an L-bend leader terminating at the label baseline (diagonals conflict with left-anchored text).
- Title block bottom-right: view mode, sheet number.

**Top-right doc stamp:** Doc №, Rev., current View, Drawn by. Uppercase mono, small.

### Section 2: Career trajectory (Fig. 02)

Two-track SVG chart, viewBox `0 -40 1200 600`.

- X-axis: years 2017 through 2026 with tick marks.
- Y-axis (left): Junior / Mid / SR IC / Expert labels.
- **People / leadership track:** rust solid, 2px. Rises from 2020 (Whatfix mentoring), major inflection at Team Lead 2024, peaks at Manager 2026.
- **Technical / IC depth track:** teal dashed, 1.5px. Rises steadily through all roles, peaks in SR IC / Expert range and plateaus (still SME).
- **Nodes:** HP (Junior), Whatfix (Sr SE), Deloitte (Sr Consultant), Confluent SE, Team Lead SE (accent-ring node, accent label), Manager SE (current, accent fill, larger radius).
- **Leadership span indicator:** rust bracket line above the chart spanning Team Lead to Manager, labeled "People Leadership Scope".
- **Right-side tech-track callout:** "Technical Depth" + "Still Rising · SME" in teal.
- **Legend below:** rust swatch = People track. Teal dashed = Technical depth.

Motion: both paths animate stroke-dashoffset when section enters viewport.

### Section 3: Metrics (Fig. 03)

4-cell grid, hairline borders.

- Cell format: mono label (top), giant Fraunces value (accent italic on the number), Fraunces italic caption.
- Values: `$1.1M` ARR closed, `137%` quota every quarter, `15 to 37` team scaled, `-50%` time-to-live.
- Top-right corner mark on each cell (L-shape, 12px, dim color) for drawing feel.
- Fade-up reveal, staggered per cell.
- Italic number to unit spacing: `em { margin-right: 0.08em; }` to prevent italic slant collision with `%` and `M`.

### Section 4: Skills matrix (Fig. 04)

Material-specifications table.

- Categories (bordered top row per category):
  - Streaming and data platforms
  - Cloud and infra
  - Languages and tools
  - Leadership and management
  - Go-to-market
- Columns: Skill (Fraunces + optional italic subtitle), L1, L2, L3, L4 (empty or filled boxes), Notes (Fraunces italic).
- **Level system:** L1 exposure, L2 working, L3 production, L4 SME / coach.
- SME rows (L4 highlighted) use accent-filled boxes to draw the eye.
- Legend at bottom explains levels and box variants.
- Row hover: warm tint (`background: rgba(255,240,220,0.4)`).

Ships with 15 skills covering the five categories. Explicitly includes:
- GenAI and LLM integration (L4 SME, sponsored 15-artifact library).
- Apache Kafka, Confluent Platform, Flink at L4.
- People management, hiring, coaching at L4.

### Section 5: Projects (Fig. 05)

Expandable cards. Click header to reveal detail drawing.

**Header row grid:** Proj number, title + one-line description, status pill (with pulsing accent dot for live projects), expand chevron.

**Detail (on expand):** SVG architecture drawing + "Design choices worth defending" bullet list + stack row.

v1 projects (in order):
1. **Atlas** · RN + Expo + SQLite mobile workout tracker. Detail drawing shows phone shell, SQLite box, and a deliberately-empty cloud-sync box labeled "privacy by absence".
2. **Sculptura** · Next.js + Sanity + Framer Motion client site at dsculptura.in. Detail drawing shows the CMS-driven pipeline with Vercel hosting.
3. **Psychology Traits Shorts** · autonomous YouTube pipeline in TypeScript. Detail drawing shows the seed to publish flow via GitHub Actions.
4. **Bijin Beyond Borders** · the personal site (Next.js SSG, D3 globe, canvas fx). Detail drawing shows data files feeding SSG feeding the motion layer feeding GH Pages.

Expand animation: `max-height: 0 to 800px`, `transition: 0.5s ease`. Chevron rotates 180deg.

### Section 6: Writing (Fig. 06)

Post index list. Placeholder titles at v1.

- Row grid: date (mono), title (Fraunces with italic accent word) + excerpt (Fraunces italic dim small), tag (accent mono, right-aligned).
- Hover: `padding-left: 0 to 18px`.
- v1 posts (placeholder titles; content deferred):
  - "On compression in producer configs" (Streaming)
  - "Hiring SEs who ship, not just slide" (Leadership)
  - "Onboarding that halved our time-to-live" (Leadership)
  - "The demo as design artifact" (Pre-sales, Craft)
  - "Building an artifact library that people actually use" (Enablement, SME)

If writing is not ready at launch, hide the section (single conditional) rather than shipping placeholders.

### Section 7: Field Notes (Fig. 07, deferred)

Engineering notebook with real architecture drawings and one code snippet. Full code in the mockup behind `<template>` wrapper.

Enable when there are 3+ polished notes with real customer-safe content. Do not ship placeholders here.

### Section 8: Contact (Fig. 08)

Full architectural title block styling. Bold 2px border, hairline internal grid.

- Header row: name (Fraunces 500 with italic accent surname) + drawing metadata (Discipline / Location / Availability).
- Body row: three cells (Email / LinkedIn / GitHub). Each cell has a mono label + Fraunces link + italic dim description.
- Footer row: four cells with drawing metadata (Drawing name, Sheet number, Revision, Drawn by).

### Nav

Fixed top with paper gradient fade.

- Left: logo (Fraunces regular with italic accent surname).
- Center: menu items in uppercase mono.
- Right: View toggle (Elevation | Section) + Palette swatch strip.
  - Palette switcher decision for prod: TBD in implementation. Options: keep as-is for exploration, hide behind a keyboard shortcut, or remove entirely.

---

## Tech stack

- **Framework:** Next.js 15 with App Router.
- **Language:** TypeScript strict.
- **Build target:** Static export via `next.config` `output: 'export'`. Full static, no server, no runtime dependencies at deploy time.
- **Styling:** Tailwind CSS 3 for utility + CSS Modules for complex per-component styles (matches Bijin Beyond Borders convention).
- **Motion:** Framer Motion 11 for orchestration + native CSS + IntersectionObserver.
- **Diagrams:** Vanilla inline SVG (no D3, no Three, no chart library at v1).
- **Fonts:** `next/font` self-hosted (Fraunces variable, JetBrains Mono, Inter, Caveat).
- **Icons:** none at v1. Everything is typography-driven.

---

## Deploy

- **Host:** GitHub Pages (user-page repo `bijinabraham.github.io` deploys to root URL).
- **Deploy URL:** https://bijinabraham.github.io
- **CI:** GitHub Actions workflow (`.github/workflows/deploy.yml`) builds Next.js and deploys via the official Pages action.
- **Dev server:** `NODE_OPTIONS='' npx next dev`. Matches the BBB dev-server quirk (`instrumentation.ts` polyfills the Claude Code `--localstorage-file` issue when relevant).
- **Push convention:** on this machine, `GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null git push origin <branch>` (corp git config bypass).
- **Custom domain:** not at v1. Consider `bijinabraham.dev` post-launch.

---

## Non-goals (v1)

Explicit deferrals to keep v1 shippable:

- No CMS. Content lives in TypeScript data files under `lib/`.
- No blog engine. Writing section is a static list.
- No analytics. Consider Plausible post-launch.
- No dark mode. FT Salmon warm identity is the point.
- No i18n.
- No search.
- No comments, discussion, or newsletter.
- No lightbox or image gallery on projects (single inline-expand pattern).
- No Field Notes at launch (deferred until real content is ready).

---

## Content sources

- **Resume:** `/Users/babraham/Downloads/Bijin Abraham - Resume.pdf` (verified 2026-07-04).
- **LinkedIn:** https://linkedin.com/in/bijinabraham
- **GitHub:** https://github.com/bijinabraham
- **Email:** bjabraham07@gmail.com
- **Existing personal site:** github.com/bijinabraham/bijin-beyond-borders (Bijin Beyond Borders, lifestyle site, referenced as Project 04).

---

## Content decisions (from brainstorming)

Locked in during the design conversation. Do not change without explicit revisit.

- **"7+ years"** not "seven years". Matches resume phrasing.
- **GenAI framing:** not in the hero copy or hero diagram callouts. Represented in the Skills Matrix as an L4 SME row under "Streaming and data platforms" with a note about the 15-artifact library. The writing post about the library uses "artifact library", not "GenAI artifact library", in the title.
- **Trajectory:** Team Lead is styled as a leadership role (accent-ring node, accent-colored label, "Team Lead, SE"). A "People Leadership Scope" bracket spans Team Lead through Manager.
- **Trajectory subtitles:** Title Case throughout ("Tech Support", "Senior SE", "Senior Consultant", "SE, Global", "Confluent AMER, Current", "Technical Depth", "Still Rising, SME").
- **No em dashes or en dashes** in any user-facing copy anywhere in the site. Use periods, commas, colons, or middle dots. This is a project-wide convention.
- **Bijin Beyond Borders is Project 04**, not omitted.
- **Portrait callout on left** uses an L-bend leader, not a diagonal. Diagonals conflict with left-anchored text.
- **Palette:** FT Salmon paper + deep navy ink + oxblood accent (`#8b2818`). Locked. Alternates preserved in mockup swatch strip for exploration but not shipped as user-facing choice by default.

---

## Success criteria

- **Peer share (soft):** a friend forwards the URL to another engineer within a week of launch.
- **Recruiter path:** at least one inbound within 30 days that references specific site content (not generic outreach).
- **IC positioning:** at least one IC-role conversation surfaces from a recruiter or peer within 60 days.
- **Performance:** Largest Contentful Paint under 2.5s on 4G, no Cumulative Layout Shift, no JS runtime errors.
- **Accessibility:** passes axe-core with no critical violations. Keyboard navigable. All interactive elements reachable.
- **Progressive enhancement:** with JavaScript disabled, content is still readable (SVG animations degrade to static, view toggle inert but default view visible, no broken layout).

---

## Open questions for implementation phase

Deferred to the plan and execution phases; recorded here so they are not forgotten.

1. **Custom domain:** skip for v1, decide post-launch.
2. **Analytics:** Plausible vs Vercel Analytics vs none vs GA4.
3. **Palette switcher in production:** keep as-is, hide behind keyboard shortcut, or remove entirely.
4. **Writing content:** ship with placeholder rows, or write 2-3 real posts first, or hide the section until content is ready.
5. **CI/CD:** GitHub Actions with the official Pages action (recommended) vs manual `out/` deploy.
6. **Cursor crosshair:** all breakpoints or desktop-only.
7. **Mobile UX:** hamburger menu vs stacked nav, view toggle placement on small screens.
8. **Metadata:** OG image (design one that matches the aesthetic), favicon, meta tags, Twitter card.
9. **SEO:** sitemap.xml, robots.txt.
10. **Print stylesheet:** nice-to-have for a portfolio (people print CVs).
11. **404 page:** should match the design language (drafting-error moment).
12. **Section 5 CTA fix:** current section-mode hero CTA points to "See the field notes" which is deferred. Point elsewhere or change label until Field Notes ships.

---

## Reference

The visual reference for this design is [`mockups/blueprint-v2.html`](../../../mockups/blueprint-v2.html). That file is the source of truth for palette, motion, and layout decisions.

When implementing, port from the mockup with these upgrades:

- **Component decomposition:** React components, not one HTML file.
- **Framer Motion** for state transitions instead of raw CSS animation for the mode swap and reveals.
- **`next/font`** for typography (self-hosted, no Google CDN in prod).
- **Inline SVG as JSX** so the mode-aware callouts can render conditionally from props rather than duplicated markup.
- **Palette custom properties** exposed via a small `ThemeProvider` if the palette switcher is kept in prod.

---

**Version:** 1.0
**Date:** 2026-07-04
