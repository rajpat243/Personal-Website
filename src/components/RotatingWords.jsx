import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

// Typewriter effect: types each word out, pauses, deletes it, then moves to
// the next — with a blinking caret. Under prefers-reduced-motion it renders a
// static middot-separated list (no typing/motion).
export default function RotatingWords({
  words,
  className = '',
  typingSpeed = 85,
  deletingSpeed = 40,
  pause = 1400,
}) {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reduce) return
    const current = words[index % words.length]

    // Finished typing the word → hold, then start deleting.
    if (!deleting && subIndex === current.length) {
      const t = setTimeout(() => setDeleting(true), pause)
      return () => clearTimeout(t)
    }

    // Finished deleting → advance to the next word.
    if (deleting && subIndex === 0) {
      setDeleting(false)
      setIndex((i) => (i + 1) % words.length)
      return
    }

    const t = setTimeout(
      () => setSubIndex((s) => s + (deleting ? -1 : 1)),
      deleting ? deletingSpeed : typingSpeed,
    )
    return () => clearTimeout(t)
  }, [subIndex, deleting, index, words, reduce, typingSpeed, deletingSpeed, pause])

  if (reduce) {
    return <span className={className}>{words.join(' · ')}</span>
  }

  const current = words[index % words.length]
  return (
    <span className={className}>
      <span aria-hidden="true">
        {current.substring(0, subIndex)}
        <span className="type-caret ml-0.5">|</span>
      </span>
      {/* Static, screen-reader-friendly list of the same words. */}
      <span className="sr-only">{words.join(', ')}</span>
    </span>
  )
}
