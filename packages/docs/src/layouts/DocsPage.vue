<script setup lang="ts">
import { RouterView } from 'vue-router'
import DocsToc from '@/components/DocsToc.vue'
import AppStack from '@/components/layout/AppStack.vue'
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <Transition name="page" mode="out-in">
      <div :key="route.path" class="docs-view">
        <AppStack gap="2.5rem" class="docs-view-content">
          <component :is="Component" />
        </AppStack>
        <DocsToc :items="(route.meta.tocItems as Array<{ id: string; label: string }>) ?? []" />
      </div>
    </Transition>
  </RouterView>
</template>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>
