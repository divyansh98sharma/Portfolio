import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { caseStudyContent, type CaseStudyId } from '../data/case-studies'

export type Page = 'home' | 'all-case-studies' | CaseStudyId

type RouterContextType = {
  currentPage: Page
  navigateTo: (page: Page) => void
}

const RouterContext = createContext<RouterContextType | undefined>(undefined)

function getPageFromPath(path: string): Page {
  const clean = path.replace(/^\/|\/$/g, '')
  if (clean === 'all-case-studies') return 'all-case-studies'
  if (clean in caseStudyContent) return clean as CaseStudyId
  return 'home'
}

function getPathFromPage(page: Page): string {
  return page === 'home' ? '/' : `/${page}`
}

export function Router({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>(() =>
    getPageFromPath(window.location.pathname)
  )

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getPageFromPath(window.location.pathname))
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigateTo = (page: Page) => {
    const path = getPathFromPage(page)
    window.history.pushState(null, '', path)
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  return (
    <RouterContext.Provider value={{ currentPage, navigateTo }}>
      {children}
    </RouterContext.Provider>
  )
}

export function useRouter() {
  const context = useContext(RouterContext)
  if (context === undefined) {
    throw new Error('useRouter must be used within a Router')
  }
  return context
}
