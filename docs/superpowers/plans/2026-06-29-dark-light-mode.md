# Dark / Light Mode Toggle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a persisted dark/light mode toggle to the portfolio, defaulting to dark for new visitors, stored in localStorage, switchable via a sun/moon button in the Navbar.

**Architecture:** Semantic CSS tokens (`:root` light / `.dark` dark) are registered via Tailwind v4's `@theme inline` so `bg-bg`, `text-text`, `border-border`, etc. work as Tailwind utilities. A React `ThemeContext` owns the state, syncs `html.dark`, and writes to localStorage. An inline script in `index.html` reads localStorage synchronously before paint to prevent a flash of the wrong theme.

**Tech Stack:** React 18, Tailwind CSS v4 (`@tailwindcss/vite`), Framer Motion v11, Vite, `localStorage`.

## Global Constraints

- Tailwind v4 — no `tailwind.config.js`; tokens live in `src/index.css`
- `@theme inline` (not plain `@theme`) is required for CSS-var-referencing tokens
- Default theme is dark — `localStorage` missing means `.dark` class applied
- Brand cyan (`#51E4FF`) and CTA button text (`text-[#07080A]`) are intentional constants, never migrated to semantic tokens
- Accent colors `#C6F24E` (About page "ETL") and `#FF9900` (AWS icon) are left hardcoded
- Resume button background is always `bg-brand text-[#07080A]` — not migrated

---

### Task 1: CSS Foundation

**Files:**
- Modify: `src/index.css`
- Modify: `index.html`

**Interfaces:**
- Produces: Tailwind utilities `bg-bg`, `bg-surface`, `bg-surface-raised`, `text-text`, `text-text-soft`, `text-text-xsoft`, `border-border`, `border-border-strong`, `ring-bg` — usable in all subsequent tasks
- Produces: CSS vars `--dot-grid`, `--scrollbar-thumb` for use in inline styles and CSS rules
- Produces: `.dark` class on `<html>` controls the active theme

- [ ] **Step 1: Update `src/index.css`**

Replace the entire file with:

```css
@import "tailwindcss";

@theme {
  --color-brand: #51E4FF;
  --color-brand-light: #80edff;
  --color-brand-dark: #0ba8c8;
  --color-ink: #ECEEF1;
  --color-ink-soft: #9AA1AD;

  --font-sans: "Hanken Grotesk", "Inter", ui-sans-serif, system-ui, -apple-system, sans-serif;
  --font-display: "Bricolage Grotesque", "Space Grotesk", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
}

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

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-sans);
  color: var(--text);
  background-color: var(--bg);
  -webkit-font-smoothing: antialiased;
  transition: background-color 0.2s ease, color 0.2s ease;
}

body::-webkit-scrollbar { width: 8px; }
body::-webkit-scrollbar-track { background: var(--bg); }
body::-webkit-scrollbar-thumb { background: var(--scrollbar-thumb); border-radius: 6px; }

.brand-gradient {
  background-image: linear-gradient(135deg, #38bdf8, var(--color-brand));
}

.brand-text-gradient {
  background-image: linear-gradient(135deg, #38bdf8, var(--color-brand));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

@keyframes caret-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
.type-caret {
  animation: caret-blink 1s step-end infinite;
  font-weight: 400;
}

@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
.marquee-track {
  animation: marquee 38s linear infinite;
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(81, 228, 255, 0.55); }
  50% { box-shadow: 0 0 0 7px rgba(81, 228, 255, 0); }
}
.pulse-glow {
  animation: pulse-glow 2.4s ease-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}
```

- [ ] **Step 2: Add anti-flash inline script to `index.html`**

Add this script block as the **first child of `<head>`**, before everything else:

```html
<script>
  (function() {
    var t = localStorage.getItem('theme');
    if (t === 'light') { document.documentElement.classList.remove('dark'); }
    else { document.documentElement.classList.add('dark'); }
  })();
</script>
```

The full `<head>` opening should look like:
```html
<head>
  <script>
    (function() {
      var t = localStorage.getItem('theme');
      if (t === 'light') { document.documentElement.classList.remove('dark'); }
      else { document.documentElement.classList.add('dark'); }
    })();
  </script>
  <meta charset="UTF-8" />
  <!-- ... rest unchanged ... -->
```

- [ ] **Step 3: Verify tokens are available**

Run the dev server:
```bash
npm run dev
```

Open the browser, open DevTools → Elements → select `<html>`. Confirm:
- It has the `dark` class (since localStorage is empty on first visit)
- In DevTools Console: `getComputedStyle(document.documentElement).getPropertyValue('--bg')` returns `#07080A`
- Toggle the `dark` class off manually in Elements — the page background should shift to light gray `#F0F2F5`

- [ ] **Step 4: Commit**

```bash
git add src/index.css index.html
git commit -m "feat: add semantic CSS theme tokens and anti-flash script"
```

---

### Task 2: ThemeContext + wire into main.jsx

**Files:**
- Create: `src/context/ThemeContext.jsx`
- Modify: `src/main.jsx`

**Interfaces:**
- Produces: `ThemeProvider` component (wraps the app)
- Produces: `useTheme()` hook returning `{ dark: boolean, toggle: () => void }`
- Consumes: nothing from other tasks

- [ ] **Step 1: Create `src/context/ThemeContext.jsx`**

```jsx
import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved !== 'light'
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <ThemeContext.Provider value={{ dark, toggle: () => setDark((v) => !v) }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
```

