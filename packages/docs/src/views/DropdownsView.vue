<script lang="ts">
import type { DocsMeta } from "@/types/docs";

export const docsMeta = {
  title: "Dropdowns | Pear",
  description:
    "Native details dropdown examples for actions, navigation, button variants, alignment, and controlled open state.",
  tocItems: [
    { id: "overview", label: "Overview" },
    { id: "action-menu", label: "Action Menu" },
    { id: "navigation-menu", label: "Navigation Menu" },
    { id: "button-variants", label: "Button Variants" },
    { id: "state-alignment", label: "State & Alignment" },
    { id: "api", label: "API" },
  ],
} satisfies DocsMeta;
</script>

<script setup lang="ts">
import { ref } from "vue";
import AppCluster from "@/components/layout/AppCluster.vue";
import AppStack from "@/components/layout/AppStack.vue";
import DocsApiTable, { type DocsApiItem } from "@/components/DocsApiTable.vue";
import DocsExample from "@/components/DocsExample.vue";
import DocsIntroCard from "@/components/DocsIntroCard.vue";
import { PButton, PCard, PDropdown } from "@ontic/pear";

const menuOpen = ref(false);
const actionMenuOpen = ref(false);
const lastAction = ref("No action selected");

const actionMenuCode = String.raw`
<p-dropdown v-model:open="actionMenuOpen" summary="Project actions">
  <li>
    <a href="#" @click.prevent="runAction('Edit project')">Edit project</a>
  </li>
  <li>
    <a href="#" @click.prevent="runAction('Duplicate')">Duplicate</a>
  </li>
  <li>
    <a href="#" @click.prevent="runAction('Archive')">Archive</a>
  </li>
</p-dropdown>

<small>{{ lastAction }}</small>
`;

const navigationMenuCode = String.raw`
<p-dropdown summary="Documentation">
  <li><a href="/docs/buttons" @click.prevent>Buttons</a></li>
  <li><a href="/docs/fields" @click.prevent>Forms</a></li>
  <li><a href="/docs/layout" @click.prevent>Layout</a></li>
</p-dropdown>
`;

const buttonVariantsCode = String.raw`
<p-dropdown summary="Primary" button>
  <li><a href="#" @click.prevent>Edit</a></li>
  <li><a href="#" @click.prevent>Duplicate</a></li>
</p-dropdown>

<p-dropdown summary="Secondary" button variant="secondary">
  <li><a href="#" @click.prevent>Export</a></li>
  <li><a href="#" @click.prevent>Share</a></li>
</p-dropdown>

<p-dropdown summary="More" button variant="contrast" outline>
  <li><a href="#" @click.prevent>Archive</a></li>
  <li><a href="#" @click.prevent>Delete</a></li>
</p-dropdown>
`;

const stateAlignmentCode = String.raw`
<p-dropdown v-model:open="menuOpen" summary="Controlled menu">
  <li><a href="#" @click.prevent>First action</a></li>
  <li><a href="#" @click.prevent>Second action</a></li>
</p-dropdown>

<p-button variant="secondary" @click="menuOpen = !menuOpen">
  Toggle menu
</p-button>

<p-dropdown summary="Right aligned" align="end">
  <li><a href="#" @click.prevent>Account settings</a></li>
  <li><a href="#" @click.prevent>Sign out</a></li>
</p-dropdown>
`;

const dropdownProps: DocsApiItem[] = [
  { name: "summary", type: "string", description: "Text shown in the summary when no summary slot is provided." },
  { name: "open", type: "boolean", default: "false", description: "Native details open state. Can be controlled with v-model:open." },
  { name: "button", type: "boolean", default: "false", description: "Applies Pico's button dropdown summary pattern." },
  { name: "variant", type: "'secondary' | 'contrast'", description: "Button summary variant when button is true." },
  { name: "outline", type: "boolean", default: "false", description: "Button summary outline style when button is true." },
  { name: "invalid", type: "boolean", default: "false", description: "Sets aria-invalid on the summary." },
  { name: "align", type: "'start' | 'end'", description: "Aligns the dropdown list. End alignment sets the list direction to rtl." },
  { name: "tooltip", type: "string", description: "Optional Pico tooltip content." },
  { name: "tooltipPlacement", type: "PTooltipPlacement", description: "Optional Pico tooltip placement." },
];

