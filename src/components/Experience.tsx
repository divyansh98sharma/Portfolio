import { useFrameReveal } from './chrome/Frame'

const montserrat = { fontFamily: "'Montserrat', sans-serif" }

const experiences = [
  {
    company: 'eClinicalWorks',
    role: 'Usability Specialist (UI/UX Designer)',
    period: 'Jan 2023 – Present',
    location: 'Ahmedabad, India',
    description: 'Leading end-to-end design processes for healthcare technology solutions, driving significant improvements in user engagement and system usability.',
    achievements: [
      'Directed end-to-end design, driving a 30% boost in user engagement',
      'Created a token-based design system, improving consistency by 40%',
      'Revamped the design framework, boosting usability scores by 25%',
      'Led diverse user research methods, improving UX processes by 20%',
      'Streamlined workflows, cutting development cycles by 15%',
      'Recruited and onboarded new designers, increasing team efficiency by 20%'
    ]
  },
  {
    company: 'Peak.ai (now UiPath)',
    role: 'Associate Product Designer',
    period: 'Jan 2021 – Dec 2022',
    location: 'Jaipur, India',
    description: 'Designed AI-powered solutions for enterprise clients, establishing design systems and creating data-driven interfaces.',
    achievements: [
      'Established a design system library with Storybook, boosting consistency by 30%',
      'Designed dashboards driving 40% category growth',
      'Spearheaded UX for 3+ explorer products, increasing satisfaction by 25%',
      'Reduced user onboarding time by 20% through improved flows',
      'Revamped navigation & homepage, 35% increase in engagement',
      'Designed 8+ features, increasing retention by 15%'
    ]
  }
]

export function Experience() {
  const isVisible = useFrameReveal()

  return (
    <div className="section-pad bg-secondary">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-muted-foreground" />
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider" style={montserrat}>Work Experience</p>
          </div>
          <h2 id="experience-heading" className="leading-[1.1] tracking-tight" style={{ ...montserrat, fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            Where I've made{' '}
            <span className="italic" style={{ fontWeight: 300, color: 'var(--muted-foreground)' }}>an impact.</span>
          </h2>
        </div>

        {/* Version history — each role is a saved version of the designer */}
        <div className="relative space-y-8 lg:pl-10">
          {/* timeline rail */}
          <div
            className="absolute left-[7px] top-4 bottom-4 hidden w-px lg:block"
            style={{ backgroundColor: 'var(--border)' }}
            aria-hidden="true"
          />
          {experiences.map((exp, index) => (
            <div key={index} className="relative">
              {/* version dot */}
              <span
                className="absolute -left-10 top-8 hidden h-[15px] w-[15px] rounded-full border-[3px] lg:block"
                style={{
                  backgroundColor: index === 0 ? 'var(--figma-blue)' : 'var(--card)',
                  borderColor: index === 0 ? 'var(--figma-blue)' : 'var(--muted-foreground)',
                  transform: 'translateX(-0.5px)',
                }}
                aria-hidden="true"
              />
              <div
                className={`group bg-card rounded-2xl border border-border overflow-hidden card-hover transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: isVisible ? `${index * 200}ms` : '0ms' }}
              >
                {/* Version header */}
                <div
                  className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-border px-6 py-2.5 text-[11px] sm:px-8"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  aria-hidden="true"
                >
                  <span
                    className="rounded px-1.5 py-0.5 font-semibold"
                    style={{
                      backgroundColor: index === 0 ? 'color-mix(in srgb, var(--figma-blue) 12%, transparent)' : 'var(--secondary)',
                      color: index === 0 ? 'var(--figma-blue)' : 'var(--muted-foreground)',
                    }}
                  >
                    {index === 0 ? 'v2.0 · Current' : `v1.${experiences.length - 1 - index}`}
                  </span>
                  <span className="text-muted-foreground">{exp.period}</span>
                  <span className="text-muted-foreground/60">· Saved by Divyansh</span>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6 gap-3">
                    <div>
                      <h3 className="text-xl sm:text-2xl tracking-tight mb-1" style={{ ...montserrat, fontWeight: 700 }}>
                        {exp.role}
                      </h3>
                      <p className="text-muted-foreground">
                        {exp.company}
                        <span className="mx-2 text-muted-foreground/40">&middot;</span>
                        <span className="text-sm">{exp.location}</span>
                      </p>
                    </div>
                    <span className="inline-flex px-4 py-1.5 bg-secondary rounded-full text-xs font-semibold text-muted-foreground shrink-0" style={montserrat}>
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-muted-foreground mb-6 leading-relaxed text-sm sm:text-base">{exp.description}</p>

                  <div className="achievements-grid">
                    {exp.achievements.map((achievement, achIndex) => (
                      <div key={achIndex} className="flex items-start gap-3 py-2 px-3 rounded-lg hover:bg-secondary/50 transition-colors duration-200">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                        <p className="text-muted-foreground text-sm leading-relaxed">{achievement}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
