import { Link } from 'react-router-dom'
import { contact, profile } from '../data/content.js'
import { GithubIcon, LinkedinIcon, MailIcon } from './Icons.jsx'

const socials = [
  { href: contact.github, label: 'GitHub', Icon: GithubIcon },
  { href: contact.linkedin, label: 'LinkedIn', Icon: LinkedinIcon },
  { href: `mailto:${contact.email}`, label: 'Email', Icon: MailIcon },
]

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row">
        <div className="text-center sm:text-left">
          <Link to="/" className="font-display text-base font-bold">
            {profile.name}
          </Link>
          <p className="text-sm text-ink-soft">{profile.headline}</p>
        </div>

        <div className="flex items-center gap-3">
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto:') ? undefined : '_blank'}
              rel="noreferrer"
              aria-label={label}
              className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-ink-soft transition-colors hover:border-brand hover:text-brand"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-slate-200 py-4">
        <p className="text-center text-xs text-ink-soft">
          © {2026} {profile.name}. Built with React, Vite &amp; Framer Motion.
        </p>
      </div>
    </footer>
  )
}
