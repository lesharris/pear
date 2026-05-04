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
    { id: "radios", label: "Radio Group" },
    { id: "api", label: "API" },
  ],
} satisfies DocsMeta;
</script>

<script setup lang="ts">
import { computed, ref } from "vue";
import AppBox from "@/components/layout/AppBox.vue";
import AppGrid from "@/components/layout/AppGrid.vue";
import AppStack from "@/components/layout/AppStack.vue";
import DocsApiTable, { type DocsApiItem } from "@/components/DocsApiTable.vue";
import DocsExample from "@/components/DocsExample.vue";
import DocsIntroCard from "@/components/DocsIntroCard.vue";
import { PCard, PCheckbox, PRadio } from "@ontic/pear";

const acceptedTerms = ref(false);
const notificationSwitch = ref(true);
const selectedFeatures = ref<string[]>(["api"]);
const contactPreference = ref("email");
const disabledChoice = ref("enabled");

const availableFeatureOptions = [
  { value: "api", label: "API access" },
  { value: "reports", label: "Reports" },
  { value: "exports", label: "Exports" },
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
<p-checkbox v-model="acceptedTerms" name="accepted-terms">
  I agree to the terms
</p-checkbox>

<p-checkbox v-model="notificationSwitch" name="notifications" switch>
  Enable notifications
</p-checkbox>
`;

const checkboxGroupCode = String.raw`
<p-checkbox v-model="selectedFeatures" name="features" value="api">
  API access
</p-checkbox>
<p-checkbox v-model="selectedFeatures" name="features" value="reports">
  Reports
</p-checkbox>
`;

const radioCode = String.raw`
<p-radio v-model="contactPreference" name="contact-preference" value="email">
  Email
</p-radio>
<p-radio v-model="contactPreference" name="contact-preference" value="phone">
  Phone
</p-radio>
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

const choiceSlots: DocsApiItem[] = [
  { name: "default", type: "slot", description: "Label content rendered next to the native checkbox or radio." },
];

const choiceEvents: DocsApiItem[] = [
  { name: "update:modelValue", type: "value or value[]", description: "Emitted by v-model when the native input changes." },
];
</script>

<template>
  <section id="checkbox-overview" data-section class="docs-section">
    <DocsIntroCard name="PCheckbox">
      <code>PCheckbox</code> wraps native checkbox inputs with boolean and array
      <code>v-model</code> handling, switch styling, indeterminate state, and
      field-context support.
    </DocsIntroCard>
  </section>

  <section id="checkboxes" data-section class="docs-section">
        <p-card>
          <template #header>Checkboxes & Switches</template>

          <DocsExample :code="checkboxCode">
            <AppGrid min="18rem">
              <AppBox padding="0">
                <AppStack>
                  <h5>Checkbox</h5>

                  <p-checkbox v-model="acceptedTerms" name="accepted-terms">
                    I agree to the terms
                  </p-checkbox>
                </AppStack>
              </AppBox>

              <AppBox padding="0">
                <AppStack>
                  <h5>Switch</h5>

                  <p-checkbox v-model="notificationSwitch" name="notifications" switch>
                    Enable notifications
                  </p-checkbox>
                </AppStack>
              </AppBox>

              <AppBox padding="0">
                <AppStack>
                  <h5>Disabled states</h5>

                  <p-checkbox disabled>Disabled checkbox</p-checkbox>
                  <p-checkbox switch disabled>Disabled switch</p-checkbox>
                </AppStack>
              </AppBox>
            </AppGrid>
          </DocsExample>
        </p-card>
      </section>

      <section id="checkbox-groups" data-section class="docs-section">
        <p-card>
          <template #header>Checkbox Groups</template>

          <DocsExample :code="checkboxGroupCode">
            <AppGrid min="18rem">
            <AppBox padding="0">
              <AppStack>
                <h5>Basic group</h5>

                <p-checkbox v-model="selectedFeatures" name="features" value="api">
                  API access
                </p-checkbox>
                <p-checkbox v-model="selectedFeatures" name="features" value="reports">
                  Reports
                </p-checkbox>
                <p-checkbox v-model="selectedFeatures" name="features" value="exports">
                  Exports
                </p-checkbox>
              </AppStack>
            </AppBox>

            <AppBox padding="0">
              <AppStack>
                <h5>Select all / indeterminate</h5>

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
            </AppBox>
            </AppGrid>
          </DocsExample>
        </p-card>
      </section>

      <section id="radio-overview" data-section class="docs-section">
        <DocsIntroCard name="PRadio">
          <code>PRadio</code> wraps native radio inputs with scalar
          <code>v-model</code> handling and field-context support.
        </DocsIntroCard>
      </section>

      <section id="radios" data-section class="docs-section">
        <p-card>
          <template #header>Radio Group</template>

          <DocsExample :code="radioCode">
            <AppGrid min="18rem">
            <AppBox padding="0">
              <AppStack>
                <h5>Basic radio group</h5>

                <p-radio v-model="contactPreference" name="contact-preference" value="email">
                  Email
                </p-radio>
                <p-radio v-model="contactPreference" name="contact-preference" value="phone">
                  Phone
                </p-radio>
                <p-radio v-model="contactPreference" name="contact-preference" value="mail">
                  Mail
                </p-radio>
              </AppStack>
            </AppBox>

            <AppBox padding="0">
              <AppStack>
                <h5>Disabled</h5>

                <p-radio v-model="disabledChoice" name="disabled-choice" value="disabled" disabled>
                  Disabled radio
                </p-radio>
              </AppStack>
            </AppBox>
            </AppGrid>
          </DocsExample>
        </p-card>
      </section>

      <section id="api" data-section class="docs-section">
        <p-card>
          <template #header>API</template>

          <AppStack>
            <DocsApiTable caption="PCheckbox Props" :items="checkboxProps" />
            <DocsApiTable caption="PRadio Props" :items="radioProps" />
            <DocsApiTable caption="Slots" :items="choiceSlots" />
            <DocsApiTable caption="Events" :items="choiceEvents" />
          </AppStack>
        </p-card>
      </section>
</template>
