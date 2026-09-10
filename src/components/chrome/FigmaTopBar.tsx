import { Suspense, lazy } from 'react'
import { ChevronDown, Compass } from 'lucide-react'
import { useRouter, type Page } from '../Router'
import { scrollToSection, scrollToSectionWithDelay } from '../utils/scrollToSection'
import { ThemeToggle } from '../ThemeToggle'
import { SharePopover } from './SharePopover'
import { FigmaIcon } from '../icons/FigmaIcon'
import { caseStudies } from '../../data/caseStudies'
import { useWalkthroughTour } from './WalkthroughTour'

// Pulls in the Firebase SDK, so it's kept out of the main bundle — shares
// its chunk with CommentTool/ReactionBar rather than duplicating it.
const LiveVisitorBubbles = lazy(() =>
  import('./LiveVisitorBubbles').then((m) => ({ default: m.LiveVisitorBubbles }))
)
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

const inter = { fontFamily: "'Inter', sans-serif" }

function fileNameFor(page: Page): string {
  if (page === 'all-case-studies') return 'All files'
  const study = caseStudies.find((s) => s.id === page)
  return study ? study.fileName : 'divyansh-portfolio.fig'
}

const navItems = [
  { id: 'case-studies', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

const pill =
  'pointer-events-auto flex items-center gap-0.5 p-1 sm:gap-1 sm:p-1.5 rounded-[14px] border shadow-lg'
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
  const { start: startTour, hasSeenTour } = useWalkthroughTour()

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
    <header className="figma-chrome pointer-events-none fixed top-2 left-2 right-2 z-50 flex items-center justify-between gap-1.5 sm:top-3 sm:left-3 sm:right-3 sm:gap-3">
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
              data-tour="file-menu"
              className="flex min-h-0 min-w-0 h-8 max-w-[34vw] items-center gap-1.5 rounded-lg px-2 text-[13px] font-medium transition-colors hover:bg-[color-mix(in_srgb,var(--figma-text)_8%,transparent)] sm:max-w-none"
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

      {/* Right pill: live visitors + theme + share */}
      <div className={pill} style={pillStyle}>
        <div className="isolate hidden sm:flex items-center px-1" aria-hidden="true">
          <Suspense fallback={null}>
            <LiveVisitorBubbles />
          </Suspense>
        </div>
        <button
          onClick={startTour}
          className="relative flex h-8 min-h-0 items-center gap-0 rounded-lg px-2 transition-colors hover:bg-[color-mix(in_srgb,var(--figma-text)_8%,transparent)] sm:gap-1.5 sm:px-2.5"
          aria-label="Take a tour of this site"
          title="Take a tour"
        >
          <Compass className="h-4 w-4 flex-shrink-0" strokeWidth={1.75} aria-hidden="true" />
          <span className="hidden sm:inline text-[11px] font-medium whitespace-nowrap" style={inter}>
            Tour
          </span>
          {!hasSeenTour && (
            <span
              className="absolute right-1 top-1 h-2 w-2 rounded-full"
              style={{ backgroundColor: 'var(--figma-blue)' }}
              aria-hidden="true"
            />
          )}
        </button>
        <ThemeToggle />
        <SharePopover />
      </div>
    </header>
  )
}
