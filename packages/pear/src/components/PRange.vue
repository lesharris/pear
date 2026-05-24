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
} = defineProps<
  {
    min?: number
    max?: number
    step?: number
    disabled?: boolean
    invalid?: boolean
    showValue?: boolean
  } & PTooltipProps
>()

const field = inject(PFieldKey, undefined)

const isDisabled = computed(() => disabled || field?.disabled.value || false)

const isInvalid = computed(() => invalid || field?.invalid.value || false)

const ariaInvalid = computed(() => (isInvalid.value ? 'true' : undefined))

const { tooltipId, ariaDescribedBy } = useTooltip(
  () => tooltip,
  () => field?.describedBy.value || undefined,
)

const value = computed(() => model.value ?? min)

function updateValue(event: Event) {
  const input = event.target as HTMLInputElement
  model.value = input.valueAsNumber
}
</script>

<template>
  <div class="p-range">
    <span
      v-if="tooltip"
      class="p-tooltip-host p-range__control"
      :data-tooltip="tooltip"
      :data-placement="tooltipPlacement"
    >
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
        @input="updateValue"
      />

      <span :id="tooltipId" role="tooltip" class="p-sr-only">{{ tooltip }}</span>
    </span>

    <input
      v-else
      :id="field?.id"
      type="range"
      :value="value"
      :min="min"
      :max="max"
      :step="step"
      :disabled="isDisabled"
      :aria-invalid="ariaInvalid"
      :aria-describedby="ariaDescribedBy"
      @input="updateValue"
    />

    <output v-if="showValue" :for="field?.id" class="p-range__value">
      {{ value }}
    </output>
  </div>
</template>

<style scoped>
.p-range {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.p-range input,
.p-range__control {
  flex: 1;
}

.p-range__control input {
  width: 100%;
}

.p-range__value {
  min-inline-size: 3ch;
  text-align: end;
}
</style>
