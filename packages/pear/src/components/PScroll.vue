<script setup lang="ts">
const { as = 'div' } = defineProps<{
  as?: string
}>()
</script>

<template>
  <component :is="as" class="p-scroll">
    <slot />
  </component>
</template>

<style scoped>
.p-scroll {
  overflow: auto;
}
</style>
