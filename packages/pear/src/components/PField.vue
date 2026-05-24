<script setup lang="ts">
import { computed, provide, useId } from 'vue'
import { PFieldKey } from '@/types/PField'

const { label, helper, error, invalid, disabled } = defineProps<{
  label?: string
  helper?: string
  error?: string
  invalid?: boolean
  disabled?: boolean
}>()

const id = useId()

const hasError = computed(() => !!error)

const helperId = computed(() => (helper && !hasError.value ? `${id}-helper` : undefined))

const errorId = computed(() => (hasError.value ? `${id}-error` : undefined))

const describedBy = computed(() => errorId.value ?? helperId.value)

const isInvalid = computed(() => invalid || hasError.value)

const isDisabled = computed(() => disabled || false)

provide(PFieldKey, {
  id,
  describedBy,
  invalid: isInvalid,
  disabled: isDisabled,
})
</script>

<template>
  <div
    class="p-field"
    :class="{
      'p-field--invalid': isInvalid,
      'p-field--disabled': isDisabled,
    }"
  >
    <label v-if="label" :for="id">
      {{ label }}
    </label>

    <slot />

    <small v-if="error" :id="errorId" aria-live="polite">
      {{ error }}
    </small>

    <small v-else-if="helper" :id="helperId">
      {{ helper }}
    </small>
  </div>
</template>

<style scoped>
.p-field {
  display: grid;
  gap: 0.375rem;
}

.p-field--disabled {
  opacity: 0.65;
}
</style>