- [ ] **Step 2: Wrap `<App />` in `src/main.jsx`**

Replace the entire file:

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
)
```

- [ ] **Step 3: Verify context works**

With the dev server running, open React DevTools → Components. Find `ThemeProvider`. Confirm it has state `dark: true`. Open browser console and run:

```js
// manually test toggle by finding the context — just verify no errors at this point
console.log('ThemeContext mounted OK')
```

No console errors = pass.

- [ ] **Step 4: Commit**

```bash
git add src/context/ThemeContext.jsx src/main.jsx
git commit -m "feat: add ThemeContext with localStorage persistence"
```

---

### Task 3: Sun/Moon Icons + ThemeToggle Component

**Files:**
- Modify: `src/components/Icons.jsx`
- Create: `src/components/ThemeToggle.jsx`

**Interfaces:**
- Consumes: `useTheme()` from `src/context/ThemeContext.jsx`
- Produces: `<ThemeToggle />` component — a button that toggles theme, used in Task 4

- [ ] **Step 1: Add `SunIcon` and `MoonIcon` to `src/components/Icons.jsx`**

Append these two exports at the end of the file:

```jsx
export function SunIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  )
}

export function MoonIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}
```

- [ ] **Step 2: Create `src/components/ThemeToggle.jsx`**

```jsx
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext.jsx'
import { SunIcon, MoonIcon } from './Icons.jsx'

