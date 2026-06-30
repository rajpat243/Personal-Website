# Dark / Light Mode Toggle — Design Spec

**Date:** 2026-06-29  
**Status:** Approved

## Overview

Add a user-togglable dark/light mode to the portfolio site. Dark mode is the existing design. Light mode uses a light-gray (`#F0F2F5`) background with the same cyan (`#51E4FF`) accent. The chosen theme persists in `localStorage` and defaults to dark for first-time visitors.

---

## 1. Color Token Architecture

Two-layer system using Tailwind v4's `@theme inline`.

### Layer 1 — Raw CSS vars (defined per theme)

```css
:root {
  --bg: #F0F2F5; 
  --surface: #FFFFFF;
  --surface-raised: #E8EAED; 
  --border: rgba(0,0,0,0.08);
  --border-strong: rgba(0,0,0,0.15);
  --text: #111318;
  --text-soft: #5C6370;
  --text-xsoft: #8A909B;
  --dot-grid: rgba(0,0,0,0.055);
  --scrollbar-thumb: #B0B5BE;
}

.dark {
  --bg: #07080A;
  --surface: rgba(255,255,255,0.022);
  --surface-raised: rgba(255,255,255,0.05);
  --border: rgba(255,255,255,0.10);
  --border-strong: rgba(255,255,255,0.20);
  --text: #ECEEF1;
  --text-soft: #9AA1AD;
  --text-xsoft: #6B7280;
  --dot-grid: rgba(255,255,255,0.022);
  --scrollbar-thumb: #22262c;
}
```

### Layer 2 — Tailwind utilities (`@theme inline`)

```css
@theme inline {
  --color-bg: var(--bg);
  --color-surface: var(--surface);
  --color-surface-raised: var(--surface-raised);
  --color-border: var(--border);
  --color-border-strong: var(--border-strong);
  --color-text: var(--text);
  --color-text-soft: var(--text-soft);
  --color-text-xsoft: var(--text-xsoft);
}
```

Usable in JSX as: `bg-bg`, `bg-surface`, `hover:bg-surface-raised`, `text-text`, `text-text-soft`, `text-text-xsoft`, `border-border`, `border-border-strong`.

---

## 2. Theme State Management

**New file:** `src/context/ThemeContext.jsx`

- `useState` initializes from `localStorage.getItem('theme')`, defaults to `'dark'`
- `useEffect` syncs `document.documentElement.classList` (`.dark` class) and writes to `localStorage` on every change
- Exports `ThemeProvider` (wraps app) and `useTheme()` hook returning `{ dark, toggle }`

**Wired up in:** `src/main.jsx` — `<ThemeProvider>` wraps `<App />`

---

## 3. Toggle Button

**New files:**
- `SunIcon` and `MoonIcon` SVGs added to `src/components/Icons.jsx`
- `src/components/ThemeToggle.jsx` — button component consuming `useTheme()`

**Behavior:**
- Shows ☀ sun icon when in dark mode (click → switch to light)
- Shows 🌙 moon icon when in light mode (click → switch to dark)
- Icon switches with a Framer Motion fade/rotate via `AnimatePresence`
- Button styled: `h-9 w-9 rounded-lg text-text-soft hover:bg-surface-raised` — matches existing icon button style

**Placement:**
- **Desktop Navbar:** after the Resume button, far right
- **Mobile menu:** top of the slide-down panel, right-aligned

---

## 4. Component Color Migration

All hardcoded dark color values replaced with semantic tokens. Applies to: `App.jsx`, `Navbar.jsx`, `Footer.jsx`, `Home.jsx`, `About.jsx`, `Experience.jsx`, `Projects.jsx`, `Contact.jsx`, `PipelineCanvas.jsx`, `PageHeader.jsx`.

| Old value | New token |
|---|---|
| `bg-[#07080A]` | `bg-bg` |
| `bg-white/[.022]`, `bg-white/[.012]` | `bg-surface` |
| `hover:bg-white/8`, `hover:bg-white/10` | `hover:bg-surface-raised` |
| `border-white/8`, `border-white/10` | `border-border` |
| `border-white/15`, `border-white/20` | `border-border-strong` |
| `text-white` | `text-text` |
| `text-white/60`, `text-white/70` | `text-text-soft` |
| `text-white/40`, `text-white/50`, `text-white/55` | `text-text-xsoft` |
| `text-[#F4F6F8]`, `text-[#F0F2F5]`, `text-[#ECEEF1]` | `text-text` |
| `text-[#C3C9D4]`, `text-[#9AA1AD]`, `text-[#B8BEC8]` | `text-text-soft` |

---

## 5. Special Cases

### Dot grid (`App.jsx`)
The inline style background uses a hardcoded `rgba(255,255,255,0.022)`. Replace with `var(--dot-grid)` directly in the inline style object — no Tailwind class needed.

### Scrollbar (`index.css`)
Update existing scrollbar rules to use CSS vars:
```css
body::-webkit-scrollbar-track { background: var(--bg); }
body::-webkit-scrollbar-thumb { background: var(--scrollbar-thumb); border-radius: 6px; }
```

### Pipeline canvas (`PipelineCanvas.jsx`)
The canvas draws its own background. Pass the current theme (via `useTheme()`) as a prop or read a CSS var inside the draw function. In light mode: use `#F0F2F5` canvas background, darken node/edge colors to remain visible (e.g., node borders `rgba(0,0,0,0.15)`, text `#111318`).

### Brand / CTA buttons
Keep `text-[#07080A]` on brand-colored buttons — dark text on cyan is intentional and correct in both themes. Do not migrate these.

### Ambient orbs
Use `bg-brand/10` and `bg-[#38bdf8]/8` — semi-transparent cyan, fine on both backgrounds. No change needed.

### Cursor glow
`rgba(81,228,255,0.09)` — subtle cyan glow, visible enough on both backgrounds. No change needed.

---

## 6. Files Changed

| File | Change |
|---|---|
| `src/index.css` | Add raw CSS vars, `@theme inline` block, update scrollbar rules, update `body` bg/color to use tokens |
| `src/main.jsx` | Wrap `<App>` in `<ThemeProvider>` |
| `src/context/ThemeContext.jsx` | **New** — theme state + localStorage |
| `src/components/ThemeToggle.jsx` | **New** — sun/moon toggle button |
| `src/components/Icons.jsx` | Add `SunIcon`, `MoonIcon` |
| `src/components/Navbar.jsx` | Add toggle (desktop + mobile), migrate colors |
| `src/App.jsx` | Update dot grid inline style, migrate body/wrapper colors |
| `src/components/Footer.jsx` | Migrate colors |
| `src/components/PageHeader.jsx` | Migrate colors |
| `src/components/PipelineCanvas.jsx` | Theme-aware canvas drawing |
| `src/pages/Home.jsx` | Migrate colors |
| `src/pages/About.jsx` | Migrate colors |
| `src/pages/Experience.jsx` | Migrate colors |
| `src/pages/Projects.jsx` | Migrate colors |
| `src/pages/Contact.jsx` | Migrate colors |
