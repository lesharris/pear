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

onMounted(() => {
  mounted.value = true
})

function showModal(nextOptions: PModalOptions) {
  options.value = nextOptions
  open.value = true
}

function closeModal() {
  open.value = false
}

async function runAction(action?: () => void | Promise<void>) {
  await action?.()
  closeModal()
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
    @after-close="options = null"
  >
    <template v-if="options?.title" #header>
      <h3>{{ options.title }}</h3>
    </template>

    <component
      :is="options.component"
      v-if="options?.component"
      v-bind="options.props"
    />

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
