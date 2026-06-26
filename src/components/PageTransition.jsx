import { motion, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'

// Wraps each page: smooth route enter/exit (driven by AnimatePresence in App)
// and per-route document title/meta for SEO + sharing.
export default function PageTransition({ children, title, description, className = '' }) {
  const reduce = useReducedMotion()

  useEffect(() => {
    if (title) document.title = title
    if (description) {
      let tag = document.querySelector('meta[name="description"]')
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', 'description')
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', description)
    }
  }, [title, description])

  return (
    <motion.main
      className={`flex-1 ${className}`}
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? undefined : { opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  )
}
