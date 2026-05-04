<script setup lang="ts">
defineProps({
  threshold: { type: String, default: '30rem' },
  gap: { type: String, default: '1rem' }
})
</script>

<template>
  <div
    class="app-switcher"
    :style="{
      '--switcher-threshold': threshold,
      '--switcher-gap': gap
    }"
  >
    <slot />
  </div>
</template>

<style scoped>
.app-switcher {
  display: flex;
  flex-wrap: wrap;
  gap: var(--switcher-gap);
}
.app-switcher > * {
  flex-grow: 1;
  flex-basis: calc((var(--switcher-threshold) - 100%) * 999);
}
</style>
