<script setup lang="ts">
import { computed, inject } from 'vue'
import { PFieldKey } from '@/types/PField'
import { useTooltip } from '@/lib/useTooltip'
import type { PTooltipProps } from '@/types/PTooltip'

defineOptions({
  inheritAttrs: false,
})

const model = defineModel<string>()

const {
  disabled,
  readonly,
  invalid,
  tooltip,
  tooltipPlacement,
} = defineProps<{
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
  model.value = (event.target as HTMLTextAreaElement).value
}
</script>

<template>
  <span
    v-if="tooltip"
    class="p-tooltip-host"
    :data-tooltip="tooltip"
    :data-placement="tooltipPlacement"
  >
    <textarea
      v-bind="$attrs"
      :id="field?.id"
      :value="model"
      :disabled="isDisabled"
      :readonly="readonly"
      :aria-invalid="ariaInvalid"
      :aria-describedby="ariaDescribedBy"
      @input="updateValue"
    />

    <span :id="tooltipId" role="tooltip" class="p-sr-only">{{ tooltip }}</span>
  </span>

  <textarea
    v-else
    v-bind="$attrs"
    :id="field?.id"
    :value="model"
    :disabled="isDisabled"
    :readonly="readonly"
    :aria-invalid="ariaInvalid"
    :aria-describedby="ariaDescribedBy"
    @input="updateValue"
  />
</template>

