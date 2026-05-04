<script setup lang="ts">
import { Monitor, Sun, Moon } from 'lucide-vue-next'
import { useTheme, type Theme } from '@/lib/useTheme'

const { theme } = useTheme()

const options: { value: Theme; icon: typeof Monitor; label: string }[] = [
  { value: 'system', icon: Monitor, label: 'System theme' },
  { value: 'light',  icon: Sun,     label: 'Light theme'  },
  { value: 'dark',   icon: Moon,    label: 'Dark theme'   },
]
</script>

<template>
  <div class="theme-switcher" role="group" aria-label="Color scheme">
    <button
      v-for="opt in options"
      :key="opt.value"
      type="button"
      class="theme-btn"
      :class="{ active: theme === opt.value }"
      :aria-pressed="theme === opt.value"
      :aria-label="opt.label"
      :data-tooltip="opt.label"
      data-placement="bottom"
      @click="theme = opt.value"
    >
      <component :is="opt.icon" :size="16" :stroke-width="2" aria-hidden="true" />
    </button>
  </div>
</template>

<style scoped>
.theme-switcher {
  display: flex;
  align-items: center;
  margin-block: auto;
  gap: 0.125rem;
  background: var(--pico-card-sectionning-background-color);
  border: 1px solid var(--pico-muted-border-color);
  border-radius: var(--pico-border-radius);
  padding: 0.2rem;
}

.theme-switcher .theme-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  margin-bottom: 0;
  border: 1px solid transparent;
  border-radius: calc(var(--pico-border-radius) - 2px);
  background: transparent;
  color: var(--pico-muted-color);
  cursor: pointer;
  transition: color 0.15s, background-color 0.15s, border-color 0.15s;
}

.theme-switcher .theme-btn:hover {
  color: var(--pico-color);
  background: var(--pico-background-color);
}

.theme-switcher .theme-btn.active {
  background: var(--pico-primary);
  border-color: var(--pico-primary);
  color: var(--pico-primary-inverse);
}

.theme-switcher .theme-btn.active:hover {
  color: var(--pico-primary-inverse);
}
</style>
