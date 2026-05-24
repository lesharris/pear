<script setup>
defineProps({
  max: { type: String, default: '60ch' },
  padded: { type: Boolean, default: true },
})
</script>

<template>
  <div class="app-center" :class="{ 'is-padded': padded }" :style="{ '--center-max': max }">
    <slot />
  </div>
</template>

<style scoped>
.app-center {
  margin-inline: auto;
  max-width: var(--center-max);
  width: 100%;
}
.app-center.is-padded {
  padding-inline: 1rem;
}
</style>
