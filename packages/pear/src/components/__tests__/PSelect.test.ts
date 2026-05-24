import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vite-plus/test'
import PSelect from '../PSelect.vue'

describe('PSelect', () => {
  it('maps DOM values back to primitive and object option values', async () => {
    const updates: unknown[] = []
    const select = mount(PSelect, {
      props: {
        modelValue: '',
        placeholder: 'Choose',
        options: [
          { label: 'One', value: 1 },
          { label: 'Two', value: 2 },
        ],
        'onUpdate:modelValue': (value: unknown) => updates.push(value),
      },
    })

    expect(select.findAll('option')[0]?.text()).toBe('Choose')
    await select.get('select').setValue('2')
    expect(updates).toEqual([2])

    const multipleUpdates: unknown[] = []
    const multiple = mount(PSelect, {
      props: {
        modelValue: ['a'],
        multiple: true,
        size: 3,
        options: ['a', 'b', 'c'],
        tooltip: 'Several',
        'onUpdate:modelValue': (value: unknown) => multipleUpdates.push(value),
      },
    })

    const element = multiple.get('select').element as HTMLSelectElement
    element.options[0]!.selected = true
    element.options[2]!.selected = true
    await multiple.get('select').trigger('change')
    expect(multipleUpdates).toEqual([['a', 'c']])
    expect(multiple.get('.p-tooltip-host').attributes('data-tooltip')).toBe('Several')

    const fallback = mount(PSelect, {
      props: {
        modelValue: undefined,
        options: [{ label: 'Missing value' }, 7],
        optionLabel: 'missing',
      },
    })
    expect(fallback.findAll('option').map((option) => option.attributes('value'))).toEqual([
      '',
      '7',
    ])
  })
})
