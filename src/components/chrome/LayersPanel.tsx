import { useCallback, useState } from 'react'
import { ChevronDown, ChevronRight, FileText, Frame as FrameIcon, Image as ImageIcon, Type } from 'lucide-react'
import { useLayers } from './LayersContext'
import { useRouter, type Page } from '../Router'
import { scrollToSection } from '../utils/scrollToSection'
import { caseStudies } from '../../data/caseStudies'
import { LAYERS_PANEL_WIDTH } from '../../lib/chrome'

const inter = { fontFamily: "'Space Mono', sans-serif" }

/* ---------- pages: real destinations, named for what they are ---------- */
const PAGES: { id: Page; label: string }[] = [
  { id: 'home', label: 'Portfolio' },
  ...caseStudies.map((s) => ({ id: s.id, label: s.product })),
  { id: 'all-case-studies', label: 'All files' },
]

/* ---------- layer tree: derive child layers from the live DOM ---------- */
type LayerKind = 'text' | 'image' | 'instance'
interface ChildLayer {
  kind: LayerKind
  name: string
  el: HTMLElement
}

function scanLayers(frameEl: HTMLElement): ChildLayer[] {
  const out: ChildLayer[] = []
  const seen = new Set<string>()
  const nodes = frameEl.querySelectorAll<HTMLElement>('h1, h2, h3, p, img, figure img, button, a')
  for (const el of nodes) {
    if (el.closest('[data-comment-ui]')) continue
    let kind: LayerKind
    let name: string
    const tag = el.tagName
    if (tag === 'IMG') {
      kind = 'image'
      name = (el.getAttribute('alt') || 'image').split(/[-—·]/)[0].trim()
    } else if (tag === 'BUTTON' || tag === 'A') {
      kind = 'instance'
      name = el.textContent?.replace(/\s+/g, ' ').trim() || ''
      if (!name || name.length > 28) continue // skip icon-only / long link rows
    } else {
      kind = 'text'
      name = el.textContent?.replace(/\s+/g, ' ').trim() || ''
    }
    if (!name) continue
    if (name.length > 26) name = name.slice(0, 26) + '…'
    const key = kind + name
    if (seen.has(key)) continue
    seen.add(key)
    out.push({ kind, name, el })
  }
  return out
}

/** Figma-style select flash: scroll to the layer and pulse its outline */
function selectLayer(el: HTMLElement) {
  el.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    block: 'center',
  })
  el.style.outline = '1.5px solid var(--figma-blue)'
  el.style.outlineOffset = '3px'
  window.setTimeout(() => {
    el.style.outline = ''
    el.style.outlineOffset = ''
  }, 1400)
}

function KindIcon({ kind }: { kind: LayerKind }) {
  if (kind === 'text') return <Type className="h-3 w-3 flex-shrink-0" strokeWidth={1.75} aria-hidden="true" />
  if (kind === 'image') return <ImageIcon className="h-3 w-3 flex-shrink-0" strokeWidth={1.75} aria-hidden="true" />
  // instance — hollow diamond, purple like Figma
  return (
    <svg viewBox="0 0 12 12" className="h-3 w-3 flex-shrink-0" fill="none" aria-hidden="true">
      <rect x="5.6" y="1.2" width="6.2" height="6.2" transform="rotate(45 5.6 1.2)" stroke="var(--figma-cursor-purple)" strokeWidth="1.3" />
    </svg>
  )
}

/**
 * Figma's left panel, UI3 floating style — now with real Pages (named
 * routes) and an expandable layer tree per frame: text layers, image
 * fills and component instances derived from the live DOM. Clicking a
 * child layer scrolls to it and pulses a selection outline.
 */
