import { useState } from 'react'
import { ArrowLeft, ArrowRight, Check, X } from 'lucide-react'
import { useRouter } from '../Router'
import { PrototypeModal } from './PrototypeModal'
import { Frame } from '../chrome/Frame'
import { FigmaIcon } from '../icons/FigmaIcon'
import { ComponentGlyph } from '../icons/ComponentGlyph'
import { ImageWithFallback } from '../figma/ImageWithFallback'
import { CoverArt } from '../CoverArt'
import type { CaseStudyContent } from '../../data/case-studies'

const montserrat = { fontFamily: "'Silkscreen', sans-serif" }
const inter = { fontFamily: "'Space Mono', sans-serif" }

/** Figma-style redline measurement bar: value + annotated progress line */
function SpecBar({ progress, color = 'var(--cs-accent)' }: { progress: number; color?: string }) {
  return (
    <div className="relative mt-1 h-3" aria-hidden="true">
      <div className="absolute top-1/2 h-px w-full -translate-y-1/2" style={{ backgroundColor: 'var(--border)' }} />
      <div
        className="absolute top-1/2 h-px -translate-y-1/2"
        style={{ width: `${progress}%`, backgroundColor: color }}
      />
      {/* redline end ticks */}
      <div className="absolute left-0 top-1/2 h-2 w-px -translate-y-1/2" style={{ backgroundColor: color }} />
      <div
        className="absolute top-1/2 h-2 w-px -translate-y-1/2"
        style={{ left: `${progress}%`, backgroundColor: color }}
      />
    </div>
  )
}

/** Figma comment pin with initials */
function Pin({ initials, color }: { initials: string; color: string }) {
  return (
    <span
      className="flex h-8 w-8 flex-shrink-0 items-center justify-center text-[10px] font-bold text-white shadow-md"
      style={{ ...inter, backgroundColor: color, borderRadius: '50% 50% 50% 4px' }}
      aria-hidden="true"
    >
      {initials}
    </span>
  )
}

function SectionHeading({ id, label, title }: { id: string; label: string; title: string }) {
  return (
    <header className="mb-10">
      <div className="mb-3 flex items-center gap-3">
        <div className="w-8 h-px bg-muted-foreground" />
        <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground" style={montserrat}>
          {label}
        </p>
      </div>
      <h2 id={id} className="leading-[1.1] tracking-tight" style={{ ...montserrat, fontWeight: 800, fontSize: 'clamp(1.7rem, calc(3.4vw * var(--canvas-zoom, 1)), 2.6rem)' }}>
        {title}
      </h2>
    </header>
  )
}

const PIN_COLORS = ['var(--figma-cursor-orange)', 'var(--figma-cursor-purple)', 'var(--figma-cursor-green)']

