<script setup lang="ts">
import { computed } from 'vue'
import { useTooltip } from '@/lib/useTooltip'
import type { PTooltipProps } from '@/types/PTooltip'

const {
  type = 'button',
  variant,
  disabled = false,
  outline = false,
  value,
  loading = false,
  tooltip,
  tooltipPlacement,
} = defineProps<{
  type?: 'submit' | 'reset' | 'button'
  variant?: 'secondary' | 'contrast'
  disabled?: boolean
  outline?: boolean
  value?: string
  loading?: boolean
} & PTooltipProps>()

defineOptions({ inheritAttrs: false })

const isDisabled = computed(() => disabled || loading)
const needsTooltipHost = computed(() => Boolean(tooltip && isDisabled.value))
const ariaBusy = computed(() => loading ? 'true' : undefined)
const { tooltipId, ariaDescribedBy } = useTooltip(() => tooltip)
</script>

<template>
  <span
    v-if="needsTooltipHost"
    class="p-tooltip-host p-tooltip-host--inline"
    :data-tooltip="tooltip"
    :data-placement="tooltipPlacement"
  >
    <input
      v-if="type === 'submit' || type === 'reset'"
      v-bind="$attrs"
      :type="type"
      :disabled="isDisabled"
      :aria-busy="ariaBusy"
      :aria-describedby="ariaDescribedBy"
      :class="[variant, { outline }]"
      :value="value"
    >

    <button
      v-else
      v-bind="$attrs"
      type="button"
      :disabled="isDisabled"
      :aria-busy="ariaBusy"
      :aria-describedby="ariaDescribedBy"
      :class="[variant, { outline }]"
    >
      <slot />
    </button>

    <span :id="tooltipId" role="tooltip" class="p-sr-only">{{ tooltip }}</span>
  </span>

  <template v-else>
    <input
      v-if="type === 'submit' || type === 'reset'"
      v-bind="$attrs"
      :type="type"
      :disabled="isDisabled"
      :aria-busy="ariaBusy"
      :aria-describedby="ariaDescribedBy"
      :class="[variant, { outline }]"
      :value="value"
      :data-tooltip="tooltip"
      :data-placement="tooltipPlacement"
    >

    <button
      v-else
      v-bind="$attrs"
      type="button"
      :disabled="isDisabled"
      :aria-busy="ariaBusy"
      :aria-describedby="ariaDescribedBy"
      :class="[variant, { outline }]"
      :data-tooltip="tooltip"
      :data-placement="tooltipPlacement"
    >
      <slot />
    </button>

    <span v-if="tooltip" :id="tooltipId" role="tooltip" class="p-sr-only">{{ tooltip }}</span>
  </template>
</template>
