# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the dev server (Next.js with Turbopack)
- `npm run build` — production build
- `npm run lint` — ESLint (flat config via `eslint-config-next`)
- `npm run typecheck` — `tsc --noEmit`
- `npm run format` — Prettier write across `**/*.{ts,tsx}` (uses `prettier-plugin-tailwindcss` for class sorting)

There is no test runner configured.

## Stack

Next.js 16 (App Router, React 19) · Tailwind CSS v4 (CSS-first, configured in `app/globals.css`, no `tailwind.config`) · shadcn/ui (style `base-lyra`, built on `@base-ui/react`) · Zustand for state · `next-themes` · `motion` · Zod · Hugeicons as the icon library.

Path alias `@/*` maps to the repo root (see `tsconfig.json`). Add shadcn components with `npx shadcn@latest add <name>` — they land in `components/ui`.

**shadcn here is NOT built on radix-ui primitives — use base-ui (`@base-ui/react`) instead.**

## Architecture

This is a portfolio site presented as a "brutalist IDE". The visual metaphor is an editor: a file-tree sidebar, a tab bar, and a content pane. **The IDE chrome is the whole app — it is NOT Next.js routing.** There is a single route (`app/page.tsx`); "pages" are an in-app concept managed by client state, not URL segments.

Layout assembly is in `app/layout.tsx`: `ThemeProvider` → `SidebarProvider` → `AppSidebar` + (`AppHeader` + `children`) + `AppFooter`. The `app/page.tsx` content area is currently an empty shell.

### The page/tab system (central concept)

`components/core/pages/` is the heart of the app:

- `types.ts` — `Pages` is a Zod enum of every selectable view (`README`, `Contact`, `About`, etc.). An `Item` is `{ name, page, icon }` where `name` is the displayed filename (e.g. `about.ts`) and `page` is the enum key. Adding a new view means extending the `pagesSchema` enum.
- `store.ts` — Zustand store holding `currentPage` and `openedPages` (the open tabs). Actions live under a nested `actions` object, consumed via the `usePagesActions()` selector. `changePage` opens a tab if not already open and focuses it; `removePage` closes a tab and falls back to the adjacent tab (never closes the last one).
- Per-view components (e.g. `readme.tsx`) render the content for a given `Pages` value. Most are stubs right now.

Three consumers read from this store: `AppSidebar` (file tree — clicking a file calls `changePage`), `AppHeader` (renders the tab bar from `openedPages`, with active-tab highlighting and close buttons), and the content pane.

`components/sidebar/items.tsx` defines the sidebar's static file tree as `groups` (root `/`, `projects/`, `.git/`). Each item's `page` must match a value in `pagesSchema`.

### State access pattern

Components subscribe narrowly with Zustand selectors and `useShallow` (from `zustand/shallow`) when reading multiple fields — see `app-header.tsx`. Follow this to avoid over-rendering. All store consumers are `"use client"`.

### Theming

`components/theme-provider.tsx` wraps `next-themes` (class strategy, system default) and registers a global `d` keypress hotkey to toggle light/dark (ignored while typing in inputs). The header also exposes a click toggle. Theme tokens are CSS variables defined in `app/globals.css`.

## Conventions

- Tabs/clickable divs use explicit `role="button"`, `tabIndex={0}`, and `onKeyDown` Enter/Space handlers rather than native buttons — match this when adding interactive non-button elements.
- Tailwind v4 important modifiers appear as trailing `!` (e.g. `px-0!`, `bg-foreground!`); data-state styling uses `data-active:` variants.
- Fonts are wired as CSS variables in `app/layout.tsx` (`--font-sans`, `--font-mono`, `--font-heading`).
