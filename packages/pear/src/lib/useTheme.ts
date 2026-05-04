import { effectScope, onMounted, ref, watch } from 'vue'

export type Theme = 'system' | 'light' | 'dark'

const STORAGE_KEY = 'pear-theme'

function isTheme(value: string | null): value is Theme {
  return value === 'light' || value === 'dark' || value === 'system'
}

function readStored(): Theme {
  if (typeof localStorage === 'undefined') return 'system'

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (isTheme(stored)) return stored
  } catch {}

  return 'system'
}

function apply(theme: Theme) {
  if (typeof document === 'undefined') return

  if (theme === 'system') {
    document.documentElement.removeAttribute('data-theme')
  } else {
    document.documentElement.setAttribute('data-theme', theme)
  }
}

const theme = ref<Theme>('system')
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

  return { theme }
}
