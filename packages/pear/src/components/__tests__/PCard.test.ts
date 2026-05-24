import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vite-plus/test'
import PCard from '../PCard.vue'

describe('PCard', () => {
  it('renders header, default, and footer slots', () => {
    const wrapper = mount(PCard, {
      slots: {
        header: 'Top',
        default: 'Body',
        footer: 'Bottom',
      },
    })

    expect(wrapper.get('article').text()).toContain('Top')
    expect(wrapper.get('article').text()).toContain('Body')
    expect(wrapper.get('footer').text()).toBe('Bottom')
  })
})
