import { Hero } from './Hero'
import { About } from './About'
import { Experience } from './Experience'
import { CaseStudies } from './CaseStudies'
import { DecisionExplorer } from './DecisionExplorer'
import { Testimonials } from './Testimonials'
import { Contact } from './Contact'
import { Frame } from './chrome/Frame'

export function HomePage() {
  return (
    <>
      <Frame id="hero" name="Hero" headingId="hero-heading" fullBleed instantReveal>
        <Hero />
      </Frame>
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
