import { useState } from 'react'
import { ArrowRight, Check, ChevronLeft, ChevronRight } from 'lucide-react'
import { rbacReleaseOneDecisions } from '../data/case-studies/rbac'
import { useRouter } from './Router'

const montserrat = { fontFamily: "'Montserrat', 'Montserrat Fallback', sans-serif" }
const inter = { fontFamily: "'Inter', 'Inter Fallback', sans-serif" }

/**
 * An interactive sample of actual design decisions, not a decorative simulation.
 * Accessible as a tab-like selector with native buttons, explicit states,
 * keyboard navigation and no motion required for understanding.
 */
export function DecisionExplorer() {
  const [active, setActive] = useState(0)
  const { navigateTo } = useRouter()
  const decision = rbacReleaseOneDecisions[active]
  const count = rbacReleaseOneDecisions.length

  const move = (delta: number) => setActive(i => (i + delta + count) % count)
  return (
    <section className="section-pad bg-secondary" aria-labelledby="decisions-heading">
      <div className="mx-auto max-w-6xl">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground" style={inter}>Inside the design file · Decision history</p>
            <h2 id="decisions-heading" className="text-3xl font-extrabold tracking-tight sm:text-5xl" style={montserrat}>
              The decisions <span className="italic font-light text-muted-foreground">behind the screens.</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Explore actual decisions from the Role-Based Access Control project: what changed, what it cost, and why it was chosen.
            </p>
          </div>
          <span className="rounded-md border border-border bg-card px-3 py-2 text-xs font-semibold text-muted-foreground" style={inter}>RBAC · Release 1</span>
        </div>
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
          <div className="rounded-xl border border-border bg-card p-3" role="group" aria-label="Select a design decision">
            <div className="mb-2 flex items-center justify-between px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground" style={inter}>
              <span>Decisions</span><span>{String(active + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}</span>
            </div>
            <div className="space-y-1">
              {rbacReleaseOneDecisions.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  aria-pressed={active === index}
                  onClick={() => setActive(index)}
                  className={`flex w-full min-h-12 items-center gap-3 rounded-lg px-3 py-3 text-left text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--figma-blue)] ${active === index ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-secondary/60'}`}
                >
                  <span className="shrink-0 text-xs font-bold" style={{ color: active === index ? 'var(--figma-blue)' : 'var(--muted-foreground)', ...inter }}>{String(index + 1).padStart(2, '0')}</span>
                  <span className="min-w-0 flex-1 font-medium">{item.title}</span>
                  {active === index && <Check className="h-4 w-4 shrink-0" aria-hidden="true" style={{ color: 'var(--figma-blue)' }}/>}
                </button>
              ))}
            </div>
          </div>
          <article aria-live="polite" aria-atomic="true" className="rounded-xl border border-border bg-card p-5 sm:p-8">
            <div className="mb-6 flex items-center justify-between gap-3">
              <span className="rounded-md px-3 py-1.5 text-xs font-semibold" style={{ color: 'var(--figma-blue)', background: 'color-mix(in srgb, var(--figma-blue) 12%, transparent)' }}>Selected decision</span>
              <span className="text-xs text-muted-foreground" style={inter}>Release 1 / Roles</span>
            </div>
            <h3 className="mb-7 text-2xl font-bold leading-tight sm:text-3xl" style={montserrat}>{decision.title}</h3>
            <dl className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-secondary/40 p-4 sm:col-span-2">
                <dt className="mb-2 text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--figma-blue)' }}>What changed</dt>
                <dd className="text-sm leading-relaxed">{decision.what}</dd>
              </div>
              <div className="rounded-lg border border-border p-4">
                <dt className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">Trade-off accepted</dt>
                <dd className="text-sm leading-relaxed text-muted-foreground">{decision.tradeoff}</dd>
              </div>
              <div className="rounded-lg border border-border p-4">
                <dt className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">Why</dt>
                <dd className="text-sm leading-relaxed text-muted-foreground">{decision.why}</dd>
              </div>
            </dl>
            <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
              <div className="flex gap-2">
                <button type="button" aria-label="Previous decision" onClick={() => move(-1)} className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--figma-blue)]"><ChevronLeft className="h-5 w-5" aria-hidden="true"/></button>
                <button type="button" aria-label="Next decision" onClick={() => move(1)} className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--figma-blue)]"><ChevronRight className="h-5 w-5" aria-hidden="true"/></button>
              </div>
              <button type="button" className="inline-flex min-h-11 items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--figma-blue)]" style={{ background: 'var(--figma-blue-fill)' }} onClick={() => navigateTo('case-study-2')}>
                Read the full case study <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
