import { ArrowRight } from 'lucide-react'
import { useRouter } from './Router'
import { caseStudies } from '../data/caseStudies'
import { useFrameReveal } from './chrome/Frame'
import { FigFileCard } from './FigFileCard'

// Lead with the work: the full curated set (3 shipped + 1 in-progress) shows
// on the homepage rather than hiding most of it behind "view all".
const homepageCaseStudies = caseStudies

export function CaseStudies() {
  const { navigateTo } = useRouter()
  const isVisible = useFrameReveal()

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
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem, calc(4vw * var(--canvas-zoom, 1)), 3.2rem)' }}
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
              <li key={study.id ?? study.fileName}>
                <FigFileCard study={study} index={index} isVisible={isVisible} />
              </li>
            ))}
          </ul>

          {/* View All */}
          <div className={`text-center mt-12 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <button
              onClick={() => navigateTo('all-case-studies')}
              className="no-underline inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold rounded-lg border-2 border-border text-foreground transition-all duration-300 hover:border-[var(--figma-blue)] hover:text-[var(--figma-blue)]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              aria-label="View all case studies"
            >
              View all files
              <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
