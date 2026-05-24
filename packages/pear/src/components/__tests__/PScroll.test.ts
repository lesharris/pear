import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vite-plus/test'
import PScroll from '../PScroll.vue'

describe('PScroll', () => {
  it('renders as the requested element', () => {
    const wrapper = mount(PScroll, { props: { as: 'main' }, slots: { default: 'Scroll' } })

    expect(wrapper.element.tagName).toBe('MAIN')
    expect(wrapper.classes()).toContain('p-scroll')
  })
})
