import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vite-plus/test'
import PTable from '../PTable.vue'

describe('PTable', () => {
  it('renders captions, slots, themes, alignment, row headers, and scroll wrappers', () => {
    const wrapper = mount(PTable, {
      props: {
        caption: 'Users',
        striped: true,
        scroll: true,
        theme: 'dark',
        rowKey: (row: Record<string, unknown>) => String(row.id),
        columns: [
          { key: 'name', label: 'Name', rowHeader: true, theme: 'light' },
          { key: 'score', label: 'Score', align: 'right' },
        ],
        rows: [
          { id: 1, name: 'Les', score: 10 },
          { id: 2, name: 'Pear', score: 20 },
        ],
      },
      slots: {
        'header-score': '<span>Points</span>',
        'cell-score': '<strong>{{ value }}</strong>',
        footer: '<tr><td colspan="2">Total</td></tr>',
      },
    })

    expect(wrapper.find('.p-table-scroll').exists()).toBe(true)
    expect(wrapper.get('caption').text()).toBe('Users')
    expect(wrapper.get('table').classes()).toContain('striped')
    expect(wrapper.get('table').attributes('data-theme')).toBe('dark')
    expect(wrapper.findAll('tbody th')).toHaveLength(2)
    expect(wrapper.findAll('strong').map((cell) => cell.text())).toEqual(['10', '20'])
    expect(wrapper.get('tfoot').text()).toBe('Total')
    expect(wrapper.findAll('thead th')[1]?.attributes('style')).toContain('text-align: right')

    const fallbackKeys = mount(PTable, {
      props: {
        rowKey: 'id',
        columns: [{ key: 'name', label: 'Name' }],
        rows: [{ id: 'user-1', name: 'Les' }],
      },
    })
    expect(fallbackKeys.get('td').text()).toBe('Les')

    const indexKeys = mount(PTable, {
      props: {
        rowKey: 'missing',
        columns: [{ key: 'name', label: 'Name' }],
        rows: [{ name: 'No id' }],
      },
    })
    expect(indexKeys.get('td').text()).toBe('No id')
  })
})
