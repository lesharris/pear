<!-- src/components/PSidebar.vue -->
<script setup lang="ts">
const {
  side = 'left',
  sideWidth = '15rem',
  contentMin = '50%',
  gap = 'var(--pico-spacing)',
} = defineProps<{
  side?: 'left' | 'right'
  sideWidth?: string
  contentMin?: string
  gap?: string
}>()
</script>

<template>
  <div
    class="p-sidebar"
    :class="`p-sidebar--${side}`"
    :style="{
      '--p-sidebar-side-width': sideWidth,
      '--p-sidebar-content-min': contentMin,
      '--p-sidebar-gap': gap,
    }"
  >
    <slot />
  </div>
</template>

<style scoped>
.p-sidebar {
  display: flex;
  flex-wrap: wrap;
  gap: var(--p-sidebar-gap);
}

.p-sidebar--right {
  flex-direction: row-reverse;
}

.p-sidebar > * {
  margin-bottom: 0;
  min-width: 0;
}

/* First DOM child = sidebar panel */
.p-sidebar > :first-child {
  flex-basis: var(--p-sidebar-side-width);
  flex-grow: 1;
}

/* Second DOM child = main content */
.p-sidebar > :last-child {
  flex-basis: 0;
  flex-grow: 999;
  min-inline-size: var(--p-sidebar-content-min);
}
</style>
