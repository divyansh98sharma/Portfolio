import { Check, ArrowUpRight } from 'lucide-react'
import { useFrameReveal } from './chrome/Frame'

const montserrat = { fontFamily: "'Montserrat', sans-serif" }
const inter = { fontFamily: "'Inter', sans-serif" }

const CONTACT_EMAIL = 'divyansh.sharma@thecollabrix.com'

interface Plan {
  name: string
  inr: string
  usd: string
  turnaround: string
  features: string[]
  popular?: boolean
}

// Resume & Portfolio Design plans (offered via Collabrix, thecollabrix.com).
const plans: Plan[] = [
  {
    name: 'Resume Design',
    inr: '₹1,500',
    usd: '$18',
    turnaround: '3-day turnaround',
    features: ['ATS-friendly layout', 'Figma source file', 'One revision round', 'Print-ready PDF'],
  },
  {
    name: 'Portfolio Deck',
    inr: '₹3,000',
    usd: '$36',
    turnaround: '5-day turnaround',
    features: ['Up to 10 slides', 'Case study layout', 'Figma source file', 'Two revision rounds'],
    popular: true,
  },
  {
    name: 'Resume + Portfolio Bundle',
    inr: '₹4,000',
    usd: '$48',
    turnaround: '5-day turnaround',
    features: ['Everything in both plans', 'Cohesive design system', 'Priority delivery', 'Three revision rounds'],
  },
]

function mailto(plan: string): string {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`${plan} — inquiry`)}`
}

/** Services & pricing — the Resume & Portfolio Design plans offered through
 *  Collabrix (thecollabrix.com), with a link out for custom product/UX work. */
export function Services() {
  const isVisible = useFrameReveal()

  return (
    <div className="section-pad bg-secondary">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`mb-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-muted-foreground" />
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider" style={montserrat}>Work with me</p>
          </div>
          <h2 id="services-heading" className="leading-[1.1] tracking-tight" style={{ ...montserrat, fontWeight: 800, fontSize: 'clamp(2rem, calc(4vw * var(--canvas-zoom, 1)), 3.2rem)' }}>
            Services{' & '}
            <span className="italic" style={{ fontWeight: 300, color: 'var(--muted-foreground)' }}>pricing.</span>
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Figma-crafted resumes and portfolio decks made specifically for UX/UI designers —
            ATS-friendly, visually compelling, and delivered in 3–5 days.
          </p>
          <span
            className="mt-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[12px] font-semibold"
            style={{ ...inter, borderColor: 'var(--figma-blue)', color: 'var(--figma-blue)', backgroundColor: 'color-mix(in srgb, var(--figma-blue) 10%, transparent)' }}
          >
            🎉 First 3 clients get 50% off
          </span>
        </div>

        {/* Pricing cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border bg-card p-6 sm:p-7 card-hover transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 120}ms` : '0ms',
                borderColor: plan.popular ? 'var(--figma-blue)' : 'var(--border)',
                boxShadow: plan.popular ? '0 0 0 1px var(--figma-blue)' : undefined,
              }}
            >
              {plan.popular && (
                <span
                  className="absolute -top-3 left-6 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white"
                  style={{ ...inter, backgroundColor: 'var(--figma-blue)' }}
                >
                  Most popular
                </span>
              )}

              <h3 className="text-lg tracking-tight" style={{ ...montserrat, fontWeight: 700 }}>{plan.name}</h3>

              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl" style={{ ...montserrat, fontWeight: 800 }}>{plan.inr}</span>
                <span className="text-sm text-muted-foreground" style={inter}>/ {plan.usd}</span>
              </div>
              <p className="mt-1 text-[12px] text-muted-foreground" style={inter}>{plan.turnaround}</p>

              <ul className="mt-5 flex-1 space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: 'var(--figma-blue)' }} aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={mailto(plan.name)}
                className="no-underline mt-6 inline-flex h-10 w-full items-center justify-center rounded-lg text-[13px] font-semibold transition-opacity hover:opacity-90"
                style={
                  plan.popular
                    ? { ...montserrat, backgroundColor: 'var(--figma-blue)', color: '#fff' }
                    : { ...montserrat, backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)' }
                }
              >
                Get started
              </a>
            </div>
          ))}
        </div>

        {/* Custom work note */}
        <div className={`mt-8 flex flex-col items-start gap-3 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-sm text-muted-foreground" style={inter}>
            Need product, web, or UX/UI design work? I take on select freelance & consulting projects through{' '}
            <span className="font-semibold text-foreground">Collabrix</span>.
          </p>
          <a
            href="https://thecollabrix.com"
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline inline-flex flex-shrink-0 items-center gap-1.5 text-sm font-semibold"
            style={{ ...montserrat, color: 'var(--figma-blue)' }}
          >
            Explore all services
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  )
}
