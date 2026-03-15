import { Heart, Mail } from 'lucide-react'
import { scrollToSection } from './utils/scrollToSection'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const navLinks = [
    { label: 'About', section: 'about' },
    { label: 'Experience', section: 'experience' },
    { label: 'Case Studies', section: 'case-studies' },
    { label: 'Contact', section: 'contact' },
  ]

  return (
    <footer className="relative py-12 sm:py-16 px-4 sm:px-6 border-t border-border overflow-hidden" role="contentinfo">
      {/* Brand watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
        <span className="text-[12rem] sm:text-[16rem] font-bold text-foreground/[0.02] dark:text-foreground/[0.03] leading-none tracking-tighter">
          DS
        </span>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Navigation links */}
          <nav className="flex flex-wrap justify-center gap-6 sm:gap-8" aria-label="Footer navigation">
            {navLinks.map((link) => (
              <button
                key={link.section}
                onClick={() => scrollToSection(link.section)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded px-2 py-1"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex justify-center gap-4">
            <a
              href="mailto:work.divyanshsharma@gmail.com"
              className="no-underline p-2 text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-full hover:bg-accent"
              aria-label="Send email"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/divyansh98sharma"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline p-2 text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-full hover:bg-accent"
              aria-label="LinkedIn profile"
            >
              <svg className="h-4 w-4" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true">
                <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.52 0 53.4 0 23.27 24.09-1.3 53.79-1.3c29.32 0 53.79 24.57 53.79 54.7 0 30.12-24.47 54.7-53.79 54.7zM447.9 448h-92.1V304.1c0-34.3-12.3-57.7-43.1-57.7-23.5 0-37.6 15.8-43.7 31.1-2.2 5.2-2.8 12.4-2.8 19.7V448h-92.2s1.2-270.1 0-299.1h92.1v42.4c12.2-18.9 34.1-45.8 83.1-45.8 60.7 0 105.8 39.7 105.8 125.1V448z"/>
              </svg>
            </a>
            <a
              href="https://medium.com/@divyansh98sharma"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline p-2 text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-full hover:bg-accent"
              aria-label="Medium profile"
            >
              <svg className="h-4 w-4" viewBox="0 0 1043.63 592.71" fill="currentColor" aria-hidden="true">
                <path d="M588.67 296.35c0 163.6-131.69 296.35-294.33 296.35S0 459.95 0 296.35 131.69 0 294.34 0s294.33 132.75 294.33 296.35zM902.8 296.35c0 154.17-65.84 279.12-147.05 279.12s-147.05-124.95-147.05-279.12 65.84-279.12 147.05-279.12 147.05 124.95 147.05 279.12zM1043.63 296.35c0 139.57-23.17 252.68-51.74 252.68s-51.74-113.11-51.74-252.68 23.17-252.68 51.74-252.68 51.74 113.11 51.74 252.68z"/>
              </svg>
            </a>
          </div>

          {/* Divider */}
          <div className="w-12 h-px bg-border mx-auto" aria-hidden="true" />

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <span aria-label={`Copyright ${currentYear} Divyansh Sharma, all rights reserved`}>
              &copy; {currentYear} Divyansh Sharma. All rights reserved.
            </span>
            <span className="flex items-center gap-1">
              Designed & developed with
              <Heart className="h-3 w-3 text-red-500 fill-red-500 inline-block" aria-label="love" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
