import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vite-plus/test'
import { PModalKey } from '../../types/PModal'
import { useModal } from '../useModal'

describe('useModal', () => {
  it('throws when called outside a provider', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation((message: unknown) => {
      const text = String(message)
      const expectedWarnings = [
        'injection "Symbol(PModal)" not found',
        'Component is missing template or render function',
      ]

      if (!expectedWarnings.some((expected) => text.includes(expected))) {
        throw new Error(`Unexpected Vue warning: ${text}`)
      }
    })
    const Consumer = defineComponent({
      setup() {
        useModal()
        return () => null
      },
    })

    try {
      expect(() => mount(Consumer)).toThrow('useModal() must be used inside <PModalProvider>.')
    } finally {
      warn.mockRestore()
    }
  })

  it('returns injected modal context inside a provider', () => {
    const context = {
      open: async () => 'opened',
      close: () => {},
    }
    const Consumer = defineComponent({
      setup() {
        return () => h('button', { onClick: () => useModal().close('done') }, 'Close')
      },
    })

    const wrapper = mount(Consumer, {
      global: {
        provide: {
          [PModalKey as symbol]: context,
        },
      },
    })

    expect(wrapper.get('button').text()).toBe('Close')
  })
})
