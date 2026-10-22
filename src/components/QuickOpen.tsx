import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Command, Search, X } from 'lucide-react'
import { useRouter, type Page } from './Router'
import { caseStudies } from '../data/caseStudies'
import { scrollToSection, scrollToSectionWithDelay } from './utils/scrollToSection'

type Destination = { key: string; label: string; context: string; page: Page; section?: string }

const destinations: Destination[] = [
  { key: 'home', label: 'Portfolio', context: 'Home', page: 'home' },
  { key: 'work', label: 'Featured work', context: 'Section', page: 'home', section: 'case-studies' },
  { key: 'about', label: 'About', context: 'Section', page: 'home', section: 'about' },
  { key: 'experience', label: 'Experience', context: 'Section', page: 'home', section: 'experience' },
  { key: 'testimonials', label: 'Testimonials', context: 'Section', page: 'home', section: 'testimonials' },
  { key: 'contact', label: 'Contact', context: 'Section', page: 'home', section: 'contact' },
  { key: 'all-files', label: 'All case studies', context: 'File browser', page: 'all-case-studies' },
  ...caseStudies
    .filter((study): study is typeof study & { id: Page } => Boolean(study.id) && study.status !== 'coming-soon')
    .map(study => ({
      key: study.id,
      label: study.product,
      context: study.company,
      page: study.id,
    })),
]

/**
 * Quick Open: the Figma-file navigation metaphor made functional.
 * No unavailable projects are offered; command list uses existing routes.
 */
export function QuickOpen() {
  const { currentPage, navigateTo } = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const searchRef = useRef<HTMLInputElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const visible = destinations.filter(item => `${item.label} ${item.context}`.toLowerCase().includes(query.trim().toLowerCase()))
  const selectedIndex = Math.min(selected, Math.max(visible.length - 1, 0))
  const openPalette = () => { setQuery(''); setSelected(0); setOpen(true) }
  const closePalette = () => { setOpen(false); triggerRef.current?.focus() }

  const goTo = (destination: Destination) => {
    setOpen(false)
    if (destination.section) {
      if (currentPage === 'home') {
        scrollToSection(destination.section)
      } else {
        navigateTo('home')
        scrollToSectionWithDelay(destination.section, 100)
      }
    } else if (destination.page === currentPage) {
      window.scrollTo({ top: 0, behavior: 'auto' })
    } else {
      navigateTo(destination.page)
    }
  }

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen(prev => {
          if (!prev) { setQuery(''); setSelected(0) }
          return !prev
        })
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  useEffect(() => {
    if (!open) return
    const lastFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null
    searchRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); setOpen(false) }
      if (event.key === 'Tab') {
        const root = dialogRef.current
        const controls = root?.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled])')
        if (!controls?.length) return
        const first = controls[0], last = controls[controls.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); lastFocused?.focus() }
  }, [open])

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={openPalette}
        className="figma-chrome fixed bottom-20 right-4 z-40 flex min-h-11 items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold shadow-lg transition-colors hover:border-[var(--figma-blue)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--figma-blue)] md:bottom-20"
        style={{ color: 'var(--figma-text)', background: 'var(--figma-panel)', borderColor: 'var(--figma-border)' }}
        aria-keyshortcuts="Control+K Meta+K"
        aria-label="Quick open portfolio navigation"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <Search className="h-4 w-4" aria-hidden="true" />
        <span>Quick open</span>
        <span className="hidden rounded border px-1.5 py-0.5 font-mono text-[10px] opacity-70 sm:inline">⌘ K</span>
      </button>

      {open && (
        <div className="figma-chrome fixed inset-0 z-[85] flex justify-center bg-black/60 px-3 pt-[max(12vh,72px)] sm:px-6" onMouseDown={event => { if (event.target === event.currentTarget) setOpen(false) }}>
          <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="quick-open-heading" className="h-fit max-h-[75vh] w-full max-w-xl overflow-hidden rounded-2xl border shadow-2xl" style={{ background: 'var(--figma-panel)', color: 'var(--figma-text)', borderColor: 'var(--figma-border)' }}>
            <div className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: 'var(--figma-border)' }}>
              <h2 id="quick-open-heading" className="flex items-center gap-2 text-sm font-semibold"><Command className="h-4 w-4" aria-hidden="true"/>Quick Open</h2>
              <button type="button" aria-label="Close Quick Open" onClick={closePalette} className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--figma-blue)]"><X className="h-4 w-4" aria-hidden="true"/></button>
            </div>
            <div className="flex items-center gap-3 border-b px-4" style={{ borderColor: 'var(--figma-border)' }}>
              <Search className="h-4 w-4 shrink-0 opacity-60" aria-hidden="true"/>
              <input
                ref={searchRef}
                type="search"
                value={query}
                onChange={event => { setQuery(event.target.value); setSelected(0) }}
                onKeyDown={event => {
                  if (event.key === 'ArrowDown') { event.preventDefault(); setSelected(i => Math.min(i + 1, visible.length - 1)) }
                  if (event.key === 'ArrowUp') { event.preventDefault(); setSelected(i => Math.max(0, i - 1)) }
                  if (event.key === 'Enter' && visible[selectedIndex]) { event.preventDefault(); goTo(visible[selectedIndex]) }
                }}
                placeholder="Search pages and projects…"
                aria-label="Search portfolio destinations"
                aria-controls="quick-open-results"
                aria-activedescendant={visible.length ? `quick-open-${visible[selectedIndex].key}` : undefined}
                className="h-12 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:opacity-60"
                style={{ color: 'var(--figma-text)' }}
              />
            </div>
            <div id="quick-open-results" role="listbox" aria-label="Available destinations" className="max-h-[50vh] overflow-y-auto p-2">
              {visible.length === 0 ? <p className="px-3 py-8 text-center text-sm opacity-70">No matching pages or projects.</p> : visible.map((item, i) => (
                <button
                  id={`quick-open-${item.key}`}
                  role="option"
                  aria-selected={selectedIndex === i}
                  type="button"
                  key={item.key}
                  onMouseEnter={() => setSelected(i)}
                  onClick={() => goTo(item)}
                  className="flex min-h-12 w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--figma-blue)]"
                  style={{ background: selectedIndex === i ? 'color-mix(in srgb, var(--figma-blue) 14%, transparent)' : undefined }}
                >
                  <span className="min-w-0 flex-1 truncate font-medium">{item.label}</span>
                  <span className="max-w-[35%] truncate text-xs opacity-65">{item.context}</span>
                  <ArrowRight className="h-4 w-4 shrink-0 opacity-50" aria-hidden="true"/>
                </button>
              ))}
            </div>
            <p className="border-t px-4 py-2 text-[11px] opacity-65" style={{ borderColor: 'var(--figma-border)' }}>↑ ↓ Navigate · Enter Open · Esc Close</p>
          </div>
        </div>
      )}
    </>
  )
}
