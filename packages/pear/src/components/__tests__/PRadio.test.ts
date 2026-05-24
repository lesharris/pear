import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vite-plus/test'
import PRadio from '../PRadio.vue'

describe('PRadio', () => {
  it('updates the model when checked', async () => {
    const updates: unknown[] = []
    const wrapper = mount(PRadio, {
      props: {
        modelValue: 'a',
        value: 'b',
        'onUpdate:modelValue': (value: unknown) => updates.push(value),
      },
    })

    await wrapper.get('input').setValue(true)
    expect(updates).toEqual(['b'])
  })
})
