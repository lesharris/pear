<script setup lang="ts">
import { provide, useId } from 'vue'
import { PAccordionGroupKey } from '@/types/PAccordion'

const { exclusive = false, name } = defineProps<{
  exclusive?: boolean
  name?: string
}>()

const generatedName = useId()

provide(PAccordionGroupKey, {
  name: exclusive ? (name ?? generatedName) : undefined,
})
</script>

<template>
  <div class="p-accordion-group">
    <slot />
  </div>
</template>
