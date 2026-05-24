<script setup lang="ts">
import { computed, inject } from 'vue'
import { PFieldKey } from '@/types/PField'
import { useTooltip } from '@/lib/useTooltip'
import type { PTooltipProps } from '@/types/PTooltip'

type PSelectValue = string | number
type PSelectModel = PSelectValue | PSelectValue[]
type PSelectOption = PSelectValue | Record<string, unknown>

defineOptions({ inheritAttrs: false })

const model = defineModel<PSelectModel>()

const {
  options = [],
  optionLabel = 'label',
  optionValue = 'value',
  placeholder,
  disabled,
  invalid,
  multiple = false,
  size,
  tooltip,
  tooltipPlacement,
} = defineProps<
  {
    options?: PSelectOption[]
    optionLabel?: string
    optionValue?: string
    placeholder?: string
    disabled?: boolean
    invalid?: boolean
    multiple?: boolean
    size?: number
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

function isPrimitiveOption(option: PSelectOption): option is PSelectValue {
  return typeof option === 'string' || typeof option === 'number'
}

function getOptionLabel(option: PSelectOption): string {
  if (isPrimitiveOption(option)) {
    return String(option)
  }

  return String(option[optionLabel] ?? '')
}

function getOptionValue(option: PSelectOption): PSelectValue {
  if (isPrimitiveOption(option)) {
    return option
  }

  const value = option[optionValue]

  if (typeof value === 'string' || typeof value === 'number') {
    return value
  }

  return ''
}

function getOptionDomValue(option: PSelectOption): string {
  return String(getOptionValue(option))
}

const valueByDomValue = computed(() => {
  return new Map(options.map((option) => [getOptionDomValue(option), getOptionValue(option)]))
})

const domModel = computed<string | string[]>({
  get() {
    if (multiple) {
      return Array.isArray(model.value) ? model.value.map((value) => String(value)) : []
    }

    return model.value == null || Array.isArray(model.value) ? '' : String(model.value)
  },

  set(value) {
    if (Array.isArray(value)) {
      model.value = value.map((item) => valueByDomValue.value.get(item) ?? item)

      return
    }

    model.value = valueByDomValue.value.get(value) ?? value
  },
})
</script>

<template>
  <span
    v-if="tooltip"
    class="p-tooltip-host"
    :data-tooltip="tooltip"
    :data-placement="tooltipPlacement"
  >
    <select
      v-bind="$attrs"
      :id="field?.id"
      v-model="domModel"
      :disabled="isDisabled"
      :aria-invalid="ariaInvalid"
      :aria-describedby="ariaDescribedBy"
      :multiple="multiple"
      :size="size"
    >
      <option v-if="placeholder && !multiple" disabled value="">
        {{ placeholder }}
      </option>

      <slot>
        <option
          v-for="option in options"
          :key="getOptionDomValue(option)"
          :value="getOptionDomValue(option)"
        >
          {{ getOptionLabel(option) }}
        </option>
      </slot>
    </select>

    <span :id="tooltipId" role="tooltip" class="p-sr-only">{{ tooltip }}</span>
  </span>

  <select
    v-else
    v-bind="$attrs"
    :id="field?.id"
    v-model="domModel"
    :disabled="isDisabled"
    :aria-invalid="ariaInvalid"
    :aria-describedby="ariaDescribedBy"
    :multiple="multiple"
    :size="size"
  >
    <option v-if="placeholder && !multiple" disabled value="">
      {{ placeholder }}
    </option>

    <slot>
      <option
        v-for="option in options"
        :key="getOptionDomValue(option)"
        :value="getOptionDomValue(option)"
      >
        {{ getOptionLabel(option) }}
      </option>
    </slot>
  </select>
</template>
