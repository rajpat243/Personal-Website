# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Raj Patel's personal portfolio, rebuilt as a dynamic multipage **React 18 + Vite** single-page application (client-side routed) and deployed to GitHub Pages at https://rajpat243.github.io/Personal-Website/. The previous static HTML/jQuery version is archived under `_legacy/` (see bottom).

## Commands

All scripts are defined in `package.json`:

```bash
npm run dev        # Vite dev server with HMR
npm run build      # production build to dist/
npm run preview    # serve the built dist/ locally
npm run deploy      # build, then publish dist/ to GitHub Pages via gh-pages
```

## Architecture

**Routing.** `src/main.jsx` mounts `<App />` inside a `BrowserRouter` whose `basename` is `import.meta.env.BASE_URL`. `src/App.jsx` declares the routes — `/` (Home), `/about`, `/experience`, `/projects`, `/contact`, plus a `*` catch-all that renders Home. Pages live in `src/pages/`, shared chrome (`Navbar`, `Footer`, `ScrollToTop`) and primitives live in `src/components/`.

**Content is centralized.** All site copy — `profile`, `about`, `skills`, `experience`, `education`, `certifications`, `projects`, `contact`, `stats` — is exported from `src/data/content.js`. Pages import from there; they hold layout/animation, not text. **To change wording, certifications, jobs, or projects, edit `src/data/content.js` only.** Project images are imported from `src/assets/img/` within that file.

**Tailwind CSS v4 — no config file.** Styling uses Tailwind v4 via the `@tailwindcss/vite` plugin (registered in `vite.config.js`). There is intentionally **no `tailwind.config.js`**. Design tokens are defined in `@theme` blocks in `src/index.css`: the brand cyan (`--color-brand: #06a5c5`), the blue→cyan signature gradient (`.brand-gradient` / `.brand-text-gradient`), ink colors, and the `Inter` / `Space Grotesk` font stacks. Anyone expecting a v3-style JS config will not find one — add or change tokens in `src/index.css`.

**Animation + reduced motion (Framer Motion v11).**
- `src/components/Reveal.jsx` — scroll-triggered fade-and-rise wrapper used for sections/cards.
- `src/components/PageTransition.jsx` — per-route enter/exit transition (and sets per-page `<title>`/meta), driven by the `AnimatePresence` keyed on `location.pathname` in `App.jsx`.
- `src/components/Counter.jsx` — count-up stat numbers triggered when scrolled into view.

`prefers-reduced-motion` is respected two ways: globally in `src/index.css` (a media query neutralizing animations and smooth scroll) and per-component via Framer Motion's `useReducedMotion`, which renders static states instead of animating.

**GitHub Pages base-path coupling.** Because the site lives at the `/Personal-Website/` subpath, three things must agree: `base: '/Personal-Website/'` in `vite.config.js` (built asset URLs), the router `basename={import.meta.env.BASE_URL}` in `main.jsx` (client routes), and any runtime asset reference built from `import.meta.env.BASE_URL` (e.g. the resume in `content.js` → `${import.meta.env.BASE_URL}Data_Resume.pdf`, served from `public/Data_Resume.pdf`). Change the subpath in one place and the others break. `public/404.html` and `public/.nojekyll` support SPA routing on Pages.

## Local install note

The project's npm registry is the corporate Nexus at `bond-master.prodlb.travp.net` (configured in the user's `~/.npmrc`), and the public npm registry is firewalled. The `~/.npmrc` currently has an **unfilled `_auth` placeholder**, so `npm install` will fail until valid Nexus credentials are supplied for that registry.

## `_legacy/`

`_legacy/` is the archived original site — a single-page static HTML/CSS/jQuery portfolio (`index.html` plus vendored plugins: superslides, owl.carousel, typed, countUp, easypiechart). It is preserved for reference and is **not** part of the build; do not edit it.
