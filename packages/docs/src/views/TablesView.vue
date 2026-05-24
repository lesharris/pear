<script lang="ts">
import type { DocsMeta } from '@/types/docs'

export const docsMeta = {
  title: 'Tables | Pear',
  description: 'Static table examples using Pear and Pico CSS.',
  tocItems: [
    { id: 'overview', label: 'Overview' },
    { id: 'basic', label: 'Basic' },
    { id: 'striped', label: 'Striped' },
    { id: 'custom-cells', label: 'Cell Slots' },
    { id: 'api', label: 'API' },
  ],
} satisfies DocsMeta
</script>

<script setup lang="ts">
import AppStack from '@/components/layout/AppStack.vue'
import DocsApiTable, { type DocsApiItem } from '@/components/DocsApiTable.vue'
import DocsExample from '@/components/DocsExample.vue'
import DocsIntroCard from '@/components/DocsIntroCard.vue'
import { PCard, PTable, type PTableColumn } from '@ontic/pear'

const columns: PTableColumn[] = [
  { key: 'component', label: 'Component', rowHeader: true },
  { key: 'kind', label: 'Kind' },
  { key: 'status', label: 'Status' },
]

const rows = [
  { component: 'PButton', kind: 'Action', status: 'Ready' },
  { component: 'PTable', kind: 'Content', status: 'New' },
  { component: 'PFieldset', kind: 'Forms', status: 'New' },
]

const tableDataCode = String.raw`
import type { PTableColumn } from "@ontic/pear";

const columns: PTableColumn[] = [
  { key: "component", label: "Component", rowHeader: true },
  { key: "kind", label: "Kind" },
  { key: "status", label: "Status" },
];

const rows = [
  { component: "PButton", kind: "Action", status: "Ready" },
  { component: "PTable", kind: "Content", status: "New" },
  { component: "PFieldset", kind: "Forms", status: "New" },
];
`

const tableCode = String.raw`
<p-table
  caption="Pear component status"
  :columns="columns"
  :rows="rows"
  row-key="component"
/>
`

const stripedCode = String.raw`
<p-table
  caption="Pear component status"
  :columns="columns"
  :rows="rows"
  row-key="component"
  striped
/>
`

const cellSlotCode = String.raw`
<p-table :columns="columns" :rows="rows" row-key="component">
  <template #cell-status="{ value }">
    <mark>{{ value }}</mark>
  </template>
</p-table>
`

const props: DocsApiItem[] = [
  { name: 'columns', type: 'PTableColumn[]', description: 'Column definitions.' },
  { name: 'rows', type: 'PTableRow[]', description: 'Rows to render.' },
  { name: 'caption', type: 'string', description: 'Optional table caption.' },
  {
    name: 'striped',
    type: 'boolean',
    default: 'false',
    description: "Applies Pico's striped table style.",
  },
  {
    name: 'scroll',
    type: 'boolean',
    default: 'false',
    description: 'Wraps the table in a local horizontal scroller.',
  },
  { name: 'rowKey', type: 'string | function', description: 'Stable key for each row.' },
  {
    name: 'theme',
    type: "'light' | 'dark'",
    description: 'Optional Pico data-theme value for the table.',
  },
]

const slots: DocsApiItem[] = [
  { name: 'header-{key}', type: 'slot', description: 'Custom header content for a column.' },
  { name: 'cell-{key}', type: 'slot', description: 'Custom cell content for a column.' },
  { name: 'footer', type: 'slot', description: 'Optional tfoot rows.' },
]
</script>

<template>
  <section id="overview" data-section class="docs-section">
    <DocsIntroCard name="PTable">
      <code>PTable</code> is for static display tables. It keeps the markup semantic and lets Pico
      handle the table styling.
    </DocsIntroCard>
  </section>

  <section id="basic" data-section class="docs-section">
    <p-card>
      <template #header>Basic</template>
      <AppStack>
        <DocsExample :code="tableCode">
          <p-table
            caption="Pear component status"
            :columns="columns"
            :rows="rows"
            row-key="component"
          />
        </DocsExample>
        <DocsExample :code="tableDataCode" language="ts" title="data.ts" />
      </AppStack>
    </p-card>
  </section>

  <section id="striped" data-section class="docs-section">
    <p-card>
      <template #header>Striped</template>
      <AppStack>
        <DocsExample :code="stripedCode">
          <p-table
            caption="Pear component status"
            :columns="columns"
            :rows="rows"
            row-key="component"
            striped
          />
        </DocsExample>
        <DocsExample :code="tableDataCode" language="ts" title="data.ts" />
      </AppStack>
    </p-card>
  </section>

  <section id="custom-cells" data-section class="docs-section">
    <p-card>
      <template #header>Cell Slots</template>
      <p>
        Use <code>#cell-{column.key}</code> to customize any column. This example targets the
        <code>status</code> column.
      </p>
      <AppStack>
        <DocsExample :code="cellSlotCode">
          <p-table :columns="columns" :rows="rows" row-key="component">
            <template #cell-status="{ value }">
              <mark>{{ value }}</mark>
            </template>
          </p-table>
        </DocsExample>
        <DocsExample :code="tableDataCode" language="ts" title="data.ts" />
      </AppStack>
    </p-card>
  </section>

  <section id="api" data-section class="docs-section">
    <p-card>
      <template #header>API</template>
      <AppStack>
        <DocsApiTable caption="PTable Props" :items="props" />
        <DocsApiTable caption="PTable Slots" :items="slots" />
      </AppStack>
    </p-card>
  </section>
</template>
