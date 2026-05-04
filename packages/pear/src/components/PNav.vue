<script setup lang="ts">
const { label = 'Main' } = defineProps<{
  label?: string
}>()
</script>

<template>
  <nav :aria-label="label">
    <ul v-if="$slots.left">
      <slot name="left" />
    </ul>

    <ul v-if="$slots.default">
      <slot />
    </ul>

    <ul v-if="$slots.right">
      <slot name="right" />
    </ul>
  </nav>
</template>
