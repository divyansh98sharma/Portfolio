import { ArrowLeft, ArrowRight, Download, Mail } from 'lucide-react'
import { useRouter } from './Router'
import { LayerRegion } from './chrome/LayersContext'
import { getClientId } from '../lib/identity'

const inter = { fontFamily: "'Inter', sans-serif" }
const montserrat = { fontFamily: "'Montserrat', sans-serif" }

/** Dedicated /about page — the long-form bio that anchors the name query and
 *  gives search engines / LLMs the eClinicalWorks · Peak.ai (now UiPath)
 *  narrative as real indexable text (the homepage About section is the short
 *  version). */
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
              Divyansh Sharma — healthcare and enterprise
              <span className="italic" style={{ fontWeight: 300, color: 'var(--muted-foreground)' }}> UX designer</span>.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              I design healthcare and enterprise software — EHR workflows, AI platforms, and the kind
              of dense, expert tools people use for eight hours a day. Based in India, working with US
              teams.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              I came to design from computer science. That shows up in how I work: I design systems
              rather than screens, I think about implementation while I'm still in Figma, and I've
              never handed engineering something I couldn't discuss at the component level.
            </p>
          </header>

          <div className="space-y-10 text-[15px] leading-relaxed text-muted-foreground">
            <section>
              <h2 className="mb-3 text-xl tracking-tight text-foreground" style={{ ...montserrat, fontWeight: 700 }}>
                What I'm doing now
              </h2>
              <p>
                At <strong className="text-foreground">eClinicalWorks</strong>, one of the largest
                ambulatory EHR platforms in the US, I design clinical software used by healthcare
                providers every day. High-stakes, high-density workflows where a confusing screen
                isn't a bounce — it's a clinician losing time with a patient.
              </p>
              <p className="mt-3">
                Recent work: a centralized analytics dashboard that consolidated fragmented KPIs into
                role-aware views with AI-assisted search; a Flowsheets redesign that streamlined
                clinical documentation and improved visibility of patient progress; and a token-based
                design system built to keep the product suite consistent and speed up delivery. I
                also mentor designers on the team and lead design critiques and quality reviews.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl tracking-tight text-foreground" style={{ ...montserrat, fontWeight: 700 }}>
                Before this
              </h2>
              <p>
                At <strong className="text-foreground">Peak.ai</strong> — an enterprise AI company
                since acquired by <strong className="text-foreground">UiPath</strong> — I worked on
                Segment Explorer, Product Explorer, and Merchandiser, and built a Storybook-backed
                component library that raised design consistency across the platform. It's where I
                learned to design data-heavy tools for users who are experts in their domain and
                impatient with friction.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl tracking-tight text-foreground" style={{ ...montserrat, fontWeight: 700 }}>
                How I work
              </h2>
              <p>
                I map the workflow people actually follow, not the one the org chart says they
                follow. That gap is where most enterprise UX problems live.
              </p>
              <p className="mt-3">
                In practice: talk to real users, prototype fast, usability-test honestly, and build
                systems rather than one-off screens so the work scales past me. I care as much about
                the handoff and the shipped result as the Figma file — a design engineering can't
                implement cleanly isn't finished.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl tracking-tight text-foreground" style={{ ...montserrat, fontWeight: 700 }}>
                Get in touch
              </h2>
              <p>
                I mentor early-career designers on craft and career growth. If you're building
                something in healthcare, enterprise, or AI — or you're a designer trying to level up —
                email me at{' '}
                <a
                  href="mailto:work.divyansh@gmail.com"
                  className="font-medium text-foreground underline decoration-muted-foreground/40 underline-offset-2 hover:decoration-foreground"
                >
                  work.divyansh@gmail.com
                </a>
                .
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
              href="mailto:work.divyansh@gmail.com"
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
