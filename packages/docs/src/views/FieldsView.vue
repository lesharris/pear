<script lang="ts">
import type { DocsMeta } from "@/types/docs";

export const docsMeta = {
  title: "Fields | Pear",
  description:
    "Field labels, helper text, validation messages, and disabled field context in Pear.",
  tocItems: [
    { id: "overview", label: "Overview" },
    { id: "basic-field", label: "Basic Field" },
    { id: "validation", label: "Validation" },
    { id: "disabled", label: "Disabled" },
    { id: "api", label: "API" },
  ],
} satisfies DocsMeta;
</script>

<script setup lang="ts">
import { computed, ref } from "vue";
import AppStack from "@/components/layout/AppStack.vue";
import DocsApiTable, { type DocsApiItem } from "@/components/DocsApiTable.vue";
import DocsExample from "@/components/DocsExample.vue";
import DocsIntroCard from "@/components/DocsIntroCard.vue";
import { PCard, PField, PInput } from "@ontic/pear";

const name = ref("");
const email = ref("");
const disabledValue = ref("Disabled by the field");

const emailError = computed(() => {
  if (!email.value) return undefined;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
    ? undefined
    : "Please enter a valid email address.";
});

const basicFieldCode = String.raw`
<p-field label="Name" helper="Please enter your full name.">
  <p-input v-model="name" name="name" autocomplete="name" />
</p-field>
`;

const validationFieldCode = String.raw`
<p-field
  label="Email"
  helper="Used for account notifications."
  :error="emailError"
>
  <p-input
    v-model="email"
    type="email"
    name="email"
    autocomplete="email"
  />
</p-field>
`;

const disabledFieldCode = String.raw`
<p-field label="Disabled field" disabled>
  <p-input v-model="disabledValue" />
</p-field>
`;

const fieldProps: DocsApiItem[] = [
  { name: "label", type: "string", description: "Renders a label connected to the nested form control." },
  { name: "helper", type: "string", description: "Helper text shown when there is no error." },
  { name: "error", type: "string", description: "Error text. Also marks the field invalid." },
  { name: "invalid", type: "boolean", default: "false", description: "Marks nested Pear form controls invalid through field context." },
  { name: "disabled", type: "boolean", default: "false", description: "Disables nested Pear form controls through field context." },
];

const fieldSlots: DocsApiItem[] = [
  { name: "default", type: "slot", description: "A form control such as PInput, PSelect, PRange, PCheckbox, or PRadio." },
];
</script>

<template>
  <section id="overview" data-section class="docs-section">
    <DocsIntroCard name="PField">
      <code>PField</code> connects labels, helper text, validation messages,
      invalid state, and disabled state to nested Pear form controls.
    </DocsIntroCard>
  </section>

  <section id="basic-field" data-section class="docs-section">
    <p-card>
      <template #header>Basic Field</template>

      <DocsExample :code="basicFieldCode">
        <p-field label="Name" helper="Please enter your full name.">
          <p-input v-model="name" name="name" autocomplete="name" />
        </p-field>
      </DocsExample>
    </p-card>
  </section>

  <section id="validation" data-section class="docs-section">
    <p-card>
      <template #header>Validation</template>

      <DocsExample :code="validationFieldCode">
        <p-field
          label="Email"
          helper="Used for account notifications."
          :error="emailError"
        >
          <p-input
            v-model="email"
            type="email"
            name="email"
            autocomplete="email"
          />
        </p-field>
      </DocsExample>
    </p-card>
  </section>

  <section id="disabled" data-section class="docs-section">
    <p-card>
      <template #header>Disabled</template>

      <DocsExample :code="disabledFieldCode">
        <p-field label="Disabled field" disabled>
          <p-input v-model="disabledValue" />
        </p-field>
      </DocsExample>
    </p-card>
  </section>

  <section id="api" data-section class="docs-section">
    <p-card>
      <template #header>API</template>

      <AppStack>
        <DocsApiTable caption="Props" :items="fieldProps" />
        <DocsApiTable caption="Slots" :items="fieldSlots" />
      </AppStack>
    </p-card>
  </section>
</template>
