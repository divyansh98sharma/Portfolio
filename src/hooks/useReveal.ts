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
