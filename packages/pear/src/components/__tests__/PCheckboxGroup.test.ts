import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vite-plus/test'
import PCheckboxGroup from '../PCheckboxGroup.vue'

const options = [
  { label: 'Alpha', value: 'a' },
  { label: 'Bravo', value: 'b', disabled: true },
]

describe('PCheckboxGroup', () => {
  it('renders grouped checkboxes with slots, names, and switch role', () => {
    const wrapper = mount(PCheckboxGroup, {
      props: { modelValue: ['a'], options, legend: 'Letters', name: 'letters', switch: true },
      slots: {
        option: '<span>{{ index }}:{{ option.label }}:{{ checked }}</span>',
      },
    })

    expect(wrapper.get('legend').text()).toBe('Letters')
    expect(wrapper.findAll('input')).toHaveLength(2)
    expect(wrapper.findAll('input')[0]?.attributes('name')).toBe('letters')
    expect(wrapper.findAll('input')[0]?.attributes('role')).toBe('switch')
    expect(wrapper.text()).toContain('0:Alpha:true')

    const fallbackNames = mount(PCheckboxGroup, { props: { options } })
    expect(fallbackNames.findAll('input')[0]?.attributes('name')).toBeTruthy()
  })
})
