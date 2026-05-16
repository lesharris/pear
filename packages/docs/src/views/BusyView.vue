<script lang="ts">
import type { DocsMeta } from "@/types/docs";

export const docsMeta = {
  title: "Busy | Pear",
  description: "Busy state examples using Pico's aria-busy pattern.",
  tocItems: [
    { id: "overview", label: "Overview" },
    { id: "examples", label: "Examples" },
    { id: "api", label: "API" },
  ],
} satisfies DocsMeta;
</script>

<script setup lang="ts">
import DocsApiTable, { type DocsApiItem } from "@/components/DocsApiTable.vue";
import DocsExample from "@/components/DocsExample.vue";
import DocsIntroCard from "@/components/DocsIntroCard.vue";
import { PBusy, PCard } from "@ontic/pear";

const examplesCode = String.raw`
<p-busy>Saving changes...</p-busy>

<p-busy as="article">
  <p>Loading account details...</p>
</p-busy>
`;

const props: DocsApiItem[] = [
  { name: "as", type: "string", default: "'span'", description: "Rendered element." },
  { name: "busy", type: "boolean", default: "true", description: "Controls aria-busy." },
  { name: "label", type: "string", description: "Accessible label for busy content without visible text." },
  { name: "default", type: "slot", description: "Busy content." },
];
</script>

<template>
  <section id="overview" data-section class="docs-section">
    <DocsIntroCard name="PBusy">
      <code>PBusy</code> is a tiny wrapper for Pico's
      <code>aria-busy</code> loading pattern. For Pear buttons, use
      <code>PButton</code>'s <code>loading</code> prop instead.
    </DocsIntroCard>
  </section>

  <section id="examples" data-section class="docs-section">
    <p-card>
      <template #header>Examples</template>
      <DocsExample :code="examplesCode">
        <p-busy>Saving changes...</p-busy>
        <p-busy as="article">
          <p>Loading account details...</p>
        </p-busy>
      </DocsExample>
    </p-card>
  </section>

  <section id="api" data-section class="docs-section">
    <p-card>
      <template #header>API</template>
      <DocsApiTable caption="PBusy Props" :items="props" />
    </p-card>
  </section>
</template>
