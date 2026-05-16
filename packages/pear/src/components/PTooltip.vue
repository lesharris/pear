<script setup lang="ts">
import { useId } from 'vue'
import type { PTooltipPlacement } from '@/types/PTooltip'

defineOptions({
  inheritAttrs: false,
})

const {
  content,
  placement,
  as = 'span',
} = defineProps<{
  content: string
  placement?: PTooltipPlacement
  as?: string
}>()

const tooltipId = useId()
</script>

<template>
  <component
    :is="as"
    v-bind="$attrs"
    class="p-tooltip-host p-tooltip-host--inline"
    :data-tooltip="content"
    :data-placement="placement"
    :aria-describedby="tooltipId"
  >
    <slot />
    <span :id="tooltipId" role="tooltip" class="p-sr-only">{{ content }}</span>
  </component>
</template>
