<script setup lang="ts">
import { computed, useId } from 'vue'
import PFieldset from './PFieldset.vue'
import PRadio from './PRadio.vue'
import type { PChoiceOption, PChoiceValue } from '@/types/PChoiceGroup'

const model = defineModel<PChoiceValue>()

const {
  options,
  name,
  legend,
  helper,
  error,
  disabled = false,
  invalid = false,
  horizontal = false,
} = defineProps<{
  options: PChoiceOption[]
  name?: string
  legend?: string
  helper?: string
  error?: string
  disabled?: boolean
  invalid?: boolean
  horizontal?: boolean
}>()

const fallbackName = useId()

const groupName = computed(() =>
  name ?? fallbackName,
)
</script>

<template>
  <p-fieldset
    :legend="legend"
    :helper="helper"
    :error="error"
    :disabled="disabled"
    :invalid="invalid"
    :horizontal="horizontal"
  >
    <p-radio
      v-for="(option, index) in options"
      :key="`${option.value}-${index}`"
      v-model="model"
      :name="groupName"
      :value="option.value"
      :disabled="option.disabled"
    >
      <slot
        name="option"
        :option="option"
        :index="index"
        :checked="model === option.value"
      >
        {{ option.label }}
      </slot>
    </p-radio>
  </p-fieldset>
</template>
