<script lang="ts">
import type { DocsMeta } from "@/types/docs";

export const docsMeta = {
  title: "Progress | Pear",
  description:
    "Determinate and indeterminate progress indicators using Pear and PicoCSS.",
  tocItems: [
    { id: "overview", label: "Overview" },
    { id: "determinate", label: "Determinate" },
    { id: "indeterminate", label: "Indeterminate" },
    { id: "tooltips", label: "Tooltips" },
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
import { PCard, PProgress } from "@ontic/pear";

const uploadProgress = ref(65);
const taskProgress = ref(7);

const determinateCode = String.raw`
<p-progress :value="uploadProgress" />
<small>{{ uploadProgress }}%</small>
`;

const customMaxCode = String.raw`
<p-progress :value="taskProgress" :max="10" />
<small>{{ taskProgress }} of 10</small>
`;

const indeterminateCode = String.raw`
<p-progress indeterminate />
`;

const tooltipCode = String.raw`
<p-progress
  :value="uploadProgress"
  tooltip="Upload is 65% complete"
  tooltip-placement="top"
/>
`;

const progressProps: DocsApiItem[] = [
  { name: "value", type: "number", description: "Current progress value. Omitted when indeterminate is true." },
  { name: "max", type: "number", default: "100", description: "Maximum progress value." },
  { name: "indeterminate", type: "boolean", default: "false", description: "Renders an indeterminate progress indicator." },
  { name: "tooltip", type: "string", description: "Optional Pico tooltip content." },
  { name: "tooltipPlacement", type: "PTooltipPlacement", description: "Optional Pico tooltip placement." },
];
</script>

<template>
  <section id="overview" data-section class="docs-section">
    <DocsIntroCard name="PProgress">
      <code>PProgress</code> is a small native progress helper for known
      progress and "still working" loading states.
    </DocsIntroCard>
  </section>

  <section id="determinate" data-section class="docs-section">
        <p-card>
          <template #header>Determinate</template>

          <AppStack>
          <DocsExample :code="determinateCode">
            <div>
              <p-progress :value="uploadProgress" />
              <small>{{ uploadProgress }}%</small>
            </div>
          </DocsExample>

          <DocsExample :code="customMaxCode">
            <div>
              <h5>Custom max</h5>
              <p-progress :value="taskProgress" :max="10" />
              <small>{{ taskProgress }} of 10</small>
            </div>
          </DocsExample>
          </AppStack>
        </p-card>
      </section>

      <section id="indeterminate" data-section class="docs-section">
        <p-card>
          <template #header>Indeterminate</template>

          <DocsExample :code="indeterminateCode">
            <p-progress indeterminate />
            <small>Waiting for a response...</small>
          </DocsExample>
        </p-card>
      </section>

      <section id="tooltips" data-section class="docs-section">
        <p-card>
          <template #header>Tooltips</template>

          <DocsExample :code="tooltipCode" preview-overflow="visible">
            <p-progress
              :value="uploadProgress"
              tooltip="Upload is 65% complete"
              tooltip-placement="top"
            />
          </DocsExample>
        </p-card>
      </section>

      <section id="api" data-section class="docs-section">
        <p-card>
          <template #header>API</template>

          <DocsApiTable caption="Props" :items="progressProps" />
        </p-card>
      </section>
</template>
