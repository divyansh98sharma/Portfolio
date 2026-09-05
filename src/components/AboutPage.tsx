import { ArrowLeft, ArrowRight, Download, Mail } from 'lucide-react'
import { useRouter } from './Router'
import { LayerRegion } from './chrome/LayersContext'
import { getClientId } from '../lib/identity'

const inter = { fontFamily: "'Inter', sans-serif" }
const montserrat = { fontFamily: "'Montserrat', sans-serif" }

/** Dedicated /about page — the long-form bio that anchors the name query and
 *  gives search engines / LLMs the eClinicalWorks · Peak.ai · UiPath ·
 *  Northeastern narrative as real indexable text (the homepage About section
 *  is the short version). */
export function AboutPage() {
  const { navigateTo } = useRouter()

  return (
    <section className="pb-24" aria-labelledby="about-page-heading">
      {/* Breadcrumb — same placement as the case-study file strip */}
      <nav
        className="figma-chrome mx-auto mt-4 flex max-w-[760px] items-center gap-2 px-3 sm:px-6 lg:px-0 text-[12px]"
        style={{ ...inter, color: 'var(--figma-text-dim)' }}
        aria-label="Page navigation"
      >
        <button
          onClick={() => navigateTo('home')}
          className="flex min-h-0 min-w-0 items-center gap-1.5 rounded-md px-2 py-1.5 transition-colors hover:text-[var(--figma-blue)]"
          aria-label="Return to portfolio home page"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Drafts
        </button>
        <span aria-hidden="true">/</span>
        <span className="font-medium" style={{ color: 'var(--figma-text)' }}>
          About
        </span>
      </nav>

      <div className="mx-auto mt-10 max-w-[760px] px-4 sm:px-6 lg:px-0">
        <LayerRegion id="about-page" name="About">
          <header className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-muted-foreground" />
              <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground" style={montserrat}>
                About
              </p>
            </div>
            <h1
              id="about-page-heading"
              className="leading-[1.1] tracking-tight"
              style={{ ...montserrat, fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3rem)' }}
            >
              Divyansh Sharma — a UX designer who
              <span className="italic" style={{ fontWeight: 300, color: 'var(--muted-foreground)' }}> started with people</span>, not pixels.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              I'm a senior UX designer with 5+ years designing user-centered products across
              healthcare, AI platforms, and enterprise software. My background is in psychology —
              which is really just a long way of saying I got interested in why people do what they
              do before I ever got interested in interfaces. That order still shapes how I work:
              research first, pixels later.
            </p>
          </header>

          <div className="space-y-10 text-[15px] leading-relaxed text-muted-foreground">
            <section>
              <h2 className="mb-3 text-xl tracking-tight text-foreground" style={{ ...montserrat, fontWeight: 700 }}>
                What I'm doing now
              </h2>
              <p>
                At <strong className="text-foreground">eClinicalWorks</strong> — one of the largest
                ambulatory EHR platforms in the US — I work as a UI/UX designer and usability
                specialist on clinical software used by healthcare providers every day. That means
                designing for high-stakes, high-density workflows where a confusing screen isn't a
                bounce, it's a clinician losing time with a patient. My work there spans a
                centralized analytics dashboard that cut navigation time ~30% and lifted clinician
                satisfaction ~25%, a Flowsheets redesign that streamlined clinical documentation, and
                a token-based design system that improved consistency ~40% and reduced development
                time ~15%. I also mentor 3–5 designers and lead design critiques and quality reviews
                across the team.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl tracking-tight text-foreground" style={{ ...montserrat, fontWeight: 700 }}>
                Before this
              </h2>
              <p>
                At <strong className="text-foreground">Peak.ai</strong> I was an associate product
                designer working on enterprise AI features — Segment Explorer, Product Explorer, and
                Merchandiser — and I built a Storybook-backed component library that raised design
                consistency ~30% across the platform. It's where I learned to design complex,
                data-heavy tools for users who are experts in their domain and impatient with
                friction.
              </p>
              {/* TODO(divyansh): confirm role/dates/scope for the two below before shipping. */}
              <p className="mt-3">
                Earlier, I [ROLE] at <strong className="text-foreground">UiPath</strong>, where I
                [ONE LINE ON WHAT YOU DID — e.g. designed for automation/RPA workflows]. And I studied
                [DEGREE/PROGRAM] at <strong className="text-foreground">Northeastern University</strong>
                [YEARS], where [ONE LINE — what it gave you].
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl tracking-tight text-foreground" style={{ ...montserrat, fontWeight: 700 }}>
                How I work
              </h2>
              <p>
                I believe the best design is invisible — it solves problems so cleanly that people
                never notice the complexity underneath. In practice that looks like: talking to real
                users, mapping the actual workflow (not the idealized one), prototyping fast,
                usability-testing honestly, and building systems rather than one-off screens so the
                work scales past me. I care as much about the handoff and the shipped result as the
                Figma file.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl tracking-tight text-foreground" style={{ ...montserrat, fontWeight: 700 }}>
                Outside the work
              </h2>
              <p>
                I run <strong className="text-foreground">Collabrix</strong>, a design & talent
                studio, and mentor early-career UX designers on craft and career growth. If you're a
                team building something in healthcare, enterprise, or AI — or a designer trying to
                level up — I'd genuinely like to hear from you.
              </p>
            </section>
          </div>

          {/* CTA */}
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <button
              onClick={() => navigateTo('all-case-studies')}
              className="no-underline inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold shadow-md transition-all duration-300 hover:opacity-90"
              style={{ ...montserrat, backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)' }}
            >
              See the case studies
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <a
              href="mailto:work.divyanshsharma@gmail.com"
              className="no-underline inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Get in touch
            </a>
            <a
              href="/resume.pdf"
              download="Divyansh-Sharma-Resume.pdf"
              onClick={() => {
                void import('../lib/engagement').then((m) => m.trackResumeDownload(getClientId()))
              }}
              className="no-underline inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Download resume as PDF"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download resume
            </a>
          </div>
        </LayerRegion>
      </div>
    </section>
  )
}
