import { lazy, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeProvider } from './components/ThemeProvider'
import { Router, useRouter } from './components/Router'
import { HomePage } from './components/HomePage'
import { caseStudyContent } from './data/case-studies'

import { Footer } from './components/Footer'
import { LayersProvider } from './components/chrome/LayersContext'
import { FigmaTopBar } from './components/chrome/FigmaTopBar'
import { LayersPanel } from './components/chrome/LayersPanel'
import { StatusBar } from './components/chrome/StatusBar'
import { ToolEffects } from './components/chrome/tools/ToolEffects'
import { CommentTool } from './components/chrome/tools/CommentTool'
import { BootLoader } from './components/chrome/BootLoader'
import { MultiplayerCursors } from './components/chrome/MultiplayerCursors'
import { SkeletonLoader } from './components/SkeletonLoader'
import { useMediaQuery } from './hooks/useMediaQuery'
import { useReducedMotion } from './hooks/useReducedMotion'
import { DESKTOP_CHROME_QUERY } from './lib/chrome'

// Secondary routes are code-split; the skeleton shows while a chunk loads.
const AllCaseStudies = lazy(() =>
  import('./components/AllCaseStudies').then((m) => ({ default: m.AllCaseStudies }))
)
const CaseStudyLayout = lazy(() =>
  import('./components/case-studies/CaseStudyLayout').then((m) => ({ default: m.CaseStudyLayout }))
)

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
}

function AppContent() {
  const { currentPage } = useRouter()
  const isDesktop = useMediaQuery(DESKTOP_CHROME_QUERY)
  const reducedMotion = useReducedMotion()

  const renderMainContent = () => {
    const study = caseStudyContent[currentPage]
    const key = study ? study.id : currentPage === 'all-case-studies' ? 'all-case-studies' : 'home'
    return (
      <motion.div key={key} initial="hidden" animate="visible" exit="exit" variants={pageVariants}>
        {study ? (
          <CaseStudyLayout data={study} />
        ) : currentPage === 'all-case-studies' ? (
          <AllCaseStudies />
        ) : (
          <HomePage />
        )}
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
        className="canvas-dots relative min-h-screen pt-12 lg:pl-60 lg:pb-8"
      >
        <AnimatePresence mode="wait">
          <Suspense fallback={<SkeletonLoader />}>{renderMainContent()}</Suspense>
        </AnimatePresence>
        <Footer />
        {isDesktop && <CommentTool />}
      </main>
      <StatusBar />
      {isDesktop && <ToolEffects />}
      {isDesktop && !reducedMotion && <MultiplayerCursors />}
      <BootLoader />
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
