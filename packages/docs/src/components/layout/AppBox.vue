<script setup>
defineProps({
  padding: { type: String, default: '1rem' },
  borderWidth: { type: String, default: '0' },
  borderColor: { type: String, default: 'var(--p-content-border-color)' },
  borderRadius: { type: String, default: '0' },
  background: { type: String, default: 'transparent' },
  as: { type: String, default: 'div' },
})
</script>

<template>
  <component
    :is="as"
    class="app-box"
    :style="{
      '--box-padding': padding,
      '--box-border-width': borderWidth,
      '--box-border-color': borderColor,
      '--box-border-radius': borderRadius,
      '--box-background': background,
    }"
  >
    <slot />
  </component>
</template>

<style scoped>
.app-box {
  padding: var(--box-padding);
  border: var(--box-border-width) solid var(--box-border-color);
  border-radius: var(--box-border-radius);
  background: var(--box-background);
}
</style>
