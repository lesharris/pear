<script setup lang="ts">
import { computed, inject } from 'vue'
import { PFieldKey } from '@/types/PField'
import { useTooltip } from '@/lib/useTooltip'
import type { PTooltipProps } from '@/types/PTooltip'

type PInputType =
  | 'text'
  | 'email'
  | 'number'
  | 'password'
  | 'tel'
  | 'url'
  | 'search'
  | 'date'
  | 'datetime-local'
  | 'month'
  | 'time'
  | 'color'
  | 'file'

defineOptions({ inheritAttrs: false })

const model = defineModel<string | number | FileList | null>()

const {
  type = 'text',
  disabled,
  readonly,
  invalid,
  tooltip,
  tooltipPlacement,
} = defineProps<{
  type?: PInputType
  disabled?: boolean
  readonly?: boolean
  invalid?: boolean
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

function updateValue(event: Event) {
  const input = event.target as HTMLInputElement

  if (type === 'number') {
    model.value = input.value === '' ? '' : input.valueAsNumber
    return
  }

  model.value = input.value
}

function updateFiles(event: Event) {
  const input = event.target as HTMLInputElement
  model.value = input.files
}
</script>

<template>
  <span
    v-if="tooltip"
    class="p-tooltip-host"
    :data-tooltip="tooltip"
    :data-placement="tooltipPlacement"
  >
    <input
      v-if="type === 'file'"
      v-bind="$attrs"
      :id="field?.id"
      type="file"
      :disabled="isDisabled"
      :aria-invalid="ariaInvalid"
      :aria-describedby="ariaDescribedBy"
      @change="updateFiles"
    >

    <input
      v-else
      v-bind="$attrs"
      :id="field?.id"
      :type="type"
      :value="model"
      :disabled="isDisabled"
      :readonly="readonly"
      :aria-invalid="ariaInvalid"
      :aria-describedby="ariaDescribedBy"
      @input="updateValue"
    >

    <span :id="tooltipId" role="tooltip" class="p-sr-only">{{ tooltip }}</span>
  </span>

  <template v-else>
    <input
      v-if="type === 'file'"
      v-bind="$attrs"
      :id="field?.id"
      type="file"
      :disabled="isDisabled"
      :aria-invalid="ariaInvalid"
      :aria-describedby="ariaDescribedBy"
      @change="updateFiles"
    >

    <input
      v-else
      v-bind="$attrs"
      :id="field?.id"
      :type="type"
      :value="model"
      :disabled="isDisabled"
      :readonly="readonly"
      :aria-invalid="ariaInvalid"
      :aria-describedby="ariaDescribedBy"
      @input="updateValue"
    >
  </template>
</template>
