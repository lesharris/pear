<script lang="ts">
import type { DocsMeta } from "@/types/docs";

export const docsMeta = {
  title: "Date Inputs | Pear",
  description:
    "Date and time input examples using Pear form components and PicoCSS styling.",
  tocItems: [
    { id: "overview", label: "Overview" },
    { id: "date-inputs", label: "Date Inputs" },
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
import { PCard, PField, PInput } from "@ontic/pear";

const date = ref("");
const datetimeLocal = ref("");
const month = ref("");
const time = ref("");

const dateInputCode = String.raw`
<p-field label="Date">
  <p-input v-model="date" type="date" name="date" />
</p-field>
`;

const datetimeInputCode = String.raw`
<p-field label="Datetime local">
  <p-input v-model="datetimeLocal" type="datetime-local" name="datetime-local" />
</p-field>
`;

const monthInputCode = String.raw`
<p-field label="Month">
  <p-input v-model="month" type="month" name="month" />
</p-field>
`;

const timeInputCode = String.raw`
<p-field label="Time">
  <p-input v-model="time" type="time" name="time" />
</p-field>
`;

const dateInputProps: DocsApiItem[] = [
  { name: "v-model", type: "string", description: "Native date/time input value." },
  { name: "type", type: "'date' | 'datetime-local' | 'month' | 'time'", description: "Date/time input types supported by PInput." },
  { name: "disabled", type: "boolean", default: "false", description: "Disables the input. Inherits from PField when present." },
  { name: "readonly", type: "boolean", default: "false", description: "Renders a readonly input." },
  { name: "invalid", type: "boolean", default: "false", description: "Sets aria-invalid. Inherits from PField when present." },
];

const dateInputEvents: DocsApiItem[] = [
  { name: "update:modelValue", type: "string", description: "Emitted by v-model when the native input changes." },
];
</script>

<template>
  <section id="overview" data-section class="docs-section">
    <DocsIntroCard name="PInput">
      <code>PInput</code> also supports native date and time input types, using
      string <code>v-model</code> values from the browser control.
    </DocsIntroCard>
  </section>

  <section id="date-inputs" data-section class="docs-section">
      <p-card>
        <template #header>Date Inputs</template>

        <AppStack>
          <DocsExample :code="dateInputCode">
            <p-field label="Date">
              <p-input v-model="date" type="date" name="date" />
            </p-field>
          </DocsExample>

          <DocsExample :code="datetimeInputCode">
            <p-field label="Datetime local">
              <p-input v-model="datetimeLocal" type="datetime-local" name="datetime-local" />
            </p-field>
          </DocsExample>

          <DocsExample :code="monthInputCode">
            <p-field label="Month">
              <p-input v-model="month" type="month" name="month" />
            </p-field>
          </DocsExample>

          <DocsExample :code="timeInputCode">
            <p-field label="Time">
              <p-input v-model="time" type="time" name="time" />
            </p-field>
          </DocsExample>
        </AppStack>
      </p-card>
    </section>

    <section id="api" data-section class="docs-section">
      <p-card>
        <template #header>API</template>

        <AppStack>
          <DocsApiTable caption="PInput Date/Time Props" :items="dateInputProps" />
          <DocsApiTable caption="Events" :items="dateInputEvents" />
        </AppStack>
      </p-card>
    </section>
</template>
