<script setup lang="ts">
const {
  gap = 'var(--pico-spacing)',
  align = 'center',
  justify = 'flex-start',
  as = 'div',
} = defineProps<{
  gap?: string
  align?: string
  justify?: string
  as?: string
}>()
</script>

<template>
  <component
    :is="as"
    class="p-cluster"
    :style="{
      '--p-cluster-gap': gap,
      '--p-cluster-align': align,
      '--p-cluster-justify': justify,
    }"
  >
    <slot />
  </component>
</template>

<style scoped>
.p-cluster {
  display: flex;
  flex-wrap: wrap;
  gap: var(--p-cluster-gap);
  align-items: var(--p-cluster-align);
  justify-content: var(--p-cluster-justify);
}

/*
 * Reset Pico's margin-bottom, and override width:100% that Pico sets on
 * input/select/textarea/button[type=submit] — in a horizontal context those
 * must size to content, not fill the row.
 */
.p-cluster > * {
  margin-bottom: 0;
  width: auto;
  min-width: 0;
}
</style>
