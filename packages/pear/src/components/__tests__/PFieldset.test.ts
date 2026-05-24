import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vite-plus/test'
import PCheckbox from '../PCheckbox.vue'
import PFieldset from '../PFieldset.vue'
import PRange from '../PRange.vue'

describe('PFieldset', () => {
  it('provides fieldset state to choice controls', () => {
    const wrapper = mount(PFieldset, {
      props: { legend: 'Choices', helper: 'Pick wisely', disabled: true, invalid: true },
      slots: {
        default: h(PCheckbox, { modelValue: false, 'onUpdate:modelValue': () => {} }),
      },
    })

    expect(wrapper.get('fieldset').attributes('disabled')).toBeDefined()
    expect(wrapper.get('fieldset').attributes('aria-invalid')).toBe('true')
    expect(wrapper.get('input').attributes('disabled')).toBeDefined()
    expect(wrapper.get('input').attributes('aria-invalid')).toBe('true')
    expect(wrapper.get('fieldset').attributes('aria-describedby')).toBe(
      wrapper.get('small').attributes('id'),
    )

    const error = mount(PFieldset, {
      props: { legend: 'Choices', helper: 'Helpful', error: 'Broken' },
      slots: { default: '<input />' },
    })
    expect(error.get('[aria-live="polite"]').text()).toBe('Broken')
    expect(error.get('fieldset').attributes('aria-invalid')).toBe('true')

    const range = mount(PFieldset, {
      props: { helper: 'Slide', invalid: true },
      slots: {
        default: h(PRange, {
          modelValue: undefined,
          tooltip: 'Drag',
          'onUpdate:modelValue': () => {},
        }),
      },
    })
    expect(range.get('.p-tooltip-host').attributes('data-tooltip')).toBe('Drag')
    expect(range.get('input').attributes('aria-invalid')).toBe('true')
    expect(range.get('input').attributes('aria-describedby')).toContain(
      range.get('small').attributes('id')!,
    )
  })
})
