<script setup lang="ts">
import { inject, ref, watch } from 'vue'
import { PAccordionGroupKey } from '@/types/PAccordion'

const emit = defineEmits<{
  'update:open': [open: boolean]
}>()

const {
  summary,
  open = false,
  name,
  button = false,
  variant,
  outline = false,
} = defineProps<{
  summary?: string
  open?: boolean
  name?: string
  button?: boolean
  variant?: 'secondary' | 'contrast'
  outline?: boolean
}>()

const group = inject(PAccordionGroupKey, undefined)

const details = ref<HTMLDetailsElement>()
const isOpen = ref(open)

watch(
  () => open,
  (nextOpen) => {
    isOpen.value = nextOpen
  },
)

function onToggle() {
  isOpen.value = details.value?.open ?? false
  emit('update:open', isOpen.value)
}
</script>

<template>
  <details ref="details" :open="isOpen" :name="name ?? group?.name" @toggle="onToggle">
    <summary
      :role="button ? 'button' : undefined"
      :aria-expanded="button ? isOpen : undefined"
      :class="button ? [variant, { outline }] : undefined"
    >
      <slot name="summary">
        {{ summary }}
      </slot>
    </summary>

    <slot />
  </details>
</template>
