import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { useRouter } from '../Router'
import { Frame } from '../chrome/Frame'
import type { CaseStudyContent } from '../../data/case-studies'
import {
  rbacReleaseOneDecisions, rbacSessionNotes, rbacReleaseOneConstraint,
  rbacReleaseTwo, rbacReflectionIntro, rbacReflectionActions, rbacReflectionOutro,
} from '../../data/case-studies/rbac'

const montserrat = { fontFamily: "'Montserrat', 'Montserrat Fallback', sans-serif" }
const inter = { fontFamily: "'Inter', 'Inter Fallback', sans-serif" }
const pad = 'px-6 py-14 sm:px-10 sm:py-16'

function Heading({ id, eyebrow, children }: { id: string; eyebrow: string; children: string }) {
  return (
    <header className="mb-8">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground" style={inter}>{eyebrow}</p>
      <h2 id={id} className="text-2xl font-extrabold tracking-tight sm:text-4xl" style={montserrat}>{children}</h2>
    </header>
  )
}

/** The RBAC narrative uses the existing Figma frames and tokens.
 * Pending screenshots are intentionally not rendered until approved files exist.
 */
export function RbacCaseStudy({ data }: { data: CaseStudyContent }) {
  const { navigateTo } = useRouter()
  return (
    <div role="region" aria-label="Role-Based Access Control case study" style={{ '--cs-accent': data.accent, '--cs-accent-strong': `color-mix(in srgb, ${data.accent} 68%, #000)` } as React.CSSProperties}>
      <div className="figma-chrome mx-auto mt-4 flex max-w-[1200px] justify-between gap-3 px-3 sm:px-6">
        <button type="button" onClick={() => navigateTo('all-case-studies')} className="inline-flex min-h-11 items-center gap-2 rounded-md px-3 text-xs hover:text-[var(--cs-accent)]">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All files
        </button>
        <span className="self-center truncate text-xs text-muted-foreground">{data.fileName}</span>
        <button type="button" onClick={() => navigateTo('home')} className="inline-flex min-h-11 items-center rounded-md px-3 text-xs hover:text-[var(--cs-accent)]">Close</button>
      </div>
      <Frame id="cs-cover" name="Cover" headingId="cs-hero-title" instantReveal className="!my-8 sm:!my-10">
        <div className={pad}>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--cs-accent-strong)', ...inter }}>{data.company}</p>
          <h1 id="cs-hero-title" className="mb-5 text-4xl font-black tracking-tight sm:text-6xl" style={montserrat}>{data.product}</h1>
          <p className="mb-5 text-lg text-muted-foreground">{data.subtitle}</p>
          <p className="max-w-3xl leading-relaxed text-muted-foreground">{data.description}</p>
          <div className="my-7 flex flex-wrap gap-2">{data.tags.map(t => <span key={t} className="rounded-md border border-border bg-secondary/60 px-3 py-1.5 text-xs">{t}</span>)}</div>
          <p className="mb-3 text-sm font-semibold">{data.role.title}</p>
          <p className="text-sm text-muted-foreground">Discovery to rollout across two releases (2021–2022) · 7 engineers, 1 PM, 1 QA</p>
          <p className="mt-6 rounded-xl border border-border bg-secondary/40 p-5 text-lg font-bold">{data.heroStat.value}</p>
        </div>
      </Frame>

      <Frame id="cs-summary" name="00 · At a glance" headingId="cs-summary-heading" instantReveal className="!my-8 sm:!my-10">
        <div className={pad}>
          <Heading id="cs-summary-heading" eyebrow="Executive Summary">At a glance.</Heading>
          <div className="grid gap-4 md:grid-cols-3">
            <article className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-3 font-bold">Problem</h3><p className="text-sm leading-relaxed text-muted-foreground">Admins set 22 permissions by hand for every new user, then repeated it for the next one.</p>
            </article>
            <article className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-3 font-bold">What I did</h3><p className="text-sm leading-relaxed text-muted-foreground">User journeys, wireframes, prototypes, usability testing, and engineering handoff across time zones — for both releases.</p>
            </article>
            <article className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-3 font-bold">Shipped</h3><p className="text-sm leading-relaxed text-muted-foreground">Release 1 (roles) and Release 2 (multiple roles per user), rolled out in batches to customer tenants.</p>
            </article>
          </div>
        </div>
      </Frame>

      <Frame id="cs-context" name="01 · Problem" headingId="cs-context-heading" instantReveal className="!my-8 sm:!my-10">
        <div className={pad}>
          <Heading id="cs-context-heading" eyebrow="The problem">Repeated per-user setup.</Heading>
          <div className="max-w-3xl space-y-4">{data.contextParagraphs.map(p => <p key={p} className="leading-relaxed text-muted-foreground">{p}</p>)}</div>
        </div>
      </Frame>

      <Frame id="cs-research" name="02 · Research" headingId="cs-research-heading" contentClassName="bg-secondary" instantReveal className="!my-8 sm:!my-10">
        <div className={pad}>
          <Heading id="cs-research-heading" eyebrow="Research">What we tested.</Heading>
          <div className="max-w-3xl space-y-4">{data.researchMethods.map(p => <p key={p} className="leading-relaxed text-muted-foreground">{p}</p>)}</div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-5"><strong className="text-xl">4 participants</strong></div>
            <div className="rounded-xl border border-border bg-card p-5"><strong className="text-xl">6 tasks</strong></div>
            <div className="rounded-xl border border-border bg-card p-5"><strong className="text-xl">21/24 tasks completed</strong></div>
          </div>
          <h3 className="mt-10 mb-4 font-bold">From session notes</h3>
          <ul className="space-y-3">{rbacSessionNotes.map(note => <li key={note} className="rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">“{note}”</li>)}</ul>
        </div>
      </Frame>

      <Frame id="cs-release-one" name="03 · Release 1" headingId="cs-release-one-heading" instantReveal className="!my-8 sm:!my-10">
        <div className={pad}>
          <Heading id="cs-release-one-heading" eyebrow="Release 1 — Roles">Decisions and trade-offs.</Heading>
          <div className="grid gap-5 md:grid-cols-2">
            {rbacReleaseOneDecisions.map((decision, i) => (
              <article key={decision.title} className="rounded-xl border border-border bg-card p-6">
                <p className="mb-2 text-xs font-bold" style={{ color: 'var(--cs-accent-strong)' }}>Decision {i + 1}</p>
                <h3 className="mb-5 text-lg font-bold" style={montserrat}>{decision.title}</h3>
                <dl className="space-y-3 text-sm">
                  <div><dt className="font-semibold">What</dt><dd className="text-muted-foreground">{decision.what}</dd></div>
                  <div><dt className="font-semibold">Trade-off</dt><dd className="text-muted-foreground">{decision.tradeoff}</dd></div>
                  <div><dt className="font-semibold">Why</dt><dd className="text-muted-foreground">{decision.why}</dd></div>
                </dl>
              </article>
            ))}
          </div>
          <aside className="mt-8 rounded-xl border border-border bg-secondary/50 p-5">
            <h3 className="mb-2 font-bold">Constraints I designed within</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{rbacReleaseOneConstraint}</p>
          </aside>
        </div>
      </Frame>

      <Frame id="cs-release-two" name="04 · Release 2" headingId="cs-release-two-heading" contentClassName="bg-secondary" instantReveal className="!my-8 sm:!my-10">
        <div className={pad}>
          <Heading id="cs-release-two-heading" eyebrow="Release 2 — Multiple roles per user">Beyond one role.</Heading>
          <p className="max-w-3xl leading-relaxed text-muted-foreground">{rbacReleaseTwo}</p>
        </div>
      </Frame>

      <Frame id="cs-impact" name="05 · Outcome" headingId="cs-impact-heading" instantReveal className="!my-8 sm:!my-10">
        <div className={pad}>
          <Heading id="cs-impact-heading" eyebrow="Outcome">Before and after.</Heading>
          <ul className="max-w-3xl space-y-3">{data.whatChanged?.map(item => <li key={item} className="flex gap-3 rounded-xl border border-border bg-card p-5 text-sm leading-relaxed"><Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: 'var(--cs-accent-strong)' }} aria-hidden="true"/>{item}</li>)}</ul>
        </div>
      </Frame>

      <Frame id="cs-reflection" name="06 · Reflection" headingId="cs-reflection-heading" contentClassName="bg-secondary" instantReveal className="!my-8 sm:!my-10">
        <div className={pad}>
          <Heading id="cs-reflection-heading" eyebrow="What I'd do differently">What we shipped without fixing.</Heading>
          <p className="mb-5 max-w-3xl leading-relaxed text-muted-foreground">{rbacReflectionIntro}</p>
          <ul className="mb-5 max-w-3xl space-y-3">{rbacReflectionActions.map(item => <li key={item} className="rounded-xl border border-border bg-card p-4 text-sm">{item}</li>)}</ul>
          <p className="max-w-3xl leading-relaxed text-muted-foreground">{rbacReflectionOutro}</p>
        </div>
      </Frame>
      <footer className="figma-chrome mx-auto flex max-w-[1200px] flex-wrap justify-between gap-3 px-4 py-8">
        <button type="button" className="inline-flex min-h-11 items-center gap-2 rounded-md border border-border px-4 text-xs" onClick={() => navigateTo('all-case-studies')}><ArrowLeft className="h-4 w-4"/>All case studies</button>
        <button type="button" className="inline-flex min-h-11 items-center gap-2 rounded-md border border-border px-4 text-xs" onClick={() => navigateTo('case-study-3')}>Next: Flowsheets<ArrowRight className="h-4 w-4"/></button>
      </footer>
    </div>
  )
}
