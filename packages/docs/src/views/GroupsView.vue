<script lang="ts">
import type { DocsMeta } from "@/types/docs";

export const docsMeta = {
  title: "Groups | Pear",
  description:
    "Button groups, field groups, and compact search group examples for Pear.",
  tocItems: [
    { id: "overview", label: "Overview" },
    { id: "button-group", label: "Button Group" },
    { id: "field-group", label: "Field Group" },
    { id: "search-group", label: "Search Group" },
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
import { PButton, PCard, PGroup, PInput } from "@ontic/pear";

const firstName = ref("");
const lastName = ref("");
const siteSearch = ref("");

const buttonGroupCode = String.raw`
<p-group>
  <p-button>One</p-button>
  <p-button>Two</p-button>
  <p-button>Three</p-button>
</p-group>
`;

const fieldGroupCode = String.raw`
<p-group as="fieldset">
  <p-input v-model="firstName" name="first-name" placeholder="First name" />
  <p-input v-model="lastName" name="last-name" placeholder="Last name" />
</p-group>
`;

const searchGroupCode = String.raw`
<p-group as="form" role="search" @submit.prevent>
  <p-input v-model="siteSearch" type="search" name="q" placeholder="Search" />
  <p-button type="submit" value="Search" />
</p-group>
`;

const groupProps: DocsApiItem[] = [
  { name: "as", type: "'div' | 'fieldset' | 'form'", default: "'div'", description: "Native element used for the group wrapper." },
  { name: "role", type: "'group' | 'search'", default: "'group'", description: "ARIA role applied to the wrapper." },
];

const groupSlots: DocsApiItem[] = [
  { name: "default", type: "slot", description: "Grouped controls, usually buttons or compact form inputs." },
];

const groupEvents: DocsApiItem[] = [
  { name: "native events", type: "SubmitEvent, ...", description: "Native events pass through to the rendered wrapper." },
];
</script>

<template>
  <section id="overview" data-section class="docs-section">
    <DocsIntroCard name="PGroup">
      <code>PGroup</code> renders Pico-compatible grouped controls as a div,
      fieldset, or form with the appropriate group or search role.
    </DocsIntroCard>
  </section>

  <section id="button-group" data-section class="docs-section">
        <p-card>
          <template #header>Button Group</template>

          <DocsExample :code="buttonGroupCode">
            <p-group>
              <p-button>One</p-button>
              <p-button>Two</p-button>
              <p-button>Three</p-button>
            </p-group>
          </DocsExample>
        </p-card>
      </section>

      <section id="field-group" data-section class="docs-section">
        <p-card>
          <template #header>Field Group</template>

          <DocsExample :code="fieldGroupCode">
            <p-group as="fieldset">
              <p-input v-model="firstName" name="first-name" placeholder="First name" aria-label="First name" />
              <p-input v-model="lastName" name="last-name" placeholder="Last name" aria-label="Last name" />
            </p-group>
          </DocsExample>
        </p-card>
      </section>

      <section id="search-group" data-section class="docs-section">
        <p-card>
          <template #header>Search Group</template>

          <DocsExample :code="searchGroupCode">
            <p-group as="form" role="search" @submit.prevent>
              <p-input v-model="siteSearch" type="search" name="q" placeholder="Search" aria-label="Search" />
              <p-button type="submit" value="Search" />
            </p-group>
          </DocsExample>
        </p-card>
      </section>

      <section id="api" data-section class="docs-section">
        <p-card>
          <template #header>API</template>

          <AppStack>
            <DocsApiTable caption="Props" :items="groupProps" />
            <DocsApiTable caption="Slots" :items="groupSlots" />
            <DocsApiTable caption="Events" :items="groupEvents" />
          </AppStack>
        </p-card>
      </section>
</template>
