import { useEffect, useRef, useState } from 'react'

interface UseRevealOptions {
  threshold?: number
  rootMargin?: string
}

/**
 * Fires `isVisible` once an element scrolls into view, then stops observing.
 * Centralizes the IntersectionObserver-reveal pattern previously duplicated
 * across About/BuiltFor/Experience/Process/Testimonials/Contact.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseRevealOptions = {}
) {
  const { threshold = 0.1, rootMargin } = options
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Fast path: anything already in the viewport reveals immediately.
    // Browsers can drop the initial IntersectionObserver callback when a
    // page loads in a background tab or mid-navigation, which left
    // above-the-fold content invisible until the first scroll.
    const rect = node.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return { ref, isVisible }
}
