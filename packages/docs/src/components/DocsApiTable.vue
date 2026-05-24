<script setup lang="ts">
import { PTable, type PTableColumn } from '@ontic/pear'

export type DocsApiItem = {
  name: string
  type: string
  default?: string
  description: string
}

defineProps<{
  caption: string
  items: DocsApiItem[]
}>()

const columns: PTableColumn[] = [
  { key: 'name', label: 'Name', rowHeader: true },
  { key: 'type', label: 'Type' },
  { key: 'default', label: 'Default' },
  { key: 'description', label: 'Description' },
]
</script>

<template>
  <div class="docs-api-table">
    <h4>{{ caption }}</h4>
    <p-table :columns="columns" :rows="items" row-key="name" scroll>
      <template #cell-name="{ value }">
        <code>{{ value }}</code>
      </template>
      <template #cell-type="{ value }">
        <code>{{ value }}</code>
      </template>
      <template #cell-default="{ value }">
        {{ value ?? '-' }}
      </template>
    </p-table>
  </div>
</template>

<style scoped>
.docs-api-table {
  overflow-x: auto;
}

.docs-api-table :deep(table) {
  width: 100%;
  table-layout: fixed;
}

.docs-api-table :deep(th),
.docs-api-table :deep(td) {
  vertical-align: top;
  overflow-wrap: anywhere;
}

.docs-api-table :deep(th:nth-child(1)),
.docs-api-table :deep(td:nth-child(1)) {
  width: 22%;
}

.docs-api-table :deep(th:nth-child(2)),
.docs-api-table :deep(td:nth-child(2)) {
  width: 28%;
}

.docs-api-table :deep(th:nth-child(3)),
.docs-api-table :deep(td:nth-child(3)) {
  width: 14%;
}

.docs-api-table :deep(th:nth-child(4)),
.docs-api-table :deep(td:nth-child(4)) {
  width: 36%;
}

.docs-api-table :deep(code) {
  white-space: normal;
  overflow-wrap: anywhere;
}

@media (max-width: 700px) {
  .docs-api-table :deep(table) {
    min-width: 38rem;
  }
}
</style>
