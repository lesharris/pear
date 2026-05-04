import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'
import vue from '@vitejs/plugin-vue'
import { Document } from 'flexsearch'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const OUT_DIR = process.argv.includes('--public')
  ? path.join(root, 'public')
  : path.join(root, 'dist/client')
const INDEX_FILE = path.join(OUT_DIR, 'search-index.json')

async function prerenderForSearch() {
  console.log('🔍 Starting FlexSearch index generation...')

  const vite = await createServer({
    root,
    configFile: false,
    plugins: [vue()],
    resolve: {
      alias: { '@': path.resolve(root, 'src') },
    },
    server: { middlewareMode: true },
    appType: 'custom',
    logLevel: 'error',
  })

  try {
    const { createDocsApp } = await vite.ssrLoadModule('/src/createApp.ts')
    const { createDocsRouter } = await vite.ssrLoadModule('/src/router/index.ts')
    const { renderToString } = await vite.ssrLoadModule('vue/server-renderer')

    const index = new Document({
      document: {
        id: 'id',
        index: ['title', 'content'],
        store: ['title', 'url'],
      },
      tokenize: 'full',
      cache: true,
      context: true,
    })

    let count = 0

    const router = createDocsRouter()
    const allRoutes = router.getRoutes()

    const searchableRoutes = allRoutes.filter((route: any) => {
      return (
        route.path &&
        !route.path.includes("*") &&
        route.path.startsWith("/docs") &&
        route.name != null
      );
    })

    for (const route of searchableRoutes) {
      try {
        const { app, router: appRouter } = createDocsApp()

        await appRouter.push(route.path)
        await appRouter.isReady()

        const html = await renderToString(app)

        const sections = html.match(/data-section[\s\S]*?<\/section>/g) ?? []
        const text = sections
          .join(' ')
          .replace(/<[^>]+>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim()

        const title =
          route.meta?.title ||
          route.meta?.docsTitle ||
          (route.name ? String(route.name).replace(/-/g, ' ') : 'Untitled')

        index.add({
          id: route.path || route.name,
          title: title.charAt(0).toUpperCase() + title.slice(1),
          content: text,
          url: route.path,
        })

        count++
        console.log(`✓ Indexed ${route.path || route.name}`)
      } catch (err) {
        console.warn(`⚠️ Failed to index ${route.path || route.name}:`, (err as Error).message)
      }
    }

    const exportData: Record<string, string> = {}
    index.export((key: string, data: string) => {
      if (data != null) exportData[key] = data
    })

    await fs.mkdir(OUT_DIR, { recursive: true })
    await fs.writeFile(INDEX_FILE, JSON.stringify(exportData))

    console.log(`✅ FlexSearch index created with ${count} pages → ${INDEX_FILE}`)
  } finally {
    await vite.close()
  }
}

prerenderForSearch()
