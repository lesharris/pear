<script setup lang="ts">
type PGroupAs = 'div' | 'fieldset' | 'form'
type PGroupRole = 'group' | 'search'

const { as = 'div', role = 'group' } = defineProps<{
  as?: PGroupAs
  role?: PGroupRole
}>()
</script>

<template>
  <component :is="as" :role="role">
    <slot />
  </component>
</template>
