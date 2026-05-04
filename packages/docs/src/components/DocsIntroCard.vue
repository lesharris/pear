<script setup lang="ts">
import { PCard } from "@ontic/pear";

defineProps<{
  name: string;
}>();
</script>

<template>
  <p-card class="docs-intro-card">
    <template #header>{{ name }}</template>

    <p>
      <slot />
    </p>
  </p-card>
</template>
