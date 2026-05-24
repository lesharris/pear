import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vite-plus/test'
import PSidebar from '../PSidebar.vue'

describe('PSidebar', () => {
  it('applies side and sizing custom properties', () => {
    const wrapper = mount(PSidebar, { props: { side: 'right', sideWidth: '20rem' } })

    expect(wrapper.classes()).toContain('p-sidebar--right')
    expect(wrapper.attributes('style')).toContain('--p-sidebar-side-width: 20rem')
  })
})
