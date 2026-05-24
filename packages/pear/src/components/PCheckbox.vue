<script setup lang="ts">
import { computed, inject } from 'vue'
import { PFieldKey } from '@/types/PField'
import { useTooltip } from '@/lib/useTooltip'
import type { PTooltipProps } from '@/types/PTooltip'

defineOptions({
  inheritAttrs: false,
})

type PCheckboxValue = string | number | boolean
type PCheckboxModel = PCheckboxValue | PCheckboxValue[]

const model = defineModel<PCheckboxModel>()

const {
  value = true,
  uncheckedValue = false,
  disabled,
  invalid,
  switch: isSwitch = false,
  indeterminate = false,
  tooltip,
  tooltipPlacement,
} = defineProps<
  {
    value?: PCheckboxValue
    uncheckedValue?: PCheckboxValue
    disabled?: boolean
    invalid?: boolean
    switch?: boolean
    indeterminate?: boolean
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

const isChecked = computed(() => {
  if (Array.isArray(model.value)) {
    return model.value.includes(value)
  }

  return model.value === value
})

function updateChecked(event: Event) {
  const input = event.target as HTMLInputElement

  if (Array.isArray(model.value)) {
    model.value = input.checked
      ? [...model.value, value]
      : model.value.filter((item) => item !== value)

    return
  }

  model.value = input.checked ? value : uncheckedValue
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
      type="checkbox"
      :role="isSwitch ? 'switch' : undefined"
      :checked="isChecked"
      :disabled="isDisabled"
      :aria-invalid="ariaInvalid"
      :aria-describedby="ariaDescribedBy"
      :indeterminate="indeterminate"
      @change="updateChecked"
    />

    <slot />
    <span v-if="tooltip" :id="tooltipId" role="tooltip" class="p-sr-only">{{ tooltip }}</span>
  </label>
</template>
