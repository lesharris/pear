import { defineConfig } from 'vite-plus'

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
    sortPackageJson: false,
    ignorePatterns: ['packages/docs/worker-configuration.d.ts'],
  },
  lint: {
    ignorePatterns: ['packages/docs/worker-configuration.d.ts'],
    jsPlugins: [{ name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' }],
    rules: { 'vite-plus/prefer-vite-plus-imports': 'error' },
    options: { typeAware: true, typeCheck: true },
  },
})
