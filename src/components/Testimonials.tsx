import { useFrameReveal } from './chrome/Frame'
import { useMousePosition } from '../utils/mousePosition'

const montserrat = { fontFamily: "'Montserrat', sans-serif" }
const inter = { fontFamily: "'Inter', sans-serif" }

const testimonials = [
  {
    quote: "Divyansh's redesign of our analytics dashboard cut navigation time by 30%. His ability to simplify complex workflows while maintaining clinical accuracy is rare.",
    name: 'Product Lead',
    role: 'eClinicalWorks',
    initials: 'PL',
    color: 'var(--figma-cursor-orange)',
    stars: 5,
    when: '2w ago',
  },
  {
    quote: "The design system Divyansh built saved our team hundreds of hours. It improved consistency by 40% and made handoff between design and engineering seamless.",
    name: 'Engineering Manager',
    role: 'Peak.ai (UiPath)',
    initials: 'EM',
    color: 'var(--figma-cursor-purple)',
    stars: 5,
    when: '3w ago',
  },
]

/** Figma comment pin — a teardrop circle with the author's initials */
function CommentPin({ initials, color }: { initials: string; color: string }) {
  return (
    <span
      className="flex h-9 w-9 flex-shrink-0 items-center justify-center text-[11px] font-bold text-white shadow-md"
      style={{
        backgroundColor: color,
        borderRadius: '50% 50% 50% 4px',
        fontFamily: "'Inter', sans-serif",
      }}
      aria-hidden="true"
    >
      {initials}
    </span>
  )
}

export function Testimonials() {
  const isVisible = useFrameReveal()
  const { x, y } = useMousePosition()

  return (
    <div className="section-pad">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-muted-foreground" />
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider" style={montserrat}>Comments</p>
          </div>
          <h2 id="testimonials-heading" className="leading-[1.1] tracking-tight" style={{ ...montserrat, fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            What people are{' '}
            <span className="italic" style={{ fontWeight: 300, color: 'var(--muted-foreground)' }}>
              saying.
            </span>
          </h2>
        </div>

        {/* Comment threads */}
        <div className="testimonials-grid">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: isVisible ? `${index * 150}ms` : '0ms' }}
            >
              <CommentPin initials={t.initials} color={t.color} />
              <div className="min-w-0 flex-1 rounded-xl rounded-tl-sm border border-border bg-card p-6 card-hover">
                <div className="mb-3 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <p className="text-sm font-bold" style={montserrat}>{t.name}</p>
                  <p className="text-xs text-muted-foreground" style={inter}>{t.role}</p>
                  <p className="ml-auto text-[11px] text-muted-foreground/60" style={inter}>{t.when}</p>
                </div>
                <blockquote>
                  <p className="leading-relaxed text-foreground">"{t.quote}"</p>
                </blockquote>
                {/* Reactions */}
                <div className="mt-4 flex items-center gap-2" role="img" aria-label={`${t.stars} out of 5 stars`}>
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                    style={inter}
                  >
                    ⭐ {t.stars}
                  </span>
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                    style={inter}
                  >
                    👍 {index === 0 ? 4 : 3}
                  </span>
                  <span className="text-[11px] text-muted-foreground/60" style={inter} aria-hidden="true">
                    Reply…
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}