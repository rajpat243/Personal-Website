import { motion, useReducedMotion } from 'framer-motion'
import PageTransition from '../components/PageTransition.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { GithubIcon } from '../components/Icons.jsx'
import { projects } from '../data/content.js'

export default function Projects() {
  const reduce = useReducedMotion()

  return (
    <PageTransition
      title="Projects — Raj Patel"
      description="Selected data engineering, full-stack, and machine learning projects by Raj Patel."
    >
      <PageHeader
        eyebrow="Portfolio"
        title="Things I've built"
        subtitle="Data pipelines, full-stack apps, and machine learning — from coursework to production."
      />

      <section className="py-16 sm:py-20">
        <motion.div
          className="mx-auto grid max-w-6xl gap-8 px-5 md:grid-cols-2"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        >
          {projects.map((p) => (
            <motion.article
              key={p.title}
              variants={{
                hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
              }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="aspect-[16/9] overflow-hidden bg-slate-100">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center brand-gradient px-6 text-center font-display text-2xl font-bold text-white">
                    {p.title}
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-medium uppercase tracking-wide text-brand">{p.context}</p>
                <h2 className="mt-1.5 font-display text-xl font-bold">{p.title}</h2>

                <ul className="mt-4 flex-1 space-y-2.5">
                  {p.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm leading-relaxed text-ink-soft">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full brand-gradient" />
                      {pt}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span key={t} className="rounded-full bg-brand/10 px-2.5 py-1 text-xs font-medium text-brand-dark">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-5 border-t border-slate-100 pt-4">
                  {p.github ? (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-brand"
                    >
                      <GithubIcon className="h-5 w-5" />
                      View source
                    </a>
                  ) : (
                    <span className="text-sm font-medium text-slate-400">Private project — no public repo</span>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>
    </PageTransition>
  )
}
