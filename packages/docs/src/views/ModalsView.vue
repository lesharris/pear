<script lang="ts">
import type { DocsMeta } from "@/types/docs";

export const docsMeta = {
  title: "Modals | Pear",
  description: "v-model and programmatic modal examples using Pear's modal provider.",
  tocItems: [
    { id: "modal-overview", label: "PModal" },
    { id: "vmodel-modal", label: "v-model" },
    { id: "backdrop", label: "Backdrop" },
    { id: "provider-overview", label: "PModalProvider" },
    { id: "programmatic-modal", label: "Programmatic" },
    { id: "api", label: "API" },
  ],
} satisfies DocsMeta;
</script>

<script setup lang="ts">
import { h, inject, ref } from "vue";
import AppStack from "@/components/layout/AppStack.vue";
import DocsApiTable, { type DocsApiItem } from "@/components/DocsApiTable.vue";
import DocsExample from "@/components/DocsExample.vue";
import DocsIntroCard from "@/components/DocsIntroCard.vue";
import { PButton, PCard, PModal, PModalKey } from "@ontic/pear";

const localModalOpen = ref(false);
const pinnedModalOpen = ref(false);
const programmaticResult = ref("No result yet");
const modal = inject(PModalKey, undefined);

async function openProgrammaticModal() {
  if (!modal) {
    programmaticResult.value = "Modal provider is not available here.";
    return;
  }

  const result = await modal.open({
    title: "Programmatic modal",
    description: "Choose an action and the promise resolves with its result.",
    component: {
      render() {
        return h("p", "Provider modals can also render custom Vue components.");
      },
    },
    actions: [
      {
        label: "Cancel",
        variant: "secondary",
        action: () => "cancel",
      },
      {
        label: "Confirm",
        action: () => "confirm",
      },
    ],
  });

  programmaticResult.value =
    typeof result === "string" ? `Result: ${result}` : "Closed without a result";
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

const backdropModalCode = String.raw`
<p-button variant="secondary" @click="pinnedModalOpen = true">
  Open pinned modal
</p-button>

<p-modal v-model="pinnedModalOpen" :close-on-backdrop="false">
  <template #header>
    <h3>Check the details</h3>
  </template>

  <p>Backdrop clicks stay put, so the user needs to choose an action.</p>

  <template #footer="{ close }">
    <p-button @click="close">Done</p-button>
  </template>
</p-modal>
`;

const programmaticModalCode = String.raw`
const modal = useModal();

async function confirmSave() {
  const result = await modal.open({
    title: "Programmatic modal",
    description: "Choose an action and the promise resolves with its result.",
    component: MyModalBody,
    actions: [
      { label: "Cancel", variant: "secondary", action: () => "cancel" },
      { label: "Confirm", action: () => "confirm" },
    ],
  });

  if (result === "confirm") {
    await save();
  }
}
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
  { name: "useModal().open", type: "(options: PModalOptions) => Promise<unknown>", description: "Opens a provider modal and resolves with the clicked action's return value." },
  { name: "useModal().close", type: "(result?: unknown) => void", description: "Closes the provider modal and optionally resolves it with a value." },
];
</script>

<template>
  <section id="modal-overview" data-section class="docs-section">
    <DocsIntroCard name="PModal">
      <code>PModal</code> uses the native dialog element with
      <code>v-model</code>, footer close helpers, and an after-close event.
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

      <section id="backdrop" data-section class="docs-section">
        <p-card>
          <template #header>Backdrop</template>

          <DocsExample :code="backdropModalCode">
            <p-button variant="secondary" @click="pinnedModalOpen = true">
              Open pinned modal
            </p-button>

            <p-modal v-model="pinnedModalOpen" :close-on-backdrop="false">
              <template #header>
                <h3>Check the details</h3>
              </template>

              <p>
                Backdrop clicks stay put, so the user needs to choose an action.
              </p>

              <template #footer="{ close }">
                <p-button @click="close">Done</p-button>
              </template>
            </p-modal>
          </DocsExample>
        </p-card>
      </section>

      <section id="provider-overview" data-section class="docs-section">
        <DocsIntroCard name="PModalProvider">
          <code>PModalProvider</code> and <code>useModal</code> are handy when
          a view needs to open a modal without carrying local modal state around.
        </DocsIntroCard>
      </section>

      <section id="programmatic-modal" data-section class="docs-section">
        <p-card>
          <template #header>Programmatic</template>

          <AppStack>
            <p>
              This one comes from the app-level provider. Since
              <code>modal.open()</code> returns a promise, you can await the
              user's choice.
            </p>

            <DocsExample :code="programmaticModalCode" language="ts">
              <AppStack gap="0.75rem">
                <p-button @click="openProgrammaticModal">
                  Open programmatic modal
                </p-button>

                <small>{{ programmaticResult }}</small>
              </AppStack>
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
