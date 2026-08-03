import { ChevronDown } from 'lucide-react'
import { useRouter, type Page } from '../Router'
import { scrollToSection, scrollToSectionWithDelay } from '../utils/scrollToSection'
import { ThemeToggle } from '../ThemeToggle'
import { SharePopover } from './SharePopover'
import { FigmaIcon } from '../icons/FigmaIcon'
import { collaborators } from '../../data/collaborators'
import { caseStudies } from '../../data/caseStudies'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

const inter = { fontFamily: "'Space Mono', sans-serif" }

function fileNameFor(page: Page): string {
  if (page === 'all-case-studies') return 'All files'
  const study = caseStudies.find((s) => s.id === page)
  return study ? study.fileName : 'divyansh-portfolio.fig'
}

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'case-studies', label: 'Case Studies' },
  { id: 'contact', label: 'Contact' },
]

const pill =
  'pointer-events-auto flex items-center gap-1 rounded-[14px] border p-1.5 shadow-lg'
const pillStyle = {
  backgroundColor: 'var(--figma-panel)',
  borderColor: 'var(--figma-border)',
  color: 'var(--figma-text)',
} as const

/**
 * Figma UI3-style chrome: floating pills over the canvas instead of a
 * full-width bar. Left pill = logo + file name (dropdown doubles as the
 * site nav); right pill = collaborators, theme, Share.
 */
export function FigmaTopBar() {
  const { currentPage, navigateTo } = useRouter()

  const goToSection = (sectionId: string) => {
    if (currentPage !== 'home') {
      navigateTo('home')
      scrollToSectionWithDelay(sectionId, 100)
    } else {
      scrollToSection(sectionId)
    }
  }

  const menuItemClass =
    'text-[12px] rounded-md px-3 py-2 cursor-pointer focus:bg-[color-mix(in_srgb,var(--figma-blue)_15%,transparent)] focus:text-[var(--figma-blue)]'

  return (
    <header className="figma-chrome pointer-events-none fixed top-3 left-3 right-3 z-50 flex items-center justify-between gap-3">
      {/* Left pill: logo + file */}
      <div className={pill} style={pillStyle}>
        <button
          onClick={() => navigateTo('home')}
          className="flex h-8 w-8 min-h-0 min-w-0 items-center justify-center rounded-lg transition-colors hover:bg-[color-mix(in_srgb,var(--figma-text)_8%,transparent)]"
          aria-label="Divyansh Sharma — go to homepage"
        >
          <FigmaIcon className="h-4 w-3" />
        </button>
        <span className="h-4 w-px flex-shrink-0" style={{ backgroundColor: 'var(--figma-border)' }} aria-hidden="true" />
        <span
          className="hidden md:inline pl-1.5 text-[12px] whitespace-nowrap"
          style={{ color: 'var(--figma-text-dim)' }}
          aria-hidden="true"
        >
          Drafts /
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="flex min-h-0 min-w-0 h-8 max-w-[46vw] items-center gap-1.5 rounded-lg px-2 text-[13px] font-medium transition-colors hover:bg-[color-mix(in_srgb,var(--figma-text)_8%,transparent)] sm:max-w-none"
              style={inter}
              aria-label="File menu — navigate the portfolio"
            >
              <span className="truncate">{fileNameFor(currentPage)}</span>
              <ChevronDown className="h-3 w-3 flex-shrink-0" style={{ color: 'var(--figma-text-dim)' }} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            sideOffset={10}
            className="figma-chrome w-56 rounded-xl border p-1.5 shadow-xl"
            style={{
              backgroundColor: 'var(--figma-panel)',
              borderColor: 'var(--figma-border)',
              color: 'var(--figma-text)',
            }}
          >
            <DropdownMenuItem className={menuItemClass} onClick={() => navigateTo('home')}>
              <span className="flex items-center gap-2">
                <span aria-hidden="true">↖</span> Back to file
              </span>
            </DropdownMenuItem>
            <DropdownMenuSeparator style={{ backgroundColor: 'var(--figma-border)' }} />
            {navItems.map((item) => (
              <DropdownMenuItem key={item.id} className={menuItemClass} onClick={() => goToSection(item.id)}>
                {item.label}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator style={{ backgroundColor: 'var(--figma-border)' }} />
            <DropdownMenuItem className={menuItemClass} onClick={() => navigateTo('all-case-studies')}>
              All case studies
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Right pill: collaborators + theme + share */}
      <div className={pill} style={pillStyle}>
        <div className="hidden sm:flex items-center px-1" aria-hidden="true">
          {collaborators.map((c, i) => (
            <div
              key={c.initials}
              className="flex h-7 w-7 items-center justify-center rounded-full border-2 text-[9px] font-bold text-white select-none"
              style={{
                backgroundColor: c.color,
                borderColor: 'var(--figma-panel)',
                marginLeft: i > 0 ? '-8px' : 0,
                zIndex: collaborators.length - i,
                position: 'relative',
              }}
              title={`${c.name} · ${c.role}`}
            >
              {c.initials}
            </div>
          ))}
        </div>
        <ThemeToggle />
        <SharePopover />
      </div>
    </header>
  )
}
