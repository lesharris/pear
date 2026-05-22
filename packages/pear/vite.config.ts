import { fileURLToPath, URL } from 'node:url'
import { createRequire } from 'node:module'
import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

const require = createRequire(import.meta.url)
const picoScssPath = path.join(path.dirname(require.resolve('@picocss/pico/package.json')), 'scss')

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src'],
      outDirs: ['dist'],
      tsconfigPath: './tsconfig.app.json',
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [picoScssPath],
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: 'Pear',
      fileName: 'pear',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue', 'lucide-vue-next'],
      output: {
        globals: { vue: 'Vue', 'lucide-vue-next': 'LucideVueNext' },
      },
    },
    cssCodeSplit: false,
  },
})
