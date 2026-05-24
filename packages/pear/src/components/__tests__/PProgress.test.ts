import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vite-plus/test'
import PProgress from '../PProgress.vue'

describe('PProgress', () => {
  it('renders determinate and indeterminate progress with accessible labels', () => {
    const determinate = mount(PProgress, {
      props: { label: 'Upload', value: 25, max: 50, tooltip: 'Halfway' },
    })

    expect(determinate.get('progress').attributes()).toMatchObject({
      'aria-label': 'Upload',
      value: '25',
      max: '50',
    })
    expect(determinate.get('.p-tooltip-host').attributes('data-tooltip')).toBe('Halfway')

    const indeterminate = mount(PProgress, {
      props: { value: 25, indeterminate: true },
    })

    expect(indeterminate.get('progress').attributes('value')).toBeUndefined()

    const defaultProgress = mount(PProgress)
    expect(defaultProgress.get('progress').attributes('aria-label')).toBe('Loading')
    expect(defaultProgress.get('progress').attributes('max')).toBe('100')
  })
})
