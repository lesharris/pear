<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import AppSidebar from "@/components/layout/AppSidebar.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
import SiteSearch from "@/components/SiteSearch.vue";
import DocsPage from "@/layouts/DocsPage.vue";
import { PThemeSwitcher } from "@ontic/pear";

const navItems = [
  {
    id: "getting-started",
    label: "Getting Started",
    group: "Overview",
    path: "/docs",
  },
  {
    id: "buttons",
    label: "Buttons",
    group: "Components",
    path: "/docs/buttons",
  },
  {
    id: "cards",
    label: "Cards",
    group: "Components",
    path: "/docs/cards",
  },
  {
    id: "fields",
    label: "Fields",
    group: "Form Controls",
    path: "/docs/fields",
  },
  {
    id: "text-inputs",
    label: "Text Inputs",
    group: "Form Controls",
    path: "/docs/text-inputs",
  },
  {
    id: "date-inputs",
    label: "Date Inputs",
    group: "Form Controls",
    path: "/docs/date-inputs",
  },
  {
    id: "selects",
    label: "Selects",
    group: "Form Controls",
    path: "/docs/selects",
  },
  {
    id: "checkboxes",
    label: "Checkboxes & Radios",
    group: "Form Controls",
    path: "/docs/checkboxes",
  },
  { id: "range", label: "Range", group: "Form Controls", path: "/docs/range" },
  { id: "groups", label: "Groups", group: "Components", path: "/docs/groups" },
  {
    id: "progress",
    label: "Progress",
    group: "Feedback",
    path: "/docs/progress",
  },
  {
    id: "tooltips",
    label: "Tooltips",
    group: "Feedback",
    path: "/docs/tooltips",
  },
  {
    id: "other-inputs",
    label: "Special Inputs",
    group: "Form Controls",
    path: "/docs/other-inputs",
  },
  {
    id: "layout",
    label: "Layout Primitives",
    group: "Layout",
    path: "/docs/layout",
  },
  {
    id: "navigation",
    label: "Navigation",
    group: "Layout",
    path: "/docs/navigation",
  },
  {
    id: "accordions",
    label: "Accordions",
    group: "Disclosure & Overlays",
    path: "/docs/accordions",
  },
  { id: "modals", label: "Modals", group: "Disclosure & Overlays", path: "/docs/modals" },
  {
    id: "dropdowns",
    label: "Dropdowns",
    group: "Disclosure & Overlays",
    path: "/docs/dropdowns",
  },
  {
    id: "theme-switcher",
    label: "Theme Switcher",
    group: "Utilities",
    path: "/docs/theme-switcher",
  },
];

const navGroups = [...new Set(navItems.map((i) => i.group))];
function itemsForGroup(group: string) {
  return navItems.filter((i) => i.group === group);
}

const headerEl = ref<HTMLElement | null>(null);
const clientMounted = ref(false);
let headerObserver: ResizeObserver | null = null;

onMounted(() => {
  clientMounted.value = true;
  if (headerEl.value) {
    const updateHeight = () => {
      document.documentElement.style.setProperty(
        "--header-height",
        `${headerEl.value!.offsetHeight}px`,
      );
    };
    updateHeight();
    headerObserver = new ResizeObserver(updateHeight);
    headerObserver.observe(headerEl.value);
  }
});

onBeforeUnmount(() => headerObserver?.disconnect());
</script>

<template>
  <div ref="headerEl" class="docs-header">
    <RouterLink to="/" class="brand-link" aria-label="Pear home">
      <img src="@/assets/peary.png" alt="" class="brand-logo" />
      <span class="brand-name brand-title">Pear</span>
    </RouterLink>

    <div class="docs-nav-right">
      <SiteSearch v-if="clientMounted" />
      <a
        href="https://github.com/onticcloud/pear"
        target="_blank"
        rel="noreferrer"
        class="docs-nav-link"
        aria-label="GitHub"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"
          />
        </svg>
      </a>
      <span class="docs-nav-divider" aria-hidden="true" />
      <PThemeSwitcher v-if="clientMounted" />
    </div>
  </div>

  <main class="docs-main">
    <AppSidebar side-width="15rem" content-min="60%" gap="2rem">
      <aside>
        <nav class="docs-nav">
          <template v-for="group in navGroups" :key="group">
            <p class="docs-nav-group">{{ group }}</p>
            <ul>
              <li v-for="item in itemsForGroup(group)" :key="item.id">
                <RouterLink :to="item.path">{{ item.label }}</RouterLink>
              </li>
            </ul>
          </template>
        </nav>
      </aside>

      <DocsPage />
    </AppSidebar>
  </main>

  <div style="width: 100%"><AppFooter /></div>
</template>

<style scoped>
/* ── Header ── */
.docs-header {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  height: 3.5rem;
  background: color-mix(in srgb, var(--pico-background-color) 88%, transparent);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--pico-muted-border-color);
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  --pico-color: inherit;
  color: var(--pico-color);
}

.brand-logo {
  height: 2.2rem;
  width: auto;
}

.brand-name {
  font-size: 1.75rem;
  line-height: 1;
  color: var(--pico-color);
}

.docs-nav-right {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

main.docs-main {
  width: min(100% - 3rem, 112rem) !important;
  max-width: 112rem !important;
  margin-inline: auto;
}

.docs-main :deep(.app-sidebar > :first-child) {
  flex-grow: 0;
}

.docs-nav-link {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--pico-muted-color);
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: color 0.15s;
}

.docs-nav-link:hover {
  color: var(--pico-primary);
  text-decoration: none;
}

.docs-nav-divider {
  display: block;
  width: 1px;
  height: 1.2rem;
  background: var(--pico-muted-border-color);
}

@media (max-width: 768px) {
  .docs-header {
    padding: 0 1rem;
  }
}
</style>
