import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vite-plus/test'

describe('useTheme', () => {
  it('initializes from storage and falls back to system preference', async () => {
    vi.resetModules()
    localStorage.setItem('pear-theme', 'light')
    window.matchMedia = vi.fn().mockReturnValue({ matches: true })

    const { useTheme } = await import('../useTheme')
    const Consumer = defineComponent({
      setup() {
        return useTheme()
      },
      template: '<button @click="toggleTheme">{{ theme }}</button>',
    })

    const wrapper = mount(Consumer)
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toBe('light')

    await wrapper.get('button').trigger('click')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    expect(localStorage.getItem('pear-theme')).toBe('dark')

    const second = mount(Consumer)
    await second.vm.$nextTick()
    expect(second.text()).toBe('dark')
  })

  it('uses system theme when storage is unavailable or invalid', async () => {
    vi.resetModules()
    const getItem = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    const setItem = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    window.matchMedia = vi.fn().mockReturnValue({ matches: false })

    const { useTheme } = await import('../useTheme')
    const Consumer = defineComponent({
      setup() {
        return useTheme()
      },
      template: '<span>{{ theme }}</span>',
    })

    const wrapper = mount(Consumer)
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toBe('light')
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')

    wrapper.vm.toggleTheme()
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toBe('dark')

    getItem.mockRestore()
    setItem.mockRestore()
  })
})
