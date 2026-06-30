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
    <footer className="border-t border-border bg-bg">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row">
        <div className="text-center sm:text-left">
          <Link to="/" className="font-display text-base font-bold text-text">
            {profile.name}
          </Link>
          <p className="text-sm text-text-soft">{profile.headline}</p>
        </div>

        <div className="flex items-center gap-3">
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto:') ? undefined : '_blank'}
              rel="noreferrer"
              aria-label={label}
              className="grid h-10 w-10 place-items-center rounded-full border border-border-strong text-text-xsoft transition-colors hover:border-brand hover:text-brand-text"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-border py-4">
        <p className="text-center font-mono text-xs text-text-xsoft">
          © 2026 {profile.name}
        </p>
      </div>
    </footer>
  )
}