export default function ThemeToggle() {
  const { dark, toggle } = useTheme()

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="grid h-9 w-9 place-items-center rounded-lg text-text-soft transition-colors hover:bg-surface-raised hover:text-text"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={dark ? 'moon' : 'sun'}
          initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 30, scale: 0.8 }}
          transition={{ duration: 0.18 }}
          className="flex items-center justify-center"
        >
          {dark ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
```

- [ ] **Step 3: Verify the component renders**

In `src/App.jsx`, temporarily add `<ThemeToggle />` just after the opening `<div>`, save, confirm it appears as a small icon button in the top-left. Then remove it — it will be properly placed in Task 4.

- [ ] **Step 4: Commit**

```bash
git add src/components/Icons.jsx src/components/ThemeToggle.jsx
git commit -m "feat: add SunIcon, MoonIcon, and ThemeToggle component"
```

---

### Task 4: Navbar — Toggle Integration + Color Migration

**Files:**
- Modify: `src/components/Navbar.jsx`

**Interfaces:**
- Consumes: `<ThemeToggle />` from `src/components/ThemeToggle.jsx`
- Consumes: semantic tokens from Task 1 (`bg-bg`, `border-border`, `text-text`, `text-text-soft`, `bg-surface-raised`)

- [ ] **Step 1: Replace `src/components/Navbar.jsx`**

```jsx
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { MenuIcon, CloseIcon } from './Icons.jsx'
import ThemeToggle from './ThemeToggle.jsx'

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/experience', label: 'Experience' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const linkClass = ({ isActive }) =>
    [
      'relative font-mono text-[11.5px] font-medium uppercase tracking-[0.08em] transition-colors px-3 py-2 rounded-lg',
      isActive ? 'text-brand' : 'text-text-soft hover:text-text',
    ].join(' ')

  return (
    <header
      className={[
        'sticky top-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-bg/80 backdrop-blur-md border-b border-border'
          : 'bg-transparent',
      ].join(' ')}
    >
      <nav
        className={[
          'mx-auto flex max-w-6xl items-center justify-between px-5 transition-all duration-300',
          scrolled ? 'h-14' : 'h-20',
        ].join(' ')}
      >
        <Link to="/" className="flex items-center gap-3 text-decoration-none">
          <span className="grid h-8 w-8 place-items-center rounded-lg shadow">
            <img src={`${import.meta.env.BASE_URL}favicon.png`} alt="Logo" className="h-8 w-8 object-contain" />
          </span>
          <span className="hidden font-display text-[15px] font-semibold tracking-tight text-text sm:inline">
            Raj Patel
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} className={linkClass}>
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-brand"
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
          <li>
            <a
              href={`${import.meta.env.BASE_URL}Data_Resume.pdf`}
              target="_blank"
              rel="noreferrer"
              className="ml-2 inline-flex items-center rounded-[9px] bg-brand px-4 py-2 font-mono text-[11.5px] font-semibold uppercase tracking-[0.06em] text-[#07080A] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(81,228,255,0.28)]"
            >
              Resume ↗
            </a>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="grid h-10 w-10 place-items-center rounded-lg text-text-soft hover:bg-surface-raised"
          >
            {menuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-b border-border bg-bg/95 backdrop-blur-md md:hidden"
          >
            <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-3">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    end={l.end}
                    className={({ isActive }) =>
                      [
                        'block rounded-lg px-3 py-2.5 font-mono text-sm font-medium uppercase tracking-wide transition-colors',
                        isActive ? 'bg-brand/10 text-brand' : 'text-text-soft hover:bg-surface-raised hover:text-text',
                      ].join(' ')
                    }
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
```

- [ ] **Step 2: Verify in browser**

With `npm run dev` running:
- Dark mode: Navbar has dark background when scrolled, links are gray/brand, toggle shows sun icon
- Click toggle: page switches to light mode, Navbar text/bg updates, toggle shows moon icon
- Mobile viewport: toggle appears next to hamburger icon, mobile menu shows light/dark correctly

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.jsx
git commit -m "feat: add ThemeToggle to Navbar and migrate Navbar colors"
```

---

### Task 5: App.jsx — Dot Grid + Wrapper Colors

**Files:**
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `--dot-grid` CSS var from Task 1

- [ ] **Step 1: Replace `src/App.jsx`**

```jsx
import { useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Experience from './pages/Experience.jsx'
import Projects from './pages/Projects.jsx'
import Contact from './pages/Contact.jsx'

export default function App() {
  const location = useLocation()
  const glowRef = useRef(null)

  useEffect(() => {
    const glow = glowRef.current
    if (!glow) return
    const onMove = (e) => {
      glow.style.opacity = '1'
      glow.style.left = e.clientX + 'px'
      glow.style.top = e.clientY + 'px'
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-bg text-text">
      {/* Ambient dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            `linear-gradient(var(--dot-grid) 1px, transparent 1px), linear-gradient(90deg, var(--dot-grid) 1px, transparent 1px)`,
          backgroundSize: '62px 62px',
          WebkitMaskImage: 'radial-gradient(circle at 50% 30%, #000, transparent 78%)',
          maskImage: 'radial-gradient(circle at 50% 30%, #000, transparent 78%)',
        }}
      />
      {/* Cursor glow */}
      <div
        ref={glowRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '480px',
          height: '480px',
          pointerEvents: 'none',
          zIndex: 30,
          transform: 'translate(-50%, -50%)',
          opacity: 0,
          background: 'radial-gradient(circle, rgba(81,228,255,0.09), transparent 65%)',
          transition: 'opacity 0.4s',
          borderRadius: '50%',
        }}
      />

      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  )
}
```

- [ ] **Step 2: Verify dot grid**

Toggle between light and dark mode. The dot grid should be visible as very faint dark lines on the light gray background, and faint white lines on the dark background.

- [ ] **Step 3: Commit**

```bash
git add src/App.jsx
git commit -m "feat: migrate App.jsx dot grid and wrapper to semantic tokens"
```

---

### Task 6: Footer + PageHeader Migration

**Files:**
- Modify: `src/components/Footer.jsx`
- Modify: `src/components/PageHeader.jsx`

**Interfaces:**
- Consumes: semantic tokens from Task 1

- [ ] **Step 1: Replace `src/components/Footer.jsx`**

```jsx
import { Link } from 'react-router-dom'
import { contact, profile } from '../data/content.js'
import { GithubIcon, LinkedinIcon, MailIcon } from './Icons.jsx'

const socials = [
  { href: contact.github, label: 'GitHub', Icon: GithubIcon },
  { href: contact.linkedin, label: 'LinkedIn', Icon: LinkedinIcon },
  { href: `mailto:${contact.email}`, label: 'Email', Icon: MailIcon },
]

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row">
        <div className="text-center sm:text-left">
          <Link to="/" className="font-display text-base font-bold text-text">
            {profile.name}
          </Link>
          <p className="text-sm text-text-soft">{profile.headline}</p>
        </div>

        <div className="flex items-center gap-3">
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto:') ? undefined : '_blank'}
              rel="noreferrer"
              aria-label={label}
              className="grid h-10 w-10 place-items-center rounded-full border border-border-strong text-text-xsoft transition-colors hover:border-brand hover:text-brand"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-border py-4">
        <p className="text-center font-mono text-xs text-text-xsoft">
          © 2026 {profile.name} — Hartford, CT
        </p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Replace `src/components/PageHeader.jsx`**

```jsx
import { motion, useReducedMotion } from 'framer-motion'

export default function PageHeader({ eyebrow, title, subtitle }) {
  const reduce = useReducedMotion()
  return (
    <section className="relative overflow-hidden bg-bg text-text">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full bg-brand-light/30 blur-3xl"
        animate={reduce ? undefined : { x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-brand/30 blur-3xl"
        animate={reduce ? undefined : { x: [0, -30, 0], y: [0, -16, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {eyebrow && (
            <p className="mb-3 font-mono text-[12px] font-medium uppercase tracking-[0.2em] text-brand">{eyebrow}</p>
          )}
          <h1 className="font-display text-4xl font-bold tracking-tight text-text sm:text-5xl">{title}</h1>
          {subtitle && <p className="mt-4 max-w-2xl text-lg text-text-soft">{subtitle}</p>}
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Verify**

Navigate to `/about`, `/experience`, `/projects`, `/contact`. In both themes check:
- PageHeader background matches the page background
- Footer text and icons are visible
- Footer social icon borders visible in both themes

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.jsx src/components/PageHeader.jsx
git commit -m "feat: migrate Footer and PageHeader to semantic tokens"
```

---

### Task 7: Home.jsx Migration

**Files:**
- Modify: `src/pages/Home.jsx`

**Interfaces:**
- Consumes: semantic tokens from Task 1

- [ ] **Step 1: Replace `src/pages/Home.jsx`**

```jsx
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import PageTransition from '../components/PageTransition.jsx'
import Reveal from '../components/Reveal.jsx'
import Counter from '../components/Counter.jsx'
import RotatingWords from '../components/RotatingWords.jsx'
import PipelineCanvas from '../components/PipelineCanvas.jsx'
import { ArrowRightIcon, DownloadIcon, GithubIcon, LinkedinIcon } from '../components/Icons.jsx'
import { profile, skills, stats, projects, contact } from '../data/content.js'

const MARQUEE_ITEMS = [
  'PYTHON', 'DBT', 'SPARK', 'SNOWFLAKE', 'AWS GLUE', 'BEDROCK',
  'SQL', 'DATABRICKS', 'REACT', 'MCP', 'QLIK SENSE', 'DOCKER',
]

export default function Home() {
  const reduce = useReducedMotion()

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  }
  const item = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  }

  const featured = projects.slice(0, 3)

  return (
    <PageTransition title="Raj Patel — Data Engineer" description={profile.tagline}>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative z-10 overflow-hidden bg-bg">
        <div aria-hidden="true" className="pointer-events-none absolute -top-48 -left-40 h-[620px] w-[620px] rounded-full bg-brand/10 blur-[80px]" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-64 -right-44 h-[640px] w-[640px] rounded-full bg-[#38bdf8]/8 blur-[80px]" />

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 py-28 sm:py-36 lg:grid-cols-[1.1fr_0.9fr]"
        >
          {/* Left column */}
          <div>
            <motion.p
              variants={item}
              className="mb-5 font-mono text-[12.5px] tracking-[0.16em] text-brand"
            >
              // {profile.location} — {profile.headline}
            </motion.p>

            <motion.h1
              variants={item}
              className="font-display text-5xl font-bold leading-[0.96] tracking-tight text-text sm:text-7xl lg:text-[84px]"
            >
              {profile.name}
            </motion.h1>

            <motion.div
              variants={item}
              className="mt-5 flex items-baseline gap-3 font-display text-2xl font-semibold sm:text-3xl"
            >
              <span className="text-text-soft">Building</span>
              <RotatingWords
                words={profile.roles}
                className="text-brand"
              />
            </motion.div>

            <motion.p
              variants={item}
              className="mt-6 max-w-[480px] text-[17px] leading-[1.65] text-text-soft"
            >
              {profile.tagline}
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-[11px] bg-brand px-6 py-3 text-sm font-semibold text-[#07080A] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(81,228,255,0.26)]"
              >
                View Projects →
              </Link>
              <a
                href={contact.resume}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-[11px] border border-border-strong px-6 py-3 text-sm font-semibold text-text transition-colors hover:bg-surface-raised hover:border-border-strong"
              >
                <DownloadIcon className="h-4 w-4" />
                Download Resume
              </a>
            </motion.div>

            <motion.div variants={item} className="mt-7 flex items-center gap-5">
              <a
                href={contact.github}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs tracking-[0.05em] text-text-xsoft transition-colors hover:text-brand"
              >
                GITHUB
              </a>
              <span className="h-1 w-1 rounded-full bg-border-strong" />
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs tracking-[0.05em] text-text-xsoft transition-colors hover:text-brand"
              >
                LINKEDIN
              </a>
              <span className="h-1 w-1 rounded-full bg-border-strong" />
              <a
                href={`mailto:${contact.email}`}
                className="font-mono text-xs tracking-[0.05em] text-text-xsoft transition-colors hover:text-brand"
              >
                EMAIL
              </a>
            </motion.div>
          </div>

          {/* Right column — pipeline widget */}
          <motion.div variants={item} className="hidden lg:block">
            <PipelineCanvas />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Stats strip ──────────────────────────────────────────────────── */}
      <section className="relative z-10 border-y border-border bg-surface">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-0 px-5 sm:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="border-l border-border px-6 py-10">
                <div className="font-display text-5xl font-bold leading-none tracking-tight text-brand">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-text-soft">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Marquee ticker ───────────────────────────────────────────────── */}
      <div
        className="relative z-10 overflow-hidden border-b border-border py-5"
        style={{
          WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
          maskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
        }}
      >
        <div className="marquee-track flex w-max items-center gap-10 font-mono text-sm tracking-[0.04em] whitespace-nowrap">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((label, i) => (
            <span key={i} className="flex items-center gap-10">
              <span className="text-text-xsoft">{label}</span>
              <span className="text-brand text-xs">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Skills showcase ──────────────────────────────────────────────── */}
      <section className="relative z-10 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <div className="mb-12 flex items-center gap-4">
              <span className="font-mono text-[12px] text-brand">02</span>
              <span className="font-mono text-[12px] uppercase tracking-[0.22em] text-text-soft">Skills &amp; Toolbox</span>
              <span className="h-px flex-1 bg-border" />
            </div>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2">
            {skills.map((group, gi) => (
              <Reveal key={group.category} delay={gi * 0.08}>
                <div className="h-full rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-border-strong">
                  <h3 className="mb-4 font-display text-lg font-semibold text-text">
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg border border-border bg-surface-raised px-3 py-1.5 font-mono text-[12px] text-text-soft transition-all hover:-translate-y-0.5 hover:border-brand hover:text-brand"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured projects ────────────────────────────────────────────── */}
      <section className="relative z-10 pb-20 sm:pb-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mb-12 flex items-end justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[12px] text-brand">03</span>
              <span className="font-mono text-[12px] uppercase tracking-[0.22em] text-text-soft">Selected Projects</span>
              <span className="h-px w-20 bg-border" />
            </div>
            <Link
              to="/projects"
              className="hidden shrink-0 items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-text-xsoft transition-colors hover:text-brand sm:inline-flex"
            >
              All projects <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all hover:-translate-y-1.5 hover:border-brand hover:shadow-[0_18px_44px_rgba(0,0,0,0.18)]">
                  <div className="relative aspect-[16/10] overflow-hidden bg-surface-raised">
                    {p.image ? (
                      <img src={p.image} alt={p.title} className="h-full w-full object-cover" loading="lazy" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center p-4 font-display text-lg font-semibold text-text-xsoft">
                        {p.title}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-b from-bg/10 via-transparent to-bg/90" />
                    <span className="absolute top-3 left-3 rounded-[7px] border border-border bg-bg/70 px-2.5 py-1 font-mono text-[10px] tracking-wide text-text-soft backdrop-blur-md">
                      {p.context}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display font-semibold text-text">{p.title}</h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-text-soft">{p.points[0]}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.tech.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="rounded-md border px-2 py-0.5 font-mono text-[10px] text-brand"
                          style={{ borderColor: 'rgba(81,228,255,0.35)' }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    {p.github && (
                      <div className="mt-auto pt-4 font-mono text-[11px] tracking-[0.05em] text-text-xsoft">
                        View on GitHub ↗
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-6 sm:hidden">
            <Link to="/projects" className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-text-xsoft hover:text-brand">
              All projects <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Closing CTA ──────────────────────────────────────────────────── */}
      <section className="relative z-10 pb-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <div
              className="rounded-3xl border border-border p-16 text-center sm:p-20"
              style={{
                background: 'linear-gradient(160deg, rgba(81,228,255,0.06), rgba(56,189,248,0.04) 60%, rgba(255,255,255,0.01))',
              }}
            >
              <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-brand">// Let's talk</p>
              <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-text sm:text-5xl">
                Let&apos;s build something<br />that scales.
              </h2>
              <p className="mx-auto mt-5 max-w-md text-[16.5px] leading-[1.65] text-text-soft">
                Open to opportunities in data &amp; software engineering. The fastest way to reach me is below.
              </p>
              <Link
                to="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-[12px] bg-brand px-7 py-3.5 font-mono text-sm font-semibold text-[#07080A] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(81,228,255,0.26)]"
              >
                Get in touch
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  )
}
```

- [ ] **Step 2: Verify Home page in both themes**

Navigate to `/`. Toggle between dark and light. Check:
- Hero section text readable in both modes
- Stats strip background shifts (slightly elevated surface in light)
- Skill cards, project cards, CTA section all adapt correctly
- Marquee items visible in both modes

- [ ] **Step 3: Commit**

```bash
git add src/pages/Home.jsx
git commit -m "feat: migrate Home page to semantic tokens"
```

---

### Task 8: About.jsx + Experience.jsx Migration

**Files:**
- Modify: `src/pages/About.jsx`
- Modify: `src/pages/Experience.jsx`

**Interfaces:**
- Consumes: semantic tokens from Task 1
- Note: `#C6F24E` (lime, About "ETL") and `#FF9900` (AWS orange, Experience) are intentional accents — leave hardcoded

- [ ] **Step 1: Replace `src/pages/About.jsx`**

```jsx
import PageTransition from '../components/PageTransition.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import { about, education } from '../data/content.js'

export default function About() {
  return (
    <PageTransition
      title="About — Raj Patel"
      description="Background, education, coursework, and leadership of Raj Patel."
    >
      <PageHeader eyebrow="About" title="A bit about me" />

      <section className="relative z-10 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-3">
          {/* Bio */}
          <Reveal className="lg:col-span-2">
            <h2
              className="font-display font-bold leading-[1.1] tracking-[-0.02em] text-text"
              style={{ fontSize: 'clamp(28px, 4vw, 40px)', marginBottom: '24px' }}
            >
              Comfortable across the stack — from{' '}
              <span style={{ color: '#C6F24E' }}>ETL</span> to{' '}
              <span className="text-brand">AI</span>.
            </h2>
            <p className="text-lg leading-relaxed text-text-soft">{about.summary}</p>

            <div className="mt-10">
              <h3 className="font-display text-xl font-bold text-text">Activities &amp; Leadership</h3>
              <ul className="mt-4 space-y-2">
                {education.activities.map((a) => (
                  <li key={a} className="flex items-start gap-3 text-text-soft">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Education card */}
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-border bg-surface p-6">
              <h3 className="font-display text-lg font-bold text-text">Education</h3>
              <div className="mt-4">
                <p className="font-semibold text-text">{education.school}</p>
                <p className="mt-1 text-sm text-text-soft">{education.degree}</p>
                <div className="mt-3 flex items-center gap-3 text-sm">
                  <span className="rounded-full bg-brand/15 px-3 py-1 font-medium text-brand">
                    {education.date}
                  </span>
                  <span className="font-medium text-text-soft">GPA {education.gpa}</span>
                </div>
              </div>

              <div className="mt-6">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-wide text-text-xsoft">
                  Relevant Coursework
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {education.coursework.map((c) => (
                    <span
                      key={c}
                      className="rounded-lg border border-border bg-surface-raised px-3 py-1.5 font-mono text-[11px] text-text-soft"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  )
}
```

- [ ] **Step 2: Replace `src/pages/Experience.jsx`**

```jsx
import PageTransition from '../components/PageTransition.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import { AwsIcon } from '../components/Icons.jsx'
import { experience, certifications } from '../data/content.js'

export default function Experience() {
  return (
    <PageTransition
      title="Experience & Certifications — Raj Patel"
      description="Work timeline and AWS certifications of Raj Patel."
    >
      <PageHeader
        eyebrow="Experience"
        title="Where I've worked"
        subtitle="A timeline of roles across data engineering, embedded software, and IT."
      />

      {/* ── Timeline ─────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-5">
          <ol className="relative border-l-2 border-border">
            {experience.map((job, i) => (
              <Reveal key={job.company} delay={i * 0.08} as="li" className="relative mb-12 ml-6 last:mb-0">
                <span
                  className={[
                    'absolute -left-[31px] mt-1.5 grid h-5 w-5 place-items-center rounded-full ring-4 ring-bg',
                    job.current ? 'bg-brand' : 'bg-border-strong',
                  ].join(' ')}
                >
                  {job.current && <span className="h-2 w-2 rounded-full bg-[#07080A]" />}
                </span>

                <div className="rounded-2xl border border-border bg-surface p-6">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="font-display text-lg font-bold text-text">{job.role}</h3>
                      <p className="font-medium text-brand">{job.company}</p>
                    </div>
                    <div className="text-right text-sm text-text-soft">
                      <p className="font-medium">{job.period}</p>
                      <p>{job.location}</p>
                    </div>
                  </div>
                  <ul className="mt-4 space-y-2.5">
                    {job.points.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm leading-relaxed text-text-soft">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Certifications ───────────────────────────────────────────────── */}
      <section className="relative z-10 border-t border-border bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="text-center">
            <h2 className="font-display text-3xl font-bold text-text sm:text-4xl">Certifications</h2>
            <p className="mx-auto mt-3 max-w-xl text-text-soft">AWS credentials, most recent first.</p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {certifications.map((cert, i) => (
              <Reveal key={cert.name} delay={i * 0.08}>
                <div className="group flex h-full flex-col items-center rounded-2xl border border-border bg-surface p-6 text-center transition-colors hover:border-brand">
                  <div className="grid h-16 w-16 place-items-center rounded-xl bg-surface-raised text-[#FF9900] transition-transform group-hover:scale-105">
                    <AwsIcon className="h-9 w-9" />
                  </div>
                  <h3 className="mt-4 font-display text-sm font-semibold leading-snug text-text">{cert.name}</h3>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-wide text-text-soft">
                    Issued {cert.issued}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
```

- [ ] **Step 3: Verify**

Navigate to `/about` and `/experience`. Toggle theme. Check:
- Education card, coursework chips visible in both modes
- Timeline line and dots visible in both modes
- Timeline dot ring blends into background (uses `ring-bg`)
- AWS cert cards render correctly in both modes

- [ ] **Step 4: Commit**

```bash
git add src/pages/About.jsx src/pages/Experience.jsx
git commit -m "feat: migrate About and Experience pages to semantic tokens"
```

---

### Task 9: Projects.jsx + Contact.jsx Migration

**Files:**
- Modify: `src/pages/Projects.jsx`
- Modify: `src/pages/Contact.jsx`

**Interfaces:**
- Consumes: semantic tokens from Task 1

- [ ] **Step 1: Replace `src/pages/Projects.jsx`**

```jsx
import { motion, useReducedMotion } from 'framer-motion'
import PageTransition from '../components/PageTransition.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { GithubIcon } from '../components/Icons.jsx'
import { projects } from '../data/content.js'

export default function Projects() {
  const reduce = useReducedMotion()

  return (
    <PageTransition
      title="Projects — Raj Patel"
      description="Selected data engineering, full-stack, and machine learning projects by Raj Patel."
    >
      <PageHeader
        eyebrow="Portfolio"
        title="Things I've built"
        subtitle="Data pipelines, full-stack apps, and machine learning — from coursework to production."
      />

      <section className="relative z-10 py-16 sm:py-20">
        <motion.div
          className="mx-auto grid max-w-6xl gap-6 px-5 md:grid-cols-2"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        >
          {projects.map((p) => (
            <motion.article
              key={p.title}
              variants={{
                hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
              }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all hover:-translate-y-1.5 hover:border-brand hover:shadow-[0_18px_44px_rgba(0,0,0,0.18)]"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-surface-raised">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center px-6 text-center font-display text-2xl font-bold text-text-xsoft">
                    {p.title}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-bg/10 via-transparent to-bg/90" />
                <span className="absolute top-3 left-3 rounded-[7px] border border-border bg-bg/70 px-2.5 py-1 font-mono text-[10px] tracking-wide text-text-soft backdrop-blur-md">
                  {p.context}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h2 className="font-display text-xl font-bold text-text">{p.title}</h2>

                <ul className="mt-4 flex-1 space-y-2.5">
                  {p.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm leading-relaxed text-text-soft">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      {pt}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border px-2.5 py-1 font-mono text-[10px] text-brand"
                      style={{ borderColor: 'rgba(81,228,255,0.35)' }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-5 border-t border-border pt-4">
                  {p.github ? (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-text-soft transition-colors hover:text-brand"
                    >
                      <GithubIcon className="h-5 w-5" />
                      View source
                    </a>
                  ) : (
                    <span className="font-mono text-sm text-text-xsoft">Private project — no public repo</span>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>
    </PageTransition>
  )
}
```

- [ ] **Step 2: Replace `src/pages/Contact.jsx`**

```jsx
import { useState } from 'react'
import PageTransition from '../components/PageTransition.jsx'
import Reveal from '../components/Reveal.jsx'
import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  DownloadIcon,
  ArrowRightIcon,
} from '../components/Icons.jsx'
import { contact } from '../data/content.js'

const channels = [
  { label: 'Email', value: contact.email, href: `mailto:${contact.email}`, Icon: MailIcon },
  { label: 'LinkedIn', value: 'in/rajpat243', href: contact.linkedin, Icon: LinkedinIcon },
  { label: 'GitHub', value: 'rajpat243', href: contact.github, Icon: GithubIcon },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name || 'a visitor'}`)
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}${form.email ? ` (${form.email})` : ''}`,
    )
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`
  }

  const fieldClass =
    'w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text outline-none placeholder:text-text-xsoft transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20'

  return (
    <PageTransition
      title="Contact — Raj Patel"
      description="Get in touch with Raj Patel, or download a copy of the resume."
    >
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <section className="relative z-10 overflow-hidden bg-bg">
        <div aria-hidden="true" className="pointer-events-none absolute -top-32 -left-20 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -right-20 h-72 w-72 rounded-full bg-[#38bdf8]/8 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-5 py-20 sm:py-24">
          <p className="mb-3 font-mono text-[12px] uppercase tracking-[0.16em] text-brand">// Let&apos;s talk</p>
          <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-text sm:text-5xl">
            Let&apos;s build something<br />that scales.
          </h1>
          <p className="mt-5 max-w-xl text-[17px] leading-[1.65] text-text-soft">
            Open to opportunities in data &amp; software engineering. The fastest way to reach me is below.
          </p>
        </div>
      </section>

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2">
          {/* Channels + resume */}
          <Reveal>
            <h2 className="font-display text-2xl font-bold text-text">Reach me directly</h2>
            <ul className="mt-6 space-y-3">
              {channels.map(({ label, value, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noreferrer"
                    className="group flex items-center gap-4 rounded-xl border border-border bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-brand hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-brand text-[#07080A]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-text">{label}</span>
                      <span className="block text-sm text-text-soft">{value}</span>
                    </span>
                    <ArrowRightIcon className="ml-auto h-4 w-4 text-text-xsoft transition-colors group-hover:text-brand" />
                  </a>
                </li>
              ))}
            </ul>

            <a
              href={contact.resume}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-[11px] bg-brand px-6 py-3 text-sm font-semibold text-[#07080A] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(81,228,255,0.26)]"
            >
              <DownloadIcon className="h-4 w-4" />
              Download Resume
            </a>
          </Reveal>

          {/* mailto form */}
          <Reveal delay={0.1}>
            <form
              onSubmit={onSubmit}
              className="rounded-2xl border border-border bg-surface p-6 sm:p-8"
            >
              <h2 className="font-display text-2xl font-bold text-text">Send a message</h2>
              <p className="mt-2 text-sm text-text-soft">
                This opens your email client with the message prefilled.
              </p>

              <div className="mt-6 space-y-4">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-text-soft">
                    Name
                  </label>
                  <input id="name" type="text" required value={form.name} onChange={update('name')} className={fieldClass} placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-text-soft">
                    Email
                  </label>
                  <input id="email" type="email" value={form.email} onChange={update('email')} className={fieldClass} placeholder="you@example.com" />
                </div>
                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-text-soft">
                    Message
                  </label>
                  <textarea id="message" required rows={5} value={form.message} onChange={update('message')} className={`${fieldClass} resize-y`} placeholder="What's on your mind?" />
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-[11px] bg-brand px-6 py-3 text-sm font-semibold text-[#07080A] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(81,228,255,0.26)]"
              >
                Send message
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  )
}
```

- [ ] **Step 3: Verify**

Navigate to `/projects` and `/contact`. Toggle theme. Check:
- Project cards readable in both modes, hover shadow visible on light
- Contact form inputs visible with correct border/background in both modes
- Channel list items hover effect works in both modes

- [ ] **Step 4: Commit**

```bash
git add src/pages/Projects.jsx src/pages/Contact.jsx
git commit -m "feat: migrate Projects and Contact pages to semantic tokens"
```

---

### Task 10: PipelineCanvas.jsx Theming

**Files:**
- Modify: `src/components/PipelineCanvas.jsx`

**Interfaces:**
- Consumes: `useTheme()` from `src/context/ThemeContext.jsx` — `dark` boolean added to `useEffect` dependency array
- Consumes: semantic tokens from Task 1 for the wrapper JSX

- [ ] **Step 1: Replace `src/components/PipelineCanvas.jsx`**

```jsx
import { useRef, useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext.jsx'

const NODES = [
  { x: 0.10, y: 0.26, label: 'SOURCE' },
  { x: 0.10, y: 0.74, label: 'STREAM' },
  { x: 0.40, y: 0.50, label: 'INGEST' },
  { x: 0.66, y: 0.50, label: 'TRANSFORM' },
  { x: 0.92, y: 0.27, label: 'AI / LLM' },
  { x: 0.92, y: 0.73, label: 'SERVE' },
]
const EDGES = [[0, 2], [1, 2], [2, 3], [3, 4], [3, 5]]
const ACC = '#51E4FF'
const ACC2 = '#38bdf8'

export default function PipelineCanvas() {
  const canvasRef = useRef(null)
  const deadRef = useRef(false)
  const reduce = useReducedMotion()
  const { dark } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    deadRef.current = false
    let particles = []
    let W = 0, H = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const edgeColor = dark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.12)'
    const nodeFill = dark ? '#0B0D10' : '#F0F2F5'
    const nodeLabel = dark ? 'rgba(255,255,255,0.52)' : 'rgba(0,0,0,0.55)'

    const resize = () => {
      W = canvas.clientWidth
      H = canvas.clientHeight
      canvas.width = W * dpr
      canvas.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    let ro
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(resize)
      ro.observe(canvas)
    }

    const pos = (n) => ({ x: n.x * W, y: n.y * H })

    const frame = () => {
      if (deadRef.current) return
      ctx.clearRect(0, 0, W, H)

      EDGES.forEach(([a, b]) => {
        const p1 = pos(NODES[a]), p2 = pos(NODES[b])
        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.strokeStyle = edgeColor
        ctx.lineWidth = 1
        ctx.stroke()
      })

      if (!reduce && Math.random() < 0.3) {
        const ei = (Math.random() * EDGES.length) | 0
        particles.push({
          ei,
          t: 0,
          speed: 0.006 + Math.random() * 0.009,
          c: Math.random() < 0.5 ? ACC : ACC2,
        })
      }

      particles.forEach((pt) => {
        if (!reduce) pt.t += pt.speed
        const [a, b] = EDGES[pt.ei]
        const p1 = pos(NODES[a]), p2 = pos(NODES[b])
        const x = p1.x + (p2.x - p1.x) * pt.t
        const y = p1.y + (p2.y - p1.y) * pt.t
        ctx.beginPath()
        ctx.arc(x, y, 2.3, 0, 6.283)
        ctx.fillStyle = pt.c
        ctx.shadowColor = pt.c
        ctx.shadowBlur = 10
        ctx.fill()
        ctx.shadowBlur = 0
      })
      particles = particles.filter((p) => p.t < 1)

      NODES.forEach((n) => {
        const p = pos(n)
        ctx.beginPath()
        ctx.arc(p.x, p.y, 4.5, 0, 6.283)
        ctx.fillStyle = nodeFill
        ctx.fill()
        ctx.lineWidth = 1.4
        ctx.strokeStyle = ACC
        ctx.shadowColor = ACC
        ctx.shadowBlur = 8
        ctx.stroke()
        ctx.shadowBlur = 0
        ctx.font = "10px 'JetBrains Mono', monospace"
        ctx.fillStyle = nodeLabel
        ctx.textAlign = 'center'
        ctx.fillText(n.label, p.x, p.y - 13)
      })

      requestAnimationFrame(frame)
    }

    requestAnimationFrame(frame)

    return () => {
      deadRef.current = true
      if (ro) ro.disconnect()
    }
  }, [reduce, dark])

  return (
    <div className="overflow-hidden rounded-[18px] border border-border bg-surface">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="flex items-center gap-2 font-mono text-[11px] tracking-wide text-text-soft">
          <span className="pulse-glow h-2 w-2 rounded-full bg-brand" />
          pipeline.live
        </span>
        <span className="font-mono text-[11px] tracking-wide text-text-xsoft">● STREAMING</span>
      </div>
      <canvas ref={canvasRef} className="block w-full" style={{ height: '340px' }} />
      <div className="flex items-center justify-between border-t border-border px-4 py-3">
        <span className="font-mono text-[10.5px] tracking-wide text-text-xsoft">dbt · spark · bedrock</span>
        <span className="font-mono text-[10.5px] tracking-wide text-text-xsoft">
          uptime <span className="text-brand">99.98%</span>
        </span>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify PipelineCanvas in both themes**

Navigate to `/` (Home). The pipeline widget is visible on large screens. Toggle theme:
- Dark mode: canvas draws on a dark-tinted surface, white edge lines, white node labels
- Light mode: canvas draws on a light surface, dark edge lines, dark node labels
- Cyan particles and node stroke glow remain visible in both
- Canvas re-initializes cleanly on toggle (no ghost particles from previous theme)

- [ ] **Step 3: Final full-site check**

Visit every route (`/`, `/about`, `/experience`, `/projects`, `/contact`) in both dark and light. Confirm no remaining hardcoded dark colors bleeding through (look for white text on white background or invisible borders).

- [ ] **Step 4: Commit**

```bash
git add src/components/PipelineCanvas.jsx
git commit -m "feat: migrate PipelineCanvas to theme-aware drawing"
```

---

## Self-Review

**Spec coverage:**
- ✅ Semantic CSS tokens (`:root` + `.dark` + `@theme inline`) — Task 1
- ✅ localStorage persistence defaulting to dark — Task 2
- ✅ ThemeProvider wrapping app — Task 2
- ✅ Sun/moon toggle button — Task 3
- ✅ Toggle placement: desktop after Resume, mobile next to hamburger — Task 4
- ✅ Framer Motion icon transition — Task 3
- ✅ Navbar color migration — Task 4
- ✅ App.jsx dot grid + wrapper — Task 5
- ✅ Footer + PageHeader — Task 6
- ✅ Home.jsx — Task 7
- ✅ About.jsx + Experience.jsx — Task 8
- ✅ Projects.jsx + Contact.jsx — Task 9
- ✅ PipelineCanvas theming — Task 10
- ✅ Anti-flash inline script — Task 1
- ✅ Scrollbar rules updated — Task 1
- ✅ Brand/CTA button text kept as `text-[#07080A]` throughout — all tasks
- ✅ `#C6F24E` and `#FF9900` left hardcoded — Task 8

**Type consistency:** All tasks use `useTheme()` returning `{ dark, toggle }`. All semantic token classes (`bg-bg`, `text-text`, etc.) are consistent with Task 1 definitions.

**No placeholders:** All steps contain full replacement code.
