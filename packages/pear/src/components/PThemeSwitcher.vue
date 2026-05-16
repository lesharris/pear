<script setup lang="ts">
import { computed } from 'vue'
import { Sun, Moon } from 'lucide-vue-next'
import { useTheme } from '@/lib/useTheme'

const { theme, toggleTheme } = useTheme()

const nextTheme = computed(() => theme.value === 'dark' ? 'light' : 'dark')
const label = computed(() => `Switch to ${nextTheme.value} theme`)
const icon = computed(() => theme.value === 'dark' ? Moon : Sun)
</script>

<template>
  <button
    type="button"
    class="theme-switcher"
    :class="`theme-switcher--${theme}`"
    :aria-label="label"
    :aria-pressed="theme === 'dark'"
    :data-tooltip="label"
    data-placement="left"
    @click="toggleTheme"
  >
    <span class="theme-switcher__track" aria-hidden="true">
      <span class="theme-switcher__thumb">
        <component :is="icon" :size="15" :stroke-width="2.25" />
      </span>
    </span>
  </button>
</template>

<style scoped>
.theme-switcher {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  margin-block: auto;
  width: 3.25rem;
  height: 1.75rem;
  min-width: 3.25rem;
  padding: 0;
  margin-bottom: 0;
  background: transparent;
  border: 0;
  border-radius: 999px;
  color: var(--pico-muted-color);
  cursor: pointer;
  line-height: 1;
  vertical-align: middle;
  transition: color 0.15s;
}

.theme-switcher :deep(svg) {
  display: block;
  flex: 0 0 auto;
}

.theme-switcher__track {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  border: 1px solid var(--pico-muted-border-color);
  border-radius: inherit;
  background: var(--pico-card-sectionning-background-color);
  transition: background-color 0.15s, border-color 0.15s;
}

.theme-switcher__thumb {
  position: absolute;
  top: 50%;
  left: 0.2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.35rem;
  height: 1.35rem;
  border-radius: 50%;
  background: #fff7d1;
  color: #8a4b00;
  box-shadow: 0 1px 4px color-mix(in srgb, var(--pico-color) 18%, transparent);
  transform: translate(0, -50%);
  transition: transform 0.18s ease, color 0.15s, background-color 0.15s;
}

.theme-switcher--dark .theme-switcher__track {
  background: color-mix(in srgb, var(--pico-primary) 16%, var(--pico-card-sectionning-background-color));
}

.theme-switcher--dark .theme-switcher__thumb {
  background: #263244;
  color: #dbe7ff;
  transform: translate(1.5rem, -50%);
}

.theme-switcher:hover {
  color: var(--pico-color);
}

.theme-switcher:hover .theme-switcher__track {
  border-color: var(--pico-primary);
}
</style>
