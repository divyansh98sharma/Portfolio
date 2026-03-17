import { ArrowDown } from 'lucide-react'
import { Button } from './ui/button'
import { scrollToSection } from './utils/scrollToSection'
import { TypewriterText } from './TypewriterText'

export function Hero() {
  return (
    <section className="min-h-screen flex items-start justify-center px-4 sm:px-6 pt-20 sm:pt-24 md:pt-32 lg:pt-40 relative overflow-hidden" aria-labelledby="hero-heading">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30" />

        {/* Floating geometric shapes - Hidden on mobile for cleaner look */}
        <div className="hidden sm:block absolute top-20 left-4 lg:left-10 w-16 lg:w-20 h-16 lg:h-20 rounded-full bg-primary/5 hero-float-1" />
        <div className="hidden sm:block absolute top-40 right-4 lg:right-20 w-12 lg:w-16 h-12 lg:h-16 bg-primary/10 hero-float-2" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
        <div className="hidden sm:block absolute bottom-40 left-4 lg:left-20 w-10 lg:w-12 h-10 lg:h-12 rounded-full bg-primary/8 hero-float-3" />
        <div className="hidden sm:block absolute bottom-60 right-4 lg:right-10 w-20 lg:w-24 h-20 lg:h-24 bg-primary/5 hero-float-4" style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }} />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
             style={{
               backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
               backgroundSize: '60px 60px',
               maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 70%)',
               WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 70%)'
             }} />
      </div>

      <div className="container mx-auto text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10">
          <div className="space-y-6 sm:space-y-8">
            {/* Name with enhanced styling */}
            <div className="space-y-3 sm:space-y-4">
              <div className="inline-block py-2 hero-animate-in hero-delay-1">
                <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-2 tracking-wide">
                  Hi, I'm
                </p>
                <h1 id="hero-heading" className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-medium bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent leading-tight pb-2 sm:pb-3">
                  Divyansh Sharma
                </h1>
              </div>

              <div className="relative hero-animate-in hero-delay-2">
                <p className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-muted-foreground/90 mb-6 sm:mb-8 min-h-[3rem] sm:min-h-[4rem] md:min-h-[5rem]" aria-live="polite">
                  <TypewriterText
                    texts={['UX Designer', 'UI Designer', 'Usability Specialist']}
                  />
                </p>
                {/* Decorative underline */}
                <div className="w-20 sm:w-24 h-1 bg-primary mx-auto rounded-full opacity-60" />
              </div>
            </div>

            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4 sm:px-0 hero-animate-in hero-delay-3">
              I craft meaningful digital experiences through research-driven design,
              turning complex problems into intuitive solutions that users love.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pt-4 px-4 sm:px-0 hero-animate-in hero-delay-4">
            <Button
              onClick={() => scrollToSection('case-studies')}
              size="lg"
              className="w-full sm:w-auto min-w-[164px] shadow-lg hover:shadow-xl transition-all duration-300"
              aria-label="View my design work and case studies"
            >
              <ArrowDown className="h-4 w-4 mr-2" aria-hidden="true" />
              View My Work
            </Button>
            <Button
              variant="outline"
              onClick={() => scrollToSection('contact')}
              size="lg"
              className="w-full sm:w-auto min-w-[164px] shadow-sm hover:shadow-md transition-all duration-300"
              aria-label="Go to contact section to get in touch"
            >
              Get In Touch
            </Button>
          </div>

          <div className="flex justify-center pt-24 sm:pt-32 hero-bounce-limited">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scrollToSection('about')}
              className="rounded-full hover:bg-primary/10 transition-colors duration-300"
              aria-label="Scroll down to about section"
            >
              <ArrowDown className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Scroll to next section</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
