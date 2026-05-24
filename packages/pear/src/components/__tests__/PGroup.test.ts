import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vite-plus/test'
import PGroup from '../PGroup.vue'

describe('PGroup', () => {
  it('renders group semantics', () => {
    const wrapper = mount(PGroup, {
      props: { as: 'form', role: 'search' },
      slots: { default: '<input />' },
    })

    expect(wrapper.element.tagName).toBe('FORM')
    expect(wrapper.attributes('role')).toBe('search')
  })
})
