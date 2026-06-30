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
