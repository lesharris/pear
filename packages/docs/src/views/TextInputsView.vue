<script lang="ts">
import type { DocsMeta } from "@/types/docs";

export const docsMeta = {
  title: "Text Inputs | Pear",
  description:
    "Text input examples for Pear, including field wrappers and common input states.",
  tocItems: [
    { id: "overview", label: "Overview" },
    { id: "text-inputs", label: "Text Inputs" },
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
const password = ref("");
const search = ref("");
const age = ref<number | string>("");
const readonlyToken = ref("order-2026-05-04");

const emailError = computed(() => {
  if (!email.value) return undefined;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
    ? undefined
    : "Please enter a valid email address.";
});

const nameInputCode = String.raw`
<p-field label="Name" helper="Please enter your name.">
  <p-input
    v-model="name"
    name="name"
    placeholder="Enter your name"
    autocomplete="name"
  />
</p-field>
`;

const emailInputCode = String.raw`
<p-field label="Email" helper="Used for account notifications." :error="emailError">
  <p-input
    v-model="email"
    type="email"
    name="email"
    placeholder="you@example.com"
    autocomplete="email"
  />
</p-field>
`;

const passwordInputCode = String.raw`
<p-field label="Password" helper="Use something reasonably annoying to guess.">
  <p-input
    v-model="password"
    type="password"
    name="password"
    placeholder="Password"
    autocomplete="current-password"
  />
</p-field>
`;

const searchInputCode = String.raw`
<p-field label="Search" helper="Pico gives search inputs their own native-ish styling.">
  <p-input
    v-model="search"
    type="search"
    name="search"
    placeholder="Search..."
  />
</p-field>
`;

const numberInputCode = String.raw`
<p-field label="Age" helper="Number input using the same PInput component.">
  <p-input
    v-model="age"
    type="number"
    name="age"
    placeholder="42"
    min="0"
    max="120"
  />
</p-field>
`;

const readonlyInputCode = String.raw`
<p-field label="Reference ID" helper="Readonly text input.">
  <p-input v-model="readonlyToken" readonly />
</p-field>
`;

const inputProps: DocsApiItem[] = [
  { name: "v-model", type: "string | number", description: "Input value. Number inputs write numbers, and empty number inputs write an empty string." },
  { name: "type", type: "'text' | 'email' | 'number' | 'password' | 'tel' | 'url' | 'search'", default: "'text'", description: "Text-like native input type rendered by PInput." },
  { name: "disabled", type: "boolean", default: "false", description: "Disables the input. Inherits from PField when present." },
  { name: "readonly", type: "boolean", default: "false", description: "Renders a readonly input." },
  { name: "invalid", type: "boolean", default: "false", description: "Sets aria-invalid. Inherits from PField when present." },
  { name: "tooltip", type: "string", description: "Optional Pico tooltip content." },
  { name: "tooltipPlacement", type: "PTooltipPlacement", description: "Optional Pico tooltip placement." },
];

const inputEvents: DocsApiItem[] = [
  { name: "update:modelValue", type: "string | number", description: "Emitted by v-model when the native input changes." },
];
</script>

<template>
  <section id="overview" data-section class="docs-section">
    <DocsIntroCard name="PInput">
      <code>PInput</code> wraps native text-like inputs with Vue
      <code>v-model</code> handling while preserving Pico's semantic input
      styling.
    </DocsIntroCard>
  </section>

  <section id="text-inputs" data-section class="docs-section">
      <p-card>
        <template #header>Text Inputs</template>

        <AppStack>
          <DocsExample :code="nameInputCode">
            <p-field label="Name" helper="Please enter your name.">
              <p-input
                v-model="name"
                name="name"
                placeholder="Enter your name"
                autocomplete="name"
              />
            </p-field>
          </DocsExample>

          <DocsExample :code="emailInputCode">
            <p-field
              label="Email"
              helper="Used for account notifications."
              :error="emailError"
            >
              <p-input
                v-model="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                autocomplete="email"
              />
            </p-field>
          </DocsExample>

          <DocsExample :code="passwordInputCode">
            <p-field
              label="Password"
              helper="Use something reasonably annoying to guess."
            >
              <p-input
                v-model="password"
                type="password"
                name="password"
                placeholder="Password"
                autocomplete="current-password"
              />
            </p-field>
          </DocsExample>

          <DocsExample :code="searchInputCode">
            <p-field
              label="Search"
              helper="Pico gives search inputs their own native-ish styling."
            >
              <p-input
                v-model="search"
                type="search"
                name="search"
                placeholder="Search..."
              />
            </p-field>
          </DocsExample>

          <DocsExample :code="numberInputCode">
            <p-field
              label="Age"
              helper="Number input using the same PInput component."
            >
              <p-input
                v-model="age"
                type="number"
                name="age"
                placeholder="42"
                min="0"
                max="120"
              />
            </p-field>
          </DocsExample>

          <DocsExample :code="readonlyInputCode">
            <p-field label="Reference ID" helper="Readonly text input.">
              <p-input v-model="readonlyToken" readonly />
            </p-field>
          </DocsExample>
        </AppStack>
      </p-card>
    </section>

    <section id="api" data-section class="docs-section">
      <p-card>
        <template #header>API</template>

        <AppStack>
          <DocsApiTable caption="PInput Props" :items="inputProps" />
          <DocsApiTable caption="Events" :items="inputEvents" />
        </AppStack>
      </p-card>
    </section>
</template>
