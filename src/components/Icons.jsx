// Inline SVG icons (keeps the bundle free of an icon-library dependency).
// All inherit `currentColor` and accept className for sizing.

export function GithubIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.29 9.42 7.86 10.95.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.27 3.4.97.1-.76.41-1.27.74-1.56-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.42.36.8 1.08.8 2.18v3.23c0 .31.21.67.8.56A11.53 11.53 0 0 0 23.5 12.02C23.5 5.74 18.27.5 12 .5Z" />
    </svg>
  )
}

export function LinkedinIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}

export function MailIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  )
}

export function ExternalLinkIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  )
}

export function DownloadIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="M7 10l5 5 5-5" />
      <path d="M12 15V3" />
    </svg>
  )
}

export function ArrowRightIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}

export function MenuIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

export function CloseIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

export function AwsIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M6.76 10.27c0 .3.03.54.09.72.07.18.15.37.27.58.04.07.06.13.06.19 0 .08-.05.16-.16.24l-.53.35a.4.4 0 0 1-.22.08c-.08 0-.17-.04-.25-.12a2.6 2.6 0 0 1-.3-.4 6.5 6.5 0 0 1-.26-.5c-.65.77-1.47 1.15-2.46 1.15-.7 0-1.26-.2-1.67-.6-.41-.4-.62-.94-.62-1.6 0-.71.25-1.29.76-1.72.5-.44 1.18-.65 2.04-.65.28 0 .58.02.89.07.31.04.63.11.97.18v-.62c0-.63-.13-1.07-.39-1.33-.27-.26-.72-.38-1.36-.38-.29 0-.59.03-.9.1-.3.08-.6.17-.88.29a2.3 2.3 0 0 1-.29.1.5.5 0 0 1-.13.03c-.11 0-.17-.08-.17-.25v-.4c0-.13.02-.22.06-.28a.6.6 0 0 1 .23-.17c.29-.15.63-.27 1.04-.37.4-.1.83-.15 1.29-.15.98 0 1.7.22 2.16.67.45.44.68 1.12.68 2.03v2.67Zm-3.4 1.27c.27 0 .55-.05.85-.15.3-.1.56-.28.79-.53.13-.16.23-.33.28-.53.05-.2.08-.43.08-.71v-.34a7 7 0 0 0-.77-.14 6.3 6.3 0 0 0-.79-.05c-.56 0-.97.11-1.25.34-.27.22-.4.54-.4.96 0 .39.1.68.3.88.2.21.5.31.91.31Zm6.73.9c-.15 0-.25-.02-.31-.08-.07-.05-.13-.16-.18-.31L7.4 5.09a1.4 1.4 0 0 1-.07-.32c0-.13.06-.2.19-.2h.82c.16 0 .27.03.33.08.07.06.12.17.17.32l1.43 5.64 1.33-5.64c.04-.16.09-.26.16-.32a.57.57 0 0 1 .34-.08h.67c.16 0 .27.03.34.08.06.06.12.17.15.32l1.35 5.71L16 5.27c.05-.16.1-.26.17-.32a.55.55 0 0 1 .33-.08h.78c.13 0 .2.07.2.2 0 .04 0 .08-.02.13a1.2 1.2 0 0 1-.05.2l-1.95 6.25c-.05.16-.11.26-.18.31a.55.55 0 0 1-.32.08h-.72c-.16 0-.27-.03-.34-.09-.07-.06-.12-.17-.16-.32l-1.32-5.5-1.31 5.49c-.04.16-.09.26-.16.32-.07.06-.19.09-.34.09h-.72Zm10.76.22c-.43 0-.86-.05-1.27-.15-.41-.1-.73-.21-.95-.34-.13-.08-.22-.16-.26-.24a.6.6 0 0 1-.05-.24v-.42c0-.17.06-.25.18-.25.05 0 .1.01.14.03.05.01.12.05.2.08.27.12.57.21.88.27.32.06.64.1.95.1.5 0 .89-.09 1.17-.27.28-.17.42-.42.42-.74a.66.66 0 0 0-.18-.47c-.13-.13-.36-.25-.7-.36l-1-.31c-.5-.16-.88-.4-1.11-.71a1.66 1.66 0 0 1-.35-1.02c0-.3.06-.55.19-.78.13-.22.3-.42.51-.57.21-.16.46-.28.74-.36.28-.08.58-.12.89-.12.16 0 .32.01.48.03.16.02.31.05.46.08.14.04.28.07.4.12.13.04.23.08.3.13.1.06.17.12.21.18.04.06.06.14.06.24v.39c0 .17-.06.26-.18.26a.83.83 0 0 1-.3-.1 3.6 3.6 0 0 0-1.5-.3c-.46 0-.81.07-1.06.22-.25.15-.37.38-.37.69 0 .2.07.37.21.5.14.14.4.27.77.39l.98.3c.5.16.86.39 1.07.68.21.29.32.62.32 1 0 .3-.06.58-.19.82-.13.24-.3.45-.52.62-.22.17-.49.3-.8.39-.31.1-.65.14-1.01.14Z" />
      <path d="M21.7 17.84c-2.62 1.94-6.43 2.97-9.71 2.97-4.6 0-8.74-1.7-11.87-4.53-.25-.22-.03-.53.27-.36 3.39 1.97 7.57 3.16 11.9 3.16 2.92 0 6.12-.6 9.07-1.86.44-.19.81.29.34.62Z" />
      <path d="M22.79 16.6c-.34-.43-2.22-.2-3.07-.1-.26.03-.3-.2-.06-.36 1.5-1.05 3.96-.75 4.25-.4.29.36-.08 2.82-1.48 4-.22.18-.42.08-.33-.16.31-.79.99-2.56.69-2.98Z" />
    </svg>
  )
}
