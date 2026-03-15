import { Heart } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-6 sm:py-8 px-4 sm:px-6 border-t border-border" role="contentinfo">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div className="text-muted-foreground text-sm sm:text-base text-center sm:text-left">
            <span aria-label={`Copyright ${currentYear} Divyansh Sharma, all rights reserved`}>
              &copy; {currentYear} Divyansh Sharma. All rights reserved.
            </span>
          </div>
          <div className="text-muted-foreground text-xs sm:text-sm text-center sm:text-right flex items-center gap-1">
            <span>Designed & developed with</span>
            <Heart className="h-3 w-3 text-red-500 fill-red-500 inline-block" aria-label="love" />
          </div>
        </div>
      </div>
    </footer>
  )
}
