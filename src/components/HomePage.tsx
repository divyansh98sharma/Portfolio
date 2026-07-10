import { Hero } from './Hero'
import { About } from './About'
import { BuiltFor } from './BuiltFor'
import { Experience } from './Experience'
import { CaseStudies } from './CaseStudies'
import { Testimonials } from './Testimonials'
import { Process } from './Process'
import { Contact } from './Contact'
import { Frame } from './chrome/Frame'

export function HomePage() {
  return (
    <>
      <Frame id="hero" name="Hero" headingId="hero-heading" fullBleed>
        <Hero />
      </Frame>
      <Frame id="about" name="01 · About" headingId="about-heading">
        <About />
      </Frame>
      <Frame id="built-for" name="02 · Built For" headingId="built-for-heading">
        <BuiltFor />
      </Frame>
      <Frame id="experience" name="03 · Experience" headingId="experience-heading">
        <Experience />
      </Frame>
      <Frame id="case-studies" name="04 · Work" headingId="case-studies-heading">
        <CaseStudies />
      </Frame>
      <Frame id="testimonials" name="05 · Testimonials" headingId="testimonials-heading">
        <Testimonials />
      </Frame>
      <Frame id="process" name="06 · Process" headingId="process-heading">
        <Process />
      </Frame>
      <Frame id="contact" name="07 · Contact" headingId="contact-heading">
        <Contact />
      </Frame>
    </>
  )
}
