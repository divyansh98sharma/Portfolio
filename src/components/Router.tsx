import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Page = 'home' | 'case-study-1' | 'case-study-2' | 'case-study-3' | 'case-study-4' | 'all-case-studies'

type RouterContextType = {
  currentPage: Page
  navigateTo: (page: Page) => void
}

const RouterContext = createContext<RouterContextType | undefined>(undefined)

function getPageFromPath(path: string): Page {
  const clean = path.replace(/^\/|\/$/g, '')
  switch (clean) {
    case 'case-study-1': return 'case-study-1'
    case 'case-study-2': return 'case-study-2'
    case 'case-study-3': return 'case-study-3'
    case 'case-study-4': return 'case-study-4'
    case 'all-case-studies': return 'all-case-studies'
    default: return 'home'
  }
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
