<script lang="ts">
import type { DocsMeta } from "@/types/docs";

export const docsMeta = {
  title: "Tooltips | Pear",
  description: "Tooltip wrapper and tooltip prop examples for Pear components.",
  tocItems: [
    { id: "overview", label: "Overview" },
    { id: "wrapper", label: "Wrapper" },
    { id: "component-props", label: "Component Props" },
    { id: "api", label: "API" },
  ],
} satisfies DocsMeta;
</script>

<script setup lang="ts">
import AppCluster from "@/components/layout/AppCluster.vue";
import AppStack from "@/components/layout/AppStack.vue";
import DocsApiTable, { type DocsApiItem } from "@/components/DocsApiTable.vue";
import DocsExample from "@/components/DocsExample.vue";
import DocsIntroCard from "@/components/DocsIntroCard.vue";
import { PButton, PCard, PField, PInput, PProgress, PTooltip } from "@ontic/pear";

const wrapperCode = String.raw`
<p-tooltip content="Shown above by default">
  <button type="button">Hover me</button>
</p-tooltip>

<p-tooltip content="Shown on the right" placement="right">
  <a href="#" @click.prevent>Hover link</a>
</p-tooltip>
`;

const propCode = String.raw`
<p-button tooltip="Save changes" tooltip-placement="bottom">
  Save
</p-button>

<p-field label="Token">
  <p-input tooltip="Find this in account settings" tooltip-placement="right" />
</p-field>

<p-progress :value="72" tooltip="72% complete" />
`;

const tooltipProps: DocsApiItem[] = [
  { name: "content", type: "string", description: "Tooltip content for PTooltip." },
  { name: "placement", type: "'top' | 'right' | 'bottom' | 'left'", description: "Optional Pico tooltip placement." },
  { name: "as", type: "string", default: "'span'", description: "Rendered wrapper element." },
];

const sharedTooltipProps: DocsApiItem[] = [
  { name: "tooltip", type: "string", description: "Tooltip content on Pear components that accept tooltip props." },
  { name: "tooltipPlacement", type: "'top' | 'right' | 'bottom' | 'left'", description: "Tooltip placement on Pear components that accept tooltip props." },
];

const tooltipSlots: DocsApiItem[] = [
  { name: "default", type: "slot", description: "Element or component that receives Pico tooltip attributes." },
];
</script>

<template>
  <section id="overview" data-section class="docs-section">
    <DocsIntroCard name="PTooltip">
      <code>PTooltip</code> adds Pico tooltip attributes around whatever you
      pass in. Several Pear controls also accept tooltip props directly.
    </DocsIntroCard>
  </section>

  <section id="wrapper" data-section class="docs-section">
    <p-card>
      <template #header>Wrapper</template>

      <DocsExample :code="wrapperCode">
        <AppCluster>
          <p-tooltip content="Shown above by default">
            <button type="button">Hover me</button>
          </p-tooltip>

          <p-tooltip content="Shown on the right" placement="right">
            <a href="#" @click.prevent>Hover link</a>
          </p-tooltip>
        </AppCluster>
      </DocsExample>
    </p-card>
  </section>

  <section id="component-props" data-section class="docs-section">
    <p-card>
      <template #header>Component Props</template>

      <DocsExample :code="propCode">
        <AppStack>
          <p-button tooltip="Save changes" tooltip-placement="bottom">
            Save
          </p-button>

          <p-field label="Token">
            <p-input tooltip="Find this in account settings" tooltip-placement="right" />
          </p-field>

          <p-progress :value="72" tooltip="72% complete" />
        </AppStack>
      </DocsExample>
    </p-card>
  </section>

  <section id="api" data-section class="docs-section">
    <p-card>
      <template #header>API</template>

      <AppStack>
        <DocsApiTable caption="PTooltip Props" :items="tooltipProps" />
        <DocsApiTable caption="Shared Tooltip Props" :items="sharedTooltipProps" />
        <DocsApiTable caption="Slots" :items="tooltipSlots" />
      </AppStack>
    </p-card>
  </section>
</template>
