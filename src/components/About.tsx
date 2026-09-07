import profilePhoto from 'figma:asset/3f12db942eb596cb7c744a13790a87207de8db2c.png'
import profilePhotoWebp from '../assets/3f12db942eb596cb7c744a13790a87207de8db2c.webp'
import { ArrowRight, Download } from 'lucide-react'
import { useFrameReveal } from './chrome/Frame'
import { useRouter } from './Router'
import { getClientId } from '../lib/identity'

const montserrat = { fontFamily: "'Montserrat', sans-serif" }

export function About() {
  const isVisible = useFrameReveal()
  const { navigateTo } = useRouter()

  return (
    <div className="section-pad bg-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="about-grid">
          {/* Photo — an image layer you can "select" */}
          <div className={`flex flex-col items-center gap-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <figure className="frame-wrap relative rounded-lg">
              <figcaption
                className="frame-label absolute -top-5 left-0 flex items-center gap-1.5"
                aria-hidden="true"
              >
                <svg viewBox="0 0 16 16" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1.5" y="1.5" width="13" height="13" rx="1" /><circle cx="5.5" cy="5.5" r="1.4" /><path d="M2 12l3.5-3.5 2.5 2.5L12 7l2.5 2.5" /></svg>
                divyansh.png
              </figcaption>
              <span className="frame-handle frame-handle--tl" aria-hidden="true" />
              <span className="frame-handle frame-handle--tr" aria-hidden="true" />
              <span className="frame-handle frame-handle--bl" aria-hidden="true" />
              <span className="frame-handle frame-handle--br" aria-hidden="true" />
              <div className="w-56 h-64 sm:w-64 sm:h-72 rounded-lg overflow-hidden shadow-xl" style={{ filter: 'grayscale(0.8)' }}>
                <picture>
                  <source srcSet={profilePhotoWebp} type="image/webp" />
                  <img
                    src={profilePhoto}
                    alt="Divyansh Sharma - UX Designer"
                    className="w-full h-full object-cover"
                    width={256}
                    height={288}
                    loading="lazy"
                  />
                </picture>
              </div>
            </figure>
            <div
              className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-[11px] text-muted-foreground"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: 'var(--figma-cursor-green)' }} aria-hidden="true" />
              Image · Fill · 256 × 288
            </div>
          </div>

          {/* Content */}
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Section label */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-muted-foreground" />
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider" style={montserrat}>About Me</p>
            </div>

            {/* Headline */}
            <h2 id="about-heading" className="leading-[1.1] tracking-tight mb-6" style={{ ...montserrat, fontWeight: 800, fontSize: 'clamp(2rem, calc(4vw * var(--canvas-zoom, 1)), 3.2rem)' }}>
              Usability Mentor.
              <br />
              <span className="italic" style={{ fontWeight: 300, color: 'var(--muted-foreground)' }}>
                Research-Driven
              </span>
              {' & '}
              <span style={{ fontWeight: 800 }}>User-First.</span>
            </h2>

            {/* Bio */}
            <p className="text-muted-foreground leading-relaxed mb-4 max-w-xl">
              With over 5 years in UX design, I specialize in creating user-centered digital products
              that balance business goals with user needs. My background in psychology helps me
              understand user behavior and motivations.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-xl">
              I believe great design is invisible — it solves problems so elegantly that users
              don't even notice the complexity underneath.
            </p>

            {/* Credentials — styled like Figma's design-panel property rows */}
            <div className="mb-8 rounded-xl border border-border bg-background/60 overflow-hidden">
              <div
                className="border-b border-border px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground"
                style={{ fontFamily: "'Inter', sans-serif" }}
                aria-hidden="true"
              >
                Properties
              </div>
              {[
                { prop: 'Mentor', title: 'Now mentoring the next wave of UX talent', desc: 'Coach 3–5 UX professionals on design craft and career growth, and lead design critiques and quality reviews across the team.' },
                { prop: 'Craft', title: 'Practitioner, not just a designer', desc: 'Every method I use, I actively apply — in real products, with real teams and users.' },
                { prop: 'Range', title: 'Enterprise + startup experience', desc: "I've worked across healthcare, AI platforms, and consumer products — so you get nuanced, context-aware design." },
                { prop: 'Systems', title: 'Design systems advocate', desc: 'Built token-based design systems that improved consistency by 40% and reduced dev time by 15%.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 border-b border-border/60 px-4 py-4 last:border-b-0">
                  <span
                    className="mt-0.5 inline-flex h-6 items-center rounded px-2 text-[10px] font-semibold uppercase tracking-wide flex-shrink-0"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      backgroundColor: 'color-mix(in srgb, var(--figma-blue) 12%, transparent)',
                      color: 'var(--figma-blue)',
                    }}
                    aria-hidden="true"
                  >
                    {item.prop}
                  </span>
                  <div>
                    <p className="font-bold text-sm mb-1" style={montserrat}>{item.title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigateTo('about')}
                className="no-underline inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold rounded-full bg-accent hover:opacity-90 transition-all duration-300 shadow-md"
                style={{ ...montserrat, color: 'var(--accent-foreground)' }}
                aria-label="Read the full bio"
              >
                Full Bio
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
              <a
                href="https://www.linkedin.com/in/divyansh98sharma"
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Connect on LinkedIn"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
                </svg>
                Connect on LinkedIn
              </a>
              <a
                href="/resume.pdf"
                download="Divyansh-Sharma-Resume.pdf"
                onClick={() => {
                  void import('../lib/engagement').then((m) => m.trackResumeDownload(getClientId()))
                }}
                className="no-underline inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Download resume as PDF"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
