import { useFrameReveal } from './chrome/Frame'

const montserrat = { fontFamily: "'Montserrat', sans-serif" }
const inter = { fontFamily: "'Inter', sans-serif" }

const testimonials = [
  {
    quote: "He took ownership of our design system, improving and expanding components that helped the team design more consistently and efficiently. Divyansh is a thoughtful teammate who actively listens, welcomes feedback, and collaborates effectively to solve complex design challenges.",
    name: 'Angel Castro-Newball',
    role: 'UX Researcher, eClinicalWorks',
    initials: 'AC',
    color: 'var(--figma-cursor-orange)',
    stars: 5,
    when: 'Aug 2026',
  },
  {
    quote: "Divyansh personifies perfection when it comes to designing stuff. In our time together at Peak he designed and revamped uncountable things for the Peak platform. He has great eyes for detail, which makes him a really great guy to work with.",
    name: 'Vatsal Gupta',
    role: 'Manager, Data Science, Peak (now UiPath)',
    initials: 'VG',
    color: 'var(--figma-cursor-purple)',
    stars: 5,
    when: 'Dec 2022',
  },
  {
    quote: "Working alongside Divyansh was a great experience — he's a quick learner who can pick up new skills and make a large amount of progress in a short amount of time. He has often produced great ideas and different approaches to design challenges.",
    name: 'Ben Ost',
    role: 'Senior Product Designer',
    initials: 'BO',
    color: 'var(--figma-cursor-green)',
    stars: 5,
    when: 'Jan 2023',
  },
  {
    quote: "Divyansh is an extremely hard-working designer. He understands the user's psyche and provides an ideal environment for a new user to get acclimatised to the software, be it a web app or a mobile app. It has truly been a pleasure working with Divyansh.",
    name: 'Pancham Khaitan',
    role: 'Software Engineer, SingleStore',
    initials: 'PK',
    color: 'var(--figma-cursor-blue)',
    stars: 5,
    when: 'Dec 2022',
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

  return (
    <div className="section-pad">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-muted-foreground" />
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider" style={montserrat}>Comments</p>
          </div>
          <h2 id="testimonials-heading" className="leading-[1.1] tracking-tight" style={{ ...montserrat, fontWeight: 800, fontSize: 'clamp(2rem, calc(4vw * var(--canvas-zoom, 1)), 3.2rem)' }}>
            What people are{' '}
            <span className="italic" style={{ fontWeight: 300, color: 'var(--muted-foreground)' }}>saying.</span>
          </h2>
        </div>

        {/* Comment threads */}
        <div className="testimonials-grid">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
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
                    aria-hidden="true"
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
