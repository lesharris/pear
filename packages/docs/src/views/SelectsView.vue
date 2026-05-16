<script lang="ts">
import type { DocsMeta } from "@/types/docs";

export const docsMeta = {
  title: "Selects | Pear",
  description: "Single and multiple select examples with Pear form components.",
  tocItems: [
    { id: "overview", label: "Overview" },
    { id: "basic-select", label: "Basic Options" },
    { id: "multiple-select", label: "Multiple Select" },
    { id: "api", label: "API" },
  ],
} satisfies DocsMeta;
</script>

<script setup lang="ts">
import { ref } from "vue";
import AppStack from "@/components/layout/AppStack.vue";
import DocsApiTable, { type DocsApiItem } from "@/components/DocsApiTable.vue";
import DocsExample from "@/components/DocsExample.vue";
import DocsIntroCard from "@/components/DocsIntroCard.vue";
import { PCard, PField, PSelect } from "@ontic/pear";

const cuisine = ref("");
const mealType = ref("");
const selectedCuisines = ref<string[]>([]);

const cuisines = ["Italian", "Japanese", "Indian", "Thai"];
const mealTypes = [
  { id: "breakfast", name: "Breakfast" },
  { id: "lunch", name: "Lunch" },
  { id: "dinner", name: "Dinner" },
];

const stringSelectCode = String.raw`
<p-field label="Simple string options">
  <p-select
    v-model="cuisine"
    name="cuisine"
    placeholder="Select a cuisine..."
    :options="cuisines"
  />
</p-field>
`;

const objectSelectCode = String.raw`
<p-field label="Object options">
  <p-select
    v-model="mealType"
    name="meal-type"
    placeholder="Select a meal type..."
    :options="mealTypes"
    option-label="name"
    option-value="id"
  />
</p-field>
`;

const multipleSelectCode = String.raw`
<p-field label="Multiple select">
  <p-select
    v-model="selectedCuisines"
    name="selected-cuisines"
    :options="cuisines"
    multiple
    :size="4"
  />
</p-field>
`;

const selectProps: DocsApiItem[] = [
  { name: "v-model", type: "string | number | Array<string | number>", description: "Selected value, or selected values when multiple is true." },
  { name: "options", type: "Array<string | number | object>", default: "[]", description: "Options rendered when no default slot is provided." },
  { name: "optionLabel", type: "string", default: "'label'", description: "Object key used for option text." },
  { name: "optionValue", type: "string", default: "'value'", description: "Object key used for option value." },
  { name: "placeholder", type: "string", description: "Disabled placeholder option for single selects." },
  { name: "multiple", type: "boolean", default: "false", description: "Enables native multiple selection." },
  { name: "size", type: "number", description: "Native visible row count." },
  { name: "disabled", type: "boolean", default: "false", description: "Disables the select. Inherits from PField when present." },
  { name: "invalid", type: "boolean", default: "false", description: "Sets aria-invalid. Inherits from PField when present." },
];

const selectSlots: DocsApiItem[] = [
  { name: "default", type: "slot", description: "Optional custom option markup. When omitted, options are rendered from the options prop." },
];

const selectEvents: DocsApiItem[] = [
  { name: "update:modelValue", type: "string | number | Array<string | number>", description: "Emitted by v-model when the native select changes." },
];
</script>

<template>
  <section id="overview" data-section class="docs-section">
    <DocsIntroCard name="PSelect">
      <code>PSelect</code> is the Pear wrapper for native selects. It handles
      simple option arrays, object options, multiple selection, and field
      context. If you want a tiny action menu, use <code>PDropdown</code>.
    </DocsIntroCard>
  </section>

  <section id="basic-select" data-section class="docs-section">
        <p-card>
          <template #header>Basic Options</template>

          <AppStack>
          <DocsExample :code="stringSelectCode">
            <p-field label="Simple string options">
              <p-select v-model="cuisine" name="cuisine" placeholder="Select a cuisine..." :options="cuisines" />
            </p-field>
          </DocsExample>

          <DocsExample :code="objectSelectCode">
            <p-field label="Object options">
              <p-select v-model="mealType" name="meal-type" placeholder="Select a meal type..." :options="mealTypes" option-label="name" option-value="id" />
            </p-field>
          </DocsExample>
          </AppStack>
        </p-card>
      </section>

      <section id="multiple-select" data-section class="docs-section">
        <p-card>
          <template #header>Multiple Select</template>

          <DocsExample :code="multipleSelectCode">
            <p-field label="Multiple select">
              <p-select v-model="selectedCuisines" name="selected-cuisines" :options="cuisines" multiple :size="4" />
            </p-field>
          </DocsExample>
        </p-card>
      </section>

      <section id="api" data-section class="docs-section">
        <p-card>
          <template #header>API</template>

          <AppStack>
            <DocsApiTable caption="Props" :items="selectProps" />
            <DocsApiTable caption="Slots" :items="selectSlots" />
            <DocsApiTable caption="Events" :items="selectEvents" />
          </AppStack>
        </p-card>
      </section>
</template>
