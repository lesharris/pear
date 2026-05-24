import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vite-plus/test'
import PBreadcrumb from '../PBreadcrumb.vue'

describe('PBreadcrumb', () => {
  it('renders breadcrumbs with current page semantics and custom dividers', () => {
    const wrapper = mount(PBreadcrumb, {
      props: {
        label: 'Trail',
        divider: '>',
        items: [
          { label: 'Home', href: '/' },
          { label: 'Docs', href: '/docs' },
          { label: 'Buttons', href: '/docs/buttons', current: true },
        ],
      },
    })

    expect(wrapper.get('nav').attributes('aria-label')).toBe('Trail')
    expect(wrapper.get('nav').attributes('style')).toContain('--pico-nav-breadcrumb-divider')
    expect(wrapper.findAll('a')).toHaveLength(2)
    expect(wrapper.get('[aria-current="page"]').text()).toBe('Buttons')

    const slotted = mount(PBreadcrumb, { slots: { default: '<ol><li>Custom</li></ol>' } })
    expect(slotted.get('ol').text()).toBe('Custom')
  })
})
