<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { Check, Copy } from "@lucide/vue";
import { useShiki } from "@/composables/useShiki";

const { codeToHtml } = useShiki();

const {
  code,
  language = "html",
  title,
  previewOverflow = "auto",
} = defineProps<{
  code: string;
  language?: string;
  title?: string;
  previewOverflow?: "auto" | "visible";
}>();

const copied = ref(false);
const highlightedCode = ref("");

const normalizedCode = computed(() => code.trim());
const lines = computed(() => normalizedCode.value.split("\n"));
const displayLanguage = computed(() =>
  title ?? (language === "html" ? "vue" : language),
);

async function highlightCode() {
  highlightedCode.value = await codeToHtml(normalizedCode.value, {
    lang: language,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
  });
}

async function copyCode() {
  await navigator.clipboard.writeText(normalizedCode.value);
  copied.value = true;
  window.setTimeout(() => {
    copied.value = false;
  }, 1600);
}

onMounted(() => {
  void highlightCode();
});

watch([normalizedCode, () => language], () => {
  if (highlightedCode.value) {
    void highlightCode();
  }
});
</script>

<template>
  <div class="docs-example">
    <div
      v-if="$slots.default"
      class="docs-example-preview"
      :class="`docs-example-preview--${previewOverflow}`"
    >
      <slot />
    </div>

    <div class="docs-code">
      <div class="docs-code-header">
        <span>{{ displayLanguage }}</span>
        <button
          type="button"
          class="docs-code-copy"
          :aria-label="copied ? 'Copied' : 'Copy code'"
          :data-tooltip="copied ? 'Copied' : 'Copy code'"
          data-placement="left"
          @click="copyCode"
        >
          <Check v-if="copied" :size="16" aria-hidden="true" />
          <Copy v-else :size="16" aria-hidden="true" />
        </button>
      </div>

      <div class="docs-code-body">
        <div class="docs-code-lines" aria-hidden="true">
          <span v-for="(_, index) in lines" :key="index">{{ index + 1 }}</span>
        </div>
        <div v-if="highlightedCode" class="docs-code-highlight" v-html="highlightedCode" />
        <pre v-else><code :class="`language-${language}`">{{ normalizedCode }}</code></pre>
      </div>
    </div>
  </div>
</template>
