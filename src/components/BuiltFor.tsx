import { useFrameReveal } from './chrome/Frame'

const montserrat = { fontFamily: "'Montserrat', sans-serif" }

const audiences = [
  {
    number: '01',
    title: 'Startups building v1 products',
    description: "You need a designer who can move fast, wear multiple hats, and ship products that users actually love — not just pixel-perfect mockups.",
  },
  {
    number: '02',
    title: 'Enterprise teams needing UX maturity',
    description: "You want to level up your design processes, establish design systems, and bring user research rigor to your product decisions.",
  },
  {
    number: '03',
    title: 'Healthcare & compliance-heavy products',
    description: "You need someone who understands regulated environments, accessibility requirements, and the balance between usability and compliance.",
  },
  {
    number: '04',
    title: 'Teams wanting design system foundations',
    description: "You want a scalable, token-based design system that improves consistency, speeds up development, and reduces design debt.",
  },
]

export function BuiltFor() {
  const isVisible = useFrameReveal()

  return (
    <div className="section-pad">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-muted-foreground" />
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider" style={montserrat}>Who It's For</p>
          </div>
          <h2 id="built-for-heading" className="leading-[1.1] tracking-tight mb-4" style={{ ...montserrat, fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            Built for{' '}
            <span className="italic" style={{ fontWeight: 300, color: 'var(--muted-foreground)' }}>teams that ship,</span>
            <br />
            not just{' '}
            <span style={{ fontWeight: 800 }}>talk design.</span>
          </h2>
          <p className="text-muted-foreground max-w-lg">
            If you build digital products and want design that moves the needle — this is for you.
          </p>
        </div>

        {/* Cards */}
        <div className="audience-grid">
          {audiences.map((item, index) => (
            <div
              key={item.number}
              className={`p-6 sm:p-8 rounded-2xl border border-border bg-card card-hover transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: isVisible ? `${index * 120}ms` : '0ms' }}
            >
              <span
                className="text-5xl font-black block mb-4"
                style={{ ...montserrat, color: 'var(--accent)', opacity: 0.3 }}
              >
                {item.number}
              </span>
              <h3 className="text-lg mb-3 tracking-tight" style={{ ...montserrat, fontWeight: 700 }}>
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
