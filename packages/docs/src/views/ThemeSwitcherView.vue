<script lang="ts">
import type { DocsMeta } from "@/types/docs";

export const docsMeta = {
  title: "Theme Switcher | Pear",
  description: "Theme switcher and useTheme examples for Pear.",
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

const { theme, toggleTheme } = useTheme();

theme.value = "dark";
toggleTheme();
`;

const themeApi: DocsApiItem[] = [
  { name: "PThemeSwitcher", type: "component", description: "Renders a light/dark theme toggle button." },
  { name: "useTheme", type: "() => { theme: Ref<'light' | 'dark'>, toggleTheme: () => void }", description: "Reads, writes, and toggles the current theme." },
  { name: "storage", type: "'pear-theme'", description: "Theme preference is persisted to localStorage when available." },
  { name: "document attribute", type: "data-theme", description: "The current theme is written to documentElement." },
  { name: "default", type: "prefers-color-scheme", description: "When storage is empty, Pear starts with the user's OS preference." },
];
</script>

<template>
  <section id="overview" data-section class="docs-section">
    <DocsIntroCard name="PThemeSwitcher">
      <code>PThemeSwitcher</code> gives users a light/dark toggle. Use
      <code>useTheme</code> when you want to read or set the same value yourself.
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
