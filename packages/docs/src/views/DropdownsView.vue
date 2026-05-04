<script lang="ts">
import type { DocsMeta } from "@/types/docs";

export const docsMeta = {
  title: "Dropdowns | Pear",
  description:
    "Dropdown menus, button variants, inputs, validation, and alignment examples for Pear.",
  tocItems: [
    { id: "overview", label: "Overview" },
    { id: "basic-dropdown", label: "Basic" },
    { id: "button-variants", label: "Button Variants" },
    { id: "dropdown-inputs", label: "Checkboxes & Radios" },
    { id: "dropdown-validation", label: "Validation & Alignment" },
    { id: "api", label: "API" },
  ],
} satisfies DocsMeta;
</script>

<script setup lang="ts">
import { computed, ref } from "vue";
import AppGrid from "@/components/layout/AppGrid.vue";
import AppStack from "@/components/layout/AppStack.vue";
import DocsApiTable, { type DocsApiItem } from "@/components/DocsApiTable.vue";
import DocsExample from "@/components/DocsExample.vue";
import DocsIntroCard from "@/components/DocsIntroCard.vue";
import { PCard, PCheckbox, PDropdown, PRadio } from "@ontic/pear";

const dropdownAction = ref("Choose an action");
const dropdownPhase = ref("solid");
const dropdownPhases = ref<string[]>(["solid"]);

const phaseOptions = [
  { value: "solid", label: "Solid" },
  { value: "liquid", label: "Liquid" },
  { value: "gas", label: "Gas" },
  { value: "plasma", label: "Plasma" },
];

const selectedPhaseLabel = computed(() => {
  return (
    phaseOptions.find((phase) => phase.value === dropdownPhase.value)?.label ??
    "Select one phase..."
  );
});

const selectedPhasesLabel = computed(() => {
  if (dropdownPhases.value.length === 0) return "Select phases...";
  return phaseOptions
    .filter((phase) => dropdownPhases.value.includes(phase.value))
    .map((phase) => phase.label)
    .join(", ");
});

const basicDropdownCode = String.raw`
<p-dropdown :summary="dropdownAction">
  <li v-for="phase in phaseOptions" :key="phase.value">
    <a href="#" @click.prevent="dropdownAction = phase.label">
      {{ phase.label }}
    </a>
  </li>
</p-dropdown>
`;

const dropdownInputsCode = String.raw`
<p-dropdown :summary="selectedPhasesLabel">
  <li v-for="phase in phaseOptions" :key="phase.value">
    <p-checkbox v-model="dropdownPhases" name="dropdown-phases" :value="phase.value">
      {{ phase.label }}
    </p-checkbox>
  </li>
</p-dropdown>
`;

const dropdownProps: DocsApiItem[] = [
  { name: "summary", type: "string", description: "Text shown in the summary when no summary slot is provided." },
  { name: "open", type: "boolean", default: "false", description: "Initial native details open state." },
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
</script>

<template>
  <section id="overview" data-section class="docs-section">
    <DocsIntroCard name="PDropdown">
      <code>PDropdown</code> renders Pico-compatible native details dropdowns
      with button styling, alignment, invalid state, and custom summary content.
    </DocsIntroCard>
  </section>

  <section id="basic-dropdown" data-section class="docs-section">
        <p-card>
          <template #header>Basic</template>

          <DocsExample :code="basicDropdownCode">
            <p-dropdown :summary="dropdownAction">
              <li v-for="phase in phaseOptions" :key="phase.value">
                <a href="#" @click.prevent="dropdownAction = phase.label">
                  {{ phase.label }}
                </a>
              </li>
            </p-dropdown>
          </DocsExample>
        </p-card>
      </section>

      <section id="button-variants" data-section class="docs-section">
        <p-card>
          <template #header>Button Variants</template>

          <AppGrid min="14rem">
            <p-dropdown summary="Primary" button>
              <li v-for="phase in phaseOptions" :key="phase.value">
                <a href="#" @click.prevent>{{ phase.label }}</a>
              </li>
            </p-dropdown>

            <p-dropdown summary="Secondary" button variant="secondary">
              <li v-for="phase in phaseOptions" :key="phase.value">
                <a href="#" @click.prevent>{{ phase.label }}</a>
              </li>
            </p-dropdown>

            <p-dropdown summary="Contrast outline" button variant="contrast" outline>
              <li v-for="phase in phaseOptions" :key="phase.value">
                <a href="#" @click.prevent>{{ phase.label }}</a>
              </li>
            </p-dropdown>
          </AppGrid>
        </p-card>
      </section>

      <section id="dropdown-inputs" data-section class="docs-section">
        <p-card>
          <template #header>Checkboxes & Radios</template>

          <DocsExample :code="dropdownInputsCode">
            <AppGrid min="18rem">
              <p-dropdown :summary="selectedPhasesLabel">
                <li v-for="phase in phaseOptions" :key="phase.value">
                  <p-checkbox v-model="dropdownPhases" name="dropdown-phases" :value="phase.value">
                    {{ phase.label }}
                  </p-checkbox>
                </li>
              </p-dropdown>

              <p-dropdown :summary="selectedPhaseLabel">
                <li v-for="phase in phaseOptions" :key="phase.value">
                  <p-radio v-model="dropdownPhase" name="dropdown-phase" :value="phase.value">
                    {{ phase.label }}
                  </p-radio>
                </li>
              </p-dropdown>
            </AppGrid>
          </DocsExample>
        </p-card>
      </section>

      <section id="dropdown-validation" data-section class="docs-section">
        <p-card>
          <template #header>Validation & Alignment</template>

          <AppGrid min="18rem">
            <p-dropdown summary="Invalid dropdown" invalid>
              <li v-for="phase in phaseOptions" :key="phase.value">
                <a href="#" @click.prevent>{{ phase.label }}</a>
              </li>
            </p-dropdown>

            <p-dropdown summary="Right aligned" align="end">
              <li v-for="phase in phaseOptions" :key="phase.value">
                <a href="#" @click.prevent>{{ phase.label }}</a>
              </li>
            </p-dropdown>
          </AppGrid>
        </p-card>
      </section>

      <section id="api" data-section class="docs-section">
        <p-card>
          <template #header>API</template>

          <AppStack>
            <DocsApiTable caption="Props" :items="dropdownProps" />
            <DocsApiTable caption="Slots" :items="dropdownSlots" />
          </AppStack>
        </p-card>
      </section>
</template>
