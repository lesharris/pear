import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vite-plus/test'
import PTextarea from '../PTextarea.vue'

describe('PTextarea', () => {
  it('updates text models and renders tooltip wrappers', async () => {
    const updates: unknown[] = []
    const wrapper = mount(PTextarea, {
      props: {
        modelValue: '',
        readonly: true,
        tooltip: 'Long form',
        'onUpdate:modelValue': (value: unknown) => updates.push(value),
      },
    })

    await wrapper.get('textarea').setValue('Notes')
    expect(updates).toEqual(['Notes'])
    expect(wrapper.get('.p-tooltip-host').attributes('data-tooltip')).toBe('Long form')
    expect(wrapper.get('textarea').attributes('readonly')).toBeDefined()
  })
})
