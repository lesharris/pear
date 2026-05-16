<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useTooltip } from '@/lib/useTooltip'
import type { PTooltipProps } from '@/types/PTooltip'

const emit = defineEmits<{
  'update:open': [open: boolean]
}>()

const {
  summary,
  open = false,
  button = false,
  variant,
  outline = false,
  invalid,
  align,
  tooltip,
  tooltipPlacement,
} = defineProps<{
  summary?: string
  open?: boolean
  button?: boolean
  variant?: 'secondary' | 'contrast'
  outline?: boolean
  invalid?: boolean
  align?: 'start' | 'end'
} & PTooltipProps>()

const details = ref<HTMLDetailsElement>()
const isOpen = ref(open)

watch(() => open, (nextOpen) => {
  isOpen.value = nextOpen
})

function onToggle() {
  isOpen.value = details.value?.open ?? false
  emit('update:open', isOpen.value)
}

const { tooltipId, ariaDescribedBy } = useTooltip(() => tooltip)

const ariaInvalid = computed(() =>
  invalid ? 'true' : undefined,
)

const listDir = computed(() =>
  align === 'end' ? 'rtl' : undefined,
)
</script>

<template>
  <details ref="details" class="dropdown" :open="isOpen" @toggle="onToggle">
    <summary
      :role="button ? 'button' : undefined"
      :aria-expanded="button ? isOpen : undefined"
      :class="button ? [variant, { outline }] : undefined"
      :aria-invalid="ariaInvalid"
      :aria-describedby="ariaDescribedBy"
      :data-tooltip="tooltip"
      :data-placement="tooltipPlacement"
    >
      <slot name="summary">
        {{ summary }}
      </slot>
    </summary>

    <ul :dir="listDir">
      <slot />
    </ul>

    <span v-if="tooltip" :id="tooltipId" role="tooltip" class="p-sr-only">{{ tooltip }}</span>
  </details>
</template>
