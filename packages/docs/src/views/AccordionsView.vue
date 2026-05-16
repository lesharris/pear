<script lang="ts">
import type { DocsMeta } from "@/types/docs";

export const docsMeta = {
  title: "Accordions | Pear",
  description:
    "Standalone, exclusive, named, and button-style accordion examples for Pear.",
  tocItems: [
    { id: "accordion-overview", label: "PAccordion" },
    { id: "standalone", label: "Standalone" },
    { id: "group-overview", label: "PAccordionGroup" },
    { id: "exclusive-group", label: "Exclusive Group" },
    { id: "named-group", label: "Named Group" },
    { id: "button-style", label: "Button Style" },
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
import { PAccordion, PAccordionGroup, PCard } from "@ontic/pear";

const isPicoOpen = ref(true);

const standaloneCode = String.raw`
<p-accordion summary="What is Pico CSS?" v-model:open="isPicoOpen">
  <p>Pico styles semantic HTML with very few classes.</p>
</p-accordion>

<p-accordion>
  <template #summary>
    <strong>Custom summary slot</strong>
  </template>
  <p>This summary is rendered from slot content.</p>
</p-accordion>
`;

const groupCode = String.raw`
<p-accordion-group exclusive>
  <p-accordion summary="Profile" open>...</p-accordion>
  <p-accordion summary="Billing">...</p-accordion>
  <p-accordion summary="Security">...</p-accordion>
</p-accordion-group>
`;

const namedGroupCode = String.raw`
<p-accordion-group exclusive name="example-settings">
  <p-accordion summary="General">...</p-accordion>
  <p-accordion summary="Notifications">...</p-accordion>
  <p-accordion summary="Danger zone">...</p-accordion>
</p-accordion-group>
`;

const buttonCode = String.raw`
<p-accordion summary="Secondary button summary" button variant="secondary">
  <p>This summary uses the secondary button style.</p>
</p-accordion>
`;

const accordionProps: DocsApiItem[] = [
  { name: "summary", type: "string", description: "Text shown in the details summary when no summary slot is provided." },
  { name: "open", type: "boolean", default: "false", description: "Initial native details open state. Can be controlled with v-model:open." },
  { name: "name", type: "string", description: "Native details group name. Inherits from PAccordionGroup when present." },
  { name: "button", type: "boolean", default: "false", description: "Applies Pico's button-style summary pattern." },
  { name: "variant", type: "'secondary' | 'contrast'", description: "Button summary variant when button is true." },
  { name: "outline", type: "boolean", default: "false", description: "Button summary outline style when button is true." },
];

const accordionGroupProps: DocsApiItem[] = [
  { name: "exclusive", type: "boolean", default: "false", description: "Provides a shared details name so only one child accordion opens at a time." },
  { name: "name", type: "string", description: "Stable native details group name. Generated when exclusive is true and no name is provided." },
];

const accordionSlots: DocsApiItem[] = [
  { name: "default", type: "slot", description: "Accordion panel content." },
  { name: "summary", type: "slot", description: "Custom summary content." },
  { name: "PAccordionGroup default", type: "slot", description: "Child accordions." },
];

const accordionEvents: DocsApiItem[] = [
  { name: "update:open", type: "boolean", description: "Emitted when the native details element opens or closes." },
];
</script>

<template>
  <section id="accordion-overview" data-section class="docs-section">
    <DocsIntroCard name="PAccordion">
      <code>PAccordion</code> uses native details and summary markup, with a
      couple of Pear extras for button-style summaries and custom headings.
    </DocsIntroCard>
  </section>

  <section id="standalone" data-section class="docs-section">
        <p-card>
          <template #header>Standalone</template>

          <DocsExample :code="standaloneCode">
            <p-accordion summary="What is Pico CSS?" v-model:open="isPicoOpen">
              <p>
                Pico gives semantic HTML a clean default look. Pear keeps that
                HTML shape and makes the Vue bits a little easier.
              </p>
            </p-accordion>

            <p-accordion summary="Can the summary use a slot?">
              <p>
                Yes. The simple case uses the summary prop, but richer headings can
                use the named summary slot.
              </p>
            </p-accordion>

            <p-accordion>
              <template #summary>
                <strong>Custom summary slot</strong>
              </template>

              <p>
                The summary slot is useful when the heading needs markup.
              </p>
            </p-accordion>
          </DocsExample>
        </p-card>
      </section>

      <section id="group-overview" data-section class="docs-section">
        <DocsIntroCard name="PAccordionGroup">
          <code>PAccordionGroup</code> links child accordions together when
          only one panel should stay open.
        </DocsIntroCard>
      </section>

      <section id="exclusive-group" data-section class="docs-section">
        <p-card>
          <template #header>Exclusive Group</template>

          <AppStack>
            <p>
              These share a generated native details name, so opening one closes the
              others.
            </p>

            <DocsExample :code="groupCode">
              <p-accordion-group exclusive>
              <p-accordion summary="Profile" open>
                <p>Update profile information, avatar, and display preferences.</p>
              </p-accordion>

              <p-accordion summary="Billing">
                <p>Review invoices, payment methods, and subscription details.</p>
              </p-accordion>

              <p-accordion summary="Security">
                <p>Manage password settings, sessions, and multi-factor authentication.</p>
              </p-accordion>
              </p-accordion-group>
            </DocsExample>
          </AppStack>
        </p-card>
      </section>

      <section id="named-group" data-section class="docs-section">
        <p-card>
          <template #header>Named Group</template>

          <AppStack>
            <p>
              Give the group a name when you want the native details grouping to
              stay stable across renders.
            </p>

            <DocsExample :code="namedGroupCode">
              <p-accordion-group exclusive name="example-settings">
                <p-accordion summary="General">
                  <p>General settings for the current workspace.</p>
                </p-accordion>

                <p-accordion summary="Notifications">
                  <p>Notification preferences and delivery settings.</p>
                </p-accordion>

                <p-accordion summary="Danger zone">
                  <p>Destructive actions and irreversible account controls live here.</p>
                </p-accordion>
              </p-accordion-group>
            </DocsExample>
          </AppStack>
        </p-card>
      </section>

      <section id="button-style" data-section class="docs-section">
        <p-card>
          <template #header>Button Style</template>

          <DocsExample :code="buttonCode">
            <p-accordion summary="Default button summary" button>
              <p>This summary uses Pico's role="button" accordion pattern.</p>
            </p-accordion>

            <p-accordion summary="Secondary button summary" button variant="secondary">
              <p>This summary uses the secondary button style.</p>
            </p-accordion>

            <p-accordion summary="Contrast outline summary" button variant="contrast" outline>
              <p>This summary uses the contrast and outline button styles.</p>
            </p-accordion>
          </DocsExample>
        </p-card>
      </section>

      <section id="api" data-section class="docs-section">
        <p-card>
          <template #header>API</template>

          <AppStack>
            <DocsApiTable caption="PAccordion Props" :items="accordionProps" />
            <DocsApiTable caption="PAccordionGroup Props" :items="accordionGroupProps" />
            <DocsApiTable caption="Slots" :items="accordionSlots" />
            <DocsApiTable caption="Events" :items="accordionEvents" />
          </AppStack>
        </p-card>
      </section>
</template>
