import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext.jsx'
import { SunIcon, MoonIcon } from './Icons.jsx'

export default function ThemeToggle() {
  const { dark, toggle } = useTheme()

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative inline-flex h-8 w-14 shrink-0 items-center justify-between rounded-full border border-border bg-surface px-1.5 transition-colors hover:border-border-strong"
    >
      <MoonIcon className={`relative z-10 h-3.5 w-3.5 transition-colors duration-200 ${dark ? 'text-[#07080A]' : 'text-text-soft'}`} />
      <SunIcon className={`relative z-10 h-3.5 w-3.5 transition-colors duration-200 ${dark ? 'text-text-soft' : 'text-[#07080A]'}`} />
      <motion.span
        initial={false}
        animate={{ x: dark ? -24 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        className="absolute right-1 h-6 w-6 rounded-full bg-brand"
      />
    </button>
  )
}
