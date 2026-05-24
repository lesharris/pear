<script setup>
defineProps({
  minHeight: { type: String, default: '100vh' },
  gap: { type: String, default: '1rem' },
  centered: { type: String, default: '.cover-center' },
})
</script>

<template>
  <div
    class="app-cover"
    :style="{
      '--cover-min-height': minHeight,
      '--cover-gap': gap,
    }"
  >
    <slot />
  </div>
</template>

<style scoped>
.app-cover {
  display: flex;
  flex-direction: column;
  min-block-size: var(--cover-min-height);
  gap: var(--cover-gap);
}
.app-cover > :deep(.cover-center) {
  margin-block: auto;
}
</style>
