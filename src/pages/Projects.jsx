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

      <section className="relative z-10 py-16 sm:py-20">
        <motion.div
          className="mx-auto grid max-w-6xl gap-6 px-5 md:grid-cols-2"
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
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[.022] transition-all hover:-translate-y-1.5 hover:border-brand hover:shadow-[0_18px_44px_rgba(0,0,0,0.5)]"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-[#0c0e11]">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center px-6 text-center font-display text-2xl font-bold text-white/30">
                    {p.title}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-[#07080A]/10 via-transparent to-[#07080A]/90" />
                <span className="absolute top-3 left-3 rounded-[7px] border border-white/15 bg-[#07080A]/70 px-2.5 py-1 font-mono text-[10px] tracking-wide text-white/70 backdrop-blur-md">
                  {p.context}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h2 className="font-display text-xl font-bold text-[#F0F2F5]">{p.title}</h2>

                <ul className="mt-4 flex-1 space-y-2.5">
                  {p.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm leading-relaxed text-[#C3C9D4]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      {pt}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border px-2.5 py-1 font-mono text-[10px] text-brand"
                      style={{ borderColor: 'rgba(81,228,255,0.35)' }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-5 border-t border-white/10 pt-4">
                  {p.github ? (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors hover:text-brand"
                    >
                      <GithubIcon className="h-5 w-5" />
                      View source
                    </a>
                  ) : (
                    <span className="font-mono text-sm text-white/50">Private project — no public repo</span>
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
