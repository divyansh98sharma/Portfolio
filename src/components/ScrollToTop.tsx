import { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'
import { Button } from './ui/button'

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility, { passive: true })
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    setIsClicked(true)
    setTimeout(() => setIsClicked(false), 300)

    const mainContent = document.getElementById('main-content')
    if (mainContent) {
      mainContent.focus()
    }

    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    })
  }

  return (
    <div className="fixed bottom-20 right-6 z-50">
      <Button
        onClick={scrollToTop}
        size="sm"
        className={`
          rounded-full p-2 h-12 w-12 shadow-lg transition-all duration-300 ease-in-out transform-gpu
          ${isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-2 pointer-events-none'
          }
          ${isClicked ? 'scale-95 bg-primary/90' : 'scale-100'}
        `}
        aria-label="Scroll back to top of page"
        aria-hidden={!isVisible}
        tabIndex={isVisible ? 0 : -1}
      >
        <ChevronUp className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">Back to top</span>
      </Button>
    </div>
  )
}
