import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vite-plus/test'
import PDropdown from '../PDropdown.vue'

describe('PDropdown', () => {
  it('syncs open state and exposes alignment, invalid, and tooltip attributes', async () => {
    const wrapper = mount(PDropdown, {
      props: {
        summary: 'Menu',
        button: true,
        open: true,
        invalid: true,
        align: 'end',
        tooltip: 'Open menu',
      },
      slots: { default: '<li><a href="/docs">Docs</a></li>' },
    })

    expect(wrapper.get('details').attributes('open')).toBeDefined()
    expect(wrapper.get('summary').attributes('aria-invalid')).toBe('true')
    expect(wrapper.get('summary').attributes('data-tooltip')).toBe('Open menu')
    expect(wrapper.get('ul').attributes('dir')).toBe('rtl')

    const details = wrapper.get('details').element as HTMLDetailsElement
    details.open = false
    await wrapper.get('details').trigger('toggle')
    expect(wrapper.emitted('update:open')).toContainEqual([false])

    await wrapper.setProps({ open: true, align: 'start', button: false, invalid: false } as never)
    expect(wrapper.get('ul').attributes('dir')).toBeUndefined()
    expect(wrapper.get('summary').attributes('role')).toBeUndefined()
    expect(wrapper.get('summary').attributes('aria-invalid')).toBeUndefined()
  })
})
