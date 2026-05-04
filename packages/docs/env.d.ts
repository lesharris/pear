/// <reference types="vite/client" />

declare module '@ontic/pear/style.css'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
