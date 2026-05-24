<script setup lang="ts">
import { computed, useId } from 'vue'
import PCheckbox from './PCheckbox.vue'
import PFieldset from './PFieldset.vue'
import type { PChoiceOption, PChoiceValue } from '@/types/PChoiceGroup'

const model = defineModel<PChoiceValue[]>({ default: () => [] })

const {
  options,
  name,
  legend,
  helper,
  error,
  disabled = false,
  invalid = false,
  horizontal = false,
  switch: isSwitch = false,
} = defineProps<{
  options: PChoiceOption[]
  name?: string
  legend?: string
  helper?: string
  error?: string
  disabled?: boolean
  invalid?: boolean
  horizontal?: boolean
  switch?: boolean
}>()

const fallbackName = useId()

const groupName = computed(() => name ?? fallbackName)
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
    <p-checkbox
      v-for="(option, index) in options"
      :key="`${option.value}-${index}`"
      v-model="model"
      :name="groupName"
      :value="option.value"
      :disabled="option.disabled"
      :switch="isSwitch"
    >
      <slot name="option" :option="option" :index="index" :checked="model.includes(option.value)">
        {{ option.label }}
      </slot>
    </p-checkbox>
  </p-fieldset>
</template>
