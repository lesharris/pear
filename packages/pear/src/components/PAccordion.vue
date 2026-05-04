<script setup lang="ts">
import { inject, ref } from 'vue'
import { PAccordionGroupKey } from '@/types/PAccordion'

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

function onToggle() {
  isOpen.value = details.value?.open ?? false
}
</script>

<template>
  <details
    ref="details"
    :open="open"
    :name="name ?? group?.name"
    @toggle="onToggle"
  >
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
