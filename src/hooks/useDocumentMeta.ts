import { useEffect } from 'react'

const SITE_URL = 'https://divyanshsharma.work'
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`

interface DocumentMeta {
  title: string
  description: string
  image?: string
  /** leading-slash path, e.g. "/case-study-1" or "/" */
  path: string
}

function setMetaByAttr(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/** Keeps document.title, meta description, canonical, and Open Graph /
 *  Twitter tags in sync with the current client-side route. This is a
 *  static SPA with no server-side rendering, so search engines and social
 *  crawlers that execute JS see these per-page — the ones that don't still
 *  get the static defaults baked into index.html. */
export function useDocumentMeta({ title, description, image, path }: DocumentMeta) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`
    const resolvedImage = image ?? DEFAULT_IMAGE
    document.title = title
    setMetaByAttr('name', 'description', description)
    setMetaByAttr('property', 'og:title', title)
    setMetaByAttr('property', 'og:description', description)
    setMetaByAttr('property', 'og:url', url)
    setMetaByAttr('property', 'og:image', resolvedImage)
    setMetaByAttr('name', 'twitter:title', title)
    setMetaByAttr('name', 'twitter:description', description)
    setMetaByAttr('name', 'twitter:image', resolvedImage)
    setCanonical(url)
  }, [title, description, image, path])
}
