<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTooltip } from '@/lib/useTooltip'
import type { PTooltipProps } from '@/types/PTooltip'

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

function onToggle() {
  isOpen.value = details.value?.open ?? false
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
  <details ref="details" class="dropdown" :open="open" @toggle="onToggle">
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
