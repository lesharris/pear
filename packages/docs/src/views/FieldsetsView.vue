<script lang="ts">
import type { DocsMeta } from '@/types/docs'

export const docsMeta = {
  title: 'Fieldsets | Pear',
  description: 'Fieldset examples for grouped checkboxes and radios.',
  tocItems: [
    { id: 'overview', label: 'Overview' },
    { id: 'checkboxes', label: 'Checkboxes' },
    { id: 'radios', label: 'Radios' },
    { id: 'api', label: 'API' },
  ],
} satisfies DocsMeta
</script>

<script setup lang="ts">
import { ref } from 'vue'
import DocsApiTable, { type DocsApiItem } from '@/components/DocsApiTable.vue'
import DocsExample from '@/components/DocsExample.vue'
import DocsIntroCard from '@/components/DocsIntroCard.vue'
import { PCard, PCheckbox, PFieldset, PRadio } from '@ontic/pear'

const toppings = ref(['olives'])
const shipping = ref('ground')

const checkboxCode = String.raw`
<p-fieldset legend="Toppings" helper="Pick as many as you like.">
  <p-checkbox v-model="toppings" value="olives">Olives</p-checkbox>
  <p-checkbox v-model="toppings" value="mushrooms">Mushrooms</p-checkbox>
  <p-checkbox v-model="toppings" value="peppers">Peppers</p-checkbox>
</p-fieldset>
`

const radioCode = String.raw`
<p-fieldset legend="Shipping" horizontal>
  <p-radio v-model="shipping" name="shipping" value="ground">Ground</p-radio>
  <p-radio v-model="shipping" name="shipping" value="air">Air</p-radio>
  <p-radio v-model="shipping" name="shipping" value="pickup">Pickup</p-radio>
</p-fieldset>
`

const props: DocsApiItem[] = [
  { name: 'legend', type: 'string', description: 'Fieldset legend text.' },
  { name: 'helper', type: 'string', description: 'Optional helper text.' },
  {
    name: 'error',
    type: 'string',
    description: 'Validation message. Also marks the group invalid.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables the fieldset and nested controls.',
  },
  {
    name: 'invalid',
    type: 'boolean',
    default: 'false',
    description: 'Marks nested Pear controls invalid.',
  },
  {
    name: 'horizontal',
    type: 'boolean',
    default: 'false',
    description: 'Lays options out in a wrapping row.',
  },
  { name: 'default', type: 'slot', description: 'Grouped form controls.' },
]
</script>

<template>
  <section id="overview" data-section class="docs-section">
    <DocsIntroCard name="PFieldset">
      <code>PFieldset</code> is for grouped controls. It keeps the <code>fieldset</code> and
      <code>legend</code> semantics while sharing disabled, invalid, and described-by state with
      Pear controls.
    </DocsIntroCard>
  </section>

  <section id="checkboxes" data-section class="docs-section">
    <p-card>
      <template #header>Checkboxes</template>
      <DocsExample :code="checkboxCode">
        <p-fieldset legend="Toppings" helper="Pick as many as you like.">
          <p-checkbox v-model="toppings" value="olives">Olives</p-checkbox>
          <p-checkbox v-model="toppings" value="mushrooms">Mushrooms</p-checkbox>
          <p-checkbox v-model="toppings" value="peppers">Peppers</p-checkbox>
        </p-fieldset>
      </DocsExample>
    </p-card>
  </section>

  <section id="radios" data-section class="docs-section">
    <p-card>
      <template #header>Radios</template>
      <DocsExample :code="radioCode">
        <p-fieldset legend="Shipping" horizontal>
          <p-radio v-model="shipping" name="shipping" value="ground">Ground</p-radio>
          <p-radio v-model="shipping" name="shipping" value="air">Air</p-radio>
          <p-radio v-model="shipping" name="shipping" value="pickup">Pickup</p-radio>
        </p-fieldset>
      </DocsExample>
    </p-card>
  </section>

  <section id="api" data-section class="docs-section">
    <p-card>
      <template #header>API</template>
      <DocsApiTable caption="PFieldset Props" :items="props" />
    </p-card>
  </section>
</template>
