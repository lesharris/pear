import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vite-plus/test'
import PTooltip from '../PTooltip.vue'

describe('PTooltip', () => {
  it('renders tooltip hosts with stable accessible descriptions', () => {
    const wrapper = mount(PTooltip, {
      props: { content: 'Helpful', placement: 'bottom', as: 'button' },
      attrs: { type: 'button' },
      slots: { default: 'Hover me' },
    })

    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.attributes('data-tooltip')).toBe('Helpful')
    expect(wrapper.attributes('data-placement')).toBe('bottom')
    expect(wrapper.attributes('aria-describedby')).toBe(
      wrapper.get('[role="tooltip"]').attributes('id'),
    )
  })
})
