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
    class="p-inline"
    :style="{
      '--p-inline-gap': gap,
      '--p-inline-align': align,
      '--p-inline-justify': justify,
    }"
  >
    <slot />
  </component>
</template>

<style scoped>
.p-inline {
  display: flex;
  flex-wrap: nowrap;
  gap: var(--p-inline-gap);
  align-items: var(--p-inline-align);
  justify-content: var(--p-inline-justify);
}

/* Same resets as PCluster — horizontal context, items size to content */
.p-inline > * {
  margin-bottom: 0;
  width: auto;
  min-width: 0;
}
</style>
