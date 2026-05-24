<script setup lang="ts">
import { useTooltip } from '@/lib/useTooltip'
import type { PTooltipProps } from '@/types/PTooltip'

const {
  label = 'Loading',
  value,
  max = 100,
  indeterminate = false,
  tooltip,
  tooltipPlacement,
} = defineProps<
  {
    label?: string
    value?: number
    max?: number
    indeterminate?: boolean
  } & PTooltipProps
>()

defineOptions({ inheritAttrs: false })

const { tooltipId, ariaDescribedBy } = useTooltip(() => tooltip)
</script>

<template>
  <span
    v-if="tooltip"
    class="p-tooltip-host"
    :data-tooltip="tooltip"
    :data-placement="tooltipPlacement"
  >
    <progress
      v-bind="$attrs"
      :aria-label="label"
      :aria-describedby="ariaDescribedBy"
      :value="indeterminate ? undefined : value"
      :max="max"
    />

    <span :id="tooltipId" role="tooltip" class="p-sr-only">{{ tooltip }}</span>
  </span>

  <progress
    v-else
    v-bind="$attrs"
    :aria-label="label"
    :aria-describedby="ariaDescribedBy"
    :value="indeterminate ? undefined : value"
    :max="max"
  />
</template>
