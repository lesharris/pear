import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vite-plus/test'
import PCluster from '../PCluster.vue'

describe('PCluster', () => {
  it('applies layout custom properties and element choice', () => {
    const wrapper = mount(PCluster, {
      props: { as: 'section', gap: '1rem', align: 'start', justify: 'space-between' },
      slots: { default: '<span />' },
    })

    expect(wrapper.element.tagName).toBe('SECTION')
    expect(wrapper.attributes('style')).toContain('--p-cluster-gap: 1rem')
  })
})
