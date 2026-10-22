import { Hero } from './Hero'
import { About } from './About'
import { Experience } from './Experience'
import { CaseStudies } from './CaseStudies'
import { DecisionExplorer } from './DecisionExplorer'
import { Testimonials } from './Testimonials'
import { Contact } from './Contact'
import { Frame } from './chrome/Frame'
import { ChapterRail } from './ChapterRail'
import { useLayoutEffect } from 'react'

/**
 * index.html carries a prerendered copy of this hero, outside #root, so the
 * headline paints before the JS bundle runs (scripts/generate-static-routes.ts).
 * Once React has inserted the real hero — in a layout effect, so before the
 * browser paints — read how far the copy's entrance animation has got, let
 * the real elements resume from that point (negative animation-delay via
 * --hero-elapsed, see globals.css) and remove the copy. Same frame, same
 * layout box (verified in Chromium and WebKit), no restart and no flicker.
 */
function takeOverPrerenderedShell() {
  const shell = document.querySelector('[data-prerendered-shell]')
  if (!shell) return
  const anim = shell.querySelector('.hero-animate-in')?.getAnimations()[0]
  const elapsed = typeof anim?.currentTime === 'number' ? anim.currentTime : 0
  if (elapsed > 0) document.documentElement.style.setProperty('--hero-elapsed', `${Math.round(elapsed)}ms`)
  shell.remove()
}

/** The hero frame on its own: rendered by HomePage and, at build time, by
 *  src/prerender/heroShell.tsx so index.html can paint it before JS runs. */
export function HeroFrame() {
  useLayoutEffect(takeOverPrerenderedShell, [])

  return (
    <Frame id="hero" name="Hero" headingId="hero-heading" fullBleed instantReveal>
      <Hero />
    </Frame>
  )
}

export function HomePage() {
  return (
    <>
      <ChapterRail />
      <HeroFrame />
      <Frame id="case-studies" name="01 · Work" headingId="case-studies-heading">
        <CaseStudies />
      </Frame>
      <Frame id="decision-explorer" name="02 · Decisions" headingId="decisions-heading">
        <DecisionExplorer />
      </Frame>
      <Frame id="about" name="03 · About" headingId="about-heading">
        <About />
      </Frame>
      <Frame id="experience" name="04 · Experience" headingId="experience-heading">
        <Experience />
      </Frame>
      <Frame id="testimonials" name="05 · Testimonials" headingId="testimonials-heading">
        <Testimonials />
      </Frame>
      <Frame id="contact" name="06 · Contact" headingId="contact-heading">
        <Contact />
      </Frame>
    </>
  )
}
