<script setup lang="ts">
import { computed, inject } from 'vue'
import { PFieldKey } from '@/types/PField'
import { useTooltip } from '@/lib/useTooltip'
import type { PTooltipProps } from '@/types/PTooltip'

type PRadioValue = string | number | boolean

const model = defineModel<PRadioValue>()

const { value, disabled, invalid, tooltip, tooltipPlacement } = defineProps<
  {
    value: PRadioValue
    disabled?: boolean
    invalid?: boolean
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

const isChecked = computed(() => model.value === value)

function updateChecked(event: Event) {
  const input = event.target as HTMLInputElement

  if (input.checked) {
    model.value = value
  }
}
</script>

<template>
  <label
    :aria-disabled="isDisabled || undefined"
    :data-tooltip="tooltip"
    :data-placement="tooltipPlacement"
  >
    <input
      v-bind="$attrs"
      type="radio"
      :checked="isChecked"
      :disabled="isDisabled"
      :aria-invalid="ariaInvalid"
      :aria-describedby="ariaDescribedBy"
      @change="updateChecked"
    />

    <slot />
    <span v-if="tooltip" :id="tooltipId" role="tooltip" class="p-sr-only">{{ tooltip }}</span>
  </label>
</template>
