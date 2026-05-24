/// <reference types="vite-plus/client" />

declare module '@ontic/pear/style.css'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  import type { DocsMeta } from './src/types/docs'

  const component: DefineComponent<{}, {}, any>
  export const docsMeta: DocsMeta
  export default component
}
