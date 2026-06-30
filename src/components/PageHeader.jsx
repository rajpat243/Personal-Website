import { motion, useReducedMotion } from 'framer-motion'

export default function PageHeader({ eyebrow, title, subtitle }) {
  const reduce = useReducedMotion()
  return (
    <section className="relative overflow-hidden bg-hero-bg text-hero-text">
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
          <h1 className="font-display text-4xl font-bold tracking-tight text-hero-text sm:text-5xl">{title}</h1>
          {subtitle && <p className="mt-4 max-w-2xl text-lg text-hero-text-soft">{subtitle}</p>}
        </motion.div>
      </div>
    </section>
  )
}
