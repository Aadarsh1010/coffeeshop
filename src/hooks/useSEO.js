import { useEffect } from 'react'

const BRAND      = 'Brew & Soul'
const BASE_DESC  = 'Premium artisan coffee, hand-roasted daily in Brooklyn. Visit our cozy café for the perfect cup.'
const BASE_IMAGE = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80'

function setMeta(attr, name, content) {
  let el = document.head.querySelector(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Apply per-page SEO metadata.
 *
 * @param {Object}  opts
 * @param {string}  opts.title          page title (without brand)
 * @param {string} [opts.description]   meta description
 * @param {string} [opts.image]         OG image URL
 * @param {string} [opts.url]           canonical URL
 * @param {string} [opts.type]          OG type (default 'website')
 * @param {string} [opts.keywords]      comma-separated keywords
 */
export function useSEO({
  title,
  description = BASE_DESC,
  image       = BASE_IMAGE,
  url,
  type        = 'website',
  keywords,
} = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} · ${BRAND}` : `${BRAND} — Premium Artisan Coffee`
    const pageUrl   = url || (typeof window !== 'undefined' ? window.location.href : '')

    document.title = fullTitle

    // Standard
    setMeta('name', 'description', description)
    if (keywords) setMeta('name', 'keywords', keywords)

    // OpenGraph
    setMeta('property', 'og:title',       fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type',        type)
    setMeta('property', 'og:image',       image)
    setMeta('property', 'og:url',         pageUrl)
    setMeta('property', 'og:site_name',   BRAND)

    // Twitter
    setMeta('name', 'twitter:card',        'summary_large_image')
    setMeta('name', 'twitter:title',       fullTitle)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image',       image)

    // Canonical
    if (pageUrl) setLink('canonical', pageUrl)
  }, [title, description, image, url, type, keywords])
}
