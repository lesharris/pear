import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vite-plus/test'
import PField from '../PField.vue'
import PInput from '../PInput.vue'

describe('PField', () => {
  it('connects labels, helper/error text, invalid state, and disabled state to child input', () => {
    const wrapper = mount(PField, {
      props: { label: 'Email', helper: 'Use work email', disabled: true },
      slots: {
        default: h(PInput, { modelValue: 'les@example.com', 'onUpdate:modelValue': () => {} }),
      },
    })

    const input = wrapper.get('input')
    const label = wrapper.get('label')
    const helper = wrapper.get('small')

    expect(label.attributes('for')).toBe(input.attributes('id'))
    expect(input.attributes('disabled')).toBeDefined()
    expect(input.attributes('aria-describedby')).toBe(helper.attributes('id'))

    const invalid = mount(PField, {
      props: { label: 'Name', error: 'Required' },
      slots: {
        default: h(PInput, { modelValue: '', 'onUpdate:modelValue': () => {} }),
      },
    })

    expect(invalid.get('input').attributes('aria-invalid')).toBe('true')
    expect(invalid.get('[aria-live="polite"]').text()).toBe('Required')
    expect(invalid.classes()).toContain('p-field--invalid')
  })
})
