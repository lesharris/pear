<script lang="ts">
import type { DocsMeta } from "@/types/docs";

export const docsMeta = {
  title: "Modals | Pear",
  description: "v-model and programmatic modal examples using Pear's modal provider.",
  tocItems: [
    { id: "modal-overview", label: "PModal" },
    { id: "vmodel-modal", label: "v-model" },
    { id: "provider-overview", label: "PModalProvider" },
    { id: "programmatic-modal", label: "Programmatic" },
    { id: "api", label: "API" },
  ],
} satisfies DocsMeta;
</script>

<script setup lang="ts">
import { h, ref } from "vue";
import AppStack from "@/components/layout/AppStack.vue";
import DocsApiTable, { type DocsApiItem } from "@/components/DocsApiTable.vue";
import DocsExample from "@/components/DocsExample.vue";
import DocsIntroCard from "@/components/DocsIntroCard.vue";
import { PButton, PCard, PModal, useModal } from "@ontic/pear";

const localModalOpen = ref(false);
const modal = useModal();

function openProgrammaticModal() {
  modal.open({
    title: "Programmatic modal",
    component: {
      render() {
        return h("p", "This modal was opened through the modal provider instead of local v-model state.");
      },
    },
    actions: [
      {
        label: "Cancel",
        variant: "secondary",
      },
      {
        label: "Confirm",
        action: () => {
          console.log("Confirmed from programmatic modal");
        },
      },
    ],
  });
}

const vmodelModalCode = String.raw`
<p-button @click="localModalOpen = true">
  Open v-model modal
</p-button>

<p-modal v-model="localModalOpen">
  <template #header>
    <h3>Local modal</h3>
  </template>

  <p>This modal is opened and closed with local state.</p>

  <template #footer="{ close }">
    <p-button variant="secondary" @click="close">Cancel</p-button>
    <p-button @click="close">Confirm</p-button>
  </template>
</p-modal>
`;

const programmaticModalCode = String.raw`
const modal = useModal();

modal.open({
  title: "Programmatic modal",
  component: MyModalBody,
  actions: [
    { label: "Cancel", variant: "secondary" },
    { label: "Confirm", action: save },
  ],
});
`;

const modalProps: DocsApiItem[] = [
  { name: "v-model", type: "boolean", default: "false", description: "Controls whether the native dialog is open." },
  { name: "closeOnBackdrop", type: "boolean", default: "true", description: "Closes the modal when the backdrop is clicked." },
];

const modalSlots: DocsApiItem[] = [
  { name: "header", type: "slot", description: "Header content. A close button is rendered automatically when this slot is present." },
  { name: "default", type: "{ close: () => void }", description: "Modal body content with a close slot prop." },
  { name: "footer", type: "{ close: () => void }", description: "Footer actions with a close slot prop." },
];

const modalEvents: DocsApiItem[] = [
  { name: "update:modelValue", type: "boolean", description: "Emitted by v-model when the modal closes." },
  { name: "afterClose", type: "void", description: "Emitted after the native dialog close event." },
];

const modalProviderApi: DocsApiItem[] = [
  { name: "PModalProvider", type: "component", description: "Provides programmatic modal context to child components." },
  { name: "useModal().open", type: "(options: PModalOptions) => void", description: "Opens a provider-managed modal." },
  { name: "useModal().close", type: "() => void", description: "Closes the provider-managed modal." },
];
</script>

<template>
  <section id="modal-overview" data-section class="docs-section">
    <DocsIntroCard name="PModal">
      <code>PModal</code> wraps the native dialog element with
      <code>v-model</code> control, backdrop closing, close slot props, and an
      after-close event.
    </DocsIntroCard>
  </section>

  <section id="vmodel-modal" data-section class="docs-section">
        <p-card>
          <template #header>v-model</template>

          <AppStack>
            <p>
              This modal is controlled directly by local component state.
            </p>

            <DocsExample :code="vmodelModalCode">
              <p-button @click="localModalOpen = true">
                Open v-model modal
              </p-button>

              <p-modal v-model="localModalOpen">
                <template #header>
                  <h3>Local modal</h3>
                </template>

                <p>
                  This modal is opened and closed with a local v-model binding.
                </p>

                <template #footer="{ close }">
                  <p-button variant="secondary" @click="close">
                    Cancel
                  </p-button>

                  <p-button @click="close">
                    Confirm
                  </p-button>
                </template>
              </p-modal>
            </DocsExample>
          </AppStack>
        </p-card>
      </section>

      <section id="provider-overview" data-section class="docs-section">
        <DocsIntroCard name="PModalProvider">
          <code>PModalProvider</code> and <code>useModal</code> provide an
          app-level programmatic modal API for opening modal content without
          passing local state through the view.
        </DocsIntroCard>
      </section>

      <section id="programmatic-modal" data-section class="docs-section">
        <p-card>
          <template #header>Programmatic</template>

          <AppStack>
            <p>
              This modal is opened through the app-level modal provider without
              passing v-model state through this view.
            </p>

            <DocsExample :code="programmaticModalCode" language="ts">
              <p-button @click="openProgrammaticModal">
                Open programmatic modal
              </p-button>
            </DocsExample>
          </AppStack>
        </p-card>
      </section>

      <section id="api" data-section class="docs-section">
        <p-card>
          <template #header>API</template>

          <AppStack>
            <DocsApiTable caption="PModal Props" :items="modalProps" />
            <DocsApiTable caption="PModal Slots" :items="modalSlots" />
            <DocsApiTable caption="PModal Events" :items="modalEvents" />
            <DocsApiTable caption="Programmatic API" :items="modalProviderApi" />
          </AppStack>
        </p-card>
      </section>
</template>
