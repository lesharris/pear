<script setup lang="ts">
import { computed, onMounted, provide, shallowRef, ref } from 'vue'
import PModal from '@/components/PModal.vue'
import PButton from '@/components/PButton.vue'
import { PModalKey, type PModalOptions } from '@/types/PModal'

defineOptions({
  inheritAttrs: false,
})

const open = ref(false)
const options = shallowRef<PModalOptions | null>(null)
const mounted = ref(false)
let resolveModal: ((result: unknown) => void) | null = null

onMounted(() => {
  mounted.value = true
})

function settleModal(result?: unknown) {
  resolveModal?.(result)
  resolveModal = null
}

function showModal(nextOptions: PModalOptions) {
  settleModal()
  options.value = nextOptions
  open.value = true

  return new Promise<unknown>((resolve) => {
    resolveModal = resolve
  })
}

function closeModal(result?: unknown) {
  settleModal(result)
  open.value = false
}

function afterClose() {
  settleModal()
  options.value = null
}

async function runAction(action?: () => unknown) {
  const result = await action?.()
  closeModal(result)
}

const actions = computed(() => options.value?.actions ?? [])

provide(PModalKey, {
  open: showModal,
  close: closeModal,
})
</script>

<template>
  <slot />

  <p-modal
    v-if="mounted"
    v-model="open"
    :close-on-backdrop="options?.closeOnBackdrop ?? true"
    @after-close="afterClose"
  >
    <template v-if="options?.title" #header>
      <h3>{{ options.title }}</h3>
    </template>

    <p v-if="options?.description">
      {{ options.description }}
    </p>

    <component :is="options.component" v-if="options?.component" v-bind="options.props" />

    <template v-if="actions.length" #footer>
      <p-button
        v-for="action in actions"
        :key="action.label"
        :variant="action.variant"
        :outline="action.outline"
        @click="runAction(action.action)"
      >
        {{ action.label }}
      </p-button>
    </template>
  </p-modal>
</template>
