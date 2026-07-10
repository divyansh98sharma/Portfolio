import { Mail, ArrowRight, Check, Globe, Download } from 'lucide-react'
import { useFrameReveal } from './chrome/Frame'
import { useMousePosition } from '../utils/mousePosition'

const montserrat = { fontFamily: "'Montserrat', sans-serif" }
const inter = { fontFamily: "'Inter', sans-serif" }

export function Contact() {
  const isVisible = useFrameReveal()
  const { x, y } = useMousePosition()

  return (
    <div className="bg-primary text-primary-foreground">
      {/* CTA Section — the "Share this file" dialog */}
      <div className="section-pad">
        <div className="max-w-6xl mx-auto">
          <div className={`cta-grid transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Left */}
            <div>
              <h2
                id="contact-heading"
                className="leading-[1.1] tracking-tight mb-6"
                style={{ ...montserrat, fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
              >
                Your next great design
                <br />
                starts with a{' ')
                <span className="italic" style={{ fontWeight: 300, color: 'var(--figma-blue)' }}>
                  conversation.
                </span>
              </h2>
              <p className="text-primary-foreground/70 max-w-md leading-relaxed">
                No sales pitch. Just an honest conversation about where you are,
                where you want to be, and how design can get you there faster.
              </p>
            </div>

            {/* Right — share dialog */}
            <div
              className="overflow-hidden rounded-2xl bg-white text-black shadow-2xl"
              style={inter}
            >
              {/* dialog header */}
              <div className="flex items-center justify-between border-b border-black/10 px-6 py-4">
                <p className="text-[14px] font-semibold" style={inter}>Share this designer</p>
                <span className="text-black/30 text-lg leading-none" aria-hidden="true">✕</span>
              </div>

              <div className="px-6 py-5">
                {/* invite row */}
                <div className="mb-5 flex items-center gap-2">
                  <div className="flex h-10 flex-1 items-center rounded-lg border border-black/15 bg-black/[0.03] px-3 text-[13px] text-black/50">
                    work.divyanshsharma@gmail.com
                  </div>
                  <a
                    href="mailto:work.divyanshsharma@gmail.com"
                    className={`no-underline flex h-10 items-center rounded-lg px-4 text-[13px] font-semibold text-white transition-opacity hover:opacity-90
                    relative overflow-hidden`}
                    style={{ backgroundColor: 'var(--figma-blue)' }}
                    aria-label="Send email"
                  >
                    <span className="relative z-10">
                      <Mail className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
                      Invite
                    </span>
                    <span className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(255,255,255,0.1),transparent)]
                              pointer-events-none opacity-0 transition-opacity duration-500"/>
                  </a>

                  {/* what you get */}
                  <div className="space-y-3 border-b border-black/10 pb-5">
                    {[
                      'Portfolio walkthrough',
                      'Design process deep-dive',
                      'No commitment required',
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span
                          className="flex h-5 w-5 items-center justify-center rounded-full"
                          style={{ backgroundColor: 'color-mix(in srgb, var(--figma-blue) 12%, transparent)' }}
                        >
                          <Check className="h-3 w-3" style={{ color: 'var(--figma-blue)' }} aria-hidden="true" />
                        </span>
                        <span className="text-[13px] text-black/70">{item}</span>
                      </div>
                    ))}
                  ))}

                  {/* access row */}
                  <div className="flex items-center justify-between pt-4 text-[12px] text-black/50">
                    <span className="flex items-center gap-2">
                      <Globe className="h-3.5 w-3.5" aria-hidden="true" />
                      Anyone with the link
                    </span>
                    <span className="flex items-center gap-1 font-medium text-black/70">
                      can hire ▾
                    </span>
                  </div>

                  <p className="mt-4 text-center text-[11px] text-black/40">
                    Or connect on{' '}
                    <a
                      href="https://www.linkedin.com/in/divyansh98sharma"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`no-underline font-medium hover:underline
                      relative overflow-hidden`}
                      style={{ color: 'var(--figma-blue)' }}
                    >
                      <span className="relative z-10">LinkedIn</span>
                      <span className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(255,255,255,0.1),transparent)]
                                pointer-events-none opacity-0 transition-opacity duration-500"/>
                      <ArrowRight className="h-3 w-3 ml-2" />
                    </a>{' '}
                    to chat directly
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LinkedIn bar */}
      <div className="border-t border-primary-foreground/10 section-pad-sm">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-primary-foreground/70">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 448 512" aria-hidden="true"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.52 0 53.4 0 23.27 24.09-1.3 53.79-1.3c29.32 0 53.79 24.57 53.79 54.7 0 30.12-24.47 54.7-53.79 54.7zM447.9 448h-92.1V304.1c0-34.3-12.3-57.7-43.1-57.7-23.5 0-37.6 15.8-43.7 31.1-2.2 5.2-2.8 12.4-2.8 19.7V448h-92.2s1.2-270.1 0-299.1h92.1v42.4c12.2-18.9 34.1-45.8 83.1-45.8 60.7 0 105.8 39.7 105.8 125.1V448z"/></svg>
            <span>Follow the UX conversation — Weekly insights on LinkedIn</span>
          </div>
          <a
            href="https://www.linkedin.com/in/divyansh98sharma"
            target="_blank"
            rel="noopener noreferrer"
            className={`no-underline inline-flex items-center px-5 py-2.5 text-xs font-bold rounded-full border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-all duration-300
            relative overflow-hidden`}
            style={montserrat}
          >
            <span className="relative z-10">Follow on LinkedIn</span>
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(255,255,255,0.1),transparent)]
                      pointer-events-none opacity-0 transition-opacity duration-500"/>
            <ArrowRight className="h-3 w-3 ml-2" />
          </a>
          {/* Resume download */}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline inline-flex items-center gap-2 text-sm font-medium text-primary-foreground/70 hover:text-primary-foreground transition-colors"
          >
            <Download className="h-4 w-4" />
            Download Resume
          </a>
        </div>
      </div>
    </div>
  )
}