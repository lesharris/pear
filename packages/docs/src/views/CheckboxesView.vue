<script lang="ts">
import type { DocsMeta } from "@/types/docs";

export const docsMeta = {
  title: "Checkboxes & Radios | Pear",
  description:
    "Checkbox, switch, checkbox group, and radio group examples for Pear.",
  tocItems: [
    { id: "checkbox-overview", label: "PCheckbox" },
    { id: "checkboxes", label: "Checkboxes & Switches" },
    { id: "checkbox-groups", label: "Checkbox Groups" },
    { id: "radio-overview", label: "PRadio" },
    { id: "choice-states", label: "States" },
    { id: "radios", label: "Radio Group" },
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
import { PCard, PCheckbox, PCheckboxGroup, PFieldset, PRadio, PRadioGroup } from "@ontic/pear";

const acceptedTerms = ref(false);
const notificationSwitch = ref(true);
const selectedFeatures = ref<string[]>(["api"]);
const missingFeatures = ref<string[]>([]);
const contactPreference = ref("email");
const disabledChoice = ref("enabled");
const supportPlan = ref("");

const availableFeatureOptions = [
  { value: "api", label: "API access" },
  { value: "reports", label: "Reports" },
  { value: "exports", label: "Exports" },
];

const contactOptions = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "mail", label: "Mail" },
];

const supportOptions = [
  { value: "standard", label: "Standard" },
  { value: "priority", label: "Priority" },
];

const allFeaturesSelected = computed(
  () => selectedFeatures.value.length === availableFeatureOptions.length,
);

const someFeaturesSelected = computed(
  () =>
    selectedFeatures.value.length > 0 &&
    selectedFeatures.value.length < availableFeatureOptions.length,
);

const selectAllFeatures = computed({
  get: () => allFeaturesSelected.value,
  set: () => {
    selectedFeatures.value = allFeaturesSelected.value
      ? []
      : availableFeatureOptions.map((f) => f.value);
  },
});

const checkboxCode = String.raw`
<p-fieldset legend="Agreement">
  <p-checkbox v-model="acceptedTerms" name="accepted-terms">
    I agree to the terms
  </p-checkbox>
</p-fieldset>

<p-fieldset legend="Notifications">
  <p-checkbox v-model="notificationSwitch" name="notifications" switch>
    Enable notifications
  </p-checkbox>
</p-fieldset>
`;

const checkboxGroupCode = String.raw`
<p-checkbox-group
  v-model="selectedFeatures"
  legend="Features"
  name="features"
  :options="availableFeatureOptions"
/>
`;

const radioCode = String.raw`
<p-radio-group
  v-model="contactPreference"
  legend="Contact preference"
  name="contact-preference"
  :options="contactOptions"
/>
`;

const choiceStatesCode = String.raw`
<p-checkbox-group
  v-model="missingFeatures"
  legend="Features"
  error="Pick at least one feature."
  name="features"
  :options="availableFeatureOptions"
/>

<p-radio-group
  v-model="supportPlan"
  legend="Support plan"
  error="Choose a support plan."
  name="support-plan"
  :options="supportOptions"
/>
`;

const checkboxProps: DocsApiItem[] = [
  { name: "v-model", type: "string | number | boolean | Array<string | number | boolean>", description: "Checked value or selected values array." },
  { name: "value", type: "string | number | boolean", default: "true", description: "Value written when checked, or array item used in group mode." },
  { name: "uncheckedValue", type: "string | number | boolean", default: "false", description: "Value written when unchecked outside array mode." },
  { name: "switch", type: "boolean", default: "false", description: "Renders the checkbox with role switch for Pico switch styling." },
  { name: "indeterminate", type: "boolean", default: "false", description: "Sets the native indeterminate visual state." },
  { name: "disabled", type: "boolean", default: "false", description: "Disables the checkbox. Inherits from PField when present." },
  { name: "invalid", type: "boolean", default: "false", description: "Sets aria-invalid. Inherits from PField when present." },
];

const radioProps: DocsApiItem[] = [
  { name: "v-model", type: "string | number | boolean", description: "Selected radio value." },
  { name: "value", type: "string | number | boolean", description: "Value written when this radio is checked." },
  { name: "disabled", type: "boolean", default: "false", description: "Disables the radio. Inherits from PField when present." },
  { name: "invalid", type: "boolean", default: "false", description: "Sets aria-invalid. Inherits from PField when present." },
];

const groupProps: DocsApiItem[] = [
  { name: "v-model", type: "PChoiceValue[] | PChoiceValue", description: "Selected checkbox values, or the selected radio value." },
  { name: "options", type: "PChoiceOption[]", description: "Options with label, value, and optional disabled state." },
  { name: "name", type: "string", description: "Native input name. Pear creates one when omitted." },
  { name: "legend", type: "string", description: "Fieldset legend for the group." },
  { name: "helper", type: "string", description: "Helper text below the options." },
  { name: "error", type: "string", description: "Error text below the options. Also marks the group invalid." },
  { name: "disabled", type: "boolean", default: "false", description: "Disables the whole group." },
  { name: "invalid", type: "boolean", default: "false", description: "Marks the whole group invalid." },
  { name: "horizontal", type: "boolean", default: "false", description: "Lays options out in a wrapping row." },
  { name: "switch", type: "boolean", default: "false", description: "PCheckboxGroup only. Renders options as switches." },
];

