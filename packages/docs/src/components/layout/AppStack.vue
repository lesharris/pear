<script setup>
defineProps({
  gap: { type: String, default: '1rem' },
  as: { type: String, default: 'div' }
})
</script>

<template>
  <component :is="as" class="app-stack" :style="{ '--stack-gap': gap }">
    <slot />
  </component>
</template>

<style scoped>
.app-stack {
  display: flex;
  flex-direction: column;
  gap: var(--stack-gap);
}
</style>
