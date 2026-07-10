import { TOPBAR_HEIGHT } from '../../lib/chrome'

/**
 * Scrolls to a section with proper offset to account for the fixed Figma top bar
 * @param sectionId - The ID of the section to scroll to
 * @param offset - Additional offset in pixels (default: top bar height + padding)
 */
export function scrollToSection(sectionId: string, offset: number = TOPBAR_HEIGHT + 16): void {
  const element = document.getElementById(sectionId)
  if (!element) return

  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
  const offsetPosition = elementPosition - offset

  const shouldUseSmooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  window.scrollTo({
    top: offsetPosition,
    behavior: shouldUseSmooth ? 'smooth' : 'auto'
  })
}

/**
 * Scrolls to a section with delay, useful for navigation between pages
 * @param sectionId - The ID of the section to scroll to
 * @param delay - Delay in milliseconds before scrolling (default: 100ms)
 * @param offset - Additional offset in pixels (default: 80px for header height + padding)
 */
export function scrollToSectionWithDelay(
  sectionId: string,
  delay: number = 100,
  offset: number = TOPBAR_HEIGHT + 16
): void {
  setTimeout(() => {
    scrollToSection(sectionId, offset)
  }, delay)
}