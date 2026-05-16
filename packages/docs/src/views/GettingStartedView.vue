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
    { id: "theming", label: "Accent Color" },
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
  --pico-primary:                  #0172ad; /* link / text accent            */
  --pico-primary-background:       #0172ad; /* button / switch / progress bg */
  --pico-primary-border:           var(--pico-primary-background);
  --pico-primary-underline:        rgba(1, 114, 173, 0.5);
  --pico-primary-hover:            #015887; /* hover text / link             */
  --pico-primary-hover-background: #02659a; /* hover button bg               */
  --pico-primary-hover-border:     var(--pico-primary-hover-background);
  --pico-primary-hover-underline:  var(--pico-primary-hover);
  --pico-primary-focus:            rgba(2, 154, 232, 0.5);  /* focus ring    */
  --pico-primary-inverse:          #fff;    /* text color on filled buttons   */
  --pico-text-selection-color:     rgba(2, 154, 232, 0.25); /* ::selection   */
}

/* Dark mode — explicit (useTheme sets data-theme="dark") */
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

/* Dark mode — system (useTheme removes data-theme, OS preference applies) */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
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
}
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
      <template #header>Defining Your Own Themes</template>

      <AppStack>
        <p>
          Pear ships with Pico's azure accent. The colors are just CSS custom
          properties, so you can swap them in your own stylesheet. Load your
          theme after <code>@ontic/pear/style.css</code>.
        </p>
        <p>
          If you use <code>useTheme</code>, cover all three cases: explicit
          light, explicit dark, and system mode. System mode removes the
          <code>data-theme</code> attribute so Pico can follow the OS setting.
        </p>
        <p>
          Keep an eye on <code>--pico-primary-inverse</code>. That is the text
          color on filled primary buttons. Most accents want <code>#fff</code>;
          very bright accents usually want <code>#000</code>.
        </p>
        <DocsExample :code="themingCode" language="css" title="your-theme.css" />
      </AppStack>
    </p-card>
  </section>
</template>
