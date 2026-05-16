<script setup lang="ts">
import { computed } from 'vue'
import type { PBreadcrumbItem } from '@/types/PBreadcrumb'

const {
  items,
  label = 'Breadcrumb',
  divider,
} = defineProps<{
  items?: PBreadcrumbItem[]
  label?: string
  divider?: string
}>()

const style = computed(() =>
  divider ? { '--pico-nav-breadcrumb-divider': JSON.stringify(divider) } : undefined,
)

function isCurrent(item: PBreadcrumbItem, index: number) {
  return item.current || index === (items?.length ?? 0) - 1
}
</script>

<template>
  <nav :aria-label="label" :style="style">
    <slot>
      <ul>
        <li v-for="(item, index) in items ?? []" :key="`${item.label}-${index}`">
          <a
            v-if="item.href && !isCurrent(item, index)"
            :href="item.href"
          >
            {{ item.label }}
          </a>
          <span v-else aria-current="page">{{ item.label }}</span>
        </li>
      </ul>
    </slot>
  </nav>
</template>
