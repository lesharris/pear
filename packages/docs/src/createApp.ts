import '@ontic/pear/style.css'
import './assets/main.css'
import './assets/theme.css'

import { createSSRApp } from 'vue'
import App from './App.vue'
import { createDocsRouter } from './router'

export function createDocsApp() {
  const app = createSSRApp(App)
  const router = createDocsRouter()

  app.use(router)

  return { app, router }
}
