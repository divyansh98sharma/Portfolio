import { useState } from 'react'
import { Check, Link2, Mail } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

const inter = { fontFamily: "'Inter', sans-serif" }

const SITE_URL = 'https://divyanshsharma.work'

function LinkedInGlyph({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 448 512" aria-hidden="true">
      <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.52 0 53.4 0 23.27 24.09-1.3 53.79-1.3c29.32 0 53.79 24.57 53.79 54.7 0 30.12-24.47 54.7-53.79 54.7zM447.9 448h-92.1V304.1c0-34.3-12.3-57.7-43.1-57.7-23.5 0-37.6 15.8-43.7 31.1-2.2 5.2-2.8 12.4-2.8 19.7V448h-92.2s1.2-270.1 0-299.1h92.1v42.4c12.2-18.9 34.1-45.8 83.1-45.8 60.7 0 105.8 39.7 105.8 125.1V448z" />
    </svg>
  )
}

/**
 * The blue "Share" button in the Figma top bar. The popover doubles as the
 * chrome-level contact affordance: copy link, email, LinkedIn, Medium.
 */
export function SharePopover() {
  const [copied, setCopied] = useState(false)

  const copyLink = async () => {
    const url = typeof window !== 'undefined' ? window.location.origin : SITE_URL
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard unavailable — no-op */
    }
  }

  const rowClass =
    'flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-[12px] font-medium no-underline min-h-0 min-w-0 transition-colors text-[var(--figma-text)] hover:bg-[color-mix(in_srgb,var(--figma-text)_6%,transparent)]'

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="inline-flex items-center min-h-0 min-w-0 h-8 px-2.5 sm:px-3.5 rounded-md text-[12px] font-semibold text-white transition-opacity hover:opacity-90"
          style={{ ...inter, backgroundColor: 'var(--figma-blue)' }}
          aria-label="Share this portfolio — contact options"
        >
          Share
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={10}
        className="w-80 p-0 rounded-xl overflow-hidden border shadow-xl"
        style={{
          ...inter,
          backgroundColor: 'var(--figma-panel)',
          borderColor: 'var(--figma-border)',
          color: 'var(--figma-text)',
        }}
      >
        <div className="px-4 pt-4 pb-3 border-b" style={{ borderColor: 'var(--figma-border)' }}>
          <p className="text-[13px] font-semibold">Share this file</p>
          <p className="text-[11px] mt-0.5" style={{ color: 'var(--figma-text-dim)' }}>
            Anyone with the link can hire the designer
          </p>
        </div>

        <div className="p-2">
          <button onClick={copyLink} className={rowClass} style={inter}>
            <span
              className="flex h-7 w-7 items-center justify-center rounded-md"
              style={{ backgroundColor: 'color-mix(in srgb, var(--figma-blue) 15%, transparent)', color: 'var(--figma-blue)' }}
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Link2 className="h-3.5 w-3.5" />}
            </span>
            {copied ? 'Link copied ✓' : 'Copy link'}
          </button>

          <a href="mailto:work.divyanshsharma@gmail.com" className={rowClass} style={inter}>
            <span
              className="flex h-7 w-7 items-center justify-center rounded-md"
              style={{ backgroundColor: 'color-mix(in srgb, var(--figma-cursor-green) 15%, transparent)', color: 'var(--figma-cursor-green)' }}
            >
              <Mail className="h-3.5 w-3.5" />
            </span>
            <span className="flex flex-col items-start">
              <span>Invite via email</span>
              <span className="text-[10px] font-normal" style={{ color: 'var(--figma-text-dim)' }}>
                work.divyanshsharma@gmail.com
              </span>
            </span>
          </a>

          <a
            href="https://www.linkedin.com/in/divyansh98sharma"
            target="_blank"
            rel="noopener noreferrer"
            className={rowClass}
            style={inter}
          >
            <span
              className="flex h-7 w-7 items-center justify-center rounded-md"
              style={{ backgroundColor: 'color-mix(in srgb, var(--figma-cursor-blue) 15%, transparent)', color: 'var(--figma-cursor-blue)' }}
            >
              <LinkedInGlyph />
            </span>
            Connect on LinkedIn
          </a>

          <a
            href="https://medium.com/@divyansh98sharma"
            target="_blank"
            rel="noopener noreferrer"
            className={rowClass}
            style={inter}
          >
            <span
              className="flex h-7 w-7 items-center justify-center rounded-md"
              style={{ backgroundColor: 'color-mix(in srgb, var(--figma-cursor-orange) 15%, transparent)', color: 'var(--figma-cursor-orange)' }}
            >
              <span className="text-[13px] font-bold leading-none">M</span>
            </span>
            Read on Medium
          </a>
        </div>
      </PopoverContent>
    </Popover>
  )
}
