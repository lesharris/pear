import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vite-plus/test'
import PBusy from '../PBusy.vue'

describe('PBusy', () => {
  it('renders busy state on the requested element', () => {
    const wrapper = mount(PBusy, {
      props: { as: 'section', busy: true, label: 'Loading users' },
      slots: { default: 'Users' },
    })

    expect(wrapper.element.tagName).toBe('SECTION')
    expect(wrapper.attributes('aria-busy')).toBe('true')
    expect(wrapper.attributes('aria-label')).toBe('Loading users')
    expect(wrapper.text()).toBe('Users')

    const idle = mount(PBusy, { props: { busy: false } })
    expect(idle.attributes('aria-busy')).toBeUndefined()
  })
})
