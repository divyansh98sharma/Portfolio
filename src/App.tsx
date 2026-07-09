import { ThemeProvider } from './components/ThemeProvider'
import { Router, useRouter } from './components/Router'
import { HomePage } from './components/HomePage'
import { AllCaseStudies } from './components/AllCaseStudies'
import { CaseStudyOne } from './components/case-studies/CaseStudyOne'
import { CaseStudyTwo } from './components/case-studies/CaseStudyTwo'
import { CaseStudyThree } from './components/case-studies/CaseStudyThree'

import { Footer } from './components/Footer'
import { LayersProvider } from './components/chrome/LayersContext'
import { FigmaTopBar } from './components/chrome/FigmaTopBar'
import { LayersPanel } from './components/chrome/LayersPanel'
import { StatusBar } from './components/chrome/StatusBar'

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
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-background focus:px-4 focus:py-2 focus:rounded-md focus:ring-2 focus:ring-ring focus:text-foreground focus:shadow-lg"
      >
        Skip to main content
      </a>
      <FigmaTopBar />
      <LayersPanel />
      <main
        id="main-content"
        tabIndex={-1}
        className="canvas-dots min-h-screen pt-12 lg:pl-60 lg:pb-8"
      >
        {renderMainContent()}
        <Footer />
      </main>
      <StatusBar />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <LayersProvider>
        <Router>
          <AppContent />
        </Router>
      </LayersProvider>
    </ThemeProvider>
  )
}