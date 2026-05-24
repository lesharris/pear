import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite-plus'
import type { ConfigEnv, UserConfig } from 'vite-plus'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

import { cloudflare } from '@cloudflare/vite-plugin'

const cloudflarePlugins = cloudflare().map((plugin) => ({
  ...plugin,
  apply(config: UserConfig, env: ConfigEnv) {
    if (env.mode === 'test') {
      return false
    }

    if (typeof plugin.apply === 'function') {
      return plugin.apply(config, env)
    }

    if (plugin.apply === 'build') {
      return env.command === 'build'
    }

    if (plugin.apply === 'serve') {
      return env.command === 'serve'
    }

    return true
  },
}))

// https://vite.dev/config/
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
    ignorePatterns: ['worker-configuration.d.ts'],
  },
  lint: {
    ignorePatterns: ['worker-configuration.d.ts'],
    jsPlugins: [{ name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' }],
    rules: { 'vite-plus/prefer-vite-plus-imports': 'error' },
    options: { typeAware: true, typeCheck: true },
  },
  plugins: [vue(), vueDevTools(), cloudflarePlugins],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'happy-dom',
    include: ['src/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reportsDirectory: './coverage',
      reporter: ['text', 'html'],
      include: [
        'src/head.ts',
        'src/metadata.ts',
        'src/router/index.ts',
        'src/components/DocsApiTable.vue',
        'src/components/DocsExample.vue',
      ],
      exclude: ['src/**/*.d.ts'],
    },
  },
})
