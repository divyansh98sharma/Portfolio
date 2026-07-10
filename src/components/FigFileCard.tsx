import { useState } from 'react'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { FigmaIcon } from './icons/FigmaIcon'
import { useRouter } from './Router'
import type { CaseStudy } from '../data/caseStudies'

const inter = { fontFamily: "'Inter', sans-serif" }
const montserrat = { fontFamily: "'Montserrat', sans-serif" }

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
  const [isExpanded, setIsExpanded] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={`group h-full cursor-pointer overflow-hidden rounded-xl border bg-card transition-all duration-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{
        transitionDelay: isVisible ? `${index * delayStep}ms` : '0ms',
        borderColor: hovered ? 'var(--figma-blue)' : 'var(--border)',
        boxShadow: hovered
          ? '0 0 0 1px var(--figma-blue), 0 16px 48px rgba(0,0,0,0.14)'
          : undefined,
      }}
      onClick={() => {
        if (isExpanded) {
          setIsExpanded(false)
          navigateTo('all-case-studies')
        } else {
          navigateTo(study.id as any)
        }
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          if (isExpanded) {
            setIsExpanded(false)
            navigateTo('all-case-studies')
          } else {
            navigateTo(study.id as any)
          }
        }
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      tabIndex={0}
      role="article"
      aria-label={`${study.title} — open case study`}
    >
      <div className="flex h-full flex-col">
        {/* Thumbnail */}
        <div className={`${aspect} relative overflow-hidden`}>
          <ImageWithFallback
            src={study.image}
            alt={`${study.title} - Case study preview`}
            loading="lazy"
            className={`h-full w-full transform-gpu object-cover transition-all duration-700 ${
              hovered ? 'scale-105' : 'scale-100'
            }`}
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/30 to-transparent transition-opacity duration-300 ${
              hovered ? 'opacity-100' : 'opacity-50'
            }`}
          />
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
            style={{ ...inter, color: 'var(--figma-blue)' }}
            aria-hidden="true"
          >
            Open ↗
          </span>
        </div>

        {/* Description */}
        <div className="flex flex-1 flex-col p-5">
          <h3
            className="mb-2 text-base tracking-tight transition-colors duration-300 sm:text-lg"
            style={{ ...montserrat, fontWeight: 700, color: hovered ? 'var(--figma-blue)' : undefined }}
          >
            {study.title}
          </h3>
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

      {/* Expandable detail panel */}
      {isVisible && (
        <div
          className={`${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                     transition-all duration-500
                     pointer-events-none
                     absolute
                     top-full
                     left-0
                     right-0
                     mt-2
                     max-h-[0px]
                     overflow-hidden
                     ${isExpanded ? 'max-h-[500px]' : ''}`}
          style={{
            transitionDelay: isExpanded ? '0ms' : '100ms',
            pointerEvents: isExpanded ? 'auto' : 'none'
          }}
        >
          <div className="bg-card rounded-xl border border-border p-4 shadow-lg">
            {/* Condensed case study preview */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">{study.title}</h3>
              <p className="text-sm text-muted-foreground">{study.description}</p>

              {/* Key metrics highlight */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                {study.stats.slice(0, 2).map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-[18px] font-bold" style={{ ...montserrat, color: 'var(--figma-blue)' }}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground">{stat.unit}</div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  setIsExpanded(!isExpanded);
                  if (isExpanded) navigateTo('all-case-studies'); // Close expanded view
                  else navigateTo(study.id as any); // Open full case study
                }}
                className="w-full mt-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  backgroundColor: isExpanded ? 'var(--secondary)' : 'var(--figma-blue)',
                  color: isExpanded ? 'var(--muted-foreground)' : 'white',
                  border: isExpanded ? '1px solid var(--figma-border)' : 'none'
                }}
              >
                {isExpanded ? 'Close Preview' : 'View Case Study'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}