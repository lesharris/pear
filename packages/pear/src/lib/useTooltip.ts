import { computed, useId } from 'vue'

export function useTooltip(
  tooltip: () => string | undefined,
  describedBy?: () => string | undefined,
) {
  const tooltipId = useId()

  const ariaDescribedBy = computed(() => {
    const parts = [describedBy?.(), tooltip() ? tooltipId : undefined].filter(Boolean)

    return parts.length ? parts.join(' ') : undefined
  })

  return { tooltipId, ariaDescribedBy }
}
