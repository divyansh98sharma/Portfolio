import { useEffect, useState } from 'react'
import { ExternalLink, Play, X } from 'lucide-react'

const inter = { fontFamily: "'Space Mono', sans-serif" }

interface PrototypeModalProps {
  url: string
  fileName: string
  accent: string
  onClose: () => void
}

/**
 * In-app prototype player, styled like Figma's presentation view:
 * dark stage, slim top bar, the prototype embedded via Figma's
 * embed endpoint. Esc, backdrop click, or ✕ closes it.
 */
export function PrototypeModal({ url, fileName, onClose }: PrototypeModalProps) {
  const [loaded, setLoaded] = useState(false)
  const embedSrc = `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="figma-chrome fixed inset-0 z-[80] flex flex-col bg-black/90"
      role="dialog"
      aria-modal="true"
      aria-label={`Prototype — ${fileName}`}
      onClick={onClose}
    >
      <div
        className="mx-auto my-4 flex w-[min(1280px,96vw)] flex-1 flex-col overflow-hidden rounded-xl border shadow-2xl"
        style={{ borderColor: 'var(--figma-border)', backgroundColor: '#1e1e1e' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Presentation bar */}
        <div
          className="flex h-11 flex-shrink-0 items-center gap-3 border-b px-3"
          style={{ borderColor: '#333', backgroundColor: '#2c2c2c', color: '#fff' }}
        >
          <span
            className="flex h-6 w-6 items-center justify-center rounded"
            style={{ backgroundColor: '#ffffff' }}
            aria-hidden="true"
          >
            <Play className="h-3 w-3 fill-black text-black" />
          </span>
          <span className="truncate text-[12px] font-medium" style={inter}>
            Presenting · {fileName}
          </span>
          <span className="hidden text-[11px] sm:inline" style={{ ...inter, color: '#999' }} aria-hidden="true">
            Fit width · 100%
          </span>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto flex min-h-0 min-w-0 items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] transition-colors hover:bg-white/10"
            style={{ ...inter, color: '#ccc' }}
            aria-label="Open prototype in Figma (new tab)"
          >
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
            <span className="hidden sm:inline">Open in Figma</span>
          </a>
          <button
            onClick={onClose}
            autoFocus
            className="flex min-h-0 min-w-0 items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] transition-colors hover:bg-white/10"
            style={{ ...inter, color: '#ccc' }}
            aria-label="Close prototype"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">Close</span>
          </button>
        </div>

        {/* Stage */}
        <div className="relative flex-1 bg-black">
          {!loaded && (
            <p
              className="absolute inset-0 flex items-center justify-center text-[12px]"
              style={{ ...inter, color: '#888' }}
            >
              Loading prototype…
            </p>
          )}
          <iframe
            src={embedSrc}
            className="relative h-full w-full border-0"
            allowFullScreen
            loading="eager"
            title={`${fileName} prototype`}
            onLoad={() => setLoaded(true)}
          />
        </div>
      </div>
    </div>
  )
}
