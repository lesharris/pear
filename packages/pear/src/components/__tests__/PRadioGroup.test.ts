import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vite-plus/test'
import PRadioGroup from '../PRadioGroup.vue'

const options = [
  { label: 'Alpha', value: 'a' },
  { label: 'Bravo', value: 'b', disabled: true },
]

describe('PRadioGroup', () => {
  it('renders grouped radios with slots and disabled options', () => {
    const wrapper = mount(PRadioGroup, {
      props: { modelValue: 'a', options, legend: 'Pick one', horizontal: true },
      slots: {
        option: '<span>{{ index }}:{{ option.label }}:{{ checked }}</span>',
      },
    })

    expect(wrapper.get('legend').text()).toBe('Pick one')
    expect(wrapper.get('.p-fieldset').classes()).toContain('p-fieldset--horizontal')
    expect(wrapper.findAll('input')[1]?.attributes('disabled')).toBeDefined()
    expect(wrapper.text()).toContain('0:Alpha:true')
  })
})
