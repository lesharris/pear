<script setup lang="ts">
defineProps<{
  name: string
}>()
</script>

<template>
  <div class="docs-intro-card">
    <h2>{{ name }}</h2>
    <p><slot /></p>
  </div>
</template>

<style scoped>
.docs-intro-card {
  max-width: 68ch;
}

.docs-intro-card h2 {
  margin-bottom: 0.75rem;
}

.docs-intro-card p {
  margin-bottom: 0;
  color: var(--pico-muted-color);
}
</style>
