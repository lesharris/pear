import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vite-plus/test'
import PAccordion from '../PAccordion.vue'
import PAccordionGroup from '../PAccordionGroup.vue'

describe('PAccordion', () => {
  it('syncs open state and supports button summary styling', async () => {
    const wrapper = mount(PAccordion, {
      props: { summary: 'Details', open: false, button: true, variant: 'contrast', outline: true },
      slots: { default: 'Hidden content' },
    })

    const details = wrapper.get('details').element as HTMLDetailsElement
    details.open = true
    await wrapper.get('details').trigger('toggle')

    expect(wrapper.emitted('update:open')).toContainEqual([true])
    expect(wrapper.get('summary').attributes('role')).toBe('button')
    expect(wrapper.get('summary').classes()).toContain('contrast')

    await wrapper.setProps({ open: true } as never)
    await wrapper.setProps({ open: false } as never)
    expect(wrapper.get('details').attributes('open')).toBeUndefined()
  })

  it('uses group names for exclusive accordions', () => {
    const group = mount(PAccordionGroup, {
      props: { exclusive: true, name: 'faq' },
      slots: {
        default: [
          h(PAccordion, { summary: 'One' }),
          h(PAccordion, { summary: 'Two', name: 'custom' }),
        ],
      },
    })

    const accordions = group.findAll('details')
    expect(accordions[0]?.attributes('name')).toBe('faq')
    expect(accordions[1]?.attributes('name')).toBe('custom')

    const nonExclusive = mount(PAccordionGroup, {
      slots: { default: h(PAccordion, { summary: 'Loose' }) },
    })
    expect(nonExclusive.get('details').attributes('name')).toBeUndefined()
  })
})
