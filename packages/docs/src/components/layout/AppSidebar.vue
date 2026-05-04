<script setup>
defineProps({
  side: { type: String, default: 'left' },
  sideWidth: { type: String, default: '20rem' },
  contentMin: { type: String, default: '50%' },
  gap: { type: String, default: '1rem' }
})
</script>

<template>
  <div
    class="app-sidebar"
    :class="`side-${side}`"
    :style="{
      '--sidebar-width': sideWidth,
      '--content-min': contentMin,
      '--sidebar-gap': gap
    }"
  >
    <slot />
  </div>
</template>

<style scoped>
.app-sidebar {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sidebar-gap);
}
.app-sidebar > :first-child {
  flex-basis: var(--sidebar-width);
  flex-grow: 1;
}
.app-sidebar > :last-child {
  flex-basis: 0;
  flex-grow: 999;
  min-inline-size: var(--content-min);
}
.app-sidebar.side-right {
  flex-direction: row-reverse;
}
</style>
