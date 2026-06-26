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

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-3">
          {/* Bio */}
          <Reveal className="lg:col-span-2">
            <h2 className="font-display text-2xl font-bold">Background</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">{about.summary}</p>

            <div className="mt-10">
              <h3 className="font-display text-xl font-bold">Activities &amp; Leadership</h3>
              <ul className="mt-4 space-y-2">
                {education.activities.map((a) => (
                  <li key={a} className="flex items-start gap-3 text-ink-soft">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full brand-gradient" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Education card */}
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-display text-lg font-bold">Education</h3>
              <div className="mt-4">
                <p className="font-semibold">{education.school}</p>
                <p className="mt-1 text-sm text-ink-soft">{education.degree}</p>
                <div className="mt-3 flex items-center gap-3 text-sm">
                  <span className="rounded-full bg-brand/10 px-3 py-1 font-medium text-brand-dark">
                    {education.date}
                  </span>
                  <span className="font-medium text-ink-soft">GPA {education.gpa}</span>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
                  Relevant Coursework
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {education.coursework.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-ink-soft"
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
