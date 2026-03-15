import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { useRouter } from './Router'
import { useState, useEffect, useRef } from 'react'
import { Card, CardTitle, CardDescription } from './ui/card'
import { caseStudies } from '../data/caseStudies'

export function AllCaseStudies() {
  const { navigateTo } = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative pt-20 sm:pt-24 md:pt-28 pb-16 sm:pb-20 px-4 sm:px-6"
      aria-labelledby="case-studies-heading"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="space-y-12 sm:space-y-16">
          {/* Navigation */}
          <nav className="mb-8" aria-label="Page navigation">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigateTo('home')}
              className="min-h-12 min-w-12 bg-background border-border hover:bg-muted text-sm sm:text-base"
              aria-label="Return to portfolio home page"
            >
              <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
              <span className="hidden xs:inline">Back to Portfolio</span>
              <span className="xs:hidden">Back</span>
            </Button>
          </nav>

          {/* Header */}
          <header className="text-center space-y-8">
            <div>
              <Badge variant="outline" className="mb-6 px-4 py-2">
                Portfolio
              </Badge>
              <h1 id="case-studies-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
                All Case Studies
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Explore my complete collection of UX design projects, from healthcare dashboards to enterprise security systems.
              </p>
            </div>
          </header>

          {/* Case Studies Grid */}
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto" aria-label="All design case studies">
            {caseStudies.map((study, index) => (
              <li key={study.id}>
                <Card
                  className={`group hover:shadow-xl transition-all duration-500 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 overflow-hidden h-full transform-gpu ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-12'
                  } ${
                    hoveredCard === index
                      ? '-translate-y-2 shadow-2xl'
                      : 'translate-y-0'
                  }`}
                  style={{
                    transitionDelay: isVisible ? `${index * 150}ms` : '0ms'
                  }}
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
                  aria-labelledby={`all-cs-title-${index}`}
                  aria-describedby={`all-cs-desc-${index}`}
                >
                  <div className="h-full flex flex-col">
                    <div className="aspect-[4/3] overflow-hidden rounded-t-lg relative">
                      <ImageWithFallback
                        src={study.image}
                        alt={`${study.title} - Case study preview`}
                        loading="lazy"
                        className={`w-full h-full object-cover transition-all duration-700 transform-gpu ${
                          hoveredCard === index
                            ? 'scale-110 brightness-110'
                            : 'scale-100 brightness-100'
                        }`}
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent transition-opacity duration-300 ${
                        hoveredCard === index ? 'opacity-100' : 'opacity-0'
                      }`} />
                    </div>
                    <div className="p-4 sm:p-6 lg:p-8 flex flex-col flex-1">
                      <div className="mb-4">
                        <span className={`text-sm text-muted-foreground transition-all duration-300 ${
                          hoveredCard === index ? 'text-primary' : ''
                        }`}>
                          {study.year}
                        </span>
                      </div>
                      <CardTitle
                        id={`all-cs-title-${index}`}
                        className={`text-lg sm:text-xl mb-4 line-clamp-2 transition-all duration-300 ${
                          hoveredCard === index ? 'text-primary' : ''
                        }`}
                      >
                        {study.title}
                      </CardTitle>
                      <CardDescription
                        id={`all-cs-desc-${index}`}
                        className={`mb-6 leading-relaxed flex-1 transition-all duration-300 text-sm sm:text-base ${
                          hoveredCard === index ? 'text-foreground' : ''
                        }`}
                      >
                        {study.description}
                      </CardDescription>
                      <div className="space-y-4">
                        <ul className="flex flex-wrap gap-2" aria-label="Project tags">
                          {study.tags.slice(0, 3).map((tag, tagIndex) => (
                            <li key={tagIndex}>
                              <Badge
                                variant="secondary"
                                className="text-xs px-3 py-1 bg-muted text-muted-foreground rounded-full border border-border"
                              >
                                {tag}
                              </Badge>
                            </li>
                          ))}
                        </ul>
                        <div className={`pt-4 border-t transition-all duration-300 ${
                          hoveredCard === index ? 'border-primary' : 'border-border'
                        }`}>
                          <span className="text-xs sm:text-sm font-medium text-primary" aria-label="Project impact">
                            {study.impact}
                          </span>
                        </div>
                        <div className="pt-4">
                          <span
                            className={`flex items-center justify-center w-full h-12 rounded-md bg-primary text-primary-foreground text-sm sm:text-base font-medium transition-all duration-300 ${
                              hoveredCard === index ? 'shadow-lg' : ''
                            }`}
                            aria-hidden="true"
                          >
                            <ArrowRight className={`h-4 w-4 mr-2 transition-transform duration-300 ${
                              hoveredCard === index ? 'translate-x-1' : 'translate-x-0'
                            }`} />
                            <span className="hidden sm:inline">View Case Study</span>
                            <span className="sm:hidden">View Details</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </li>
            ))}
          </ul>

          {/* Footer Navigation */}
          <div className="text-center mt-16 pt-8 border-t border-border">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigateTo('home')}
              className="min-h-12 px-8 py-4 text-base hover:bg-primary hover:text-primary-foreground active:bg-primary active:text-primary-foreground transition-all duration-300"
              aria-label="Return to portfolio home page"
            >
              <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
              Back to Portfolio
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
