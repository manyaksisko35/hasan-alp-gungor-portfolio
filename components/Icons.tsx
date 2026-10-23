type P = { className?: string };

export const ArrowIcon = ({ className }: P) => (
  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden className={className}>
    <path d="M3 9L9 3M4 3h5v5" stroke="currentColor" strokeWidth="1.6" fill="none" />
  </svg>
);

export const PlayIcon = ({ className }: P) => (
  <svg width="12" height="12" viewBox="0 0 14 14" aria-hidden className={className}>
    <path d="M3 1.5v11l9.5-5.5z" fill="currentColor" />
  </svg>
);

export const MailIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="m4 7 8 6 8-6" strokeLinecap="round" />
  </svg>
);

export const GitHubIcon = ({ className }: P) => (
  <svg viewBox="0 0 16 16" aria-hidden className={className} fill="currentColor">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

export const YouTubeIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" aria-hidden className={className}>
    <rect x="1" y="4" width="22" height="16" rx="5" fill="currentColor" />
    <path d="M10 8.5v7l6-3.5z" style={{ fill: 'var(--icon-cut, #030303)' }} />
  </svg>
);

export const ItchIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
    <path d="M3.2 3.5 1.5 6.6v2a2.6 2.6 0 0 0 5.2 0 2.6 2.6 0 0 0 5.3 0 2.6 2.6 0 0 0 5.2 0 2.6 2.6 0 0 0 5.3 0v-2l-1.7-3.1Z" />
    <path d="M3 12.3c.5.3 1 .4 1.5.4 1 0 2-.5 2.6-1.3a3.3 3.3 0 0 0 2.6 1.3 3.3 3.3 0 0 0 2.3-1 3.3 3.3 0 0 0 2.3 1 3.3 3.3 0 0 0 2.6-1.3c.6.8 1.6 1.3 2.6 1.3.5 0 1-.1 1.5-.4V19c0 1.2-1 1.5-2 1.5H5c-1 0-2-.3-2-1.5Zm6.2 2.2L7.8 16h1.4v1.4h1.5V16h1.4l-1.4-1.5Z" />
  </svg>
);

export const LinkedInIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" aria-hidden className={className}>
    <rect x="2" y="2" width="20" height="20" rx="4" fill="currentColor" />
    <path
      style={{ fill: 'var(--icon-cut, #030303)' }}
      d="M6 9.8h3v8.4H6zM7.5 5.6a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5ZM10.9 9.8h2.9V11c.4-.8 1.4-1.4 2.7-1.4 2.6 0 3.1 1.7 3.1 3.9v4.7h-3v-4.2c0-1 0-2.2-1.4-2.2s-1.3 1-1.3 2.1v4.3h-3Z"
    />
  </svg>
);
