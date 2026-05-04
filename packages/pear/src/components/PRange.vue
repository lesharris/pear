<script setup lang="ts">
import { computed, inject } from 'vue'
import { PFieldKey } from '@/types/PField'
import { useTooltip } from '@/lib/useTooltip'
import type { PTooltipProps } from '@/types/PTooltip'

const model = defineModel<number>()

const {
  min = 0,
  max = 100,
  step = 1,
  disabled,
  invalid,
  showValue = false,
  tooltip,
  tooltipPlacement,
} = defineProps<{
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  invalid?: boolean
  showValue?: boolean
} & PTooltipProps>()

const field = inject(PFieldKey, undefined)

const isDisabled = computed(() =>
  disabled || field?.disabled.value || false,
)

const isInvalid = computed(() =>
  invalid || field?.invalid.value || false,
)

const ariaInvalid = computed(() =>
  isInvalid.value ? 'true' : undefined,
)

const { tooltipId, ariaDescribedBy } = useTooltip(
  () => tooltip,
  () => field?.describedBy.value || undefined,
)

const value = computed(() =>
  model.value ?? min,
)

function updateValue(event: Event) {
  const input = event.target as HTMLInputElement
  model.value = input.valueAsNumber
}
</script>

<template>
  <div class="p-range">
    <input
      :id="field?.id"
      type="range"
      :value="value"
      :min="min"
      :max="max"
      :step="step"
      :disabled="isDisabled"
      :aria-invalid="ariaInvalid"
      :aria-describedby="ariaDescribedBy"
      :data-tooltip="tooltip"
      :data-placement="tooltipPlacement"
      @input="updateValue"
    >

    <output
      v-if="showValue"
      :for="field?.id"
      class="p-range__value"
    >
      {{ value }}
    </output>

    <span v-if="tooltip" :id="tooltipId" role="tooltip" class="p-sr-only">{{ tooltip }}</span>
  </div>
</template>

<style scoped>
.p-range {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.p-range input {
  flex: 1;
}

.p-range__value {
  min-inline-size: 3ch;
  text-align: end;
}
</style>
