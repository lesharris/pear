<script setup lang="ts">
const {
  as = 'span',
  busy = true,
  label,
} = defineProps<{
  as?: string
  busy?: boolean
  label?: string
}>()
</script>

<template>
  <component :is="as" :aria-busy="busy ? 'true' : undefined" :aria-label="label">
    <slot />
  </component>
</template>
