import { useFrameReveal } from './chrome/Frame'

const montserrat = { fontFamily: "'Montserrat', sans-serif" }

const testimonials = [
  {
    quote: "Divyansh's redesign of our analytics dashboard cut navigation time by 30%. His ability to simplify complex workflows while maintaining clinical accuracy is rare.",
    name: 'Product Lead',
    role: 'eClinicalWorks',
    stars: 5,
  },
  {
    quote: "The design system Divyansh built saved our team hundreds of hours. It improved consistency by 40% and made handoff between design and engineering seamless.",
    name: 'Engineering Manager',
    role: 'Peak.ai (UiPath)',
    stars: 5,
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export function Testimonials() {
  const isVisible = useFrameReveal()

  return (
    <div className="section-pad">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-muted-foreground" />
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider" style={montserrat}>Testimonials</p>
          </div>
          <h2 id="testimonials-heading" className="leading-[1.1] tracking-tight" style={{ ...montserrat, fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            What people are{' '}
            <span className="italic" style={{ fontWeight: 300, color: 'var(--muted-foreground)' }}>saying.</span>
          </h2>
        </div>

        {/* Testimonial cards */}
        <div className="testimonials-grid">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className={`p-8 rounded-2xl border border-border bg-card card-hover transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: isVisible ? `${index * 150}ms` : '0ms' }}
            >
              <Stars count={t.stars} />
              <blockquote className="mt-5 mb-6">
                <p className="text-foreground leading-relaxed italic">"{t.quote}"</p>
              </blockquote>
              <div>
                <p className="font-bold text-sm" style={montserrat}>{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
