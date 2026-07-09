import profilePhoto from 'figma:asset/3f12db942eb596cb7c744a13790a87207de8db2c.png'
import { ArrowRight, Check } from 'lucide-react'
import { useFrameReveal } from './chrome/Frame'

const montserrat = { fontFamily: "'Montserrat', sans-serif" }

export function About() {
  const isVisible = useFrameReveal()

  return (
    <div className="section-pad bg-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="about-grid">
          {/* Photo */}
          <div className={`flex flex-col items-center gap-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="w-56 h-64 sm:w-64 sm:h-72 rounded-2xl overflow-hidden shadow-xl" style={{ filter: 'grayscale(0.8)' }}>
              <img
                src={profilePhoto}
                alt="Divyansh Sharma - UX Designer"
                className="w-full h-full object-cover"
                width={256}
                height={288}
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 448 512" aria-hidden="true"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.52 0 53.4 0 23.27 24.09-1.3 53.79-1.3c29.32 0 53.79 24.57 53.79 54.7 0 30.12-24.47 54.7-53.79 54.7zM447.9 448h-92.1V304.1c0-34.3-12.3-57.7-43.1-57.7-23.5 0-37.6 15.8-43.7 31.1-2.2 5.2-2.8 12.4-2.8 19.7V448h-92.2s1.2-270.1 0-299.1h92.1v42.4c12.2-18.9 34.1-45.8 83.1-45.8 60.7 0 105.8 39.7 105.8 125.1V448z"/></svg>
              <span>Growing</span>
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
            <h2 id="about-heading" className="leading-[1.1] tracking-tight mb-6" style={{ ...montserrat, fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
              Senior UX Designer.
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

            {/* Credential bullets — like Ishdeep's */}
            <div className="space-y-4 mb-8">
              {[
                { title: 'Practitioner, not just a designer', desc: 'Every method I use, I actively apply — in real products, with real teams and users.' },
                { title: 'Enterprise + startup experience', desc: "I've worked across healthcare, AI platforms, and consumer products — so you get nuanced, context-aware design." },
                { title: 'Design systems advocate', desc: 'Built token-based design systems that improved consistency by 40% and reduced dev time by 15%.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 py-4 px-5 rounded-xl bg-background/60 border border-border/40">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-accent" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-bold text-sm mb-1" style={montserrat}>{item.title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://www.linkedin.com/in/divyansh98sharma"
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold rounded-full bg-accent hover:opacity-90 transition-all duration-300 shadow-md"
                style={{ ...montserrat, color: 'var(--accent-foreground)' }}
              >
                Full Bio
                <ArrowRight className="h-4 w-4 ml-2" />
              </a>
              <a
                href="https://www.linkedin.com/in/divyansh98sharma"
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 448 512" aria-hidden="true"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.52 0 53.4 0 23.27 24.09-1.3 53.79-1.3c29.32 0 53.79 24.57 53.79 54.7 0 30.12-24.47 54.7-53.79 54.7zM447.9 448h-92.1V304.1c0-34.3-12.3-57.7-43.1-57.7-23.5 0-37.6 15.8-43.7 31.1-2.2 5.2-2.8 12.4-2.8 19.7V448h-92.2s1.2-270.1 0-299.1h92.1v42.4c12.2-18.9 34.1-45.8 83.1-45.8 60.7 0 105.8 39.7 105.8 125.1V448z"/></svg>
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
