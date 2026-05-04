<script lang="ts">
import type { DocsMeta } from "@/types/docs";

export const docsMeta = {
  title: "Theme Switcher | Pear",
  description: "Theme switcher component and useTheme composable examples for Pear.",
  tocItems: [
    { id: "overview", label: "Overview" },
    { id: "switcher", label: "Switcher" },
    { id: "composable", label: "Composable" },
    { id: "api", label: "API" },
  ],
} satisfies DocsMeta;
</script>

<script setup lang="ts">
import AppStack from "@/components/layout/AppStack.vue";
import DocsApiTable, { type DocsApiItem } from "@/components/DocsApiTable.vue";
import DocsExample from "@/components/DocsExample.vue";
import DocsIntroCard from "@/components/DocsIntroCard.vue";
import { PCard, PThemeSwitcher } from "@ontic/pear";

const switcherCode = String.raw`
<p-theme-switcher />
`;

const composableCode = String.raw`
import { useTheme } from "@ontic/pear";

const { theme } = useTheme();

theme.value = "dark";
`;

const themeApi: DocsApiItem[] = [
  { name: "PThemeSwitcher", type: "component", description: "Renders system, light, and dark icon buttons in a group." },
  { name: "useTheme", type: "() => { theme: Ref<'system' | 'light' | 'dark'> }", description: "Reads and writes the current theme." },
  { name: "storage", type: "'pear-theme'", description: "Theme preference is persisted to localStorage when available." },
  { name: "document attribute", type: "data-theme", description: "Light and dark set documentElement data-theme. System removes it." },
];
</script>

<template>
  <section id="overview" data-section class="docs-section">
    <DocsIntroCard name="PThemeSwitcher">
      <code>PThemeSwitcher</code> renders system, light, and dark theme controls
      backed by the shared <code>useTheme</code> composable.
    </DocsIntroCard>
  </section>

  <section id="switcher" data-section class="docs-section">
    <p-card>
      <template #header>Switcher</template>

      <DocsExample :code="switcherCode">
        <p-theme-switcher />
      </DocsExample>
    </p-card>
  </section>

  <section id="composable" data-section class="docs-section">
    <p-card>
      <template #header>Composable</template>

      <DocsExample :code="composableCode" language="ts" />
    </p-card>
  </section>

  <section id="api" data-section class="docs-section">
    <p-card>
      <template #header>API</template>

      <DocsApiTable caption="Theme API" :items="themeApi" />
    </p-card>
  </section>
</template>