const dropdownSlots: DocsApiItem[] = [
  { name: "summary", type: "slot", description: "Custom summary content." },
  { name: "default", type: "slot", description: "List item content rendered inside the dropdown menu ul." },
];

const dropdownEvents: DocsApiItem[] = [
  { name: "update:open", type: "boolean", description: "Emitted when the native details element opens or closes." },
];

function runAction(action: string) {
  lastAction.value = `${action} selected`;
  actionMenuOpen.value = false;
}
</script>

<template>
  <section id="overview" data-section class="docs-section">
    <DocsIntroCard name="PDropdown">
      <code>PDropdown</code> is a native <code>details</code> dropdown for
      little menus: actions, quick links, and “more” buttons. For form choices,
      use <code>PSelect</code>, <code>PCheckbox</code>, or <code>PRadio</code>.
    </DocsIntroCard>
  </section>

  <section id="action-menu" data-section class="docs-section">
    <p-card>
      <template #header>Action Menu</template>

      <DocsExample :code="actionMenuCode" preview-overflow="visible">
        <AppStack gap="0.75rem">
          <p-dropdown v-model:open="actionMenuOpen" summary="Project actions">
            <li>
              <a href="#" @click.prevent="runAction('Edit project')">
                Edit project
              </a>
            </li>
            <li>
              <a href="#" @click.prevent="runAction('Duplicate')">
                Duplicate
              </a>
            </li>
            <li>
              <a href="#" @click.prevent="runAction('Archive')">
                Archive
              </a>
            </li>
          </p-dropdown>

          <small>{{ lastAction }}</small>
        </AppStack>
      </DocsExample>
    </p-card>
  </section>

  <section id="navigation-menu" data-section class="docs-section">
    <p-card>
      <template #header>Navigation Menu</template>

      <DocsExample :code="navigationMenuCode" preview-overflow="visible">
        <p-dropdown summary="Documentation">
          <li><a href="/docs/buttons" @click.prevent>Buttons</a></li>
          <li><a href="/docs/fields" @click.prevent>Forms</a></li>
          <li><a href="/docs/layout" @click.prevent>Layout</a></li>
        </p-dropdown>
      </DocsExample>
    </p-card>
  </section>

  <section id="button-variants" data-section class="docs-section">
    <p-card>
      <template #header>Button Variants</template>

      <DocsExample :code="buttonVariantsCode" preview-overflow="visible">
        <AppCluster>
          <p-dropdown summary="Primary" button>
            <li><a href="#" @click.prevent>Edit</a></li>
            <li><a href="#" @click.prevent>Duplicate</a></li>
          </p-dropdown>

          <p-dropdown summary="Secondary" button variant="secondary">
            <li><a href="#" @click.prevent>Export</a></li>
            <li><a href="#" @click.prevent>Share</a></li>
          </p-dropdown>

          <p-dropdown summary="More" button variant="contrast" outline>
            <li><a href="#" @click.prevent>Archive</a></li>
            <li><a href="#" @click.prevent>Delete</a></li>
          </p-dropdown>
        </AppCluster>
      </DocsExample>
    </p-card>
  </section>

  <section id="state-alignment" data-section class="docs-section">
    <p-card>
      <template #header>State & Alignment</template>

      <AppStack>
        <DocsExample :code="stateAlignmentCode" preview-overflow="visible">
          <AppCluster>
            <p-dropdown v-model:open="menuOpen" summary="Controlled menu">
              <li><a href="#" @click.prevent>First action</a></li>
              <li><a href="#" @click.prevent>Second action</a></li>
            </p-dropdown>

            <p-button variant="secondary" @click="menuOpen = !menuOpen">
              Toggle menu
            </p-button>

            <p-dropdown summary="Right aligned" align="end">
              <li><a href="#" @click.prevent>Account settings</a></li>
              <li><a href="#" @click.prevent>Sign out</a></li>
            </p-dropdown>
          </AppCluster>
        </DocsExample>
      </AppStack>
    </p-card>
  </section>

  <section id="api" data-section class="docs-section">
    <p-card>
      <template #header>API</template>

      <AppStack>
        <DocsApiTable caption="Props" :items="dropdownProps" />
        <DocsApiTable caption="Slots" :items="dropdownSlots" />
        <DocsApiTable caption="Events" :items="dropdownEvents" />
      </AppStack>
    </p-card>
  </section>
</template>
