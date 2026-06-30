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
