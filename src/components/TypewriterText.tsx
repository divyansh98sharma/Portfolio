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
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Reactive reduced motion detection
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) {
      setCurrentText(texts.join(' / '))
      setShowCursor(true)
      return
    }

    const currentFullText = texts[currentTextIndex]

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < currentFullText.length) {
          setCurrentText(currentFullText.slice(0, currentText.length + 1))
        } else {
          setIsPaused(true)
          setTimeout(() => {
            setIsPaused(false)
            setIsDeleting(true)
          }, 2000)
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setCurrentTextIndex((prev) => (prev + 1) % texts.length)
        }
      }
    }, isDeleting ? 50 : isPaused ? 0 : 100)

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
    <span className={className} aria-label={`Role: ${prefersReducedMotion ? texts.join(', ') : texts[currentTextIndex]}`}>
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
