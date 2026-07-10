import { lazy, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeProvider } from './components/ThemeProvider'
import { Router, useRouter } from './components/Router'
import { HomePage } from './components/HomePage'
import { AllCaseStudies } from './components/AllCaseStudies'
import { CaseStudyLayout } from './components/case-studies/CaseStudyLayout'
import { caseStudyContent } from './data/case-studies'

import { Footer } from './components/Footer'
import { LayersProvider } from './components/chrome/LayersContext'
import { FigmaTopBar } from './components/chrome/FigmaTopBar'
import { LayersPanel } from './components/chrome/LayersPanel'
import { StatusBar } from './components/chrome/StatusBar'
import { SkeletonLoader } from './components/SkeletonLayer'

// Lazy load route-based components for better performance
const About = lazy(() => import('./components/About'))
const Experience = lazy(() => import('./components/Experience'))
const BuiltFor = lazy(() => import('./components/BuiltFor'))
const Testimonials = lazy(() => import('./components/Testimonials'))
const Contact = lazy(() => import('./components/Contact'))
const Process = lazy(() => import('./components/Process'))

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
}

function AppContent() {
  const { currentPage } = useRouter()

  const renderMainContent = () => {
    const study = caseStudyContent[currentPage as keyof typeof caseStudyContent]
    if (study) {
      return (
        <motion.div
          key={study.id}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={pageVariants}
        >
          <CaseStudyLayout data={study} />
        </motion.div>
      )
    }
    if (currentPage === 'all-case-studies') {
      return (
        <motion.div
          key="all-case-studies"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={pageVariants}
        >
          <AllCaseStudies />
        </motion.div>
      )
    }
    return (
      <motion.div
        key="home"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={pageVariants}
      >
        <HomePage />
      </motion.div>
    )
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
        <AnimatePresence>
          <Suspense fallback={<SkeletonLoader />}>
            {renderMainContent()}
          </Suspense>
        </AnimatePresence>
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