import { ArrowRight } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { useRouter } from './Router'
import { useState } from 'react'
import { caseStudies } from '../data/caseStudies'
import { useFrameReveal } from './chrome/Frame'

const homepageCaseStudies = caseStudies.slice(0, 2)

export function CaseStudies() {
  const { navigateTo } = useRouter()
  const isVisible = useFrameReveal()
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <div className="section-pad bg-secondary">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className={`mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-muted-foreground" />
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Case Studies
              </p>
            </div>
            <h2
              id="case-studies-heading"
              className="leading-[1.1] tracking-tight mb-4"
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
            >
              Featured{' '}
              <span className="italic" style={{ fontWeight: 300, color: 'var(--muted-foreground)' }}>
                projects.
              </span>
            </h2>
            <p className="text-muted-foreground max-w-lg">
              Click on any case study to explore the full design process and outcomes.
            </p>
          </div>

          <ul className="cs-grid" aria-label="Design case studies">
            {homepageCaseStudies.map((study, index) => (
              <li key={study.id}>
                <div
                  className={`group bg-card rounded-2xl border border-border overflow-hidden cursor-pointer card-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-full transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: isVisible ? `${index * 200}ms` : '0ms' }}
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
                  aria-labelledby={`case-study-title-${index}`}
                  aria-describedby={`case-study-desc-${index}`}
                >
                  <div className="h-full flex flex-col">
                    {/* Image */}
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <ImageWithFallback
                        src={study.image}
                        alt={`${study.title} - Case study preview`}
                        loading="lazy"
                        className={`w-full h-full object-cover transition-all duration-700 transform-gpu ${
                          hoveredCard === index ? 'scale-105' : 'scale-100'
                        }`}
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t from-black/30 to-transparent transition-opacity duration-300 ${
                        hoveredCard === index ? 'opacity-100' : 'opacity-50'
                      }`} />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-white/90 text-xs font-semibold text-foreground" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                          {study.year}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-8 flex flex-col flex-1">
                      <h3
                        id={`case-study-title-${index}`}
                        className={`text-lg sm:text-xl mb-3 tracking-tight transition-colors duration-300 ${
                          hoveredCard === index ? 'text-accent' : ''
                        }`}
                        style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}
                      >
                        {study.title}
                      </h3>
                      <p
                        id={`case-study-desc-${index}`}
                        className="text-muted-foreground text-sm leading-relaxed flex-1 mb-6"
                      >
                        {study.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {study.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-3 py-1 text-xs rounded-full bg-secondary text-muted-foreground font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Impact */}
                      <div className="pt-4 border-t border-border">
                        <p className="text-xs font-semibold text-accent mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                          {study.impact}
                        </p>
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

          {/* View All */}
          <div className={`text-center mt-12 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <button
              onClick={() => navigateTo('all-case-studies')}
              className="no-underline inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold rounded-full border-2 border-border text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              aria-label="View all case studies"
            >
              <ArrowRight className="h-4 w-4 mr-2" aria-hidden="true" />
              View All Case Studies
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
