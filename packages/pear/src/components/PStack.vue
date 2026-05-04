<!-- src/components/PStack.vue -->
<script setup lang="ts">
const { gap = 'var(--pico-spacing)', as = 'div' } = defineProps<{
  gap?: string
  as?: string
}>()
</script>

<template>
  <component :is="as" class="p-stack" :style="{ '--p-stack-gap': gap }">
    <slot />
  </component>
</template>

<style scoped>
.p-stack {
  display: flex;
  flex-direction: column;
  gap: var(--p-stack-gap);
}

/* Reset Pico's element-level margin-bottom so gap is the single spacing source */
.p-stack > * {
  margin-bottom: 0;
}
</style>