export function CaseStudyLayout({ data }: { data: CaseStudyContent }) {
  const { navigateTo } = useRouter()
  const [showPrototype, setShowPrototype] = useState(false)
  const pad = 'px-6 py-14 sm:px-10 sm:py-16'

  return (
    <div
      role="main"
      aria-label={`${data.title} case study`}
      style={{ '--cs-accent': data.accent } as React.CSSProperties}
    >
      {/* Opened-file strip */}
      <div
        className="figma-chrome mx-auto mt-4 flex max-w-[1200px] items-center gap-2 px-3 sm:px-6 lg:px-0 text-[12px]"
        style={{ ...inter, color: 'var(--figma-text-dim)' }}
      >
        <button
          onClick={() => navigateTo('all-case-studies')}
          className="flex min-h-0 min-w-0 items-center gap-1.5 rounded-md px-2 py-1.5 transition-colors hover:text-[var(--cs-accent)]"
          aria-label="Back to all case studies"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Drafts
        </button>
        <span aria-hidden="true">/</span>
        <span className="flex items-center gap-1.5 font-medium" style={{ color: 'var(--figma-text)' }}>
          <span style={{ color: 'var(--figma-cursor-purple)' }}>
            <FigmaIcon className="h-3.5 w-2.5" />
          </span>
          {data.fileName}
        </span>
        <button
          onClick={() => navigateTo('home')}
          className="ml-auto flex min-h-0 min-w-0 items-center gap-1 rounded-md px-2 py-1.5 transition-colors hover:text-[var(--cs-accent)]"
          aria-label="Close file and return home"
        >
          <X className="h-3.5 w-3.5" aria-hidden="true" />
          Close
        </button>
      </div>

      {/* ── Cover ── */}
      <Frame id="cs-cover" name="Cover" headingId="cs-hero-title" instantReveal className="!my-8 sm:!my-10">
        <div className="relative overflow-hidden">
          {/* accent wash */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `linear-gradient(160deg, color-mix(in srgb, ${data.accent} 14%, transparent) 0%, transparent 46%)`,
            }}
            aria-hidden="true"
          />
          <div className={`${pad} relative`}>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-6">
              <span
                className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-[11px] font-semibold"
                style={{ ...inter, borderColor: 'color-mix(in srgb, var(--cs-accent) 40%, transparent)', color: 'var(--cs-accent)', backgroundColor: 'color-mix(in srgb, var(--cs-accent) 8%, transparent)' }}
              >
                <ComponentGlyph className="h-2.5 w-2.5" />
                Case Study · {data.company}
              </span>

              <header className="space-y-4">
                <h1 id="cs-hero-title" className="leading-[1.02] tracking-tight" style={{ ...montserrat, fontWeight: 900, fontSize: 'clamp(2.2rem, calc(5vw * var(--canvas-zoom, 1)), 3.8rem)' }}>
                  {data.product}
                </h1>
                <h2 className="text-lg font-medium sm:text-xl" style={{ ...montserrat, color: 'var(--muted-foreground)' }}>
                  {data.subtitle}
                </h2>
                <p className="max-w-2xl leading-relaxed text-muted-foreground">{data.description}</p>
              </header>

              <div className="flex flex-wrap gap-2" role="list" aria-label="Project categories">
                {data.tags.map((tag) => (
                  <span key={tag} role="listitem" className="rounded-md border border-border bg-secondary/60 px-3 py-1.5 text-[12px] font-medium text-muted-foreground" style={inter}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* facts row */}
              <div className="flex flex-wrap gap-x-10 gap-y-3 border-t border-border pt-5" aria-label="Project facts">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70" style={inter}>Role</p>
                  <p className="mt-0.5 text-sm font-semibold" style={montserrat}>{data.role.title}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70" style={inter}>Year</p>
                  <p className="mt-0.5 text-sm font-semibold" style={montserrat}>{data.stats[0].value}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70" style={inter}>Timeline</p>
                  <p className="mt-0.5 text-sm font-semibold" style={montserrat}>{data.stats[0].note.replace(' duration', '')}</p>
                </div>
              </div>

              {data.prototypeUrl && (
                <button
                  onClick={() => setShowPrototype(true)}
                  className="inline-flex items-center rounded-lg px-6 py-3 text-sm font-bold text-white shadow-md transition-opacity hover:opacity-90"
                  style={{ ...montserrat, backgroundColor: 'var(--cs-accent)' }}
                  aria-label="Present prototype"
                >
                  <FigmaIcon className="mr-2 h-5 w-4" />
                  View Prototype
                </button>
              )}
            </div>

            <div className="lg:col-span-6">
              <div className="relative mx-auto max-w-lg">
                <figure className="frame-wrap relative rounded-xl">
                  <figcaption className="frame-label absolute -top-5 left-0" aria-hidden="true">
                    cover · {data.fileName}
                  </figcaption>
                  <span className="frame-handle frame-handle--tl" aria-hidden="true" />
                  <span className="frame-handle frame-handle--tr" aria-hidden="true" />
                  <span className="frame-handle frame-handle--bl" aria-hidden="true" />
                  <span className="frame-handle frame-handle--br" aria-hidden="true" />
                  <div className="aspect-[4/3] overflow-hidden rounded-xl border border-border shadow-lg">
                    <CoverArt product={data.product} company={data.company} accent={data.accent} large />
                  </div>
                </figure>
                {/* floating spec annotation */}
                <div
                  className="absolute -bottom-5 -right-2 rounded-lg border bg-card px-4 py-3 shadow-lg sm:-right-6"
                  style={{ borderColor: 'var(--cs-accent)' }}
                  role="complementary"
                  aria-label={`Key metric: ${data.heroStat.label} ${data.heroStat.value}`}
                >
                  <div className="text-[10px] font-medium uppercase tracking-wide" style={{ ...inter, color: 'var(--cs-accent)' }}>
                    {data.heroStat.label}
                  </div>
                  <div className="text-2xl font-bold" style={montserrat}>
                    {data.heroStat.value}
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </Frame>

      {/* ── Context ── */}
      <Frame id="cs-context" name="01 · Context" headingId="cs-context-heading" instantReveal className="!my-8 sm:!my-10">
        <div className={pad}>
          <SectionHeading id="cs-context-heading" label="Project Context" title="The context." />
          <div className="max-w-3xl space-y-4">
            {data.contextParagraphs.map((p, i) => (
              <p key={i} className="leading-relaxed text-muted-foreground">{p}</p>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data.stats.map((stat, i) => (
              <div key={i} className="rounded-xl border border-border bg-background/60 p-5">
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-bold" style={{ ...montserrat, color: 'var(--cs-accent)' }}>{stat.value}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground" style={inter}>{stat.unit}</span>
                </div>
                <p className="mt-3 text-sm font-semibold" style={montserrat}>{stat.title}</p>
                {stat.subMetrics ? (
                  <div className="mt-2 space-y-2">
                    {stat.subMetrics.map((m) => (
                      <div key={m.label}>
                        <div className="flex items-center justify-between text-[11px]" style={inter}>
                          <span className="text-muted-foreground">{m.label}</span>
                          <span className="font-bold" style={{ color: 'var(--cs-accent)' }}>{m.value}</span>
                        </div>
                        <SpecBar progress={m.progress} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <SpecBar progress={stat.progress} />
                    <p className="mt-2 text-[12px] text-muted-foreground" style={inter}>{stat.note}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </Frame>

      {/* ── Team ── */}
      <Frame id="cs-team" name="02 · Team" headingId="cs-team-heading" contentClassName="bg-secondary" instantReveal className="!my-8 sm:!my-10">
        <div className={`${pad} bg-secondary`}>
          <SectionHeading id="cs-team-heading" label="Team Structure" title="Team & my role." />
          <p className="mb-10 max-w-3xl leading-relaxed text-muted-foreground">{data.teamIntro}</p>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
              <div
                className="mb-5 border-b border-border pb-3 text-[11px] font-semibold uppercase tracking-wide"
                style={{ ...inter, color: 'var(--cs-accent)' }}
                aria-hidden="true"
              >
                Owner · My Role
              </div>
              <h3 className="text-xl font-bold" style={montserrat}>{data.role.title}</h3>
              <div className="mt-5 space-y-3">
                {data.role.activities.map((a) => (
                  <div key={a} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: 'color-mix(in srgb, var(--cs-accent) 12%, transparent)' }}>
                      <Check className="h-3 w-3" style={{ color: 'var(--cs-accent)' }} aria-hidden="true" />
                    </span>
                    <span className="text-sm text-foreground">{a}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
              <div
                className="mb-5 border-b border-border pb-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground"
                style={inter}
                aria-hidden="true"
              >
                Collaborators · Can edit
              </div>
              <div className="space-y-6">
                {data.teamGroups.map((group, gi) => (
                  <div key={group.heading}>
                    <h4 className="mb-2 text-sm font-semibold" style={{ ...montserrat, color: PIN_COLORS[gi % PIN_COLORS.length] }}>
                      {group.heading}
                    </h4>
                    <ul className="space-y-1.5">
                      {group.items.map((item) => (
                        <li key={item} className="text-sm text-muted-foreground">{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Frame>

      {/* ── Challenge ── */}
      <Frame id="cs-challenge" name="03 · Challenge" headingId="cs-challenge-heading" instantReveal className="!my-8 sm:!my-10">
        <div className={pad}>
          <SectionHeading id="cs-challenge-heading" label="The Challenge" title="What was broken." />
          <p className="mb-10 max-w-3xl leading-relaxed text-muted-foreground">{data.challengeIntro}</p>

          <div className="grid gap-5 lg:grid-cols-3" role="list" aria-label="Identified challenges">
            {data.challenges.map((c, i) => (
              <div key={c.title} role="listitem" className="overflow-hidden rounded-xl border border-border bg-card">
                <div className="flex items-center justify-between border-b border-border px-5 py-2.5" aria-hidden="true">
                  <span className="text-[11px] font-semibold uppercase tracking-wide" style={{ ...inter, color: 'var(--figma-cursor-red)' }}>
                    Issue {i + 1}
                  </span>
                  <span className="rounded px-1.5 py-0.5 text-[10px] font-bold" style={{ ...inter, backgroundColor: 'color-mix(in srgb, var(--figma-cursor-red) 12%, transparent)', color: 'var(--figma-cursor-red)' }}>
                    Critical
                  </span>
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="text-lg font-bold" style={montserrat}>{c.title}</h3>
                  <p className="text-sm text-muted-foreground">{c.subtitle}</p>
                  <div className="my-4 flex items-baseline gap-2 rounded-lg bg-secondary/70 px-4 py-3">
                    <span className="text-3xl font-bold" style={{ ...montserrat, color: 'var(--figma-cursor-red)' }}>{c.stat}</span>
                    <span className="text-sm font-medium text-muted-foreground">{c.statLabel}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground">{c.description}</p>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-foreground">💡 {c.impact}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-xl border-2 p-8 sm:p-10" style={{ borderColor: 'color-mix(in srgb, var(--figma-cursor-red) 30%, transparent)', backgroundColor: 'color-mix(in srgb, var(--figma-cursor-red) 4%, transparent)' }}>
            <h3 className="mb-8 text-center text-xl font-bold" style={montserrat}>Combined Impact</h3>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {data.combinedImpact.map((ci) => (
                <div key={ci.label} className="text-center">
                  <div className="text-4xl font-bold sm:text-5xl" style={{ ...montserrat, color: 'var(--figma-cursor-red)' }}>{ci.value}</div>
                  <p className="mt-2 font-medium text-foreground">{ci.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Frame>

      {/* ── Research ── */}
      <Frame id="cs-research" name="04 · Research" headingId="cs-research-heading" contentClassName="bg-secondary" instantReveal className="!my-8 sm:!my-10">
        <div className={`${pad} bg-secondary`}>
          <SectionHeading id="cs-research-heading" label="Research & Discovery" title="What we learned." />
          <p className="mb-10 max-w-3xl leading-relaxed text-muted-foreground">{data.researchIntro}</p>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
                <h3 className="mb-5 text-lg font-bold" style={montserrat}>Research Methods</h3>
                <div className="space-y-3">
                  {data.researchMethods.map((m) => (
                    <div key={m} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: 'color-mix(in srgb, var(--cs-accent) 12%, transparent)' }}>
                        <Check className="h-3 w-3" style={{ color: 'var(--cs-accent)' }} aria-hidden="true" />
                      </span>
                      <span className="text-sm text-foreground">{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key insight as a pinned comment */}
              <div className="flex items-start gap-3">
                <Pin initials="KI" color="var(--figma-cursor-yellow)" />
                <div className="flex-1 rounded-xl rounded-tl-sm border border-border bg-card p-6">
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground" style={inter}>Key Insight</p>
                  <blockquote className="italic leading-relaxed text-foreground">{data.keyInsight.quote}</blockquote>
                  <cite className="mt-2 block text-sm font-medium not-italic" style={{ color: 'var(--cs-accent)' }}>{data.keyInsight.cite}</cite>
                </div>
              </div>
            </div>

            <figure className="frame-wrap relative self-start rounded-xl">
              <figcaption className="frame-label absolute -top-5 left-0" aria-hidden="true">research-session.jpg</figcaption>
              <span className="frame-handle frame-handle--tl" aria-hidden="true" />
              <span className="frame-handle frame-handle--tr" aria-hidden="true" />
              <span className="frame-handle frame-handle--bl" aria-hidden="true" />
              <span className="frame-handle frame-handle--br" aria-hidden="true" />
              <div className="aspect-[4/3] overflow-hidden rounded-xl border border-border">
                <ImageWithFallback src={data.researchImage.src} alt={data.researchImage.alt} className="h-full w-full object-cover" />
              </div>
            </figure>
          </div>
        </div>
      </Frame>

      {/* ── Process ── */}
      <Frame id="cs-process" name="05 · Process" headingId="cs-process-heading" instantReveal className="!my-8 sm:!my-10">
        <div className={pad}>
          <SectionHeading id="cs-process-heading" label="Design Process" title="How we got there." />
          <p className="mb-10 max-w-3xl leading-relaxed text-muted-foreground">{data.processIntro}</p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {data.designPhases.map((phase, i) => (
              <div key={phase.title} className="relative">
                <span className="mb-1.5 flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground" style={inter} aria-hidden="true">
                  <svg viewBox="0 0 16 16" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 1v14M12 1v14M1 4h14M1 12h14" />
                  </svg>
                  Flow / {String(i + 1).padStart(2, '0')}
                </span>
                <div className="h-full rounded-xl border border-border bg-card p-5">
                  <h3 className="mb-2 font-bold" style={montserrat}>
                    <span className="mr-2 text-sm font-black" style={{ color: 'var(--cs-accent)' }}>{String(i + 1).padStart(2, '0')}</span>
                    {phase.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-muted-foreground">{phase.description}</p>
                </div>
                {i < data.designPhases.length - 1 && (
                  <div className="absolute top-1/2 -right-[14px] z-10 hidden -translate-y-1/2 lg:block" aria-hidden="true">
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                      <path d="M0 5h9" stroke="var(--cs-accent)" strokeWidth="2" />
                      <path d="M8 1l4 4-4 4" stroke="var(--cs-accent)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Frame>

      {/* ── Solutions ── */}
      <Frame id="cs-solutions" name="06 · Solutions" headingId="cs-solutions-heading" contentClassName="bg-secondary" instantReveal className="!my-8 sm:!my-10">
        <div className={`${pad} bg-secondary`}>
          <SectionHeading id="cs-solutions-heading" label="Design Solutions" title="What we shipped." />

          <div className="grid gap-5 lg:grid-cols-2">
            {data.solutions.map((s, i) => (
              <div key={s.title} className="overflow-hidden rounded-xl border border-border bg-card">
                <div className="flex items-center justify-between border-b border-border px-6 py-2.5" aria-hidden="true">
                  <span className="flex items-center gap-1.5 text-[11px] font-medium" style={{ ...inter, color: 'var(--figma-cursor-purple)' }}>
                    <ComponentGlyph className="h-3 w-3" />
                    Solution / {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[11px] text-muted-foreground/70" style={inter}>Core Feature</span>
                </div>
                <div className="p-6 sm:p-7">
                  <h3 className="mb-2 text-xl font-bold" style={montserrat}>{s.title}</h3>
                  <p className="mb-4 leading-relaxed text-muted-foreground">{s.description}</p>
                  <p className="text-sm text-muted-foreground"><strong>Impact:</strong> {s.impact}</p>
                  <p className="mt-1 text-sm font-medium" style={{ color: 'var(--cs-accent)' }}><strong>Result:</strong> {s.result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Frame>

      {/* ── Impact ── */}
      <Frame id="cs-impact" name="07 · Impact" headingId="cs-impact-heading" instantReveal className="!my-8 sm:!my-10">
        <div className={pad}>
          <SectionHeading id="cs-impact-heading" label="Measurable Impact" title="The results." />
          <p className="mb-10 max-w-3xl leading-relaxed text-muted-foreground">{data.impactIntro}</p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data.impactMetrics.map((m, i) => (
              <div key={m.label} className="rounded-xl border border-border bg-card p-6 text-center">
                <div className="text-3xl font-bold" style={{ ...montserrat, color: PIN_COLORS[i % PIN_COLORS.length] }}>{m.value}</div>
                <p className="mt-2 text-sm text-muted-foreground">{m.label}</p>
              </div>
            ))}
          </div>

          {/* Feedback as comment threads */}
          <div className="mt-12">
            <h3 className="mb-6 text-lg font-bold" style={montserrat}>{data.feedbackHeading}</h3>
            <div className="grid gap-5 md:grid-cols-3">
              {data.feedback.map((f, i) => (
                <div key={f.cite} className="flex items-start gap-3">
                  <Pin initials={f.cite.replace(/^– /, '').slice(0, 1).toUpperCase() + (i + 1)} color={PIN_COLORS[i % PIN_COLORS.length]} />
                  <div className="flex-1 rounded-xl rounded-tl-sm border border-border bg-card p-5">
                    <p className="text-sm italic leading-relaxed text-foreground">{f.quote}</p>
                    <cite className="mt-2 block text-[12px] font-medium not-italic text-muted-foreground" style={inter}>{f.cite}</cite>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Frame>

      {/* ── Learnings & Next ── */}
      <Frame id="cs-learnings" name="08 · Learnings" headingId="cs-learnings-heading" contentClassName="bg-secondary" instantReveal className="!my-8 sm:!my-10">
        <div className={`${pad} bg-secondary`}>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading id="cs-learnings-heading" label="Key Insights" title="Key learnings." />
              <div className="space-y-4">
                {data.keyLearnings.map((l, i) => (
                  <div key={l.title} className="flex items-start gap-4 rounded-xl border border-border bg-card p-5">
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-sm font-bold" style={{ ...inter, backgroundColor: 'color-mix(in srgb, var(--cs-accent) 12%, transparent)', color: 'var(--cs-accent)' }}>
                      {i + 1}
                    </span>
                    <div>
                      <h4 className="mb-1 font-bold" style={montserrat}>{l.title}</h4>
                      <p className="text-sm text-muted-foreground">{l.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <SectionHeading id="cs-next-heading" label="Future Vision" title="What's next." />
              <div className="space-y-4">
                {data.futureOpportunities.map((o) => (
                  <div key={o.title} className="rounded-xl border border-border bg-card p-5">
                    <h4 className="mb-1 flex items-center gap-2 font-bold" style={montserrat}>
                      <span aria-hidden="true" style={{ color: 'var(--figma-cursor-green)' }}>▸</span>
                      {o.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">{o.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Frame>

      {/* File navigation footer */}
      <footer className="figma-chrome mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-6 pb-10 sm:flex-row" role="contentinfo" aria-label="Case study navigation" style={{ ...inter, color: 'var(--figma-text-dim)' }}>
        <button
          onClick={() => navigateTo('all-case-studies')}
          className="flex min-h-0 min-w-0 items-center gap-2 rounded-md border px-4 py-2.5 text-[12px] font-medium transition-colors hover:text-[var(--cs-accent)] hover:border-[var(--cs-accent)]"
          style={{ borderColor: 'var(--figma-border)', color: 'var(--figma-text)' }}
          aria-label="Return to all case studies"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          All files
        </button>

        <div className="flex gap-3">
          <button
            onClick={() => navigateTo(data.prev.id)}
            className="flex min-h-0 min-w-0 items-center gap-2 rounded-md border px-4 py-2.5 text-[12px] font-medium transition-colors hover:text-[var(--cs-accent)] hover:border-[var(--cs-accent)]"
            style={{ borderColor: 'var(--figma-border)', color: 'var(--figma-text)' }}
            aria-label={`View ${data.prev.label} case study`}
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            {data.prev.label}
          </button>
          <button
            onClick={() => navigateTo(data.next.id)}
            className="flex min-h-0 min-w-0 items-center gap-2 rounded-md border px-4 py-2.5 text-[12px] font-medium transition-colors hover:text-[var(--cs-accent)] hover:border-[var(--cs-accent)]"
            style={{ borderColor: 'var(--figma-border)', color: 'var(--figma-text)' }}
            aria-label={`View ${data.next.label} case study`}
          >
            {data.next.label}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </footer>

      {showPrototype && data.prototypeUrl && (
        <PrototypeModal
          url={data.prototypeUrl}
          fileName={data.fileName}
          accent={data.accent}
          onClose={() => setShowPrototype(false)}
        />
      )}
    </div>
  )
}
