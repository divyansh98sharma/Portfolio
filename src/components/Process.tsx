import { useFrameReveal } from './chrome/Frame'
import { useState } from 'react'
import { useMousePosition } from '../utils/mousePosition'
import { TimelineItem } from './TimelineItem'

const montserrat = { fontFamily: "'Montserrat', sans-serif" }
const inter = { fontFamily: "'Inter', sans-serif" }

const steps = [
  { number: '01', title: 'Discover', description: 'Deep dive into user research, stakeholder interviews, and competitive analysis to understand the problem space.' },
  { number: '02', title: 'Define', description: 'Synthesize findings into actionable insights, user personas, and clear problem statements that guide the design.' },
  { number: '03', title: 'Design', description: 'Create wireframes, prototypes, and high-fidelity designs through iterative exploration and testing.' },
  { number: '04', title: 'Deliver', description: 'Collaborate with engineering for pixel-perfect implementation, measure outcomes, and iterate based on data.' },
]

/** Figma prototype connection — the blue noodle between frames */
function FlowArrow() {
  return (
    <div className="absolute top-1/2 -right-[26px] z-10 hidden -translate-y-1/2 lg:flex items-center" aria-hidden="true">
      <span
        className="h-2.5 w-2.5 rounded-full border-2"
        style={{ borderColor: 'var(--figma-blue)', backgroundColor: 'var(--card)' }}
      />
      <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
        <path d="M0 5h13" stroke="var(--figma-blue)" strokeWidth="2" />
        <path d="M11 1l5 4-5 4" stroke="var(--figma-blue)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

export function Process() {
  const isVisible = useFrameReveal()
  const { x, y } = useMousePosition()
  const [showTimeline, setShowTimeline] = useState(false)

  return (
    <div className="section-pad bg-secondary">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-muted-foreground" />
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider" style={montserrat}>Prototype Flow</p>
          </div>
          <h2 id="process-heading" className="leading-[1.1] tracking-tight" style={{ ...montserrat, fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            My design{' '}
            <span className="italic" style={{ fontWeight: 300, color: 'var(--muted-foreground)' }}>
              process.
            </span>
          </h2>
          <p className="mt-4 max-w-lg text-muted-foreground">
            Four connected frames. The prototype always flows from question to shipped answer.
          </p>
        </div>

        {/* Process visualization toggle */}
        <div className="mb-8 flex items-center space-x-4">
          <button
            onClick={() => setShowTimeline(false)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
              !showTimeline ? 'bg-[var(--figma-blue)] text-white' : 'bg-secondary/50 text-muted-foreground'
            } hover:bg-secondary/50
            relative overflow-hidden`}
            style={inter}
          >
            <span className="relative z-10">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--figma-blue)]" />
              <span>Flow Diagram</span>
            </span>
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(255,255,255,0.1),transparent)]
                      pointer-events-none opacity-0 transition-opacity duration-500"/>
          </button>
          <button
            onClick={() => setShowTimeline(true)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
              showTimeline ? 'bg-[var(--figma-blue)] text-white' : 'bg-secondary/50 text-muted-foreground'
            } hover:bg-secondary/50
            relative overflow-hidden`}
            style={inter}
          >
            <span className="relative z-10">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--figma-blue)]" />
              <span>Timeline View</span>
            </span>
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(255,255,255,0.1),transparent)]
                      pointer-events-none opacity-0 transition-opacity duration-500"/>
          </button>
        </div>

        {/* Flow of connected mini-frames (default view) */}
        {!showTimeline && (
          <div className="process-grid">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`relative transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: isVisible ? `${index * 120}ms` : '0ms' }}
              >
                {/* mini frame label */}
                <span
                  className="mb-1.5 flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground"
                  style={inter}
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 16 16" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 1v14M12 1v14M1 4h14M1 12h14" />
                  </svg>
                  Flow / {step.number}
                </span>

                <div className="relative rounded-2xl border border-border bg-card p-6 sm:p-7 card-hover h-full">
                  <h3 className="text-lg mb-2 tracking-tight" style={{ ...montserrat, fontWeight: 700 }}>
                    <span className="mr-2 text-sm font-black" style={{ color: 'var(--figma-blue)' }}>{step.number}</span>
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                  {index < steps.length - 1 && <FlowArrow />}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Timeline view (alternative) */}
        {showTimeline && (
          <div className="space-y-6">
            {steps.map((step, index) => (
              <TimelineItem
                key={step.number}
                item={step}
                index={index}
                total={steps.length}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}