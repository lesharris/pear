<script lang="ts">
import type { DocsMeta } from "@/types/docs";

export const docsMeta = {
  title: "Special Inputs | Pear",
  description: "Color picker and file upload input examples for Pear.",
  tocItems: [
    { id: "overview", label: "Overview" },
    { id: "color-picker", label: "Color Picker" },
    { id: "file-upload", label: "File Upload" },
    { id: "multiple-files", label: "Multiple Files" },
    { id: "api", label: "API" },
  ],
} satisfies DocsMeta;
</script>

<script setup lang="ts">
import { computed, ref } from "vue";
import AppStack from "@/components/layout/AppStack.vue";
import DocsApiTable, { type DocsApiItem } from "@/components/DocsApiTable.vue";
import DocsExample from "@/components/DocsExample.vue";
import DocsIntroCard from "@/components/DocsIntroCard.vue";
import { PCard, PField, PInput } from "@ontic/pear";

const favoriteColor = ref("#00dfa2");
const receipt = ref<FileList | null>(null);
const attachments = ref<FileList | null>(null);

const selectedFileName = computed(() => {
  const file = receipt.value?.item(0);
  return file?.name ?? "No file selected";
});

const selectedAttachmentNames = computed(() => {
  if (!attachments.value?.length) return "No files selected";
  return Array.from(attachments.value).map((file) => file.name).join(", ");
});

const colorPickerCode = String.raw`
<p-field label="Favorite color">
  <p-input v-model="favoriteColor" type="color" name="favorite-color" />
</p-field>
`;

const fileUploadCode = String.raw`
<p-field label="Receipt" :helper="selectedFileName">
  <p-input v-model="receipt" type="file" name="receipt" accept=".pdf,image/*" />
</p-field>
`;

const multipleFilesCode = String.raw`
<p-field label="Attachments" :helper="selectedAttachmentNames">
  <p-input
    v-model="attachments"
    type="file"
    name="attachments"
    accept=".pdf,image/*"
    multiple
  />
</p-field>
`;

const colorInputProps: DocsApiItem[] = [
  { name: "v-model", type: "string", description: "Selected color as a native color input string, usually a hex value such as #00dfa2." },
  { name: "type", type: "'color'", description: "Renders a native color picker input." },
  { name: "disabled", type: "boolean", default: "false", description: "Disables the color picker. Inherits from PField when present." },
  { name: "invalid", type: "boolean", default: "false", description: "Sets aria-invalid. Inherits from PField when present." },
  { name: "tooltip", type: "string", description: "Optional Pico tooltip content." },
  { name: "tooltipPlacement", type: "PTooltipPlacement", description: "Optional Pico tooltip placement." },
];

const fileInputProps: DocsApiItem[] = [
  { name: "v-model", type: "FileList | null", description: "Selected files from the native file input." },
  { name: "type", type: "'file'", description: "Renders a native file upload input." },
  { name: "accept", type: "string", description: "Native file type filter passed through as an attribute, such as .pdf,image/*." },
  { name: "multiple", type: "boolean", default: "false", description: "Native multiple file selection passed through as an attribute." },
  { name: "disabled", type: "boolean", default: "false", description: "Disables the file input. Inherits from PField when present." },
  { name: "invalid", type: "boolean", default: "false", description: "Sets aria-invalid. Inherits from PField when present." },
  { name: "tooltip", type: "string", description: "Optional Pico tooltip content." },
  { name: "tooltipPlacement", type: "PTooltipPlacement", description: "Optional Pico tooltip placement." },
];

const colorInputEvents: DocsApiItem[] = [
  { name: "update:modelValue", type: "string", description: "Emitted by v-model when the selected color changes." },
];

const fileInputEvents: DocsApiItem[] = [
  { name: "update:modelValue", type: "FileList | null", description: "Emitted by v-model when the selected files change." },
];
</script>

<template>
  <section id="overview" data-section class="docs-section">
    <DocsIntroCard name="PInput">
      <code>PInput</code> handles the native odds and ends too: color pickers
      and file inputs, with the same field and <code>v-model</code> shape as
      the text inputs.
    </DocsIntroCard>
  </section>

  <section id="color-picker" data-section class="docs-section">
        <p-card>
          <template #header>Color Picker</template>

          <DocsExample :code="colorPickerCode">
              <p-field label="Favorite color">
                <p-input v-model="favoriteColor" type="color" name="favorite-color" />
              </p-field>
          </DocsExample>
        </p-card>
      </section>

      <section id="file-upload" data-section class="docs-section">
        <p-card>
          <template #header>File Upload</template>

          <DocsExample :code="fileUploadCode">
              <p-field label="Receipt" :helper="selectedFileName">
                <p-input v-model="receipt" type="file" name="receipt" accept=".pdf,image/*" />
              </p-field>
          </DocsExample>
        </p-card>
      </section>

      <section id="multiple-files" data-section class="docs-section">
        <p-card>
          <template #header>Multiple Files</template>

          <DocsExample :code="multipleFilesCode">
            <p-field label="Attachments" :helper="selectedAttachmentNames">
              <p-input
                v-model="attachments"
                type="file"
                name="attachments"
                accept=".pdf,image/*"
                multiple
              />
            </p-field>
          </DocsExample>
        </p-card>
      </section>

      <section id="api" data-section class="docs-section">
        <p-card>
          <template #header>API</template>

          <AppStack>
            <DocsApiTable caption="Color Input Props" :items="colorInputProps" />
            <DocsApiTable caption="Color Input Events" :items="colorInputEvents" />
            <DocsApiTable caption="File Input Props" :items="fileInputProps" />
            <DocsApiTable caption="File Input Events" :items="fileInputEvents" />
          </AppStack>
        </p-card>
      </section>
</template>
