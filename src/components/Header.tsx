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
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const menuRef = useRef<HTMLElement>(null)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    const sections = ['about', 'experience', 'case-studies', 'contact']

    const handleScroll = () => {
      let current: string | null = null
      for (const id of sections) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        // Section is active if its top is above 60% of viewport
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

  // Close mobile menu on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isMobileMenuOpen])

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              navigateTo('home')
              setIsMobileMenuOpen(false)
            }}
            className="font-medium hover:text-muted-foreground transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded px-2 py-1 text-sm sm:text-base"
            aria-label="Go to homepage"
          >
            Divyansh Sharma
          </button>

          <div className="flex items-center gap-2">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8" aria-label="Main navigation">
              {['about', 'experience', 'case-studies', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => handleScrollToSection(section)}
                  onMouseEnter={() => setHoveredItem(section)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`text-muted-foreground hover:text-foreground transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded px-3 py-2 relative ${
                    hoveredItem === section ? 'bg-accent/50' : ''
                  } ${activeSection === section ? 'text-foreground' : ''}`}
                  aria-label={`Go to ${section.charAt(0).toUpperCase() + section.slice(1).replace('-', ' ')} section`}
                >
                  {section === 'case-studies' ? 'Case Studies' : section.charAt(0).toUpperCase() + section.slice(1)}
                  <span className={`absolute bottom-0 left-1/2 h-0.5 bg-primary transition-all duration-300 transform -translate-x-1/2 ${
                    hoveredItem === section || activeSection === section ? 'w-full' : 'w-0'
                  }`} />
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
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
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-64 opacity-100 mt-4 pb-4 border-t border-border' : 'max-h-0 opacity-0'
          }`}
          aria-label="Mobile navigation"
          aria-hidden={!isMobileMenuOpen}
        >
          <div className="flex flex-col space-y-4 pt-4">
            {['about', 'experience', 'case-studies', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => handleScrollToSection(section)}
                className="text-left text-muted-foreground hover:text-foreground transition-colors duration-200 py-2 px-4 rounded hover:bg-accent/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                tabIndex={isMobileMenuOpen ? 0 : -1}
                aria-label={`Go to ${section.charAt(0).toUpperCase() + section.slice(1).replace('-', ' ')} section`}
              >
                {section === 'case-studies' ? 'Case Studies' : section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  )
}
