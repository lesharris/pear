import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vite-plus/test'
import PRange from '../PRange.vue'

describe('PRange', () => {
  it('updates numeric models and can show the current value', async () => {
    const updates: unknown[] = []
    const wrapper = mount(PRange, {
      props: {
        modelValue: 5,
        min: 0,
        max: 10,
        step: 0.5,
        showValue: true,
        'onUpdate:modelValue': (value: unknown) => updates.push(value),
      },
    })

    await wrapper.get('input').setValue('7.5')
    expect(updates).toEqual([7.5])
    expect(wrapper.get('output').text()).toBe('5')
  })
})
