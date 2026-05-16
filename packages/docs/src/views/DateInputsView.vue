<script lang="ts">
import type { DocsMeta } from "@/types/docs";

export const docsMeta = {
  title: "Date Inputs | Pear",
  description:
    "Date and time input examples using Pear form components and PicoCSS styling.",
  tocItems: [
    { id: "overview", label: "Overview" },
    { id: "date-inputs", label: "Date Inputs" },
    { id: "states", label: "States & Tooltips" },
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
const readonlyDate = ref("2026-05-16");
const blockedDate = ref("2026-05-17");
const dueDate = ref("");

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

const stateInputCode = String.raw`
<p-field label="Readonly date">
  <p-input v-model="readonlyDate" type="date" name="readonly-date" readonly />
</p-field>

<p-field label="Blocked date" disabled>
  <p-input v-model="blockedDate" type="date" name="blocked-date" />
</p-field>

<p-field label="Due date" error="Choose a due date.">
  <p-input
    v-model="dueDate"
    type="date"
    name="due-date"
    tooltip="Use the browser's date picker"
    tooltip-placement="bottom"
  />
</p-field>
`;

const dateInputProps: DocsApiItem[] = [
  { name: "v-model", type: "string", description: "Native date/time input value." },
  { name: "type", type: "'date' | 'datetime-local' | 'month' | 'time'", description: "Date/time input types supported by PInput." },
  { name: "disabled", type: "boolean", default: "false", description: "Disables the input. Inherits from PField when present." },
  { name: "readonly", type: "boolean", default: "false", description: "Renders a readonly input." },
  { name: "invalid", type: "boolean", default: "false", description: "Sets aria-invalid. Inherits from PField when present." },
  { name: "tooltip", type: "string", description: "Optional Pico tooltip content." },
  { name: "tooltipPlacement", type: "PTooltipPlacement", description: "Optional Pico tooltip placement." },
];

const dateInputEvents: DocsApiItem[] = [
  { name: "update:modelValue", type: "string", description: "Emitted by v-model when the native input changes." },
];
</script>

<template>
  <section id="overview" data-section class="docs-section">
    <DocsIntroCard name="PInput">
      <code>PInput</code> also covers date and time fields. The browser keeps
      its native picker, and Vue gets a plain string <code>v-model</code>.
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

    <section id="states" data-section class="docs-section">
      <p-card>
        <template #header>States & Tooltips</template>

        <DocsExample :code="stateInputCode">
          <AppStack>
            <p-field label="Readonly date">
              <p-input v-model="readonlyDate" type="date" name="readonly-date" readonly />
            </p-field>

            <p-field label="Blocked date" disabled>
              <p-input v-model="blockedDate" type="date" name="blocked-date" />
            </p-field>

            <p-field label="Due date" error="Choose a due date.">
              <p-input
                v-model="dueDate"
                type="date"
                name="due-date"
                tooltip="Use the browser's date picker"
                tooltip-placement="bottom"
              />
            </p-field>
          </AppStack>
        </DocsExample>
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
