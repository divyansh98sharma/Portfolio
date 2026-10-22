import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
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
  const comingSoon = study.status === 'coming-soon'

  const openStudy = () => { if (!comingSoon && study.id) navigateTo(study.id) }

  return (
    <div
      className={`portfolio-file-card group h-full overflow-hidden rounded-xl border bg-card transition-all duration-700 ${
        comingSoon ? 'cursor-default' : 'cursor-pointer'
      } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{
        transitionDelay: isVisible ? `${index * delayStep}ms` : '0ms',
        borderColor: hovered && !comingSoon ? study.accent : 'var(--border)',
        boxShadow: hovered && !comingSoon ? `0 0 0 1px ${study.accent}, 0 16px 48px rgba(0,0,0,0.14)` : undefined,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative flex h-full flex-col">
        {/* Thumbnail — generated Figma-style cover art */}
        <div className={`${aspect} relative overflow-hidden`}>
          <div
            className={`portfolio-file-art h-full w-full transform-gpu transition-transform duration-700 ${
              hovered && !comingSoon ? 'sm:scale-[1.04]' : 'scale-100'
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
          {comingSoon && (
            <span
              className="absolute top-3 right-3 rounded-md bg-black/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white"
              style={inter}
            >
              Coming Soon
            </span>
          )}
        </div>

        {/* File meta row — the file-browser part */}
        <div className="flex items-center gap-3 border-b border-border px-5 py-3.5">
          <span style={{ color: 'var(--frame-text-purple)' }}>
            <FigmaIcon className="h-4 w-3 flex-shrink-0" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-semibold" style={inter}>
              {study.fileName}
            </p>
            <p className="text-[11px] text-muted-foreground" style={inter}>
              Case study · Divyansh Sharma
            </p>
          </div>
          {!comingSoon && (
            <span
              className={`text-[11px] font-semibold transition-all duration-300 ${
                hovered ? 'translate-x-0 opacity-100' : '-translate-x-1 opacity-0'
              }`}
              style={{ ...inter, color: study.accent }}
              aria-hidden="true"
            >
              Open ↗
            </span>
          )}
        </div>

        {/* Executive preview — clarify the project before the Figma file metadata. */}
        <div className="flex flex-1 flex-col p-5">
          <h3 className="mb-1 text-base font-bold leading-snug">{study.product}</h3>
          <p className="mb-3 text-xs font-medium text-muted-foreground">{study.company}{study.year ? ` · ${study.year}` : ''}</p>
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

          {!comingSoon && (
            <button type="button" onClick={openStudy} className="group/open relative z-10 mb-4 flex min-h-11 w-full items-center justify-between rounded-lg border border-border bg-secondary/60 px-4 py-3 text-left text-sm font-semibold transition-colors hover:border-[var(--figma-blue)] hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--figma-blue)]" aria-label={`Explore the case study: ${study.title}`}>
              Explore the case study <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover/open:-translate-y-0.5 group-hover/open:translate-x-0.5" aria-hidden="true" />
            </button>
          )}

          <p
            className="border-t border-border pt-3 text-[11px] font-semibold"
            style={{ ...inter, color: comingSoon ? 'var(--muted-foreground)' : 'var(--text-positive)' }}
          >
            {comingSoon ? '◐' : '▲'} {study.impact}
          </p>
        </div>
      </div>
    </div>
  )
}
