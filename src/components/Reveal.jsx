import { motion, useReducedMotion } from 'framer-motion'

// Scroll-triggered fade-and-rise. Used as the default reveal for sections and
// cards across the site. Honors prefers-reduced-motion by rendering statically.
export default function Reveal({ children, delay = 0, y = 24, className, as = 'div' }) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] || motion.div

  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}
