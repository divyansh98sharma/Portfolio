import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Mail, Users, Download, BookOpen, GraduationCap, Calendar } from 'lucide-react'

export function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const data = Object.fromEntries(formData.entries())
    
    // Basic validation
    const requiredFields = ['firstName', 'lastName', 'email', 'subject', 'message']
    const missingFields = requiredFields.filter(field => !data[field])
    
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`)
      return
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email as string)) {
      alert('Please enter a valid email address.')
      return
    }
    
    alert('Thank you for your message! I\'ll get back to you within 24 hours.')
  }

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: 'work.divyanshsharma@gmail.com',
      href: 'mailto:work.divyanshsharma@gmail.com',
      description: 'Best for project inquiries'
    },
    {
      icon: Users,
      label: 'LinkedIn',
      value: 'linkedin.com/in/divyanashsharma',
      href: 'https://linkedin.com/in/divyanashsharma',
      description: 'Professional networking',
      external: true
    }
  ]

  const availability = [
    'Full-time opportunities',
    'Freelance projects',
    'Design consultations',
    'UX audits & research'
  ]

  return (
    <section id="contact" className="py-16 sm:py-20 px-4 sm:px-6 bg-muted/30" aria-labelledby="contact-heading">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h2 id="contact-heading" className="text-3xl md:text-4xl tracking-tight">
                Contact
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto text-base sm:text-lg">
                Get in touch to discuss your next project.
              </p>
            </div>
            
            {/* Mobile: Stacked buttons, Desktop: Horizontal */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
              <Button 
                size="lg"
                className="h-12 w-full hover:bg-primary/90 active:bg-primary/80 focus-visible:ring-4 focus-visible:ring-ring/20 transition-all duration-200"
                onClick={() => window.location.href = 'mailto:work.divyanshsharma@gmail.com'}
                aria-label="Send email to work.divyanshsharma@gmail.com"
              >
                <Mail className="h-8 w-8 mr-2" aria-hidden="true" />
                Email
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                className="h-12 w-full border-2 hover:bg-accent hover:border-accent-foreground/20 active:bg-accent/80 active:border-accent-foreground/30 focus-visible:ring-4 focus-visible:ring-ring/20 transition-all duration-200"
                onClick={() => window.open('https://www.linkedin.com/in/divyansh98sharma', '_blank')}
                aria-label="Visit LinkedIn profile at linkedin.com/in/divyansh98sharma"
              >
                <svg 
                  className="h-6 w-6 mr-2" 
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 448 512"
                  fill="currentColor"
                >
                  <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.52 0 53.4 0 23.27 24.09-1.3 53.79-1.3c29.32 0 53.79 24.57 53.79 54.7 0 30.12-24.47 54.7-53.79 54.7zM447.9 448h-92.1V304.1c0-34.3-12.3-57.7-43.1-57.7-23.5 0-37.6 15.8-43.7 31.1-2.2 5.2-2.8 12.4-2.8 19.7V448h-92.2s1.2-270.1 0-299.1h92.1v42.4c12.2-18.9 34.1-45.8 83.1-45.8 60.7 0 105.8 39.7 105.8 125.1V448z"/>
                </svg>
                LinkedIn
              </Button>

              <Button 
                size="lg"
                variant="outline"
                className="h-12 w-full border-2 hover:bg-accent hover:border-accent-foreground/20 active:bg-accent/80 active:border-accent-foreground/30 focus-visible:ring-4 focus-visible:ring-ring/20 transition-all duration-200"
                onClick={() => window.open('https://medium.com/@divyansh98sharma', '_blank')}
                aria-label="Visit Medium profile at medium.com/@divyansh98sharma"
              >
                <svg 
                  className="h-6 w-6 mr-2" 
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 1043.63 592.71"
                  fill="currentColor"
                >
                  <path d="M588.67 296.35c0 163.6-131.69 296.35-294.33 296.35S0 459.95 0 296.35 131.69 0 294.34 0s294.33 132.75 294.33 296.35zM902.8 296.35c0 154.17-65.84 279.12-147.05 279.12s-147.05-124.95-147.05-279.12 65.84-279.12 147.05-279.12 147.05 124.95 147.05 279.12zM1043.63 296.35c0 139.57-23.17 252.68-51.74 252.68s-51.74-113.11-51.74-252.68 23.17-252.68 51.74-252.68 51.74 113.11 51.74 252.68z"/>
                </svg>
                Medium
              </Button>

              <Button 
                size="lg"
                variant="outline"
                className="h-12 w-full border-2 hover:bg-accent hover:border-accent-foreground/20 active:bg-accent/80 active:border-accent-foreground/30 focus-visible:ring-4 focus-visible:ring-ring/20 transition-all duration-200"
                onClick={() => window.open('https://www.interaction-design.org/members/divyansh-sharma-2?r=divyansh-sharma-2', '_blank')}
                aria-label="Visit IxDF profile at interaction-design.org"
              >
                <img 
                  src="https://public-images.interaction-design.org/ixdf-brand/ixdf-logo-symbol-bg-transparent.png" 
                  alt="IxDF logo" 
                  className="h-6 w-6 mr-2" 
                />
                IxDF
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                className="h-12 w-full border-2 hover:bg-accent hover:border-accent-foreground/20 active:bg-accent/80 active:border-accent-foreground/30 focus-visible:ring-4 focus-visible:ring-ring/20 transition-all duration-200"
                onClick={() => {
                  // Direct download link from Google Drive
                  const resumeUrl = 'https://drive.google.com/uc?export=download&id=1iKns9fXX71B5UERPHJofvvYRuz6mqkp8';
                  window.open(resumeUrl, '_blank');
                }}
                aria-label="Download my resume as PDF"
              >
                <Download className="h-6 w-6 mr-2 flex-shrink-0" aria-hidden="true" />
                <span className="hidden sm:inline">Resume</span>
                <span className="sm:hidden">CV</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}