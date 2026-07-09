import { ArrowLeft, ChevronDown, Clock, Search } from 'lucide-react'
import { useRouter } from './Router'
import { caseStudies } from '../data/caseStudies'
import { useReveal } from '../hooks/useReveal'
import { FigFileCard } from './FigFileCard'

const inter = { fontFamily: "'Inter', sans-serif" }
const montserrat = { fontFamily: "'Montserrat', sans-serif" }

/**
 * The "file browser" — all case studies as .fig files under Recents,
 * like Figma's home screen.
 */
export function AllCaseStudies() {
  const { navigateTo } = useRouter()
  const { ref, isVisible } = useReveal<HTMLElement>({ threshold: 0.05 })

  return (
    <section
      ref={ref}
      className="pt-16 sm:pt-20 pb-20 px-6 sm:px-8"
      aria-labelledby="case-studies-heading"
    >
      <div className="container mx-auto max-w-5xl">
        {/* Back Button */}
        <nav className="mb-10" aria-label="Page navigation">
          <button
            onClick={() => navigateTo('home')}
            className="figma-chrome no-underline inline-flex items-center gap-2 rounded-md px-3 py-2 text-[12px] font-medium transition-colors min-h-0 min-w-0"
            style={{ ...inter, color: 'var(--figma-text-dim)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--figma-text)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--figma-text-dim)')}
            aria-label="Return to portfolio home page"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Back to file
          </button>
        </nav>

        {/* File browser header */}
        <header className="figma-chrome mb-10" style={{ color: 'var(--figma-text)' }}>
          <h1
            id="case-studies-heading"
            className="text-2xl md:text-3xl tracking-tight mb-2"
            style={{ ...montserrat, fontWeight: 800 }}
          >
            Recents
          </h1>
          <p className="max-w-xl text-sm leading-relaxed" style={{ ...inter, color: 'var(--figma-text-dim)' }}>
            My complete collection of UX design projects — healthcare dashboards to enterprise
            security systems. Open any file to step inside.
          </p>

          {/* Toolbar row: fake filters, like Figma's file browser */}
          <div
            className="mt-6 flex flex-wrap items-center gap-2 border-b pb-4 text-[12px]"
            style={{ ...inter, borderColor: 'var(--figma-border)', color: 'var(--figma-text-dim)' }}
            aria-hidden="true"
          >
            <span
              className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 font-medium"
              style={{ backgroundColor: 'color-mix(in srgb, var(--figma-text) 8%, transparent)', color: 'var(--figma-text)' }}
            >
              All files
            </span>
            <span className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5">
              <Clock className="h-3 w-3" /> Last modified <ChevronDown className="h-3 w-3" />
            </span>
            <span className="ml-auto flex items-center gap-1.5 rounded-md px-2.5 py-1.5">
              <Search className="h-3 w-3" /> {caseStudies.length} files
            </span>
          </div>
        </header>

        {/* Files */}
        <ul className="cs-grid-3" aria-label="All design case studies">
          {caseStudies.map((study, index) => (
            <li key={study.id}>
              <FigFileCard
                study={study}
                index={index}
                isVisible={isVisible}
                delayStep={150}
                aspect="aspect-[4/3]"
              />
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="mt-16 text-center">
          <button
            onClick={() => navigateTo('home')}
            className="figma-chrome no-underline inline-flex items-center justify-center rounded-lg border-2 px-8 py-3 text-sm font-bold transition-all duration-300"
            style={{
              ...montserrat,
              borderColor: 'var(--figma-border)',
              color: 'var(--figma-text)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--figma-blue)'
              e.currentTarget.style.color = 'var(--figma-blue)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--figma-border)'
              e.currentTarget.style.color = 'var(--figma-text)'
            }}
            aria-label="Return to portfolio home page"
          >
            <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
            Back to file
          </button>
        </div>
      </div>
    </section>
  )
}
