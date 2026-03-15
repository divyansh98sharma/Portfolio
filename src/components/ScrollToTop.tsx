import { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'
import { Button } from './ui/button'

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsVisible(scrollY > 400)

      // Calculate scroll progress
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight > 0) {
        setScrollProgress(Math.min(scrollY / docHeight, 1))
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
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

  // SVG circle parameters
  const size = 48
  const strokeWidth = 2
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  return (
    <div className="fixed bottom-20 right-6 z-50">
      <div className="relative">
        {/* Scroll progress ring */}
        <svg
          className={`absolute inset-0 -rotate-90 transition-opacity duration-300 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          width={size}
          height={size}
          aria-hidden="true"
        >
          {/* Progress arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            className="text-primary transition-all duration-150"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - scrollProgress)}
          />
        </svg>

        <Button
          onClick={scrollToTop}
          size="sm"
          className={`
            rounded-full p-2 h-12 w-12 shadow-lg transition-all duration-300 ease-out transform-gpu
            ${isVisible
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-4 scale-75 pointer-events-none'
            }
            ${isClicked ? 'scale-90' : ''}
          `}
          aria-label="Scroll back to top of page"
          aria-hidden={!isVisible}
          tabIndex={isVisible ? 0 : -1}
        >
          <ChevronUp className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">Back to top</span>
        </Button>
      </div>
    </div>
  )
}
