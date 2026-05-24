<script lang="ts">
import type { DocsMeta } from '@/types/docs'

export const docsMeta = {
  title: 'Range | Pear',
  description: "Range input examples with Pear's lightweight Vue wrapper components.",
  tocItems: [
    { id: 'overview', label: 'Overview' },
    { id: 'range', label: 'Range' },
    { id: 'states', label: 'States & Tooltips' },
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
import { PCard, PField, PRange } from '@ontic/pear'

const brightness = ref(50)
const contrast = ref(40)
const volume = ref(7)
const disabledRange = ref(25)
const alertVolume = ref(95)

const brightnessRangeCode = String.raw`
<p-field label="Brightness" helper="Basic range with default min/max.">
  <p-range v-model="brightness" name="brightness" />
</p-field>
`

const contrastRangeCode = String.raw`
<p-field label="Contrast" helper="Shows the current value.">
  <p-range
    v-model="contrast"
    name="contrast"
    :min="0"
    :max="100"
    :step="5"
    show-value
  />
</p-field>
`

const volumeRangeCode = String.raw`
<p-field label="Volume" helper="Custom min/max range.">
  <p-range v-model="volume" name="volume" :min="0" :max="10" :step="1" show-value />
</p-field>
`

const disabledRangeCode = String.raw`
<p-field label="Disabled range" disabled>
  <p-range v-model="disabledRange" name="disabled-range" show-value />
</p-field>
`

const stateRangeCode = String.raw`
<p-field label="Alert volume" error="That is probably too loud.">
  <p-range
    v-model="alertVolume"
    name="alert-volume"
    show-value
    tooltip="Drag to set the alert volume"
    tooltip-placement="bottom"
  />
</p-field>
`

const rangeProps: DocsApiItem[] = [
  { name: 'v-model', type: 'number', description: 'Current range value.' },
  { name: 'min', type: 'number', default: '0', description: 'Native minimum value.' },
  { name: 'max', type: 'number', default: '100', description: 'Native maximum value.' },
  { name: 'step', type: 'number', default: '1', description: 'Native step value.' },
  {
    name: 'showValue',
    type: 'boolean',
    default: 'false',
    description: 'Shows an output element with the current value.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables the range. Inherits from PField when present.',
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

const rangeEvents: DocsApiItem[] = [
  {
    name: 'update:modelValue',
    type: 'number',
    description: 'Emitted by v-model while the range input changes.',
  },
]
</script>

<template>
  <section id="overview" data-section class="docs-section">
    <DocsIntroCard name="PRange">
      <code>PRange</code> is a native range input with numeric <code>v-model</code> values and an
      optional value readout.
    </DocsIntroCard>
  </section>

  <section id="range" data-section class="docs-section">
    <p-card>
      <template #header>Range</template>

      <AppStack>
        <DocsExample :code="brightnessRangeCode">
          <p-field label="Brightness" helper="Basic range with default min/max.">
            <p-range v-model="brightness" name="brightness" />
          </p-field>
        </DocsExample>

        <DocsExample :code="contrastRangeCode">
          <p-field label="Contrast" helper="Shows the current value.">
            <p-range v-model="contrast" name="contrast" :min="0" :max="100" :step="5" show-value />
          </p-field>
        </DocsExample>

        <DocsExample :code="volumeRangeCode">
          <p-field label="Volume" helper="Custom min/max range.">
            <p-range v-model="volume" name="volume" :min="0" :max="10" :step="1" show-value />
          </p-field>
        </DocsExample>

        <DocsExample :code="disabledRangeCode">
          <p-field label="Disabled range" disabled>
            <p-range v-model="disabledRange" name="disabled-range" show-value />
          </p-field>
        </DocsExample>
      </AppStack>
    </p-card>
  </section>

  <section id="states" data-section class="docs-section">
    <p-card>
      <template #header>States & Tooltips</template>

      <DocsExample :code="stateRangeCode">
        <p-field label="Alert volume" error="That is probably too loud.">
          <p-range
            v-model="alertVolume"
            name="alert-volume"
            show-value
            tooltip="Drag to set the alert volume"
            tooltip-placement="bottom"
          />
        </p-field>
      </DocsExample>
    </p-card>
  </section>

  <section id="api" data-section class="docs-section">
    <p-card>
      <template #header>API</template>

      <AppStack>
        <DocsApiTable caption="Props" :items="rangeProps" />
        <DocsApiTable caption="Events" :items="rangeEvents" />
      </AppStack>
    </p-card>
  </section>
</template>
