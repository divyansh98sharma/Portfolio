import { ThemeProvider } from './components/ThemeProvider'
import { Router, useRouter } from './components/Router'
import { Header } from './components/Header'
import { HomePage } from './components/HomePage'
import { AllCaseStudies } from './components/AllCaseStudies'
import { CaseStudyOne } from './components/case-studies/CaseStudyOne'
import { CaseStudyTwo } from './components/case-studies/CaseStudyTwo'
import { CaseStudyThree } from './components/case-studies/CaseStudyThree'

import { Footer } from './components/Footer'
import { ScrollToTop } from './components/ScrollToTop'

function AppContent() {
  const { currentPage } = useRouter()

  const renderMainContent = () => {
    switch (currentPage) {
      case 'all-case-studies':
        return <AllCaseStudies />
      case 'case-study-1':
        return <CaseStudyOne />
      case 'case-study-2':
        return <CaseStudyTwo />
      case 'case-study-3':
        return <CaseStudyThree />

      case 'home':
      default:
        return <HomePage />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content" tabIndex={-1}>
        {renderMainContent()}
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="portfolio-theme">
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  )
}