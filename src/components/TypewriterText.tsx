import { useState, useEffect } from 'react'

interface TypewriterTextProps {
  texts: string[]
  className?: string
}

export function TypewriterText({ texts, className = '' }: TypewriterTextProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)
  const [isPaused, setIsPaused] = useState(false)

  // Check if user prefers reduced motion
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    // If user prefers reduced motion, just show all texts joined
    if (prefersReducedMotion) {
      setCurrentText(texts.join(' / '))
      setShowCursor(true)
      return
    }

    const currentFullText = texts[currentTextIndex]
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < currentFullText.length) {
          setCurrentText(currentFullText.slice(0, currentText.length + 1))
        } else {
          // Finished typing, wait then start deleting
          setIsPaused(true)
          setTimeout(() => {
            setIsPaused(false)
            setIsDeleting(true)
          }, 2000)
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1))
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false)
          setCurrentTextIndex((prev) => (prev + 1) % texts.length)
        }
      }
    }, isDeleting ? 50 : isPaused ? 0 : 100) // Faster when deleting, no delay when paused

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentTextIndex, texts, isPaused, prefersReducedMotion])

  // Cursor blinking effect
  useEffect(() => {
    if (prefersReducedMotion) {
      setShowCursor(true)
      return
    }

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [prefersReducedMotion])

  return (
    <span className={className} aria-live="polite" aria-label={`Role: ${prefersReducedMotion ? texts.join(', ') : texts[currentTextIndex]}`}>
      {currentText}
      <span 
        className={`inline-block w-1 h-[0.9em] bg-current transition-opacity duration-100 typewriter-cursor ml-1 align-baseline ${
          showCursor ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ verticalAlign: 'baseline' }}
        aria-hidden="true"
      />
    </span>
  )
}