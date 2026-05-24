<script lang="ts">
import type { DocsMeta } from '@/types/docs'

export const docsMeta = {
  title: 'Textareas | Pear',
  description: 'Textarea examples with Pear field wiring and Pico styling.',
  tocItems: [
    { id: 'overview', label: 'Overview' },
    { id: 'basic', label: 'Basic' },
    { id: 'states', label: 'States' },
    { id: 'api', label: 'API' },
  ],
} satisfies DocsMeta
</script>

<script setup lang="ts">
import { ref } from 'vue'
import AppStack from '@/components/layout/AppStack.vue'
import DocsApiTable, { type DocsApiItem } from '@/components/DocsApiTable.vue'
import DocsExample from '@/components/DocsExample.vue'
import DocsIntroCard from '@/components/DocsIntroCard.vue'
import { PCard, PField, PTextarea } from '@ontic/pear'

const notes = ref('Pico keeps the textarea looking like Pico.')
const readonlyNotes = ref('This note is read only.')
const blockedNotes = ref('')
const problemNotes = ref('')

const basicCode = String.raw`
<p-field label="Notes" helper="A few sentences is plenty.">
  <p-textarea v-model="notes" name="notes" rows="4" />
</p-field>
`

const statesCode = String.raw`
<p-field label="Readonly notes">
  <p-textarea v-model="readonlyNotes" readonly />
</p-field>

<p-field label="Blocked notes" disabled>
  <p-textarea v-model="blockedNotes" />
</p-field>

<p-field label="Required notes" error="Add a short note.">
  <p-textarea v-model="problemNotes" />
</p-field>
`

const props: DocsApiItem[] = [
  { name: 'v-model', type: 'string', description: 'Textarea value.' },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables the textarea. Inherits from PField when present.',
  },
  {
    name: 'readonly',
    type: 'boolean',
    default: 'false',
    description: 'Marks the textarea read only.',
  },
  {
    name: 'invalid',
    type: 'boolean',
    default: 'false',
    description: 'Sets aria-invalid. Inherits from PField when present.',
  },
  { name: 'tooltip', type: 'string', description: 'Optional Pico tooltip content.' },
  {
    name: 'tooltipPlacement',
    type: 'PTooltipPlacement',
    description: 'Optional Pico tooltip placement.',
  },
]
</script>

<template>
  <section id="overview" data-section class="docs-section">
    <DocsIntroCard name="PTextarea">
      <code>PTextarea</code> is the native textarea with Pear's field context, tooltips, and
      <code>v-model</code>.
    </DocsIntroCard>
  </section>

  <section id="basic" data-section class="docs-section">
    <p-card>
      <template #header>Basic</template>
      <DocsExample :code="basicCode">
        <p-field label="Notes" helper="A few sentences is plenty.">
          <p-textarea v-model="notes" name="notes" rows="4" />
        </p-field>
      </DocsExample>
    </p-card>
  </section>

  <section id="states" data-section class="docs-section">
    <p-card>
      <template #header>States</template>
      <DocsExample :code="statesCode">
        <AppStack>
          <p-field label="Readonly notes">
            <p-textarea v-model="readonlyNotes" readonly />
          </p-field>
          <p-field label="Blocked notes" disabled>
            <p-textarea v-model="blockedNotes" />
          </p-field>
          <p-field label="Required notes" error="Add a short note.">
            <p-textarea v-model="problemNotes" />
          </p-field>
        </AppStack>
      </DocsExample>
    </p-card>
  </section>

  <section id="api" data-section class="docs-section">
    <p-card>
      <template #header>API</template>
      <DocsApiTable caption="PTextarea Props" :items="props" />
    </p-card>
  </section>
</template>
