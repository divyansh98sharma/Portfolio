import { ChevronDown } from 'lucide-react'
import { useRouter, type Page } from '../Router'
import { scrollToSection, scrollToSectionWithDelay } from '../utils/scrollToSection'
import { ThemeToggle } from '../ThemeToggle'
import { SharePopover } from './SharePopover'
import { ToolButtons } from './ToolButtons'
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
import { TOPBAR_HEIGHT } from '../../lib/chrome'

const inter = { fontFamily: "'Inter', sans-serif" }

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

/**
 * The Figma-style top toolbar: logo, file name (dropdown = site nav),
 * multiplayer avatar stack, theme toggle, and the blue Share button.
 * Mounted persistently across every route — you never leave the app.
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
    <header
      className="figma-chrome fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b px-2 sm:px-3"
      style={{
        height: TOPBAR_HEIGHT,
        backgroundColor: 'var(--figma-panel)',
        borderColor: 'var(--figma-border)',
        color: 'var(--figma-text)',
      }}
    >
      {/* Left: logo + (Phase 5: tool buttons slot) */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => navigateTo('home')}
          className="flex h-9 w-9 min-h-0 min-w-0 items-center justify-center rounded-md transition-colors hover:bg-[color-mix(in_srgb,var(--figma-text)_8%,transparent)]"
          aria-label="Divyansh Sharma — go to homepage"
        >
          <FigmaIcon className="h-4 w-3" />
        </button>
        <div className="hidden lg:block">
          <ToolButtons />
        </div>
      </div>

      {/* Center: file name dropdown = the site nav */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center min-w-0">
        <span
          className="hidden md:inline text-[12px] mr-1 whitespace-nowrap"
          style={{ color: 'var(--figma-text-dim)' }}
          aria-hidden="true"
        >
          Drafts /
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="flex items-center gap-1.5 min-h-0 min-w-0 h-8 max-w-[52vw] sm:max-w-none rounded-md px-2 text-[13px] font-medium transition-colors hover:bg-[color-mix(in_srgb,var(--figma-text)_8%,transparent)]"
              style={inter}
              aria-label="File menu — navigate the portfolio"
            >
              <span className="truncate">{fileNameFor(currentPage)}</span>
              <ChevronDown className="h-3 w-3 flex-shrink-0" style={{ color: 'var(--figma-text-dim)' }} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="center"
            sideOffset={8}
            className="w-56 rounded-xl border p-1.5 shadow-xl figma-chrome"
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

      {/* Right: multiplayer avatars + theme + share */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="hidden sm:flex items-center" aria-hidden="true">
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
