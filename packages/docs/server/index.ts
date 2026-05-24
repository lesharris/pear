import { render } from '../src/entry-server'
import { getRouteMetadata } from '../src/metadata'

type EnvWithAssets = Env & {
  ASSETS: Fetcher
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (!isSupportedMethod(request)) {
      return new Response(null, {
        status: 405,
        headers: {
          allow: 'GET, HEAD',
        },
      })
    }

    if (!isDocumentRequest(request, url)) {
      const assetResponse = await env.ASSETS.fetch(request)
      if (assetResponse.status !== 404) return assetResponse
      // Unknown path with an extension (e.g. /docs/phpinfo.php) — fall through to SSR 404
    }

    const { appHtml, route } = await render(url.pathname + url.search)
    const templateResponse = await env.ASSETS.fetch(
      new Request(new URL('/index.html', url), {
        headers: request.headers,
        method: 'GET',
      }),
    )

    if (!templateResponse.ok) {
      return templateResponse
    }

    const template = await templateResponse.text()
    const { title, description, canonicalUrl, jsonLd } = getRouteMetadata(route)
    const html = template
      .replaceAll('<!--ssr-title-->Pear', escapeHtml(title))
      .replaceAll(
        '<!--ssr-description-->Pear is a lightweight Vue 3 component library built around PicoCSS semantics.',
        escapeHtml(description),
      )
      .replaceAll('<!--ssr-canonical-->https://pear.ontic.cloud/', escapeHtml(canonicalUrl))
      .replace(
        '<!--ssr-jsonld-->{"@context":"https://schema.org","@type":"WebSite","name":"Pear","url":"https://pear.ontic.cloud/","description":"Pear is a lightweight Vue 3 component library built around PicoCSS semantics.","image":"https://pear.ontic.cloud/og-image.png","publisher":{"@type":"Organization","name":"Ontic Cloud","logo":{"@type":"ImageObject","url":"https://content.ontic.cloud/media/peary.png"}}}',
        escapeScriptJson(jsonLd),
      )
      .replace('<!--ssr-outlet-->', appHtml)
    const status = route.name === 'not-found' ? 404 : 200

    return new Response(request.method === 'HEAD' ? null : html, {
      status,
      headers: {
        'content-type': 'text/html; charset=utf-8',
      },
    })
  },
} satisfies ExportedHandler<EnvWithAssets>

function isSupportedMethod(request: Request) {
  return request.method === 'GET' || request.method === 'HEAD'
}

function isDocumentRequest(request: Request, url: URL) {
  if (isViteInternalRequest(url.pathname)) return false
  return !url.pathname.includes('.')
}

function isViteInternalRequest(pathname: string) {
  return pathname.startsWith('/@') || pathname.startsWith('/__') || pathname.startsWith('/src/')
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case '&':
        return '&amp;'
      case '<':
        return '&lt;'
      case '>':
        return '&gt;'
      case '"':
        return '&quot;'
      default:
        return '&#39;'
    }
  })
}

function escapeScriptJson(value: string) {
  return value.replace(/</g, '\\u003c')
}
