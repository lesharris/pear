<script lang="ts">
import type { DocsMeta } from '@/types/docs'

export const docsMeta = {
  title: 'Cards | Pear',
  description: "Card examples for Pear's small wrapper around Pico article markup.",
  tocItems: [
    { id: 'overview', label: 'Overview' },
    { id: 'basic-card', label: 'Basic Card' },
    { id: 'sections', label: 'Header & Footer' },
    { id: 'api', label: 'API' },
  ],
} satisfies DocsMeta
</script>

<script setup lang="ts">
import AppCluster from '@/components/layout/AppCluster.vue'
import AppStack from '@/components/layout/AppStack.vue'
import DocsApiTable, { type DocsApiItem } from '@/components/DocsApiTable.vue'
import DocsExample from '@/components/DocsExample.vue'
import DocsIntroCard from '@/components/DocsIntroCard.vue'
import { PButton, PCard } from '@ontic/pear'

const basicCardCode = String.raw`
<p-card>
  <p>
    Cards render Pico article markup and inherit Pico spacing, border,
    background, and typography.
  </p>
</p-card>
`

const cardSectionsCode = String.raw`
<p-card>
  <template #header>
    Project status
  </template>

  <p>Everything is ready for review.</p>

  <template #footer>
    <p-button>Review</p-button>
    <p-button variant="secondary">Archive</p-button>
  </template>
</p-card>
`

const cardSlots: DocsApiItem[] = [
  { name: 'header', type: 'slot', description: 'Optional content rendered in the article header.' },
  { name: 'default', type: 'slot', description: 'Main article content.' },
  { name: 'footer', type: 'slot', description: 'Optional content rendered in the article footer.' },
]
</script>

<template>
  <section id="overview" data-section class="docs-section">
    <DocsIntroCard name="PCard">
      <code>PCard</code> is a small wrapper around Pico's article pattern. Add header and footer
      slots when the card needs clear sections.
    </DocsIntroCard>
  </section>

  <section id="basic-card" data-section class="docs-section">
    <AppStack>
      <h2>Basic Card</h2>

      <DocsExample :code="basicCardCode">
        <p-card>
          <p>
            Cards render Pico article markup and inherit Pico spacing, border, background, and
            typography.
          </p>
        </p-card>
      </DocsExample>
    </AppStack>
  </section>

  <section id="sections" data-section class="docs-section">
    <AppStack>
      <h2>Header & Footer</h2>

      <DocsExample :code="cardSectionsCode">
        <p-card>
          <template #header> Project status </template>

          <p>Everything is ready for review.</p>

          <template #footer>
            <AppCluster>
              <p-button>Review</p-button>
              <p-button variant="secondary">Archive</p-button>
            </AppCluster>
          </template>
        </p-card>
      </DocsExample>
    </AppStack>
  </section>

  <section id="api" data-section class="docs-section">
    <p-card>
      <template #header>API</template>

      <AppStack>
        <p><code>PCard</code> has no props or custom events.</p>
        <DocsApiTable caption="Slots" :items="cardSlots" />
      </AppStack>
    </p-card>
  </section>
</template>
