import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

const experiences = [
  {
    company: 'eClinicalWorks',
    role: 'Usability Specialist (UI/UX Designer)',
    period: 'Jan 2023 – Present',
    location: 'Ahmedabad, India',
    description: 'Leading end-to-end design processes for healthcare technology solutions, driving significant improvements in user engagement and system usability across multiple product initiatives.',
    achievements: [
      'Directed end-to-end design processes, driving a 30% boost in user engagement across projects',
      'Created and launched a token-based design system, improving design consistency by 40% and reducing dev time by 15%',
      'Revamped the company\'s design framework, boosting usability scores by 25%',
      'Led diverse user research methods, improving UX processes by 20% and increasing user satisfaction by 25%',
      'Collaborated with product & engineering teams, streamlining workflows and cutting development cycles by 15%',
      'Recruited and onboarded new designers, increasing team efficiency by 20%'
    ]
  },
  {
    company: 'Peak.ai (now UiPath)',
    role: 'Associate Product Designer',
    period: 'Jan 2021 – Dec 2022',
    location: 'Jaipur, India',
    description: 'Designed comprehensive AI-powered solutions for enterprise clients, establishing design systems and creating data-driven interfaces that significantly improved user experience and business outcomes.',
    achievements: [
      'Established a design system library with Storybook, boosting consistency by 30%',
      'Designed dashboards (Distribution, List Price Optimization, On-site Personalization), driving 40% category growth',
      'Spearheaded UX for Segment Explorer, Product Explorer, and Merchandiser, increasing satisfaction by 25%',
      'Reduced user onboarding time by 20% through improved onboarding & RBAC testing',
      'Revamped navigation & homepage, resulting in a 35% increase in engagement',
      'Partnered with stakeholders to design 8+ features, increasing retention by 15%'
    ]
  }
]

export function Experience() {
  return (
    <section id="experience" className="py-16 sm:py-20 px-4 sm:px-6 bg-muted/30">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl mb-12 sm:mb-16 text-center tracking-tight">
            Work Experience
          </h2>
          
          <div className="space-y-12 sm:space-y-16">
            {experiences.map((exp, index) => (
              <div key={index} className="group">
                <div className="border-l-2 border-primary/20 pl-6 sm:pl-8 hover:border-primary/40 transition-colors duration-300">
                  {/* Header */}
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
                    <div className="space-y-1">
                      <h3 className="text-xl sm:text-2xl tracking-tight group-hover:text-primary transition-colors duration-200">
                        {exp.role}
                      </h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <p className="text-base sm:text-lg text-muted-foreground">
                          {exp.company}
                        </p>
                        {exp.location && (
                          <>
                            <span className="hidden sm:inline text-muted-foreground/40 text-sm">•</span>
                            <span className="text-sm text-muted-foreground/80">
                              {exp.location}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="inline-flex items-center px-3 py-1 bg-muted/50 text-muted-foreground text-xs sm:text-sm rounded-md border border-border/30 font-medium shrink-0">
                      {exp.period}
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-muted-foreground mb-6 sm:mb-8 leading-relaxed max-w-3xl text-sm sm:text-base">
                    {exp.description}
                  </p>
                  
                  {/* Achievements */}
                  <div className="space-y-2 sm:space-y-3">
                    {exp.achievements.map((achievement, achIndex) => (
                      <div key={achIndex} className="flex items-start gap-3 py-1 sm:py-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                          {achievement}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}