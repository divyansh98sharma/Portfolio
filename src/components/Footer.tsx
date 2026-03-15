export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="py-6 sm:py-8 px-4 sm:px-6 border-t border-border" role="contentinfo">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div className="text-muted-foreground text-sm sm:text-base text-center sm:text-left">
            <span aria-label={`Copyright ${currentYear} Divyansh Sharma, all rights reserved`}>
              © {currentYear} Divyansh Sharma. All rights reserved.
            </span>
          </div>
          <div className="text-muted-foreground text-xs sm:text-sm text-center sm:text-right">
            <span aria-label="Designed and developed with love">
              Designed & developed with <span aria-label="love">❤️</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}