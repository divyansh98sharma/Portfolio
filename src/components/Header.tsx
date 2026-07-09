import { ThemeToggle } from './ThemeToggle'
import { useRouter } from './Router'
import { scrollToSection, scrollToSectionWithDelay } from './utils/scrollToSection'
import { useState, useEffect, useRef } from 'react'
import { Button } from './ui/button'

function MenuToggleIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="relative w-5 h-5 flex flex-col justify-center items-center">
      <span className={`block h-0.5 w-5 bg-current rounded-full transition-all duration-300 ${
        isOpen ? 'rotate-45 translate-y-[3px]' : '-translate-y-[5px]'
      }`} />
      <span className={`block h-0.5 w-5 bg-current rounded-full transition-all duration-300 ${
        isOpen ? 'opacity-0 scale-0' : 'opacity-100'
      }`} />
      <span className={`block h-0.5 w-5 bg-current rounded-full transition-all duration-300 ${
        isOpen ? '-rotate-45 -translate-y-[3px]' : 'translate-y-[5px]'
      }`} />
    </div>
  )
}

export function Header() {
  const { currentPage, navigateTo } = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const menuRef = useRef<HTMLElement>(null)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const sections = ['about', 'experience', 'case-studies', 'contact']

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      let current: string | null = null
      for (const id of sections) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= window.innerHeight * 0.6) {
          current = id
        }
      }
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [currentPage])

  const handleScrollToSection = (sectionId: string) => {
    if (currentPage !== 'home') {
      navigateTo('home')
      scrollToSectionWithDelay(sectionId, 100)
    } else {
      scrollToSection(sectionId)
    }
    setIsMobileMenuOpen(false)
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isMobileMenuOpen])

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'case-studies', label: 'Case Studies' },
  ]

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-background/92 backdrop-blur-md shadow-sm'
        : 'bg-background/80 backdrop-blur-sm'
    }`}>
      <div className="header-inner">
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              navigateTo('home')
              setIsMobileMenuOpen(false)
            }}
            className="no-underline font-bold text-lg tracking-tight hover:opacity-70 transition-opacity duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded px-2 py-1"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            aria-label="Divyansh. Go to homepage"
          >
            Divyansh.
          </button>

          <div className="flex items-center gap-3">
            {/* Desktop Navigation */}
            <nav className="desktop-only items-center gap-1" aria-label="Main navigation">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleScrollToSection(item.id)}
                  className={`nav-link no-underline text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                    activeSection === item.id
                      ? 'text-foreground bg-secondary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                  }`}
                  aria-label={`Go to ${item.label} section`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* CTA Button - Desktop only */}
            <button
              onClick={() => handleScrollToSection('contact')}
              className="no-underline desktop-only-inline items-center justify-center px-5 py-2 text-xs font-bold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-sm hover:shadow-md"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              aria-label="Get in touch"
            >
              Get In Touch
            </button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="mobile-only"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <MenuToggleIcon isOpen={isMobileMenuOpen} />
            </Button>

            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <nav
          ref={menuRef}
          id="mobile-menu"
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'opacity-100 mt-4 pb-4' : 'opacity-0'
          }`}
          style={{ maxHeight: isMobileMenuOpen ? '320px' : '0' }}
          aria-label="Mobile navigation"
          aria-hidden={!isMobileMenuOpen}
        >
          <div className="flex flex-col space-y-2 pt-4 border-t border-border">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScrollToSection(item.id)}
                className="text-left text-muted-foreground hover:text-foreground transition-colors duration-200 py-3 px-4 rounded-lg hover:bg-secondary/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                tabIndex={isMobileMenuOpen ? 0 : -1}
                aria-label={`Go to ${item.label} section`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleScrollToSection('contact')}
              className="text-center py-3 px-4 rounded-full bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-all duration-300 mt-2"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              tabIndex={isMobileMenuOpen ? 0 : -1}
            >
              Get In Touch
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}
