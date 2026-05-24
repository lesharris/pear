import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vite-plus/test'
import PSwitcher from '../PSwitcher.vue'

describe('PSwitcher', () => {
  it('applies switcher custom properties', () => {
    const wrapper = mount(PSwitcher, { props: { threshold: '40rem', gap: '1rem' } })

    expect(wrapper.attributes('style')).toContain('--p-switcher-threshold: 40rem')
  })
})
