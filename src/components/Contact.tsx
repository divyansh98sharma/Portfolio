import { ArrowRight, Download, Mail } from 'lucide-react'
import { useFrameReveal } from './chrome/Frame'
import { getClientId } from '../lib/identity'

const montserrat = { fontFamily: "'Montserrat', sans-serif" }
const inter = { fontFamily: "'Inter', sans-serif" }

/** Direct professional contact replaces the consulting intake form. */
export function Contact() {
  const isVisible = useFrameReveal()
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="section-pad">
        <div className="mx-auto max-w-6xl">
          <div className={`cta-grid transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div>
              <h2 id="contact-heading" className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl" style={montserrat}>Let's talk.</h2>
              <p className="max-w-md leading-relaxed text-primary-foreground/70">The fastest way to reach me is email.</p>
              <p className="mt-6 text-sm text-primary-foreground/70">Friends of Figma, Ahmedabad — event host &amp; organizer</p>
            </div>
            <div className="overflow-hidden rounded-2xl bg-white p-6 text-black shadow-2xl" style={inter}>
              <p className="mb-5 border-b border-black/10 pb-4 text-sm font-semibold">Get in touch</p>
              <a href="mailto:work.divyanshsharma@gmail.com" className="no-underline flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-black hover:bg-black/5">
                <Mail className="h-4 w-4" aria-hidden="true" /> work.divyanshsharma@gmail.com
              </a>
              <a href="https://www.linkedin.com/in/divyansh98sharma" target="_blank" rel="noopener noreferrer" className="no-underline mt-2 flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm text-black hover:bg-black/5">
                LinkedIn <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href="https://medium.com/@divyansh98sharma" target="_blank" rel="noopener noreferrer" className="no-underline mt-2 block rounded-lg px-3 py-3 text-sm text-black hover:bg-black/5">
                Healthcare Design Is Where Consumer UX Instincts Break — Medium, 2026
              </a>
              <a
                href="/resume.pdf"
                download="Divyansh-Sharma-Resume.pdf"
                onClick={() => { void import('../lib/engagement').then(m => m.trackResumeDownload(getClientId())) }}
                className="no-underline mt-5 flex min-h-11 items-center justify-between rounded-lg border border-black/10 px-4 py-3 text-sm text-black hover:border-black/25"
              >
                <span className="flex items-center gap-2"><Download className="h-4 w-4" aria-hidden="true" /> Export divyansh-resume.pdf</span>
                <span className="text-xs text-black/65">PDF</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
