import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vite-plus/test'
import PThemeSwitcher from '../PThemeSwitcher.vue'

describe('PThemeSwitcher', () => {
  it('toggles labels, pressed state, DOM theme, and local storage', async () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: true })

    const wrapper = mount(PThemeSwitcher)
    await nextTick()

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    expect(wrapper.get('button').attributes('aria-pressed')).toBe('true')
    expect(wrapper.get('button').attributes('aria-label')).toBe('Switch to light theme')

    await wrapper.get('button').trigger('click')

    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
    expect(localStorage.getItem('pear-theme')).toBe('light')
    expect(wrapper.get('button').attributes('aria-pressed')).toBe('false')
  })
})
