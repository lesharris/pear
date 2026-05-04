<script setup>
defineProps({
  min: { type: String, default: '16rem' },
  gap: { type: String, default: '1rem' }
})
</script>

<template>
  <div class="app-grid" :style="{ '--grid-min': min, '--grid-gap': gap }">
    <slot />
  </div>
</template>

<style scoped>
.app-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(var(--grid-min), 100%), 1fr));
  gap: var(--grid-gap);
}
</style>
