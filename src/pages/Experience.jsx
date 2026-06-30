import PageTransition from '../components/PageTransition.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import { AwsIcon } from '../components/Icons.jsx'
import { experience, certifications } from '../data/content.js'

export default function Experience() {
  return (
    <PageTransition
      title="Experience & Certifications — Raj Patel"
      description="Work timeline and AWS certifications of Raj Patel."
    >
      <PageHeader
        eyebrow="Experience"
        title="Where I've worked"
        subtitle="A timeline of roles across data engineering, embedded software, and IT."
      />

      {/* ── Timeline ─────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-5">
          <ol className="relative border-l-2 border-border">
            {experience.map((job, i) => (
              <Reveal key={job.company} delay={i * 0.08} as="li" className="relative mb-12 ml-6 last:mb-0">
                <span
                  className={[
                    'absolute -left-[31px] mt-1.5 grid h-5 w-5 place-items-center rounded-full ring-4 ring-bg',
                    job.current ? 'bg-brand' : 'bg-border-strong',
                  ].join(' ')}
                >
                  {job.current && <span className="h-2 w-2 rounded-full bg-[#07080A]" />}
                </span>

                <div className="rounded-2xl border border-border bg-surface p-6">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="font-display text-lg font-bold text-text">{job.role}</h3>
                      <p className="font-medium text-brand">{job.company}</p>
                    </div>
                    <div className="text-right text-sm text-text-soft">
                      <p className="font-medium">{job.period}</p>
                      <p>{job.location}</p>
                    </div>
                  </div>
                  <ul className="mt-4 space-y-2.5">
                    {job.points.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm leading-relaxed text-text-soft">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Certifications ───────────────────────────────────────────────── */}
      <section className="relative z-10 border-t border-border bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="text-center">
            <h2 className="font-display text-3xl font-bold text-text sm:text-4xl">Certifications</h2>
            <p className="mx-auto mt-3 max-w-xl text-text-soft">AWS credentials, most recent first.</p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {certifications.map((cert, i) => (
              <Reveal key={cert.name} delay={i * 0.08}>
                <div className="group flex h-full flex-col items-center rounded-2xl border border-border bg-surface p-6 text-center transition-colors hover:border-brand">
                  <div className="grid h-16 w-16 place-items-center rounded-xl bg-surface-raised text-[#FF9900] transition-transform group-hover:scale-105">
                    <AwsIcon className="h-9 w-9" />
                  </div>
                  <h3 className="mt-4 font-display text-sm font-semibold leading-snug text-text">{cert.name}</h3>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-wide text-text-soft">
                    Issued {cert.issued}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
