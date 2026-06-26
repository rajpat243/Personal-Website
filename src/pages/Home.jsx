import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import PageTransition from '../components/PageTransition.jsx'
import Reveal from '../components/Reveal.jsx'
import Counter from '../components/Counter.jsx'
import RotatingWords from '../components/RotatingWords.jsx'
import { ArrowRightIcon, DownloadIcon, GithubIcon, LinkedinIcon } from '../components/Icons.jsx'
import { profile, skills, stats, projects, contact } from '../data/content.js'

export default function Home() {
  const reduce = useReducedMotion()

  // Staggered hero intro.
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
    <PageTransition
      title="Raj Patel — Data Engineer"
      description={profile.tagline}
    >
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        {/* Animated gradient blobs (bold signature element) */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -left-24 h-96 w-96 rounded-full bg-brand-light/30 blur-3xl"
          animate={reduce ? undefined : { x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-brand/30 blur-3xl"
          animate={reduce ? undefined : { x: [0, -40, 0], y: [0, -20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative mx-auto max-w-6xl px-5 py-28 sm:py-36"
        >
          <motion.p variants={item} className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-brand">
            {profile.location}
          </motion.p>
          <motion.h1
            variants={item}
            className="font-display text-5xl font-bold leading-tight sm:text-7xl"
          >
            {profile.name}
          </motion.h1>
          <motion.div variants={item} className="mt-4">
            <RotatingWords
              words={profile.roles}
              className="brand-text-gradient font-display text-2xl font-semibold sm:text-3xl"
            />
          </motion.div>
          <motion.p variants={item} className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            {profile.tagline}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 rounded-full brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-transform hover:-translate-y-0.5"
            >
              View Projects
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={contact.resume}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <DownloadIcon className="h-4 w-4" />
              Download Resume
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-8 flex items-center gap-4">
            <a href={contact.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-slate-400 transition-colors hover:text-white">
              <GithubIcon className="h-6 w-6" />
            </a>
            <a href={contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-slate-400 transition-colors hover:text-white">
              <LinkedinIcon className="h-6 w-6" />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Stats strip ──────────────────────────────────────────────────── */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 py-12 sm:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="text-center">
              <div className="font-display text-4xl font-bold brand-text-gradient sm:text-5xl">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-sm font-medium text-ink-soft">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Skills showcase (the focus) ──────────────────────────────────── */}
      <section className="brand-gradient py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="text-center">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">Skills &amp; Toolbox</h2>
            <p className="mx-auto mt-3 max-w-2xl text-white/85">
              The technologies I use to design data pipelines, build full-stack apps, and bring AI
              into production.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {skills.map((group, gi) => (
              <Reveal key={group.category} delay={gi * 0.08}>
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                  <h3 className="font-display text-lg font-semibold">
                    <span className="brand-text-gradient">{group.category}</span>
                  </h3>
                  <motion.ul
                    className="mt-4 flex flex-wrap gap-2"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-60px' }}
                    variants={{ show: { transition: { staggerChildren: 0.04 } } }}
                  >
                    {group.items.map((skill) => (
                      <motion.li
                        key={skill}
                        variants={{
                          hidden: reduce ? { opacity: 1 } : { opacity: 0, scale: 0.9 },
                          show: { opacity: 1, scale: 1 },
                        }}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-ink-soft"
                      >
                        {skill}
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured projects teaser ─────────────────────────────────────── */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl font-bold sm:text-4xl">Featured Projects</h2>
              <p className="mt-3 max-w-xl text-ink-soft">A few things I&apos;ve built recently.</p>
            </div>
            <Link to="/projects" className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-brand hover:underline sm:inline-flex">
              All projects
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
                  <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                    {p.image ? (
                      <img src={p.image} alt={p.title} className="h-full w-full object-cover" loading="lazy" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center brand-gradient font-display text-lg font-semibold text-white">
                        {p.title}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display font-semibold">{p.title}</h3>
                    <p className="mt-2 line-clamp-3 text-sm text-ink-soft">{p.points[0]}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.tech.slice(0, 3).map((t) => (
                        <span key={t} className="rounded-full bg-brand/10 px-2.5 py-1 text-xs font-medium text-brand-dark">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-8 sm:hidden">
            <Link to="/projects" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">
              All projects
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Closing CTA ──────────────────────────────────────────────────── */}
      <section className="brand-gradient">
        <div className="mx-auto max-w-6xl px-5 py-16 text-center text-white">
          <Reveal>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Like what you see?</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/85">
              I&apos;m open to opportunities in data and software engineering. Let&apos;s talk.
            </p>
            <Link
              to="/contact"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-brand-dark shadow-lg transition-transform hover:-translate-y-0.5"
            >
              Get in touch
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  )
}
