<script lang="ts">
import type { DocsMeta } from "@/types/docs";

export const docsMeta = {
  title: "Pear",
  description:
    "Pear is a lightweight Vue 3 component library built around PicoCSS semantics.",
  tocItems: [
    { id: "intro", label: "Getting Started" },
    { id: "install", label: "Installation" },
    { id: "pico", label: "Pico CSS" },
  ],
} satisfies DocsMeta;
</script>

<script setup lang="ts">
import AppStack from "@/components/layout/AppStack.vue";
import DocsExample from "@/components/DocsExample.vue";
import { PCard } from "@ontic/pear";

const installCode = String.raw`
bun add @ontic/pear
`;

const installLucideCode = String.raw`
bun add lucide-vue-next
`;

const setupCode = [
  'import { createApp } from "vue";',
  'import "@ontic/pear/style.css";',
  'import App from "./App.vue";',
  "",
  'createApp(App).mount("#app");',
].join("\n");

const picoCode = String.raw`
<template>
  <main class="container">
    <article>
      <header>Semantic Pico structure</header>
      <p>
        Pear components render regular HTML and keep Pico classes available
        for layout, typography, color, and small one-off adjustments.
      </p>
    </article>
  </main>
</template>
`;
</script>

<template>
  <section id="intro" data-section class="docs-section">
    <p-card>
      <template #header>Getting Started</template>

      <AppStack>
        <p>
          Pear is a Vue 3 component library wrapping
          <a href="https://picocss.com" target="_blank" rel="noreferrer"
            >Pico CSS</a
          >. It provides semantic HTML wrapper components that leverage Pico's
          class-light styling approach.
        </p>
        <p>
          Use Pear components where they remove repetitive Vue wiring, and keep
          using Pico classes directly for ordinary semantic layout and prose.
        </p>
      </AppStack>
    </p-card>
  </section>

  <section id="install" data-section class="docs-section">
    <p-card>
      <template #header>Installation</template>

      <AppStack>
        <p>Requires Vue 3.5 or later.</p>
        <DocsExample :code="installCode" language="shell" title="Install" />
        <DocsExample :code="setupCode" language="ts" title="main.ts" />
        <p>
          <code>lucide-vue-next</code> is a peer dependency required only if you
          use <code>PThemeSwitcher</code>.
        </p>
        <DocsExample :code="installLucideCode" language="shell" title="Optional: PThemeSwitcher" />
      </AppStack>
    </p-card>
  </section>

  <section id="pico" data-section class="docs-section">
    <p-card>
      <template #header>Working With Pico</template>

      <AppStack>
        <p>
          Pear imports Pico with <code>#app</code> as the semantic root, so Pico
          styles apply inside the Vue app without requiring a class on every
          element.
        </p>

        <DocsExample :code="picoCode" title="Vue template">
          <main class="container">
            <article>
              <header>Semantic Pico structure</header>
              <p>
                Pear components render regular HTML and keep Pico classes
                available for layout, typography, color, and small adjustments.
              </p>
            </article>
          </main>
        </DocsExample>
      </AppStack>
    </p-card>
  </section>
</template>
