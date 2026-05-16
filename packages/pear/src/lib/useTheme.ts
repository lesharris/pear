import { effectScope, onMounted, ref, watch } from 'vue'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'pear-theme'

function isTheme(value: string | null): value is Theme {
  return value === 'light' || value === 'dark'
}

function readSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function readStored(): Theme {
  if (typeof localStorage === 'undefined') return readSystemTheme()

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (isTheme(stored)) return stored
  } catch {}

  return readSystemTheme()
}

function apply(theme: Theme) {
  if (typeof document === 'undefined') return
  document.documentElement.setAttribute('data-theme', theme)
}

const theme = ref<Theme>('light')
let initialized = false

function initTheme() {
  if (initialized || typeof window === 'undefined') return
  initialized = true

  // Detached scope so the watch outlives any single component instance.
  // Without this, the watch is tied to the first component that calls
  // useTheme() and stops when that component unmounts (e.g. on navigation).
  effectScope(true).run(() => {
    watch(theme, (val) => {
      apply(val)
      try {
        localStorage.setItem(STORAGE_KEY, val)
      } catch {}
    })
  })

  onMounted(() => {
    theme.value = readStored()
    apply(theme.value)
  })
}

export function useTheme() {
  initTheme()

  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  return { theme, toggleTheme }
}
