import { defineConfig } from 'vite-plus'
import { fileURLToPath, URL } from 'node:url'

const rootTestProject = (name: string, extendsPath: string, rootPath: string) => ({
  extends: extendsPath,
  test: {
    name,
    root: fileURLToPath(new URL(rootPath, import.meta.url)),
  },
})

// https://vite.dev/config/
export default defineConfig({
  test: {
    projects: [
      rootTestProject('@ontic/pear', './packages/pear/vite.config.ts', './packages/pear/'),
      rootTestProject('@ontic/pear-docs', './packages/docs/vite.config.ts', './packages/docs/'),
    ],
  },
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
