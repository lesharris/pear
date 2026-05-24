<!-- src/components/PSwitcher.vue -->
<script setup lang="ts">
const { threshold = '30rem', gap = 'var(--pico-spacing)' } = defineProps<{
  threshold?: string
  gap?: string
}>()
</script>

<template>
  <div
    class="p-switcher"
    :style="{
      '--p-switcher-threshold': threshold,
      '--p-switcher-gap': gap,
    }"
  >
    <slot />
  </div>
</template>

<style scoped>
.p-switcher {
  display: flex;
  flex-wrap: wrap;
  gap: var(--p-switcher-gap);
}

/*
 * The flex-basis formula:
 *   - When container > threshold: basis is negative → clamps to 0 → items share the row.
 *   - When container < threshold: basis is large positive → each item takes full width → items stack.
 * flex-grow: 1 fills remaining space in the side-by-side case.
 */
.p-switcher > * {
  flex-grow: 1;
  flex-basis: calc((var(--p-switcher-threshold) - 100%) * 999);
  margin-bottom: 0;
  min-width: 0;
}
</style>
