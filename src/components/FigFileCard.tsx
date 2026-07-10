import { useState } from 'react'
import { CoverArt } from './CoverArt'
import { FigmaIcon } from './icons/FigmaIcon'
import { useRouter } from './Router'
import type { CaseStudy } from '../data/caseStudies'

const inter = { fontFamily: "'Inter', sans-serif" }

interface FigFileCardProps {
  study: CaseStudy
  index: number
  isVisible: boolean
  /** stagger step in ms */
  delayStep?: number
  /** thumbnail aspect class, e.g. 'aspect-[16/10]' */
  aspect?: string
}

/**
 * A case study as a Figma file-browser tile: thumbnail on top,
 * filename + "Edited <year>" row below, blue selection ring on hover.
 */
export function FigFileCard({
  study,
  index,
  isVisible,
  delayStep = 200,
  aspect = 'aspect-[16/10]',
}: FigFileCardProps) {
  const { navigateTo } = useRouter()
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={`group h-full cursor-pointer overflow-hidden rounded-xl border bg-card transition-all duration-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{
        transitionDelay: isVisible ? `${index * delayStep}ms` : '0ms',
        borderColor: hovered ? study.accent : 'var(--border)',
        boxShadow: hovered ? `0 0 0 1px ${study.accent}, 0 16px 48px rgba(0,0,0,0.14)` : undefined,
      }}
      onClick={() => navigateTo(study.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          navigateTo(study.id)
        }
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      tabIndex={0}
      role="article"
      aria-label={`${study.title} — open case study`}
    >
      <div className="flex h-full flex-col">
        {/* Thumbnail — generated Figma-style cover art */}
        <div className={`${aspect} relative overflow-hidden`}>
          <div
            className={`h-full w-full transform-gpu transition-transform duration-700 ${
              hovered ? 'scale-[1.04]' : 'scale-100'
            }`}
          >
            <CoverArt product={study.product} company={study.company} accent={study.accent} />
          </div>
          <span
            className="absolute top-3 left-3 rounded-md bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-black/70"
            style={inter}
          >
            {study.tags[0]}
          </span>
        </div>

        {/* File meta row — the file-browser part */}
        <div className="flex items-center gap-3 border-b border-border px-5 py-3.5">
          <span style={{ color: 'var(--figma-cursor-purple)' }}>
            <FigmaIcon className="h-4 w-3 flex-shrink-0" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-semibold" style={inter}>
              {study.fileName}
            </p>
            <p className="text-[11px] text-muted-foreground" style={inter}>
              Edited {study.year} · Divyansh Sharma
            </p>
          </div>
          <span
            className={`text-[11px] font-semibold transition-all duration-300 ${
              hovered ? 'translate-x-0 opacity-100' : '-translate-x-1 opacity-0'
            }`}
            style={{ ...inter, color: study.accent }}
            aria-hidden="true"
          >
            Open ↗
          </span>
        </div>

        {/* Description */}
        <div className="flex flex-1 flex-col p-5">
          <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">{study.description}</p>

          <div className="mb-4 flex flex-wrap gap-2">
            {study.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-border bg-secondary/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                style={inter}
              >
                {tag}
              </span>
            ))}
          </div>

          <p
            className="border-t border-border pt-3 text-[11px] font-semibold"
            style={{ ...inter, color: 'var(--figma-cursor-green)' }}
          >
            ▲ {study.impact}
          </p>
        </div>
      </div>
    </div>
  )
}
