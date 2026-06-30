import { useState } from 'react'
import PageTransition from '../components/PageTransition.jsx'
import Reveal from '../components/Reveal.jsx'
import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  DownloadIcon,
  ArrowRightIcon,
} from '../components/Icons.jsx'
import { contact } from '../data/content.js'

const channels = [
  { label: 'Email', value: contact.email, href: `mailto:${contact.email}`, Icon: MailIcon },
  { label: 'LinkedIn', value: 'in/rajpat243', href: contact.linkedin, Icon: LinkedinIcon },
  { label: 'GitHub', value: 'rajpat243', href: contact.github, Icon: GithubIcon },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name || 'a visitor'}`)
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}${form.email ? ` (${form.email})` : ''}`,
    )
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`
  }

  const fieldClass =
    'w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text outline-none placeholder:text-text-xsoft transition-colors focus:border-brand-text focus:ring-2 focus:ring-brand-text/20'

  return (
    <PageTransition
      title="Contact — Raj Patel"
      description="Get in touch with Raj Patel, or download a copy of the resume."
    >
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <section className="relative z-10 overflow-hidden bg-hero-bg">
        <div aria-hidden="true" className="pointer-events-none absolute -top-32 -left-20 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -right-20 h-72 w-72 rounded-full bg-[#38bdf8]/8 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-5 py-20 sm:py-24">
          <p className="mb-3 font-mono text-[12px] uppercase tracking-[0.16em] text-brand">// Let&apos;s talk</p>
          <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-hero-text sm:text-5xl">
            Let&apos;s build something<br />that scales.
          </h1>
          <p className="mt-5 max-w-xl text-[17px] leading-[1.65] text-hero-text-soft">
            Open to opportunities in data &amp; software engineering. The fastest way to reach me is below.
          </p>
        </div>
      </section>

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2">
          {/* Channels + resume */}
          <Reveal>
            <h2 className="font-display text-2xl font-bold text-text">Reach me directly</h2>
            <ul className="mt-6 space-y-3">
              {channels.map(({ label, value, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noreferrer"
                    className="group flex items-center gap-4 rounded-xl border border-border bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-brand hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-brand text-[#07080A]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-text">{label}</span>
                      <span className="block text-sm text-text-soft">{value}</span>
                    </span>
                    <ArrowRightIcon className="ml-auto h-4 w-4 text-text-xsoft transition-colors group-hover:text-brand-text" />
                  </a>
                </li>
              ))}
            </ul>

            <a
              href={contact.resume}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-[11px] bg-brand px-6 py-3 text-sm font-semibold text-[#07080A] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(81,228,255,0.26)]"
            >
              <DownloadIcon className="h-4 w-4" />
              Download Resume
            </a>
          </Reveal>

          {/* mailto form */}
          <Reveal delay={0.1}>
            <form
              onSubmit={onSubmit}
              className="rounded-2xl border border-border bg-surface p-6 sm:p-8"
            >
              <h2 className="font-display text-2xl font-bold text-text">Send a message</h2>
              <p className="mt-2 text-sm text-text-soft">
                This opens your email client with the message prefilled.
              </p>

              <div className="mt-6 space-y-4">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-text-soft">
                    Name
                  </label>
                  <input id="name" type="text" required value={form.name} onChange={update('name')} className={fieldClass} placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-text-soft">
                    Email
                  </label>
                  <input id="email" type="email" value={form.email} onChange={update('email')} className={fieldClass} placeholder="you@example.com" />
                </div>
                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-text-soft">
                    Message
                  </label>
                  <textarea id="message" required rows={5} value={form.message} onChange={update('message')} className={`${fieldClass} resize-y`} placeholder="What's on your mind?" />
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-[11px] bg-brand px-6 py-3 text-sm font-semibold text-[#07080A] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(81,228,255,0.26)]"
              >
                Send message
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  )
}
