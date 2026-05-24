import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vite-plus/test'
import PButton from '../PButton.vue'

describe('PButton', () => {
  it('renders button variants, native submit inputs, loading state, and disabled tooltips', () => {
    const button = mount(PButton, {
      props: { variant: 'secondary', outline: true },
      slots: { default: 'Save' },
    })

    expect(button.get('button').attributes()).toMatchObject({ type: 'button' })
    expect(button.get('button').classes()).toContain('secondary')
    expect(button.text()).toBe('Save')

    const submit = mount(PButton, { props: { type: 'submit', value: 'Send' } })
    expect(submit.get('input').attributes()).toMatchObject({
      type: 'submit',
      value: 'Send',
    })

    const loading = mount(PButton, {
      props: { loading: true, tooltip: 'Still working', tooltipPlacement: 'right' },
      slots: { default: 'Wait' },
    })

    expect(loading.get('.p-tooltip-host').attributes('data-tooltip')).toBe('Still working')
    expect(loading.get('button').attributes('disabled')).toBeDefined()
    expect(loading.get('button').attributes('aria-busy')).toBe('true')
    expect(loading.get('[role="tooltip"]').text()).toBe('Still working')

    const enabledTooltip = mount(PButton, {
      props: { tooltip: 'Can click', tooltipPlacement: 'bottom' },
      slots: { default: 'Click' },
    })
    expect(enabledTooltip.find('.p-tooltip-host').exists()).toBe(false)
    expect(enabledTooltip.get('button').attributes('data-tooltip')).toBe('Can click')
    expect(enabledTooltip.get('button').attributes('aria-describedby')).toBe(
      enabledTooltip.get('[role="tooltip"]').attributes('id'),
    )

    const reset = mount(PButton, {
      props: { type: 'reset', loading: true },
      slots: { default: 'Reset form' },
    })
    expect(reset.get('button').text()).toBe('Reset form')
  })
})
