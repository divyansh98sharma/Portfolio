import { useEffect, useState } from 'react'
import { scrollToSection } from '../../utils/scrollToSection'
import { TOPBAR_HEIGHT } from '../../lib/chrome'

interface Section {
  id: string
  label: string
}

interface CaseStudySidebarProps {
  sections: Section[]
  onSectionClick?: (id: string) => void
}

export function CaseStudySidebar({ sections, onSectionClick }: CaseStudySidebarProps) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    let observer: IntersectionObserver | null = null
    let handleScroll: () => void

    const initObserver = () => {
      // Intersection observer for accurate active section detection
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id)
            }
          }
        },
        {
          rootMargin: `-${Math.round(window.innerHeight * 0.4)}px 0px -${Math.round(window.innerHeight * 0.6)}px 0px`,
          threshold: 0,
        }
      )

      // Observe each section element
      sections.forEach(({ id }) => {
        const el = document.getElementById(id)
        if (el) {
          observer.observe(el)
        }
      })
    }

    const handleScroll = () => {
      // Fallback: check which section is near top based on scroll position
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop
      const centerY = scrollPosition + window.innerHeight * 0.5

      // Find the section whose top is closest to centerY but not above it
      let closestId: string | null = null
      let minDistance = Number.POSITIVE_INFINITY

      sections.forEach(({ id }) => {
        const el = document.getElementById(id)
        if (el) {
          const top = el.offsetTop
          const height = el.clientHeight
          // Consider the section's vertical middle
          const middle = top + height / 2
          const distance = Math.abs(middle - centerY)
          if (distance < minDistance) {
            minDistance = distance
            closestId = id
          }
        }
      })

      if (closestId !== null && closestId !== activeId) {
        setActiveId(closestId)
      }
    }

    // Initialize
    if (typeof window !== 'undefined') {
      // Try intersection observer first
      if ('IntersectionObserver' in window) {
        initObserver()
      } else {
        // Fallback to scroll event
        window.addEventListener('scroll', handleScroll)
        // Initial check
        handleScroll()
      }
    }

    return () => {
      if (observer) {
        observer.disconnect()
      }
      window.removeEventListener('scroll', handleScroll)
    }
  }, [sections, activeId])

  const handleClick = (id: string) => {
    if (onSectionClick) {
      onSectionClick(id)
    } else {
      // Use smooth scroll with offset for fixed header
      scrollToSection(id, { offsetTop: TOPBAR_HEIGHT })
    }
  }

  return (
    <aside
      className={`fixed inset-y-0 right-0 flex w-[3.5rem] flex-col items-center gap-2 px-2 pt-16
                   bg-background/50 backdrop-blur-sm border-l border-border
                   z-20`}
    >
      {sections.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => handleClick(id)}
          aria-label={`Jump to ${label} section`}
          className={`relative w-7 h-7 flex items-center justify-center rounded-full
                     transition-all duration-200
                     ${activeId === id
                       ? 'bg-[var(--figma-blue)] text-white'
                       : 'bg-secondary/50 text-muted-foreground hover:bg-secondary/70 hover:text-foreground'}
                     `}
        >
          {/* Visual connector line when active */}
          <div className="absolute left-0 -translate-x-3 w-px h-full bg-[var(--figma-blue)] opacity-0
                         transition-opacity duration-200"
               aria-hidden="true"
          ></div>
          {/* Use first letter of label as icon */}
          <span className="text-xs font-medium">{label.charAt(0)}</span>
        </button>
      ))}
    </aside>
  )
}