const choiceSlots: DocsApiItem[] = [
  { name: "default", type: "slot", description: "Label content rendered next to the native checkbox or radio." },
  { name: "option", type: "slot", description: "PCheckboxGroup and PRadioGroup option label slot." },
];

const choiceEvents: DocsApiItem[] = [
  { name: "update:modelValue", type: "value or value[]", description: "Emitted by v-model when the native input changes." },
];
</script>

<template>
  <section id="checkbox-overview" data-section class="docs-section">
    <DocsIntroCard name="PCheckbox">
      <code>PCheckbox</code> keeps native checkbox behavior and adds the bits
      you usually want in Vue: boolean models, array models, switches, and
      indeterminate state.
    </DocsIntroCard>
  </section>

  <section id="checkboxes" data-section class="docs-section">
        <p-card>
          <template #header>Checkboxes & Switches</template>

          <DocsExample :code="checkboxCode">
            <AppGrid min="18rem">
              <p-fieldset legend="Agreement">
                <AppStack>
                  <p-checkbox v-model="acceptedTerms" name="accepted-terms">
                    I agree to the terms
                  </p-checkbox>
                </AppStack>
              </p-fieldset>

              <p-fieldset legend="Notifications">
                <AppStack>
                  <p-checkbox v-model="notificationSwitch" name="notifications" switch>
                    Enable notifications
                  </p-checkbox>
                </AppStack>
              </p-fieldset>

              <p-fieldset legend="Disabled states" disabled>
                <AppStack>
                  <p-checkbox disabled>Disabled checkbox</p-checkbox>
                  <p-checkbox switch disabled>Disabled switch</p-checkbox>
                </AppStack>
              </p-fieldset>
            </AppGrid>
          </DocsExample>
        </p-card>
      </section>

      <section id="checkbox-groups" data-section class="docs-section">
        <p-card>
          <template #header>Checkbox Groups</template>

          <DocsExample :code="checkboxGroupCode">
            <AppGrid min="18rem">
              <p-checkbox-group
                v-model="selectedFeatures"
                legend="Features"
                name="features"
                :options="availableFeatureOptions"
              />

              <p-fieldset legend="Select all">
                <AppStack>
                  <p-checkbox
                    v-model="selectAllFeatures"
                    name="select-all-features"
                    :indeterminate="someFeaturesSelected"
                  >
                    Select all features
                  </p-checkbox>

                  <p-checkbox
                    v-for="feature in availableFeatureOptions"
                    :key="feature.value"
                    v-model="selectedFeatures"
                    name="select-all-feature-options"
                    :value="feature.value"
                  >
                    {{ feature.label }}
                  </p-checkbox>
                </AppStack>
              </p-fieldset>
            </AppGrid>
          </DocsExample>
        </p-card>
      </section>

      <section id="radio-overview" data-section class="docs-section">
        <DocsIntroCard name="PRadio">
          <code>PRadio</code> is the same idea for radio buttons: native inputs
          with a tidy scalar <code>v-model</code>.
        </DocsIntroCard>
      </section>

      <section id="choice-states" data-section class="docs-section">
        <p-card>
          <template #header>States</template>

          <DocsExample :code="choiceStatesCode">
            <AppGrid min="18rem">
              <p-checkbox-group
                v-model="missingFeatures"
                legend="Features"
                error="Pick at least one feature."
                name="features"
                :options="availableFeatureOptions"
              />

              <p-radio-group
                v-model="supportPlan"
                legend="Support plan"
                error="Choose a support plan."
                name="support-plan"
                :options="supportOptions"
              />
            </AppGrid>
          </DocsExample>
        </p-card>
      </section>

      <section id="radios" data-section class="docs-section">
        <p-card>
          <template #header>Radio Group</template>

          <DocsExample :code="radioCode">
            <AppGrid min="18rem">
              <p-radio-group
                v-model="contactPreference"
                legend="Contact preference"
                name="contact-preference"
                :options="contactOptions"
              />

              <p-radio-group
                v-model="disabledChoice"
                legend="Disabled"
                name="disabled-choice"
                disabled
                :options="[{ value: 'disabled', label: 'Disabled radio' }]"
              />
            </AppGrid>
          </DocsExample>
        </p-card>
      </section>

      <section id="api" data-section class="docs-section">
        <p-card>
          <template #header>API</template>

          <AppStack>
            <DocsApiTable caption="PCheckboxGroup & PRadioGroup Props" :items="groupProps" />
            <DocsApiTable caption="PCheckbox Props" :items="checkboxProps" />
            <DocsApiTable caption="PRadio Props" :items="radioProps" />
            <DocsApiTable caption="Slots" :items="choiceSlots" />
            <DocsApiTable caption="Events" :items="choiceEvents" />
          </AppStack>
        </p-card>
      </section>
</template>
