import { ArrowDown, ArrowRight } from 'lucide-react'
import { scrollToSection } from './utils/scrollToSection'
import { TypewriterText } from './TypewriterText'
import { ComponentGlyph } from './icons/ComponentGlyph'

const montserrat = { fontFamily: "'Montserrat', sans-serif" }
const inter = { fontFamily: "'Inter', sans-serif" }

/** Figma's multiplayer cursor arrow */
function CursorArrow({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5.5 3.2l12.8 7.9c.5.3.4 1-.2 1.2l-5.6 1.6-3.3 4.9c-.3.5-1.1.3-1.2-.3L4.6 4.1c-.1-.6.4-1.1.9-.9z"
        fill={color}
        stroke="#fff"
        strokeWidth="1.2"
      />
    </svg>
  )
}

const skills = [
  'User Research', 'Prototyping', 'Design Systems', 'Usability Testing',
  'Wireframing', 'Information Architecture', 'Figma', 'Adobe Creative Suite',
  'Healthcare UX', 'Enterprise Design', 'Data Visualization', 'Accessibility',
]

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="hero-content-wrapper">
        <div className="max-w-6xl mx-auto">

          {/* Cursor chat — my own cursor introducing me */}
          <div className="hero-animate-in hero-delay-1 mb-10 flex items-start gap-0.5" aria-label="Divyansh — UX Designer, Design Systems Builder, UX Researcher">
            <CursorArrow color="var(--figma-blue)" />
            <div
              className="mt-3 rounded-full rounded-tl-sm px-4 py-2 text-[13px] font-medium text-white shadow-lg"
              style={{ ...inter, backgroundColor: 'var(--figma-blue)' }}
              aria-hidden="true"
            >
              Divyansh · <TypewriterText texts={['UX Designer', 'Design Systems Builder', 'UX Researcher', 'Problem Solver']} />
            </div>
          </div>

          {/* Headline */}
          <h1
            id="hero-heading"
            className="hero-animate-in hero-delay-1 leading-[1.05] tracking-tight mb-6"
            style={{ ...montserrat, fontWeight: 900, fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            Design{' '}
            <span className="italic" style={{ fontWeight: 300, color: 'var(--muted-foreground)' }}>
              smarter
            </span>
            <br />
            with{' '}
            <span className="italic" style={{ fontWeight: 300, color: 'var(--muted-foreground)' }}>
              purpose.
            </span>
          </h1>

          {/* Subtext */}
          <p className="hero-animate-in hero-delay-2 text-base sm:text-lg text-muted-foreground leading-relaxed mb-10 max-w-lg">
            I help teams build user-centered products through research-driven design,
            turning complex problems into intuitive solutions.
          </p>

          {/* CTAs */}
          <div className="hero-animate-in hero-delay-3 flex flex-wrap gap-4 items-center mb-10">
            <button
              onClick={() => scrollToSection('case-studies')}
              className="no-underline inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold rounded-lg text-white transition-all duration-300 shadow-md hover:shadow-lg hover:opacity-90"
              style={{ ...montserrat, backgroundColor: 'var(--figma-blue)' }}
              aria-label="View My Work"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="no-underline inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium rounded-lg border-2 border-border text-foreground hover:bg-secondary transition-all duration-300"
              style={montserrat}
              aria-label="Get in touch"
            >
              Get In Touch
              <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
            </button>
          </div>

          {/* Separator + LinkedIn */}
          <div className="hero-animate-in hero-delay-4">
            <div className="w-full max-w-xs h-px bg-border mb-6" />
            <a
              href="https://www.linkedin.com/in/divyansh98sharma"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline inline-flex items-center px-5 py-2.5 text-xs font-bold rounded-full border border-border text-foreground hover:bg-secondary transition-all duration-300"
              style={montserrat}
            >
              <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 448 512" aria-hidden="true"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.52 0 53.4 0 23.27 24.09-1.3 53.79-1.3c29.32 0 53.79 24.57 53.79 54.7 0 30.12-24.47 54.7-53.79 54.7zM447.9 448h-92.1V304.1c0-34.3-12.3-57.7-43.1-57.7-23.5 0-37.6 15.8-43.7 31.1-2.2 5.2-2.8 12.4-2.8 19.7V448h-92.2s1.2-270.1 0-299.1h92.1v42.4c12.2-18.9 34.1-45.8 83.1-45.8 60.7 0 105.8 39.7 105.8 125.1V448z"/></svg>
              Follow on LinkedIn
              <ArrowRight className="h-3 w-3 ml-2" />
            </a>
          </div>
        </div>
      </div>

      {/* Skills ticker — a strip of Figma components from the Assets library */}
      <div className="border-y border-border py-3 overflow-hidden bg-secondary/40">
        <div
          className="ticker-track flex items-center gap-3 whitespace-nowrap"
          style={{ width: 'max-content' }}
          aria-hidden="true"
        >
          {[...Array(2)].map((_, setIdx) => (
            <div key={setIdx} className="flex items-center gap-3 pr-3">
              {skills.map((topic, i) => (
                <span
                  key={`${setIdx}-${i}`}
                  className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-[12px] font-medium text-muted-foreground"
                  style={inter}
                >
                  <span style={{ color: 'var(--figma-cursor-purple)' }}>
                    <ComponentGlyph className="h-3 w-3 flex-shrink-0" />
                  </span>
                  <span style={{ color: 'var(--foreground)' }}>{topic}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="flex justify-center py-6 hero-bounce-limited hero-animate-in hero-delay-5">
        <button
          onClick={() => scrollToSection('about')}
          className="no-underline rounded-full p-2 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors duration-300"
          aria-label="Scroll down to about section"
        >
          <ArrowDown className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
