import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vite-plus/test'
import PInline from '../PInline.vue'

describe('PInline', () => {
  it('applies layout custom properties and element choice', () => {
    const wrapper = mount(PInline, {
      props: { as: 'menu', gap: '0.5rem', align: 'end', justify: 'center' },
      slots: { default: '<li />' },
    })

    expect(wrapper.element.tagName).toBe('MENU')
    expect(wrapper.attributes('style')).toContain('--p-inline-justify: center')
  })
})
