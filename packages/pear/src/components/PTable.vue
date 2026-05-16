<script setup lang="ts">
import type { PTableColumn, PTableRow } from '@/types/PTable'

defineOptions({
  inheritAttrs: false,
})

const {
  columns,
  rows,
  caption,
  striped = false,
  scroll = false,
  rowKey,
  theme,
} = defineProps<{
  columns: PTableColumn[]
  rows: PTableRow[]
  caption?: string
  striped?: boolean
  scroll?: boolean
  rowKey?: string | ((row: PTableRow, index: number) => string | number)
  theme?: 'light' | 'dark'
}>()

function getRowKey(row: PTableRow, index: number) {
  if (typeof rowKey === 'function') return rowKey(row, index)
  if (rowKey && row[rowKey] != null) return String(row[rowKey])
  return index
}

function getCell(row: PTableRow, column: PTableColumn) {
  return row[column.key]
}
</script>

<template>
  <div :class="{ 'p-table-scroll': scroll }">
    <table
      v-bind="$attrs"
      :class="{ striped }"
      :data-theme="theme"
    >
      <caption v-if="caption">{{ caption }}</caption>
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            scope="col"
            :data-theme="column.theme"
            :style="{ textAlign: column.align }"
          >
            <slot :name="`header-${column.key}`" :column="column">
              {{ column.label }}
            </slot>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in rows" :key="getRowKey(row, rowIndex)">
          <component
            :is="column.rowHeader ? 'th' : 'td'"
            v-for="column in columns"
            :key="column.key"
            :scope="column.rowHeader ? 'row' : undefined"
            :data-theme="column.theme"
            :style="{ textAlign: column.align }"
          >
            <slot
              :name="`cell-${column.key}`"
              :row="row"
              :column="column"
              :value="getCell(row, column)"
              :row-index="rowIndex"
            >
              {{ getCell(row, column) }}
            </slot>
          </component>
        </tr>
      </tbody>
      <tfoot v-if="$slots.footer">
        <slot name="footer" />
      </tfoot>
    </table>
  </div>
</template>

<style scoped>
.p-table-scroll {
  max-width: 100%;
  overflow-x: auto;
}
</style>

