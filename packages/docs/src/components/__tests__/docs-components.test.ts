import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vite-plus/test'
import DocsApiTable from '../DocsApiTable.vue'
import DocsExample from '../DocsExample.vue'

vi.mock('../../composables/useShiki', () => ({
  useShiki: () => ({
    codeToHtml: vi.fn(async (code: string) => `<pre class="highlight">${code}</pre>`),
  }),
}))

describe('docs component smoke tests', () => {
  it('renders API tables using Pear table semantics', () => {
    const wrapper = mount(DocsApiTable, {
      props: {
        caption: 'Props',
        items: [
          {
            name: 'variant',
            type: "'secondary' | 'contrast'",
            default: "'secondary'",
            description: 'Visual style',
          },
          {
            name: 'disabled',
            type: 'boolean',
            description: 'Disables interaction',
          },
        ],
      },
    })

    expect(wrapper.get('h4').text()).toBe('Props')
    expect(wrapper.findAll('tbody tr')).toHaveLength(2)
    expect(wrapper.findAll('code').map((code) => code.text())).toContain('variant')
    expect(wrapper.text()).toContain('-')
  })

  it('highlights and copies docs examples', async () => {
    vi.useFakeTimers()
    const writeText = vi.fn(async () => {})
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    })

    const wrapper = mount(DocsExample, {
      props: {
        code: `
          <p-button>Save</p-button>
        `,
        language: 'html',
        previewOverflow: 'visible',
      },
      slots: { default: '<button>Preview</button>' },
    })

    await vi.dynamicImportSettled()
    expect(wrapper.get('.docs-example-preview').classes()).toContain(
      'docs-example-preview--visible',
    )
    expect(wrapper.get('.docs-code-header span').text()).toBe('vue')
    expect(wrapper.get('.docs-code-highlight').html()).toContain('p-button')

    await wrapper.get('.docs-code-copy').trigger('click')
    expect(writeText).toHaveBeenCalledWith('<p-button>Save</p-button>')
    expect(wrapper.get('.docs-code-copy').attributes('aria-label')).toBe('Copied')

    vi.advanceTimersByTime(1600)
    await wrapper.vm.$nextTick()
    expect(wrapper.get('.docs-code-copy').attributes('aria-label')).toBe('Copy code')
    vi.useRealTimers()
  })
})
