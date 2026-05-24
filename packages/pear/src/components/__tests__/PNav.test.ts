import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vite-plus/test'
import PNav from '../PNav.vue'
import PNavItem from '../PNavItem.vue'

describe('PNav', () => {
  it('renders left, default, and right nav lists', () => {
    const wrapper = mount(PNav, {
      props: { label: 'Docs' },
      slots: {
        left: h(PNavItem, () => 'Brand'),
        default: h(PNavItem, () => 'Main'),
        right: h(PNavItem, () => 'Actions'),
      },
    })

    expect(wrapper.get('nav').attributes('aria-label')).toBe('Docs')
    expect(wrapper.findAll('ul')).toHaveLength(3)
    expect(wrapper.findAll('li').map((item) => item.text())).toEqual(['Brand', 'Main', 'Actions'])

    const sparse = mount(PNav, {
      slots: { default: h(PNavItem, () => 'Only') },
    })
    expect(sparse.findAll('ul')).toHaveLength(1)
    expect(sparse.get('nav').attributes('aria-label')).toBe('Main')
  })
})
