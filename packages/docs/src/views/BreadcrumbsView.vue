<script lang="ts">
import type { DocsMeta } from '@/types/docs'

export const docsMeta = {
  title: 'Breadcrumbs | Pear',
  description: 'Breadcrumb navigation examples for Pear.',
  tocItems: [
    { id: 'overview', label: 'Overview' },
    { id: 'items', label: 'Items' },
    { id: 'slots', label: 'Slots' },
    { id: 'api', label: 'API' },
  ],
} satisfies DocsMeta
</script>

<script setup lang="ts">
import DocsApiTable, { type DocsApiItem } from '@/components/DocsApiTable.vue'
import DocsExample from '@/components/DocsExample.vue'
import DocsIntroCard from '@/components/DocsIntroCard.vue'
import { PBreadcrumb, PCard } from '@ontic/pear'

const items = [
  { label: 'Docs', href: '#docs' },
  { label: 'Layout', href: '#layout' },
  { label: 'Breadcrumbs', current: true },
]

const itemsCode = String.raw`
<p-breadcrumb :items="items" />
`

const slotsCode = String.raw`
<p-breadcrumb>
  <ul>
    <li><RouterLink to="/docs">Docs</RouterLink></li>
    <li><RouterLink to="/docs/layout">Layout</RouterLink></li>
    <li><span aria-current="page">Pear</span></li>
  </ul>
</p-breadcrumb>
`

const props: DocsApiItem[] = [
  {
    name: 'items',
    type: 'PBreadcrumbItem[]',
    description: 'Labels with optional hrefs. Use the slot for RouterLink or custom markup.',
  },
  { name: 'label', type: 'string', default: "'Breadcrumb'", description: 'Accessible nav label.' },
  { name: 'divider', type: 'string', description: 'Optional Pico breadcrumb divider.' },
  { name: 'default', type: 'slot', description: 'Custom breadcrumb markup.' },
]
</script>

<template>
  <section id="overview" data-section class="docs-section">
    <DocsIntroCard name="PBreadcrumb">
      <code>PBreadcrumb</code> wraps Pico's breadcrumb nav pattern. Use the <code>items</code> prop
      for simple links, or slot your own list when your app needs router links or custom markup.
    </DocsIntroCard>
  </section>

  <section id="items" data-section class="docs-section">
    <p-card>
      <template #header>Items</template>
      <DocsExample :code="itemsCode">
        <p-breadcrumb :items="items" />
      </DocsExample>
    </p-card>
  </section>

  <section id="slots" data-section class="docs-section">
    <p-card>
      <template #header>Slots</template>
      <DocsExample :code="slotsCode">
        <p-breadcrumb>
          <ul>
            <li><RouterLink to="/docs">Docs</RouterLink></li>
            <li><RouterLink to="/docs/layout">Layout</RouterLink></li>
            <li><span aria-current="page">Pear</span></li>
          </ul>
        </p-breadcrumb>
      </DocsExample>
    </p-card>
  </section>

  <section id="api" data-section class="docs-section">
    <p-card>
      <template #header>API</template>
      <DocsApiTable caption="PBreadcrumb Props" :items="props" />
    </p-card>
  </section>
</template>
