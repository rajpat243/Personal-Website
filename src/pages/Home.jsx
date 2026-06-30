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
      <section className="relative z-10 overflow-hidden bg-hero-bg">
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
              className="font-display text-5xl font-bold leading-[0.96] tracking-tight text-hero-text sm:text-7xl lg:text-[84px]"
            >
              {profile.name}
            </motion.h1>

            <motion.div
              variants={item}
              className="mt-5 flex items-baseline gap-3 font-display text-2xl font-semibold sm:text-3xl"
            >
              <span className="text-hero-text-soft">Building</span>
              <RotatingWords
                words={profile.roles}
                className="text-brand"
              />
            </motion.div>

            <motion.p
              variants={item}
              className="mt-6 max-w-[480px] text-[17px] leading-[1.65] text-hero-text-soft"
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
                className="inline-flex items-center gap-2 rounded-[11px] border border-hero-border px-6 py-3 text-sm font-semibold text-hero-text transition-colors hover:bg-hero-surface-raised hover:border-hero-border"
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
                className="font-mono text-xs tracking-[0.05em] text-hero-text-xsoft transition-colors hover:text-brand"
              >
                GITHUB
              </a>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs tracking-[0.05em] text-hero-text-xsoft transition-colors hover:text-brand"
              >
                LINKEDIN
              </a>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <a
                href={`mailto:${contact.email}`}
                className="font-mono text-xs tracking-[0.05em] text-hero-text-xsoft transition-colors hover:text-brand"
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
