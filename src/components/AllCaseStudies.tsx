import { ArrowRight, ArrowLeft } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { useRouter } from './Router'
import { useState, useEffect, useRef } from 'react'
import { caseStudies } from '../data/caseStudies'

export function AllCaseStudies() {
  const { navigateTo } = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="pt-20 sm:pt-24 pb-20 px-6 sm:px-8"
      aria-labelledby="case-studies-heading"
    >
      <div className="container mx-auto max-w-5xl">
        {/* Back Button */}
        <nav className="mb-12" aria-label="Page navigation">
          <button
            onClick={() => navigateTo('home')}
            className="no-underline inline-flex items-center justify-center px-5 py-2 text-sm font-medium rounded-full border-2 border-primary/20 text-foreground hover:bg-secondary transition-all duration-300"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            aria-label="Return to portfolio home page"
          >
            <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
            Back to Portfolio
          </button>
        </nav>

        {/* Header */}
        <header className="text-center mb-16">
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Portfolio
          </p>
          <h1
            id="case-studies-heading"
            className="text-3xl md:text-4xl lg:text-5xl tracking-tight mb-4"
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800 }}
          >
            All Case Studies
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Explore my complete collection of UX design projects, from healthcare dashboards to enterprise security systems.
          </p>
        </header>

        {/* Case Studies Grid */}
        <ul className="cs-grid-3" aria-label="All design case studies">
          {caseStudies.map((study, index) => (
            <li key={study.id}>
              <div
                className={`group bg-card rounded-2xl border border-border overflow-hidden cursor-pointer card-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-full transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: isVisible ? `${index * 150}ms` : '0ms' }}
                onClick={() => navigateTo(study.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    navigateTo(study.id)
                  }
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                tabIndex={0}
                role="article"
                aria-labelledby={`all-cs-title-${index}`}
              >
                <div className="h-full flex flex-col">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <ImageWithFallback
                      src={study.image}
                      alt={`${study.title} - Case study preview`}
                      loading="lazy"
                      className={`w-full h-full object-cover transition-all duration-700 transform-gpu ${
                        hoveredCard === index ? 'scale-105' : 'scale-100'
                      }`}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-white/90 text-xs font-semibold text-foreground" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        {study.year}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h2
                      id={`all-cs-title-${index}`}
                      className={`text-lg mb-2 tracking-tight transition-colors duration-300 ${
                        hoveredCard === index ? 'text-accent' : ''
                      }`}
                      style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}
                    >
                      {study.title}
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4">
                      {study.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {study.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-3 py-1 text-xs rounded-full bg-secondary text-muted-foreground font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="pt-4 border-t border-border">
                      <span className={`inline-flex items-center text-sm font-semibold transition-all duration-300 ${
                        hoveredCard === index ? 'text-accent translate-x-1' : 'text-foreground'
                      }`} style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        View Case Study
                        <ArrowRight className={`h-4 w-4 ml-2 transition-transform duration-300 ${
                          hoveredCard === index ? 'translate-x-1' : ''
                        }`} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="text-center mt-16">
          <button
            onClick={() => navigateTo('home')}
            className="no-underline inline-flex items-center justify-center px-8 py-3 text-sm font-bold rounded-full border-2 border-primary/20 text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            aria-label="Return to portfolio home page"
          >
            <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
            Back to Portfolio
          </button>
        </div>
      </div>
    </section>
  )
}
