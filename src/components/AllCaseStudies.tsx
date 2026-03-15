import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { useRouter, Page } from './Router'
import { useState, useEffect, useRef } from 'react'

const caseStudies = [
  {
    id: 'case-study-1' as Page,
    title: 'Analytics Central - eClinicalWorks',
    description: 'A centralized dashboard that cut navigation time by 30% and raised clinician satisfaction by 25% through AI search, widgets, and role-based views.',
    image: 'https://images.unsplash.com/photo-1575388902449-6bca946ad549?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjBhbmFseXRpY3MlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzU3MDk4NDM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Healthcare UX', 'Dashboard Design', 'Usability Testing', 'AI Integration'],
    impact: '30% reduction in navigation time, 25% improvement in clinician satisfaction',
    year: '2024'
  },
  {
    id: 'case-study-2' as Page,
    title: 'Role Based Access Control - Peak.ai',
    description: 'Scalable RBAC framework that improved efficiency 40% and cut errors 25% for enterprise security.',
    image: 'https://images.unsplash.com/photo-1697382608786-bcf4c113b86e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWN1cml0eSUyMGFjY2VzcyUyMGNvbnRyb2wlMjBkYXNoYm9hcmQlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzU3MTc2OTYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Enterprise UX', 'Access Control', 'Usability Testing', 'Security & Compliance'],
    impact: '40% increase in admin efficiency, 25% reduction in access errors',
    year: '2022'
  },
  {
    id: 'case-study-3' as Page,
    title: 'Flowsheets – eClinicalWorks',
    description: 'A redesigned Flowsheets window that improved visibility of patient progress, streamlined documentation, and enhanced provider workflows through a modernized UI.',
    image: 'https://images.unsplash.com/photo-1747224317356-6dd1a4a078fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMHBhdGllbnQlMjBtb25pdG9yaW5nJTIwZGFzaGJvYXJkJTIwaGVhbHRoY2FyZXxlbnwxfHx8fDE3NTg5Nzc5MjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Healthcare UX', 'Workflow Optimization', 'EHR Usability', 'Interface Redesign'],
    impact: 'Improved clarity, efficiency, adoption, and compliance & safety',
    year: '2024'
  }
]

export function AllCaseStudies() {
  const { navigateTo } = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [clickedCard, setClickedCard] = useState<number | null>(null)
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

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const handleCardClick = (studyId: Page, index: number) => {
    setClickedCard(index)
    setTimeout(() => {
      navigateTo(studyId)
      setClickedCard(null)
    }, 150)
  }

  const handleKeyDown = (e: React.KeyboardEvent, studyId: Page) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      navigateTo(studyId)
    }
  }

  return (
    <main className="min-h-screen bg-background" role="main" aria-label="All Case Studies">
      {/* Skip to main content link for screen readers */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg z-50"
        tabIndex={0}
      >
        Skip to main content
      </a>

      <section 
        id="main-content"
        ref={sectionRef}
        className="relative pt-20 sm:pt-24 md:pt-28 pb-16 sm:pb-20 px-4 sm:px-6" 
        role="region" 
        aria-labelledby="case-studies-heading"
      >
        <div className="container mx-auto max-w-7xl">
          <div className="space-y-12 sm:space-y-16">
            {/* Navigation */}
            <nav className="mb-8" role="navigation" aria-label="Page navigation">
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
                  Explore my complete collection of UX design projects, from healthcare dashboards to enterprise security systems and fintech mobile experiences.
                </p>
              </div>
            </header>

            {/* Case Studies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto" role="list" aria-label="All design case studies">
              {caseStudies.map((study, index) => (
                <Card 
                  key={study.id}
                  className={`group hover:shadow-xl transition-all duration-500 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 overflow-hidden h-full transform-gpu ${
                    isVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-12'
                  } ${
                    hoveredCard === index 
                      ? 'scale-[1.02] shadow-2xl' 
                      : 'scale-100'
                  } ${
                    clickedCard === index 
                      ? 'scale-[0.98]' 
                      : ''
                  }`}
                  style={{
                    transitionDelay: isVisible ? `${index * 150}ms` : '0ms'
                  }}
                  onClick={() => handleCardClick(study.id, index)}
                  onKeyDown={(e) => handleKeyDown(e, study.id)}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  tabIndex={0}
                  role="listitem"
                  aria-labelledby={`case-study-title-${index}`}
                  aria-describedby={`case-study-desc-${index}`}
                >
                  <div className="h-full flex flex-col">
                    <div className="aspect-[4/3] overflow-hidden rounded-t-lg relative">
                      <ImageWithFallback
                        src={study.image}
                        alt={`${study.title} - Case study preview`}
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
                        id={`case-study-title-${index}`} 
                        className={`text-lg sm:text-xl mb-4 line-clamp-2 transition-all duration-300 ${
                          hoveredCard === index ? 'text-primary transform translate-x-1' : ''
                        }`}
                      >
                        {study.title}
                      </CardTitle>
                      <CardDescription 
                        id={`case-study-desc-${index}`} 
                        className={`mb-6 leading-relaxed flex-1 transition-all duration-300 text-sm sm:text-base ${
                          hoveredCard === index ? 'text-foreground' : ''
                        }`}
                      >
                        {study.description}
                      </CardDescription>
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2" role="list" aria-label="Project tags">
                          {study.tags.slice(0, 3).map((tag, tagIndex) => (
                            <Badge 
                              key={tagIndex} 
                              variant="secondary" 
                              className="text-xs px-3 py-1 bg-muted text-muted-foreground rounded-full border border-border"
                              role="listitem"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className={`pt-4 border-t transition-all duration-300 ${
                          hoveredCard === index ? 'border-primary' : 'border-border'
                        }`}>
                          <span className={`text-xs sm:text-sm font-medium transition-all duration-300 ${
                            hoveredCard === index ? 'text-primary transform translate-x-1' : 'text-primary'
                          }`} aria-label="Project impact">
                            {study.impact}
                          </span>
                        </div>
                        <div className="pt-4">
                          <Button 
                            className={`w-full h-12 transition-all duration-300 transform-gpu text-sm sm:text-base ${
                              hoveredCard === index 
                                ? 'scale-105 shadow-lg bg-primary text-primary-foreground' 
                                : 'scale-100'
                            }`}
                            onClick={(e) => {
                              e.stopPropagation()
                              handleCardClick(study.id, index)
                            }}
                            aria-label={`View detailed case study for ${study.title}`}
                          >
                            <ArrowRight className={`h-4 w-4 mr-2 transition-transform duration-300 ${
                              hoveredCard === index ? 'translate-x-1' : 'translate-x-0'
                            }`} aria-hidden="true" />
                            <span className="hidden sm:inline">View Case Study</span>
                            <span className="sm:hidden">View Details</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

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
    </main>
  )
}