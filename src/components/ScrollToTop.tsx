import { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'
import { Button } from './ui/button'

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when user scrolls down 400px
      if (window.pageYOffset > 400) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    // Add scroll event listener
    window.addEventListener('scroll', toggleVisibility)

    // Clean up the event listener
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
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

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      scrollToTop()
    }
  }

  return (
    <div className="fixed bottom-20 right-6 z-50">
      <Button
        onClick={scrollToTop}
        onKeyDown={handleKeyDown}
        size="sm"
        className={`
          rounded-full p-2 h-12 w-12 shadow-lg transition-all duration-300 ease-in-out transform-gpu hover:scale-110 active:scale-95
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
        <ChevronUp 
          className={`h-4 w-4 transition-transform duration-300 ${
            isClicked ? 'scale-90 rotate-12' : 'scale-100 rotate-0'
          }`} 
          aria-hidden="true" 
        />
        <span className="sr-only">Back to top</span>
      </Button>
    </div>
  )
}