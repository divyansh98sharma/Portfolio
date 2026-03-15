import profilePhoto from 'figma:asset/3f12db942eb596cb7c744a13790a87207de8db2c.png'

export function About() {
  return (
    <section id="about" className="py-16 sm:py-20 px-4 sm:px-6" aria-labelledby="about-heading">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <h2 id="about-heading" className="text-3xl md:text-4xl mb-12 text-center">
            About Me
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 order-2 md:order-1">
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                With over 5 years of experience in UX design, I specialize in creating 
                user-centered digital products that balance business goals with user needs. 
                My background in psychology helps me understand user behavior and motivations.
              </p>
              
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                I believe great design is invisible – it solves problems so elegantly 
                that users don't even notice the complexity underneath. Every pixel 
                has a purpose, and every interaction tells a story.
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="mb-3 text-lg">Skills</h3>
                  <div className="flex flex-wrap gap-2" role="list" aria-label="Design skills">
                    {[
                      'User Research',
                      'Prototyping',
                      'Wireframing',
                      'Usability Testing',
                      'Design Systems',
                      'Information Architecture',
                      'Figma',
                      'Adobe Creative Suite'
                    ].map((skill) => (
                      <span 
                        key={skill}
                        className="px-3 py-2 bg-muted text-muted-foreground rounded-full text-sm font-medium"
                        role="listitem"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center order-1 md:order-2">
              <div className="w-48 h-64 sm:w-56 sm:h-72 md:w-64 md:h-80 rounded-lg overflow-hidden border-4 border-border shadow-lg">
                <img 
                  src={profilePhoto}
                  alt="Divyansh Sharma - UX Designer professional headshot"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}