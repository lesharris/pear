<script setup>
defineProps({
  gap: { type: String, default: '0.5rem' },
  align: { type: String, default: 'center' },
  justify: { type: String, default: 'flex-start' },
})
</script>

<template>
  <div
    class="app-cluster"
    :style="{
      '--cluster-gap': gap,
      '--cluster-align': align,
      '--cluster-justify': justify,
    }"
  >
    <slot />
  </div>
</template>

<style scoped>
.app-cluster {
  display: flex;
  flex-wrap: wrap;
  gap: var(--cluster-gap);
  align-items: var(--cluster-align);
  justify-content: var(--cluster-justify);
}
</style>
