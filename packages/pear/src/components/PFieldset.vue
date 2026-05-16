<script setup lang="ts">
import { computed, provide, useId } from 'vue'
import { PFieldKey } from '@/types/PField'

const {
  legend,
  helper,
  error,
  disabled = false,
  invalid = false,
  horizontal = false,
} = defineProps<{
  legend?: string
  helper?: string
  error?: string
  disabled?: boolean
  invalid?: boolean
  horizontal?: boolean
}>()

const id = useId()

const hasError = computed(() => !!error)

const helperId = computed(() =>
  helper && !hasError.value ? `${id}-helper` : undefined,
)

const errorId = computed(() =>
  hasError.value ? `${id}-error` : undefined,
)

const describedBy = computed(() =>
  errorId.value ?? helperId.value,
)

const isInvalid = computed(() =>
  invalid || hasError.value,
)

provide(PFieldKey, {
  describedBy,
  invalid: isInvalid,
  disabled: computed(() => disabled),
})
</script>

<template>
  <fieldset
    class="p-fieldset"
    :class="{ 'p-fieldset--horizontal': horizontal }"
    :disabled="disabled"
    :aria-invalid="isInvalid ? 'true' : undefined"
    :aria-describedby="describedBy"
  >
    <legend v-if="legend">{{ legend }}</legend>

    <div class="p-fieldset__options">
      <slot />
    </div>

    <small
      v-if="error"
      :id="errorId"
      aria-live="polite"
    >
      {{ error }}
    </small>

    <small
      v-else-if="helper"
      :id="helperId"
    >
      {{ helper }}
    </small>
  </fieldset>
</template>

<style scoped>
.p-fieldset {
  display: grid;
  gap: 0.375rem;
}

.p-fieldset__options {
  display: grid;
  gap: 0.25rem;
}

.p-fieldset--horizontal .p-fieldset__options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  align-items: center;
}
</style>
