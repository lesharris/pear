<script lang="ts">
import type { DocsMeta } from "@/types/docs";

export const docsMeta = {
  title: "Buttons | Pear",
  description:
    "Button variants, grouped actions, disabled states, and loading examples for Pear.",
  tocItems: [
    { id: "overview", label: "Overview" },
    { id: "variants", label: "Variants" },
    { id: "groups", label: "Groups" },
    { id: "states", label: "States" },
    { id: "tooltips", label: "Tooltips" },
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
import { PButton, PCard, PGroup } from "@ontic/pear";

const variantsCode = String.raw`
<p-button>Primary</p-button>
<p-button variant="secondary">Secondary</p-button>
<p-button variant="contrast">Contrast</p-button>
`;

const outlineCode = String.raw`
<p-button outline>Outline</p-button>
<p-button variant="secondary" outline>Secondary outline</p-button>
<p-button variant="contrast" outline>Contrast outline</p-button>
`;

const groupCode = String.raw`
<p-group>
  <p-button>Button 1</p-button>
  <p-button>Button 2</p-button>
  <p-button>Button 3</p-button>
</p-group>
`;

const disabledCode = String.raw`
<p-button disabled>Disabled</p-button>
`;

const resetCode = String.raw`
<p-button type="reset" value="Reset" />
`;

const loadingCode = String.raw`
<p-button loading>Loading</p-button>
<p-button type="submit" value="Saving..." loading />
<p-button variant="secondary" loading>Secondary loading</p-button>
`;

const tooltipCode = String.raw`
<p-button tooltip="Save changes" tooltip-placement="bottom">
  Save
</p-button>

<p-button variant="secondary" tooltip="Nothing to undo yet" disabled>
  Undo
</p-button>
`;

const buttonProps: DocsApiItem[] = [
  { name: "type", type: "'button' | 'submit' | 'reset'", default: "'button'", description: "Renders a native button, submit input, or reset input." },
  { name: "variant", type: "'secondary' | 'contrast'", description: "Applies Pico's secondary or contrast button variant." },
  { name: "outline", type: "boolean", default: "false", description: "Applies Pico's outline button style." },
  { name: "disabled", type: "boolean", default: "false", description: "Disables the control." },
  { name: "loading", type: "boolean", default: "false", description: "Disables the control and sets aria-busy." },
  { name: "value", type: "string", description: "Label value for submit and reset input render modes." },
  { name: "tooltip", type: "string", description: "Optional Pico tooltip content." },
  { name: "tooltipPlacement", type: "PTooltipPlacement", description: "Optional Pico tooltip placement." },
];

const buttonSlots: DocsApiItem[] = [
  { name: "default", type: "slot", description: "Button content when rendering the default button mode." },
];

const buttonEvents: DocsApiItem[] = [
  { name: "native events", type: "MouseEvent, FocusEvent, ...", description: "Native button/input events pass through Vue fallthrough attributes." },
];
</script>

<template>
  <section id="overview" data-section class="docs-section">
    <DocsIntroCard name="PButton">
      <code>PButton</code> is the everyday button wrapper. It keeps Pico's
      button styles and adds a few Vue niceties: variants, loading state,
      submit/reset modes, and tooltips.
    </DocsIntroCard>
  </section>

  <section id="variants" data-section class="docs-section">
        <p-card>
          <template #header>Variants</template>

          <AppStack>
          <DocsExample :code="variantsCode">
            <div>
              <h4>Primary, Secondary, Contrast</h4>
              <AppCluster>
                <p-button>Primary</p-button>
                <p-button variant="secondary">Secondary</p-button>
                <p-button variant="contrast">Contrast</p-button>
              </AppCluster>
            </div>
          </DocsExample>

          <DocsExample :code="outlineCode">
            <div>
              <h4>Outline</h4>
              <AppCluster>
                <p-button outline>Outline</p-button>
                <p-button variant="secondary" outline>Secondary outline</p-button>
                <p-button variant="contrast" outline>Contrast outline</p-button>
              </AppCluster>
            </div>
          </DocsExample>
          </AppStack>
        </p-card>
      </section>

      <section id="groups" data-section class="docs-section">
        <p-card>
          <template #header>Groups</template>

          <DocsExample :code="groupCode">
            <p-group>
              <p-button>Button 1</p-button>
              <p-button>Button 2</p-button>
              <p-button>Button 3</p-button>
            </p-group>
          </DocsExample>
        </p-card>
      </section>

      <section id="states" data-section class="docs-section">
        <p-card>
          <template #header>States</template>

          <AppStack>
          <DocsExample :code="disabledCode">
            <div>
              <h4>Disabled</h4>
              <p-button disabled>Disabled</p-button>
            </div>
          </DocsExample>

          <DocsExample :code="resetCode">
            <div>
              <h4>Reset</h4>
              <p-button type="reset" value="Reset" />
            </div>
          </DocsExample>

          <DocsExample :code="loadingCode">
            <div>
              <h4>Loading</h4>
              <AppCluster>
                <p-button loading>Loading</p-button>
                <p-button type="submit" value="Saving..." loading />
                <p-button variant="secondary" loading>Secondary loading</p-button>
              </AppCluster>
            </div>
          </DocsExample>
          </AppStack>
        </p-card>
      </section>

      <section id="tooltips" data-section class="docs-section">
        <p-card>
          <template #header>Tooltips</template>

          <DocsExample :code="tooltipCode" preview-overflow="visible">
            <AppCluster>
              <p-button tooltip="Save changes" tooltip-placement="bottom">
                Save
              </p-button>

              <p-button variant="secondary" tooltip="Nothing to undo yet" disabled>
                Undo
              </p-button>
            </AppCluster>
          </DocsExample>
        </p-card>
      </section>

      <section id="api" data-section class="docs-section">
        <p-card>
          <template #header>API</template>

          <AppStack>
            <DocsApiTable caption="Props" :items="buttonProps" />
            <DocsApiTable caption="Slots" :items="buttonSlots" />
            <DocsApiTable caption="Events" :items="buttonEvents" />
          </AppStack>
        </p-card>
      </section>
</template>
