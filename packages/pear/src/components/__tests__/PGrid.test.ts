import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vite-plus/test'
import PGrid from '../PGrid.vue'

describe('PGrid', () => {
  it('applies grid custom properties', () => {
    const wrapper = mount(PGrid, { props: { min: '12rem', gap: '3rem' } })

    expect(wrapper.classes()).toContain('p-grid')
    expect(wrapper.attributes('style')).toContain('--p-grid-min: 12rem')
  })
})
