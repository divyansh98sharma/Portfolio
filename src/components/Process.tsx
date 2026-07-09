import { useFrameReveal } from './chrome/Frame'

const montserrat = { fontFamily: "'Montserrat', sans-serif" }

const steps = [
  { number: '01', title: 'Discover', description: 'Deep dive into user research, stakeholder interviews, and competitive analysis to understand the problem space.' },
  { number: '02', title: 'Define', description: 'Synthesize findings into actionable insights, user personas, and clear problem statements that guide the design.' },
  { number: '03', title: 'Design', description: 'Create wireframes, prototypes, and high-fidelity designs through iterative exploration and testing.' },
  { number: '04', title: 'Deliver', description: 'Collaborate with engineering for pixel-perfect implementation, measure outcomes, and iterate based on data.' },
]

export function Process() {
  const isVisible = useFrameReveal()

  return (
    <div className="section-pad bg-secondary">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-muted-foreground" />
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider" style={montserrat}>How It Works</p>
          </div>
          <h2 id="process-heading" className="leading-[1.1] tracking-tight" style={{ ...montserrat, fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            My design{' '}
            <span className="italic" style={{ fontWeight: 300, color: 'var(--muted-foreground)' }}>process.</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="process-grid">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`relative p-6 sm:p-8 rounded-2xl border border-border bg-card card-hover transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: isVisible ? `${index * 120}ms` : '0ms' }}
            >
              <span className="text-5xl font-black block mb-4" style={{ ...montserrat, color: 'var(--accent)', opacity: 0.3 }}>
                {step.number}
              </span>
              <h3 className="text-lg mb-2 tracking-tight" style={{ ...montserrat, fontWeight: 700 }}>
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 border-t-2 border-dashed border-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
