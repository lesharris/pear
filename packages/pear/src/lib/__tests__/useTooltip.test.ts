import { computed, defineComponent, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vite-plus/test'
import { useTooltip } from '../useTooltip'

describe('useTooltip', () => {
  it('composes tooltip descriptions with existing described-by ids', async () => {
    const Consumer = defineComponent({
      setup() {
        const tooltip = ref<string | undefined>('Helpful')
        const describedBy = ref<string | undefined>('helper-id')
        const { tooltipId, ariaDescribedBy } = useTooltip(
          () => tooltip.value,
          () => describedBy.value,
        )
        return {
          tooltip,
          describedBy,
          tooltipId,
          ariaDescribedBy,
          label: computed(() => ariaDescribedBy.value ?? 'none'),
        }
      },
      template: '<span :aria-describedby="ariaDescribedBy">{{ label }}</span>',
    })

    const wrapper = mount(Consumer)
    const id = wrapper.vm.tooltipId

    expect(wrapper.get('span').attributes('aria-describedby')).toBe(`helper-id ${id}`)

    wrapper.vm.tooltip = undefined
    await wrapper.vm.$nextTick()
    expect(wrapper.get('span').attributes('aria-describedby')).toBe('helper-id')

    wrapper.vm.describedBy = undefined
    await wrapper.vm.$nextTick()
    expect(wrapper.get('span').attributes('aria-describedby')).toBeUndefined()
  })
})
