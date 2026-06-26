# Raj Patel — Portfolio

Personal portfolio site: a dynamic, multipage React single-page application.

**Live:** https://rajpat243.github.io/Personal-Website/

## Tech stack

- **Vite** 6 + **React** 18
- **React Router** v6 — client-side routing
- **Tailwind CSS** v4 via `@tailwindcss/vite` (no `tailwind.config.js`; design tokens live in `@theme` blocks in `src/index.css`)
- **Framer Motion** v11 — scroll reveals, route transitions, count-up stats
- **GitHub Pages** + `gh-pages` for deployment

## Quick start

```bash
npm install        # install dependencies
npm run dev        # start the dev server (HMR)
npm run build      # build for production -> dist/
npm run preview    # preview the production build locally
```

## Project structure

```
src/
  main.jsx            App entry; BrowserRouter (basename = import.meta.env.BASE_URL)
  App.jsx             Routes + page transitions (AnimatePresence)
  index.css           Tailwind import + @theme design tokens (brand cyan, gradient, fonts)
  pages/              One file per route: Home, About, Experience, Projects, Contact
  components/         Navbar, Footer, Reveal, PageTransition, Counter, ScrollToTop, ...
  data/content.js     Single source of truth for ALL site content
  assets/img/         Project images
public/               Static files served as-is (Data_Resume.pdf, favicon, 404.html)
_legacy/              Archived original static HTML/jQuery site (not built)
```

Routes: `/` (Home), `/about`, `/experience`, `/projects`, `/contact`.

**Editing content:** all copy — profile, skills, experience, education, certifications, projects, and contact info — lives in `src/data/content.js`. Edit that one file to update the site's text.

## Deployment

Hosted on GitHub Pages as a project site under the `/Personal-Website/` base path. Vite's `base` (`vite.config.js`) and the router `basename` are both set to this subpath. Publish with:

```bash
npm run deploy     # builds and pushes dist/ to the gh-pages branch
```
