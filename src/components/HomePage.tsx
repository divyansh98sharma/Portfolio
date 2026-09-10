import { Hero } from './Hero'
import { About } from './About'
import { Experience } from './Experience'
import { CaseStudies } from './CaseStudies'
import { Testimonials } from './Testimonials'
import { Contact } from './Contact'
import { Frame } from './chrome/Frame'

// Order leads with the work: recruiters reach case studies immediately after the
// hero, then career proof (Experience, Testimonials), then About/Contact. The
// freelance-oriented sections (Services, Built For) and the generic Process
// walkthrough were removed to keep this a focused hiring portfolio.
export function HomePage() {
  return (
    <>
      <Frame id="hero" name="Hero" headingId="hero-heading" fullBleed instantReveal>
        <Hero />
      </Frame>
      <Frame id="case-studies" name="01 · Selected Work" headingId="case-studies-heading">
        <CaseStudies />
      </Frame>
      <Frame id="experience" name="02 · Experience" headingId="experience-heading">
        <Experience />
      </Frame>
      <Frame id="testimonials" name="03 · Testimonials" headingId="testimonials-heading">
        <Testimonials />
      </Frame>
      <Frame id="about" name="04 · About" headingId="about-heading">
        <About />
      </Frame>
      <Frame id="contact" name="05 · Contact" headingId="contact-heading">
        <Contact />
      </Frame>
    </>
  )
}
