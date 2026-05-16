<script lang="ts">
import type { DocsMeta } from "@/types/docs";

export const docsMeta = {
  title: "Pear",
  description:
    "Pear is a small Vue 3 component library built on Pico CSS.",
  tocItems: [
    { id: "intro", label: "Getting Started" },
    { id: "install", label: "Installation" },
    { id: "pico", label: "Pico CSS" },
    { id: "theming", label: "Theming" },
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

const themingCode = String.raw`
/* Light mode */
[data-theme="light"],
:root:not([data-theme="dark"]) {
  --pico-primary:                  #0172ad;
  --pico-primary-background:       #0172ad;
  --pico-primary-border:           var(--pico-primary-background);
  --pico-primary-underline:        rgba(1, 114, 173, 0.5);
  --pico-primary-hover:            #015887;
  --pico-primary-hover-background: #02659a;
  --pico-primary-hover-border:     var(--pico-primary-hover-background);
  --pico-primary-hover-underline:  var(--pico-primary-hover);
  --pico-primary-focus:            rgba(2, 154, 232, 0.5);
  --pico-primary-inverse:          #fff;
  --pico-text-selection-color:     rgba(2, 154, 232, 0.25);
}

/* Dark mode */
[data-theme="dark"] {
  --pico-primary:                  #01aaff;
  --pico-primary-background:       #0172ad;
  --pico-primary-border:           var(--pico-primary-background);
  --pico-primary-underline:        rgba(1, 170, 255, 0.5);
  --pico-primary-hover:            #79c0ff;
  --pico-primary-hover-background: #017fc0;
  --pico-primary-hover-border:     var(--pico-primary-hover-background);
  --pico-primary-hover-underline:  var(--pico-primary-hover);
  --pico-primary-focus:            rgba(1, 170, 255, 0.375);
  --pico-primary-inverse:          #fff;
  --pico-text-selection-color:     rgba(1, 170, 255, 0.1875);
}
`;

const themeToggleCode = String.raw`
import { useTheme } from "@ontic/pear";

const { theme, toggleTheme } = useTheme();

theme.value = "dark"; // "light" | "dark"
toggleTheme();
`;
</script>

<template>
  <section id="intro" data-section class="docs-section">
    <p-card>
      <template #header>Getting Started</template>

      <AppStack>
        <p>
          Pear is a small Vue 3 component library built on
          <a href="https://picocss.com" target="_blank" rel="noreferrer"
            >Pico CSS</a
          >. It gives Pico's regular HTML patterns the Vue pieces you usually
          need: models, ids, labels, slots, and a few small layout helpers.
        </p>
        <p>
          Reach for Pear when it saves you from repeating glue code. Keep using
          regular HTML and Pico classes for everything else.
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
          Pear scopes Pico to <code>#app</code>. Pico styles apply inside the
          Vue app, so you do not need a class on every element.
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

  <section id="theming" data-section class="docs-section">
    <p-card>
      <template #header>Theming</template>

      <AppStack>
        <p>
          Pear follows Pico here: theme colors are CSS custom properties. Load
          your theme after <code>@ontic/pear/style.css</code>, then override the
          Pico variables you care about.
        </p>
        <p>
          <code>PThemeSwitcher</code> and <code>useTheme</code> only deal in
          <code>light</code> and <code>dark</code>. If the user has not picked
          one yet, Pear starts with their OS preference and then stores whatever
          they choose.
        </p>
        <p>
          The main knob is usually <code>--pico-primary</code>. If you change
          filled button colors, check <code>--pico-primary-inverse</code> too.
          Most accents want <code>#fff</code>; very bright accents usually want
          <code>#000</code>.
        </p>
        <DocsExample :code="themeToggleCode" language="ts" title="Theme state" />
        <DocsExample :code="themingCode" language="css" title="your-theme.css" />
      </AppStack>
    </p-card>
  </section>
</template>
