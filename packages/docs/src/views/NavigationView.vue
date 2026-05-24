<script lang="ts">
import type { DocsMeta } from '@/types/docs'

export const docsMeta = {
  title: 'Navigation | Pear',
  description: 'Navigation shell and navigation item examples for Pear.',
  tocItems: [
    { id: 'overview', label: 'Overview' },
    { id: 'balanced-nav', label: 'Balanced Nav' },
    { id: 'simple-list', label: 'Simple List' },
    { id: 'api', label: 'API' },
  ],
} satisfies DocsMeta
</script>

<script setup lang="ts">
import AppStack from '@/components/layout/AppStack.vue'
import DocsApiTable, { type DocsApiItem } from '@/components/DocsApiTable.vue'
import DocsExample from '@/components/DocsExample.vue'
import DocsIntroCard from '@/components/DocsIntroCard.vue'
import { PButton, PCard, PNav, PNavItem } from '@ontic/pear'

const balancedNavCode = String.raw`
<p-nav>
  <template #left>
    <p-nav-item><strong>Pear</strong></p-nav-item>
  </template>

  <p-nav-item><a href="#" @click.prevent>Docs</a></p-nav-item>
  <p-nav-item><a href="#" @click.prevent>Components</a></p-nav-item>

  <template #right>
    <p-nav-item><p-button>Sign in</p-button></p-nav-item>
  </template>
</p-nav>
`

const simpleListCode = String.raw`
<p-nav>
  <p-nav-item><a href="#" @click.prevent>Overview</a></p-nav-item>
  <p-nav-item><a href="#" @click.prevent>Guides</a></p-nav-item>
  <p-nav-item><a href="#" @click.prevent>Reference</a></p-nav-item>
</p-nav>
`

const navSlots: DocsApiItem[] = [
  { name: 'left', type: 'slot', description: 'Optional left-aligned list content.' },
  { name: 'default', type: 'slot', description: 'Center/default list content.' },
  { name: 'right', type: 'slot', description: 'Optional right-aligned list content.' },
  { name: 'PNavItem default', type: 'slot', description: 'Content rendered inside a native li.' },
]
</script>

<template>
  <section id="overview" data-section class="docs-section">
    <DocsIntroCard name="PNav & PNavItem">
      <code>PNav</code> gives you Pico-style nav lists. Use <code>PNavItem</code> for the list items
      around links, brand bits, and small actions.
    </DocsIntroCard>
  </section>

  <section id="balanced-nav" data-section class="docs-section">
    <p-card>
      <template #header>Balanced Nav</template>

      <DocsExample :code="balancedNavCode" preview-overflow="visible">
        <p-nav>
          <template #left>
            <p-nav-item><strong>Pear</strong></p-nav-item>
          </template>

          <p-nav-item><a href="#" @click.prevent>Docs</a></p-nav-item>
          <p-nav-item><a href="#" @click.prevent>Components</a></p-nav-item>

          <template #right>
            <p-nav-item><p-button>Sign in</p-button></p-nav-item>
          </template>
        </p-nav>
      </DocsExample>
    </p-card>
  </section>

  <section id="simple-list" data-section class="docs-section">
    <p-card>
      <template #header>Simple List</template>

      <DocsExample :code="simpleListCode" preview-overflow="visible">
        <p-nav>
          <p-nav-item><a href="#" @click.prevent>Overview</a></p-nav-item>
          <p-nav-item><a href="#" @click.prevent>Guides</a></p-nav-item>
          <p-nav-item><a href="#" @click.prevent>Reference</a></p-nav-item>
        </p-nav>
      </DocsExample>
    </p-card>
  </section>

  <section id="api" data-section class="docs-section">
    <p-card>
      <template #header>API</template>

      <AppStack>
        <p><code>PNav</code> and <code>PNavItem</code> have no props or custom events.</p>
        <DocsApiTable caption="Slots" :items="navSlots" />
      </AppStack>
    </p-card>
  </section>
</template>
