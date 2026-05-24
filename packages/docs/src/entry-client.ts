import { createDocsApp } from './createApp'
import { syncDocumentHead } from './head'

const { app, router } = createDocsApp()

void router.isReady().then(() => {
  syncDocumentHead(router.currentRoute.value)
  app.mount('#app')
})

router.afterEach((to) => {
  syncDocumentHead(to)
})
