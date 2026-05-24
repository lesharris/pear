import { fileURLToPath, URL } from 'node:url'
import { createRequire } from 'node:module'
import path from 'node:path'
import { defineConfig } from 'vite-plus'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

const require = createRequire(import.meta.url)
const picoScssPath = path.join(path.dirname(require.resolve('@picocss/pico/package.json')), 'scss')

export default defineConfig({
  staged: {
    '*': 'vp check --fix',
  },
  fmt: {
    semi: false,
    tabWidth: 2,
    singleQuote: true,
    printWidth: 100,
    trailingComma: 'none',
    sortPackageJson: false,
    ignorePatterns: [],
  },
  lint: {
    jsPlugins: [{ name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' }],
    rules: { 'vite-plus/prefer-vite-plus-imports': 'error' },
    options: { typeAware: true, typeCheck: true },
  },
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
      external: ['vue', '@lucide/vue'],
      output: {
        globals: { vue: 'Vue', '@lucide/vue': 'LucideVue' },
      },
    },
    cssCodeSplit: false,
  },
})
