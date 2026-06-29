import { motion, useReducedMotion } from 'framer-motion'

// Compact hero band used at the top of inner pages. Mirrors the home hero:
// dark slate base with soft, slowly-drifting blue/cyan glow blobs.
export default function PageHeader({ eyebrow, title, subtitle }) {
  const reduce = useReducedMotion()
  return (
    <section className="relative overflow-hidden bg-[#07080A] text-white">
      {/* Glow blobs echoing the home hero background. */}
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
          <h1 className="font-display text-4xl font-bold tracking-tight text-[#F4F6F8] sm:text-5xl">{title}</h1>
          {subtitle && <p className="mt-4 max-w-2xl text-lg text-[#9AA1AD]">{subtitle}</p>}
        </motion.div>
      </div>
    </section>
  )
}
