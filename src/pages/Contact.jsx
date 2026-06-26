import { useState } from 'react'
import PageTransition from '../components/PageTransition.jsx'
import PageHeader from '../components/PageHeader.jsx'
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

  // No backend: compose a prefilled email via the user's mail client.
  const onSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name || 'a visitor'}`)
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}${form.email ? ` (${form.email})` : ''}`,
    )
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`
  }

  const field =
    'w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20'

  return (
    <PageTransition
      title="Contact — Raj Patel"
      description="Get in touch with Raj Patel, or download a copy of the resume."
    >
      <PageHeader
        eyebrow="Contact"
        title="Let's connect"
        subtitle="I'd love to hear from you — whether it's an opportunity, a question, or just to say hi."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2">
          {/* Channels + resume */}
          <Reveal>
            <h2 className="font-display text-2xl font-bold">Reach me directly</h2>
            <ul className="mt-6 space-y-3">
              {channels.map(({ label, value, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noreferrer"
                    className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand hover:shadow-md"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg brand-gradient text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold">{label}</span>
                      <span className="block text-sm text-ink-soft">{value}</span>
                    </span>
                    <ArrowRightIcon className="ml-auto h-4 w-4 text-slate-300 transition-colors group-hover:text-brand" />
                  </a>
                </li>
              ))}
            </ul>

            <a
              href={contact.resume}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-transform hover:-translate-y-0.5"
            >
              <DownloadIcon className="h-4 w-4" />
              Download Resume
            </a>
          </Reveal>

          {/* mailto form */}
          <Reveal delay={0.1}>
            <form
              onSubmit={onSubmit}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <h2 className="font-display text-2xl font-bold">Send a message</h2>
              <p className="mt-2 text-sm text-ink-soft">
                This opens your email client with the message prefilled.
              </p>

              <div className="mt-6 space-y-4">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                    Name
                  </label>
                  <input id="name" type="text" required value={form.name} onChange={update('name')} className={field} placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                    Email
                  </label>
                  <input id="email" type="email" value={form.email} onChange={update('email')} className={field} placeholder="you@example.com" />
                </div>
                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
                    Message
                  </label>
                  <textarea id="message" required rows={5} value={form.message} onChange={update('message')} className={`${field} resize-y`} placeholder="What's on your mind?" />
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-transform hover:-translate-y-0.5"
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