export function LayersPanel() {
  const { frames, activeFrameId } = useLayers()
  const { currentPage, navigateTo } = useRouter()
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const [children, setChildren] = useState<Record<string, ChildLayer[]>>({})

  const toggle = useCallback(
    (frameId: string) => {
      setExpanded((prev) => {
        const next = new Set(prev)
        if (next.has(frameId)) {
          next.delete(frameId)
        } else {
          next.add(frameId)
          const frame = frames.find((f) => f.id === frameId)
          if (frame) setChildren((c) => ({ ...c, [frameId]: scanLayers(frame.el) }))
        }
        return next
      })
    },
    [frames]
  )

  return (
    <aside
      className="figma-chrome fixed left-3 top-[72px] bottom-[76px] z-40 hidden lg:flex flex-col rounded-[14px] border shadow-xl overflow-hidden"
      style={{
        width: LAYERS_PANEL_WIDTH,
        backgroundColor: 'var(--figma-panel)',
        borderColor: 'var(--figma-border)',
        color: 'var(--figma-text)',
      }}
    >
      {/* Panel tabs — decorative, like Figma's File / Assets */}
      <div
        className="flex items-center gap-4 border-b px-4 text-[12px] flex-shrink-0"
        style={{ height: 40, borderColor: 'var(--figma-border)' }}
        aria-hidden="true"
      >
        <span className="font-medium">File</span>
        <span style={{ color: 'var(--figma-text-dim)' }}>Assets</span>
      </div>

      {/* Pages — real, named destinations */}
      <nav className="px-2 pt-3 flex-shrink-0" aria-label="Pages">
        <div
          className="px-2 pb-2 text-[11px] font-medium"
          style={{ ...inter, color: 'var(--figma-text-dim)' }}
          aria-hidden="true"
        >
          Pages
        </div>
        <ul className="space-y-0.5">
          {PAGES.map((page) => {
            const active = currentPage === page.id
            return (
              <li key={page.id}>
                <button
                  onClick={() => navigateTo(page.id)}
                  className={`layers-row w-full min-h-0 min-w-0 text-left ${active ? 'is-active' : ''}`}
                  style={{ ...inter, height: 28 }}
                  aria-current={active ? 'page' : undefined}
                  aria-label={`Open ${page.label}`}
                >
                  <FileText className="h-3 w-3 flex-shrink-0" strokeWidth={1.75} aria-hidden="true" />
                  <span className="truncate">{page.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Layers = frames = sections, expandable into their child layers */}
      <nav className="flex-1 overflow-y-auto px-2 pt-3 pb-4 border-t mt-3" style={{ borderColor: 'var(--figma-border)' }} aria-label="Sections">
        <div
          className="px-2 pb-2 text-[11px] font-medium"
          style={{ ...inter, color: 'var(--figma-text-dim)' }}
          aria-hidden="true"
        >
          Layers
        </div>
        <ul className="space-y-0.5" style={inter}>
          {frames.map((frame) => {
            const isOpen = expanded.has(frame.id)
            const kids = children[frame.id] ?? []
            return (
              <li key={frame.id}>
                <div
                  className={`layers-row w-full ${activeFrameId === frame.id ? 'is-active' : ''}`}
                  style={{ ...inter, padding: 0 }}
                >
                  <button
                    onClick={() => toggle(frame.id)}
                    className="flex h-full w-5 min-h-0 min-w-0 flex-shrink-0 items-center justify-center opacity-70 hover:opacity-100"
                    aria-label={isOpen ? `Collapse ${frame.name}` : `Expand ${frame.name} layers`}
                    aria-expanded={isOpen}
                  >
                    {isOpen ? (
                      <ChevronDown className="h-3 w-3" aria-hidden="true" />
                    ) : (
                      <ChevronRight className="h-3 w-3" aria-hidden="true" />
                    )}
                  </button>
                  <button
                    onClick={() => scrollToSection(frame.id)}
                    className="flex h-full min-h-0 min-w-0 flex-1 items-center gap-2 overflow-hidden pr-2 text-left"
                    aria-current={activeFrameId === frame.id ? 'true' : undefined}
                    aria-label={`Go to ${frame.name}`}
                  >
                    <FrameIcon className="h-3 w-3 flex-shrink-0" strokeWidth={1.75} aria-hidden="true" />
                    <span className="truncate">{frame.name}</span>
                  </button>
                </div>

                {isOpen && (
                  <ul className="mt-0.5 space-y-0.5" aria-label={`${frame.name} layers`}>
                    {kids.map((child, i) => (
                      <li key={i}>
                        <button
                          onClick={() => selectLayer(child.el)}
                          className="layers-row w-full min-h-0 min-w-0 text-left"
                          style={{ ...inter, height: 24, paddingLeft: 34, fontSize: 11 }}
                          aria-label={`Select layer ${child.name}`}
                        >
                          <KindIcon kind={child.kind} />
                          <span
                            className="truncate"
                            style={child.kind === 'instance' ? { color: 'var(--figma-cursor-purple)' } : undefined}
                          >
                            {child.name}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
