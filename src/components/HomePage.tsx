import { Hero } from './Hero'
import { About } from './About'
import { Experience } from './Experience'
import { CaseStudies } from './CaseStudies'
import { Contact } from './Contact'

export function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <CaseStudies />
      <Contact />
    </>
  )
}