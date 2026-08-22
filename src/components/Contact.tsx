import { useRef, useState, type FormEvent } from 'react'
import { Mail, ArrowRight, Check, Download, Loader2, AlertCircle } from 'lucide-react'
import { useFrameReveal } from './chrome/Frame'
import { getClientId } from '../lib/identity'

const montserrat = { fontFamily: "'Montserrat', sans-serif" }
const inter = { fontFamily: "'Inter', sans-serif" }

// Cloud Run function (functions/index.js) deployed via GCP Console's "Write a
// function" flow, with a RESEND_API_KEY secret bound to it. Submissions email
// straight to you via Resend — nothing is stored publicly the way
// comments/reactions are.
const FORM_ENDPOINT = 'https://send-contact-email-45481375965.us-central1.run.app'

const SERVICES = [
  'Fractional / contract UX design',
  'Design systems audit',
  '1:1 mentorship',
  'Something else',
]

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function Contact() {
  const isVisible = useFrameReveal()
  const [status, setStatus] = useState<Status>('idle')
  const formStartedAt = useRef(Date.now())

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      })
      if (res.ok) {
        setStatus('sent')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

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
                style={{ ...montserrat, fontWeight: 800, fontSize: 'clamp(2rem, calc(4vw * var(--canvas-zoom, 1)), 3.2rem)' }}
              >
                Your next great design
                <br />
                starts with a{' '}
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
                <p className="text-[14px] font-semibold" style={inter}>Start a project</p>
                <span className="text-black/30 text-lg leading-none" aria-hidden="true">✕</span>
              </div>

              <div className="px-6 py-5">
                {status === 'sent' ? (
                  <div className="flex flex-col items-center gap-3 border-b border-black/10 py-6 pb-5 text-center">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-full"
                      style={{ backgroundColor: 'color-mix(in srgb, var(--figma-blue) 12%, transparent)' }}
                    >
                      <Check className="h-5 w-5" style={{ color: 'var(--figma-blue)' }} aria-hidden="true" />
                    </span>
                    <p className="text-[13px] font-semibold text-black/80">Sent — I'll get back to you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-2.5 border-b border-black/10 pb-5">
                    {/* Silent bot checks. Kept out of the visual and keyboard flow. */}
                    <div
                      aria-hidden="true"
                      className="absolute -left-[10000px] h-px w-px overflow-hidden"
                    >
                      <label htmlFor="contact-website">Website</label>
                      <input
                        id="contact-website"
                        name="website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>
                    <input
                      name="formStartedAt"
                      type="hidden"
                      value={formStartedAt.current}
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        name="name"
                        required
                        placeholder="Your name"
                        className="h-10 rounded-lg border border-black/15 bg-black/[0.03] px-3 text-[13px] outline-none focus:border-black/30"
                        style={inter}
                      />
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="Email"
                        className="h-10 rounded-lg border border-black/15 bg-black/[0.03] px-3 text-[13px] outline-none focus:border-black/30"
                        style={inter}
                      />
                    </div>
                    <select
                      name="service"
                      required
                      defaultValue=""
                      className="h-10 w-full rounded-lg border border-black/15 bg-black/[0.03] px-3 text-[13px] text-black/70 outline-none focus:border-black/30"
                      style={inter}
                    >
                      <option value="" disabled>
                        What do you need help with?
                      </option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <textarea
                      name="message"
                      required
                      rows={3}
                      placeholder="A bit about your project or goals"
                      className="w-full resize-none rounded-lg border border-black/15 bg-black/[0.03] px-3 py-2 text-[13px] outline-none focus:border-black/30"
                      style={inter}
                    />
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="flex h-10 w-full items-center justify-center gap-2 rounded-lg text-[13px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                      style={{ backgroundColor: 'var(--figma-blue)' }}
                    >
                      {status === 'sending' ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                          Send
                        </>
                      )}
                    </button>
                    {status === 'error' && (
                      <p className="flex items-center gap-1.5 text-[11px]" style={{ ...inter, color: '#dc2626' }}>
                        <AlertCircle className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
                        Something went wrong — email me directly instead.
                      </p>
                    )}
                  </form>
                )}

                {/* export row — the resume */}
                <a
                  href="/resume.pdf"
                  download="Divyansh-Sharma-Resume.pdf"
                  onClick={() => {
                    void import('../lib/engagement').then((m) => m.trackResumeDownload(getClientId()))
                  }}
                  className="no-underline mt-4 flex items-center justify-between rounded-lg border border-black/10 px-4 py-3 transition-colors hover:border-black/25"
                  aria-label="Download resume as PDF"
                >
                  <span className="flex items-center gap-2.5 text-[13px] font-medium text-black/70">
                    <Download className="h-3.5 w-3.5" style={{ color: 'var(--figma-blue)' }} aria-hidden="true" />
                    Export divyansh-resume.pdf
                  </span>
                  <span className="text-[11px] text-black/40">PDF · 1x</span>
                </a>

                <p className="mt-4 text-center text-[11px] text-black/40">
                  Or connect on{' '}
                  <a
                    href="https://www.linkedin.com/in/divyansh98sharma"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-underline font-medium hover:underline"
                    style={{ color: 'var(--figma-blue)' }}
                  >
                    LinkedIn
                  </a>{' '}
                  to chat directly
                </p>
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
            className="no-underline inline-flex items-center px-5 py-2.5 text-xs font-bold rounded-full border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-all duration-300"
            style={montserrat}
          >
            Follow on LinkedIn
            <ArrowRight className="h-3 w-3 ml-2" />
          </a>
        </div>
      </div>
    </div>
  )
}
