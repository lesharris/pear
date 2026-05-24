import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vite-plus/test'
import PCheckbox from '../PCheckbox.vue'

describe('PCheckbox', () => {
  it('updates scalar and array models', async () => {
    const checkboxUpdates: unknown[] = []
    const checkbox = mount(PCheckbox, {
      props: {
        modelValue: ['a'],
        value: 'b',
        tooltip: 'Toggle b',
        'onUpdate:modelValue': (value: unknown) => checkboxUpdates.push(value),
      },
      slots: { default: 'Bravo' },
    })

    await checkbox.get('input').setValue(true)
    expect(checkboxUpdates).toEqual([['a', 'b']])
    expect(checkbox.get('label').attributes('data-tooltip')).toBe('Toggle b')

    const booleanUpdates: unknown[] = []
    const booleanCheckbox = mount(PCheckbox, {
      props: {
        modelValue: true,
        value: true,
        uncheckedValue: 'nope',
        switch: true,
        indeterminate: true,
        'onUpdate:modelValue': (value: unknown) => booleanUpdates.push(value),
      },
    })
    await booleanCheckbox.get('input').setValue(false)
    expect(booleanUpdates).toEqual(['nope'])
    expect(booleanCheckbox.get('input').attributes('role')).toBe('switch')
    expect((booleanCheckbox.get('input').element as HTMLInputElement).indeterminate).toBe(true)
  })
})
