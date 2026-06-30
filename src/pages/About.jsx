import PageTransition from '../components/PageTransition.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import { about, education } from '../data/content.js'

export default function About() {
  return (
    <PageTransition
      title="About — Raj Patel"
      description="Background, education, coursework, and leadership of Raj Patel."
    >
      <PageHeader eyebrow="About" title="A bit about me" />

      <section className="relative z-10 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-3">
          {/* Bio */}
          <Reveal className="lg:col-span-2">
            <h2
              className="font-display font-bold leading-[1.1] tracking-[-0.02em] text-text"
              style={{ fontSize: 'clamp(28px, 4vw, 40px)', marginBottom: '24px' }}
            >
              Comfortable across the stack — from{' '}
              <span style={{ color: 'var(--etl-accent)' }}>ETL</span> to{' '}
              <span className="text-brand-text">AI</span>.
            </h2>
            <p className="text-lg leading-relaxed text-text-soft">{about.summary}</p>

            <div className="mt-10">
              <h3 className="font-display text-xl font-bold text-text">Activities &amp; Leadership</h3>
              <ul className="mt-4 space-y-2">
                {education.activities.map((a) => (
                  <li key={a} className="flex items-start gap-3 text-text-soft">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-text" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Education card */}
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-border bg-surface p-6">
              <h3 className="font-display text-lg font-bold text-text">Education</h3>
              <div className="mt-4">
                <p className="font-semibold text-text">{education.school}</p>
                <p className="mt-1 text-sm text-text-soft">{education.degree}</p>
                <div className="mt-3 flex items-center gap-3 text-sm">
                  <span className="rounded-full bg-brand/15 px-3 py-1 font-medium text-brand-text">
                    {education.date}
                  </span>
                  <span className="font-medium text-text-soft">GPA {education.gpa}</span>
                </div>
              </div>

              <div className="mt-6">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-wide text-text-xsoft">
                  Relevant Coursework
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {education.coursework.map((c) => (
                    <span
                      key={c}
                      className="rounded-lg border border-border bg-surface-raised px-3 py-1.5 font-mono text-[11px] text-text-soft"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  )
}
