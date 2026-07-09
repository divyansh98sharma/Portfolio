import { Mail, ArrowRight, Check } from 'lucide-react'
import { useFrameReveal } from './chrome/Frame'

const montserrat = { fontFamily: "'Montserrat', sans-serif" }

export function Contact() {
  const isVisible = useFrameReveal()

  return (
    <div className="bg-primary text-primary-foreground">
      {/* CTA Section — split layout like Ishdeep's */}
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
                starts with a{' '}
                <span className="italic" style={{ fontWeight: 300, color: 'var(--accent)' }}>
                  conversation.
                </span>
              </h2>
              <p className="text-primary-foreground/70 max-w-md leading-relaxed">
                No sales pitch. Just an honest conversation about where you are,
                where you want to be, and how design can get you there faster.
              </p>
            </div>

            {/* Right */}
            <div className="bg-primary-foreground/10 rounded-2xl p-8 backdrop-blur-sm border border-primary-foreground/10">
              <div className="space-y-4 mb-8">
                {[
                  'Portfolio walkthrough',
                  'Design process deep-dive',
                  'No commitment required',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-accent flex-shrink-0" />
                    <span className="text-sm text-primary-foreground/90">{item}</span>
                  </div>
                ))}
              </div>

              <a
                href="mailto:work.divyanshsharma@gmail.com"
                className="no-underline flex items-center justify-center w-full px-8 py-3.5 text-sm font-bold rounded-full bg-accent hover:opacity-90 transition-all duration-300 shadow-lg mb-4"
                style={{ ...montserrat, color: 'var(--accent-foreground)' }}
                aria-label="Send email"
              >
                <Mail className="h-4 w-4 mr-2" />
                Send an Email
                <ArrowRight className="h-4 w-4 ml-2" />
              </a>

              <p className="text-center text-xs text-primary-foreground/50">
                Or connect on{' '}
                <a href="https://www.linkedin.com/in/divyansh98sharma" target="_blank" rel="noopener noreferrer" className="no-underline text-accent hover:underline font-medium">
                  LinkedIn
                </a>
                {' '}to chat directly
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* LinkedIn bar — like Ishdeep's */}
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
