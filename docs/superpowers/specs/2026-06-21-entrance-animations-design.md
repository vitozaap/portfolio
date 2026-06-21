# Entrance Animations Design

**Date:** 2026-06-21  
**Status:** Approved

## Context

The portfolio (brutalist IDE theme) is fully functional but all page content appears instantly on tab switch. Adding entrance animations makes the site feel more alive and reinforces the IDE metaphor — content "loading in" like code being typed. The user chose a **clip-reveal** style (left-to-right via `clip-path`) with **dramatic stagger timing**, applied to all 5 pages, triggered every time a tab is opened.

## Design Decisions

| Decision | Choice | Reason |
|---|---|---|
| Animation style | Clip-reveal (`clip-path: inset(0 100% 0 0 → 0 0% 0 0)`) | Matches the IDE/typewriter metaphor |
| Trigger | Every tab switch | Most dynamic; natural because each page unmounts/remounts on switch |
| Scope | All 5 pages | README, about.ts, skills.json, contact.yml, package.json |
| Stagger | 100ms between items | "Dramatic" — each element has its own moment |
| Duration | 400ms per item | Enough to read the animation clearly |
| Easing | `easeOut` | Crisp start, soft landing |
| Progress bars | Fill from 0% → value after clip reveal (+100ms delay) | Secondary animation on skills page only |
| Accessibility | Respect `useReducedMotion()` — skip animation if true | Consistent with existing cursor and IdeRunnable |

## How Tab-Switch Triggering Works (No Extra Code Needed)

`app/page.tsx` renders `currentPage.page.component` directly. Because each page is a different component type (Readme, About, Skills, Contact, Package), React fully unmounts the old one and mounts the new one on every tab switch. Entrance animations on mount fire naturally — no `key` prop or `AnimatePresence` needed at the router level.

## Animation Variants (Shared Pattern)

All pages use the same `motion` variants structure from `motion/react` (already installed at v12.39.0):

```tsx
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const itemVariant = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  show: {
    clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}
```

The parent wraps with `<motion.div variants={container} initial="hidden" animate="show">` and each animated child gets `<motion.div variants={itemVariant}>`.

For reduced motion: wrap with `useReducedMotion()` and skip `initial`/`animate` props if true.

## Per-Page Breakdown

### README.md
Animated elements (staggered):
1. Hero title block ("VICTOR / SANTOS" + tagline)
2. Badges row
3. Info card "olá, mundo"
4. Info card "navegação"
5–11. Each FileCard (7 cards, stagger continues)
12. "tl;dr" summary card

### about.ts
Animated elements (staggered):
1. `interface Engineer {` block
2. Each field line (name, role, location, passions — 4 lines)
3. `}` closing bracket
4. `export class Victor` section header
5. Constructor/method blocks as groups

Note: The `IdeRunnable` component (EXECUTAR button) already has its own `AnimatePresence` animation — leave it untouched.

### skills.json
Animated elements (staggered):
1. Opening bracket `{`
2–12. Each skill row (11 items)
13. Closing bracket `}`

Secondary animation on each skill row: progress bar fills from 0% → level value, delayed +100ms after the row's clip reveal.

### contact.yml
Animated elements (staggered):
1–3. Each ContactCard (email, LinkedIn, GitHub)

### package.json
Animated elements (staggered):
1. `meta` section group
2. `keywords` section group
3. `dependencies` section group
4. `devDependencies` section group
5. `scripts` section group

## File Changes

- `components/core/pages/readme/readme.tsx` — wrap hero, badges, and FileCards in motion container
- `components/core/pages/about/about.tsx` — wrap code blocks in motion container
- `components/core/pages/skills/skills.tsx` — wrap skill rows in motion container
- `components/core/pages/skills/level.tsx` — add bar fill animation
- `components/core/pages/contact/contact.tsx` — wrap ContactCards in motion container
- `components/core/pages/package/package.tsx` — wrap JSON section groups in motion container

No new files needed — the shared variants pattern is small enough to inline or repeat across the 5 files without abstraction.

## Verification

1. `npm run dev` — start dev server
2. Click each sidebar item (README, about.ts, skills.json, contact.yml, package.json) — animation should play every time
3. Switch between tabs rapidly — animations should restart on each switch
4. Check `skills.json` — progress bars should fill after each row reveals
5. `npm run typecheck` — no TypeScript errors
6. `npm run lint` — no lint errors
7. Test with OS reduced-motion enabled (macOS: Settings → Accessibility → Reduce Motion) — content should appear instantly, no animation
