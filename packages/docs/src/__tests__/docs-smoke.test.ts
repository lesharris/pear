import { describe, expect, it } from 'vite-plus/test'
import { syncDocumentHead } from '../head'
import {
  createJsonLd,
  defaultDescription,
  defaultTitle,
  getRouteMetadata,
  siteOrigin,
} from '../metadata'
import { createDocsRouter } from '../router'

describe('docs metadata and routing smoke tests', () => {
  it('creates route metadata with fallbacks and JSON-LD', () => {
    const route = {
      path: '/docs/buttons',
      meta: {
        title: 'Buttons',
        description: 'Button docs',
      },
    }

    expect(getRouteMetadata(route as never)).toMatchObject({
      title: 'Buttons',
      description: 'Button docs',
      canonicalUrl: `${siteOrigin}/docs/buttons`,
    })

    const fallback = getRouteMetadata({ path: '/unknown', meta: {} } as never)
    expect(fallback.title).toBe(defaultTitle)
    expect(fallback.description).toBe(defaultDescription)

    const json = JSON.parse(createJsonLd({ title: 'Pear', description: 'Docs', url: siteOrigin }))
    expect(json).toMatchObject({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Pear',
      publisher: { name: 'Ontic Cloud' },
    })
  })

  it('syncs the document head for the current route', () => {
    document.head.innerHTML = `
      <link rel="canonical" />
      <meta name="description" />
      <meta property="og:url" />
      <meta property="og:title" />
      <meta property="og:description" />
      <meta name="twitter:title" />
      <meta name="twitter:description" />
      <script type="application/ld+json"></script>
    `

    syncDocumentHead({
      path: '/docs/tables',
      meta: { title: 'Tables', description: 'Table docs' },
    } as never)

    expect(document.title).toBe('Tables')
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      `${siteOrigin}/docs/tables`,
    )
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(
      'Table docs',
    )
    expect(document.querySelector('script[type="application/ld+json"]')?.textContent).toContain(
      '"name":"Tables"',
    )
  })

  it('creates the docs router with core routes and scroll behavior', async () => {
    const router = createDocsRouter()

    expect(router.getRoutes().some((route) => route.name === 'buttons')).toBe(true)
    expect(router.getRoutes().some((route) => route.name === 'not-found')).toBe(true)

    await router.push('/docs/buttons')
    expect(router.currentRoute.value.name).toBe('buttons')
    expect(router.currentRoute.value.meta.title).toBe('Buttons | Pear')
  })
})
