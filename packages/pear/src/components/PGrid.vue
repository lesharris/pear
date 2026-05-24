<!-- src/components/PGrid.vue -->
<script setup lang="ts">
const { min = '0%', gap = 'var(--pico-grid-column-gap, var(--pico-spacing))' } = defineProps<{
  min?: string
  gap?: string
}>()
</script>

<template>
  <div
    class="p-grid"
    :style="{
      '--p-grid-min': min,
      '--p-grid-gap': gap,
    }"
  >
    <slot />
  </div>
</template>

<style scoped>
/* Mobile-first: single column below 768px (matches Pico .grid behaviour) */
.p-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--p-grid-gap);
}

@media (min-width: 768px) {
  /*
   * min='0%' (default) → minmax(0%, 1fr) → identical to Pico's .grid.
   * min='16rem'        → minmax(min(16rem, 100%), 1fr) → naturally responsive
   *                      without a hard breakpoint: wraps when columns would
   *                      be narrower than 16rem.
   */
  .p-grid {
    grid-template-columns: repeat(auto-fit, minmax(min(var(--p-grid-min), 100%), 1fr));
  }
}

.p-grid > * {
  margin-bottom: 0;
  min-width: 0;
}
</style>
