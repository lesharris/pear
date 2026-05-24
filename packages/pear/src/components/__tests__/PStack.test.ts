import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vite-plus/test'
import PStack from '../PStack.vue'

describe('PStack', () => {
  it('applies layout custom properties and element choice', () => {
    const wrapper = mount(PStack, {
      props: { as: 'aside', gap: '2rem' },
      slots: { default: '<p />' },
    })

    expect(wrapper.element.tagName).toBe('ASIDE')
    expect(wrapper.attributes('style')).toContain('--p-stack-gap: 2rem')
  })
})
