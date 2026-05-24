<script setup lang="ts">
import { onMounted, ref, useId, watch } from 'vue'

const model = defineModel<boolean>({ default: false })

const { closeOnBackdrop = true } = defineProps<{
  closeOnBackdrop?: boolean
}>()

const emit = defineEmits<{
  afterClose: []
}>()

const dialog = ref<HTMLDialogElement>()
const headerId = useId()

function syncDialog(open: boolean) {
  const el = dialog.value
  if (!el) return

  if (open && !el.open) {
    el.showModal()
  }

  if (!open && el.open) {
    el.close()
  }
}

onMounted(() => {
  syncDialog(model.value)
})

watch(model, syncDialog)

function close() {
  model.value = false
}

function onClose() {
  model.value = false
  emit('afterClose')
}

function onClick(event: MouseEvent) {
  if (!closeOnBackdrop) return
  if (event.target === dialog.value) {
    close()
  }
}
</script>

<template>
  <dialog
    ref="dialog"
    :aria-labelledby="$slots.header ? headerId : undefined"
    @close="onClose"
    @click="onClick"
  >
    <article>
      <header v-if="$slots.header">
        <button aria-label="Close" rel="prev" @click="close" />

        <span :id="headerId">
          <slot name="header" />
        </span>
      </header>

      <slot :close="close" />

      <footer v-if="$slots.footer">
        <slot name="footer" :close="close" />
      </footer>
    </article>
  </dialog>
</template>
