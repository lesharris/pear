<script lang="ts">
import type { DocsMeta } from '@/types/docs'

export const docsMeta = {
  title: 'Layout Primitives | Pear',
  description:
    'Small Vue layout primitives for common composition patterns that sit comfortably beside Pico CSS.',
  tocItems: [
    { id: 'overview', label: 'Overview' },
    { id: 'stack', label: 'PStack' },
    { id: 'cluster', label: 'PCluster' },
    { id: 'inline', label: 'PInline' },
    { id: 'grid', label: 'PGrid' },
    { id: 'sidebar', label: 'PSidebar' },
    { id: 'switcher', label: 'PSwitcher' },
    { id: 'scroll', label: 'PScroll' },
    { id: 'api', label: 'API' },
  ],
} satisfies DocsMeta
</script>

<script setup lang="ts">
import { ref } from 'vue'
import AppStack from '@/components/layout/AppStack.vue'
import DocsApiTable, { type DocsApiItem } from '@/components/DocsApiTable.vue'
import DocsExample from '@/components/DocsExample.vue'
import DocsIntroCard from '@/components/DocsIntroCard.vue'
import {
  PButton,
  PCard,
  PCluster,
  PField,
  PGrid,
  PInline,
  PInput,
  PScroll,
  PSidebar,
  PStack,
  PSwitcher,
} from '@ontic/pear'

const stackName = ref('')
const stackEmail = ref('')
const clusterSearch = ref('')

const stackCode = String.raw`
<p-stack gap="1rem">
  <p-field label="Name">
    <p-input v-model="stackName" name="name" />
  </p-field>
  <p-field label="Email">
    <p-input v-model="stackEmail" type="email" name="email" />
  </p-field>
  <p-button>Save profile</p-button>
</p-stack>
`

const clusterCode = String.raw`
<p-cluster gap="0.5rem">
  <p-button>Save</p-button>
  <p-button variant="secondary">Preview</p-button>
  <p-button variant="contrast" outline>Delete</p-button>
</p-cluster>
`

const inlineCode = String.raw`
<p-inline gap="0.5rem" as="nav" aria-label="Breadcrumb">
  <a href="#" @click.prevent>Docs</a>
  <span aria-hidden="true">/</span>
  <a href="#" @click.prevent>Layout</a>
  <span aria-hidden="true">/</span>
  <span>PInline</span>
</p-inline>
`

const gridCode = String.raw`
<p-grid min="12rem" gap="1rem">
  <div class="tile">Forms</div>
  <div class="tile">Overlays</div>
  <div class="tile">Navigation</div>
</p-grid>
`

const sidebarCode = String.raw`
<p-sidebar side-width="11rem" content-min="60%" gap="1.5rem">
  <nav aria-label="Settings sections">...</nav>
  <section>Account settings</section>
</p-sidebar>
`

const switcherCode = String.raw`
<p-switcher threshold="28rem" gap="1rem">
  <section>Plan</section>
  <section>Billing</section>
  <section>Confirm</section>
</p-switcher>
`

const scrollCode = String.raw`
<p-scroll>
  <table>
    ...
  </table>
</p-scroll>
`

const layoutProps: DocsApiItem[] = [
  {
    name: 'PStack gap',
    type: 'string',
    default: "'var(--pico-spacing)'",
    description: 'Vertical spacing between children.',
  },
  { name: 'PStack as', type: 'string', default: "'div'", description: 'Rendered element.' },
  {
    name: 'PCluster/PInline gap',
    type: 'string',
    default: "'var(--pico-spacing)'",
    description: 'Horizontal spacing between children.',
  },
  {
    name: 'PCluster/PInline align',
    type: 'string',
    default: "'center'",
    description: 'CSS align-items value.',
  },
  {
    name: 'PCluster/PInline justify',
    type: 'string',
    default: "'flex-start'",
    description: 'CSS justify-content value.',
  },
  {
    name: 'PCluster/PInline as',
    type: 'string',
    default: "'div'",
    description: 'Rendered element.',
  },
  {
    name: 'PGrid min',
    type: 'string',
    default: "'0%'",
    description: "Minimum column width before wrapping. The default matches Pico's grid behavior.",
  },
  {
    name: 'PGrid gap',
    type: 'string',
    default: "'var(--pico-grid-column-gap, var(--pico-spacing))'",
    description: 'Grid gap.',
  },
  {
    name: 'PSidebar side',
    type: "'left' | 'right'",
    default: "'left'",
    description: 'Which side the sidebar appears on.',
  },
  {
    name: 'PSidebar sideWidth',
    type: 'string',
    default: "'15rem'",
    description: 'Preferred sidebar width.',
  },
  {
    name: 'PSidebar contentMin',
    type: 'string',
    default: "'50%'",
    description: 'Minimum content width before the layout stacks.',
  },
  {
    name: 'PSwitcher threshold',
    type: 'string',
    default: "'30rem'",
    description: 'Container width where children switch from stacked to side-by-side.',
  },
  {
    name: 'PScroll as',
    type: 'string',
    default: "'div'",
    description: 'Rendered element for the overflow wrapper.',
  },
]

const layoutSlots: DocsApiItem[] = [
  { name: 'default', type: 'slot', description: 'Layout children.' },
]
</script>

<template>
  <section id="overview" data-section class="docs-section">
    <DocsIntroCard name="Layout Primitives">
      These are tiny layout helpers for the boring-but-constant stuff: stacks, rows that wrap, rows
      that do not wrap, grids, sidebars, responsive groups, and wide content. Use them when plain
      markup starts collecting the same flex and grid styles over and over.
    </DocsIntroCard>
  </section>

  <section id="stack" data-section class="docs-section">
    <p-card>
      <template #header>PStack</template>

      <AppStack>
        <p>
          <code>PStack</code> puts things in a column with one clear gap. It also clears Pico's
          child margins, so the spacing stays predictable.
        </p>

        <DocsExample :code="stackCode">
          <PStack gap="1rem" class="layout-preview-narrow">
            <PField label="Name">
              <PInput v-model="stackName" name="name" placeholder="Jane Smith" />
            </PField>
            <PField label="Email">
              <PInput
                v-model="stackEmail"
                type="email"
                name="email"
                placeholder="jane@example.com"
              />
            </PField>
            <PButton>Save profile</PButton>
          </PStack>
        </DocsExample>
      </AppStack>
    </p-card>
  </section>

  <section id="cluster" data-section class="docs-section">
    <p-card>
      <template #header>PCluster</template>

      <AppStack>
        <p>
          <code>PCluster</code> is for rows that can wrap. It works well for action bars, tags,
          filters, and compact controls.
        </p>

        <DocsExample :code="clusterCode">
          <AppStack>
            <PCluster gap="0.5rem">
              <PButton>Save</PButton>
              <PButton variant="secondary">Preview</PButton>
              <PButton variant="contrast" outline>Delete</PButton>
            </PCluster>

            <PCluster gap="0.375rem">
              <small><kbd>vue</kbd></small>
              <small><kbd>typescript</kbd></small>
              <small><kbd>picocss</kbd></small>
              <small><kbd>layout</kbd></small>
            </PCluster>
          </AppStack>
        </DocsExample>
      </AppStack>
    </p-card>
  </section>

  <section id="inline" data-section class="docs-section">
    <p-card>
      <template #header>PInline</template>

      <AppStack>
        <p>
          <code>PInline</code> keeps a small run together on one line. Handy for breadcrumbs,
          metadata, and icon-label pairs.
        </p>

        <DocsExample :code="inlineCode">
          <PInline gap="0.5rem" as="nav" aria-label="Breadcrumb">
            <a href="#" @click.prevent>Docs</a>
            <span aria-hidden="true">/</span>
            <a href="#" @click.prevent>Layout</a>
            <span aria-hidden="true">/</span>
            <span>PInline</span>
          </PInline>
        </DocsExample>
      </AppStack>
    </p-card>
  </section>

  <section id="grid" data-section class="docs-section">
    <p-card>
      <template #header>PGrid</template>

      <AppStack>
        <p>
          <code>PGrid</code> can behave like Pico's grid, or you can give it a minimum column width
          and let the cards wrap naturally.
        </p>

        <DocsExample :code="gridCode">
          <PGrid min="12rem" gap="1rem">
            <div class="layout-tile">
              <strong>Forms</strong>
              <div class="layout-bars" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
            </div>
            <div class="layout-tile">
              <strong>Overlays</strong>
              <div class="layout-window" aria-hidden="true">
                <span />
              </div>
            </div>
            <div class="layout-tile">
              <strong>Navigation</strong>
              <div class="layout-rail" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
            </div>
          </PGrid>
        </DocsExample>
      </AppStack>
    </p-card>
  </section>

  <section id="sidebar" data-section class="docs-section">
    <p-card>
      <template #header>PSidebar</template>

      <AppStack>
        <p>
          <code>PSidebar</code> gives the first child a sidebar width and lets the second child fill
          the rest. When things get tight, they stack.
        </p>

        <DocsExample :code="sidebarCode">
          <PSidebar side-width="11rem" content-min="60%" gap="1.5rem">
            <nav aria-label="Settings sections" class="layout-side-nav">
              <PStack gap="0.25rem">
                <a href="#" @click.prevent>Profile</a>
                <a href="#" @click.prevent>Billing</a>
                <a href="#" @click.prevent>Security</a>
              </PStack>
            </nav>

            <section class="layout-panel">
              <strong>Account settings</strong>
              <p>
                Sidebar navigation and main content stay together until the content needs room to
                breathe.
              </p>
            </section>
          </PSidebar>
        </DocsExample>
      </AppStack>
    </p-card>
  </section>

  <section id="switcher" data-section class="docs-section">
    <p-card>
      <template #header>PSwitcher</template>

      <AppStack>
        <p>
          <code>PSwitcher</code> lets a group sit side by side when there is room. Below the
          threshold, each child gets its own row.
        </p>

        <DocsExample :code="switcherCode">
          <PSwitcher threshold="28rem" gap="1rem">
            <section class="layout-step">
              <strong>Plan</strong>
              Choose the plan.
            </section>
            <section class="layout-step">
              <strong>Billing</strong>
              Add payment details.
            </section>
            <section class="layout-step">
              <strong>Confirm</strong>
              Review and finish.
            </section>
          </PSwitcher>
        </DocsExample>
      </AppStack>
    </p-card>
  </section>

  <section id="scroll" data-section class="docs-section">
    <p-card>
      <template #header>PScroll</template>

      <AppStack>
        <p>
          <code>PScroll</code> is the little wrapper for wide stuff. Tables, long rows, and other
          awkward content can scroll without stretching the whole page.
        </p>

        <DocsExample :code="scrollCode">
          <PScroll>
            <table>
              <thead>
                <tr>
                  <th>Primitive</th>
                  <th>Pattern</th>
                  <th>Wraps</th>
                  <th>Good for</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>PStack</td>
                  <td>Vertical rhythm</td>
                  <td>No</td>
                  <td>Forms and page sections</td>
                </tr>
                <tr>
                  <td>PCluster</td>
                  <td>Wrapping row</td>
                  <td>Yes</td>
                  <td>Actions, filters, tags</td>
                </tr>
                <tr>
                  <td>PGrid</td>
                  <td>Responsive columns</td>
                  <td>Yes</td>
                  <td>Card collections</td>
                </tr>
              </tbody>
            </table>
          </PScroll>
        </DocsExample>
      </AppStack>
    </p-card>
  </section>

  <section id="api" data-section class="docs-section">
    <p-card>
      <template #header>API</template>

      <AppStack>
        <DocsApiTable caption="Layout Props" :items="layoutProps" />
        <DocsApiTable caption="Slots" :items="layoutSlots" />
      </AppStack>
    </p-card>
  </section>
</template>

<style scoped>
.layout-preview-narrow {
  max-width: 28rem;
}

.layout-bars,
.layout-rail {
  display: grid;
  gap: 0.5rem;
}

.layout-tile,
.layout-step,
.layout-bars span,
.layout-rail span,
.layout-window,
.layout-panel,
.layout-side-nav {
  border: 1px solid var(--pico-muted-border-color);
  background: var(--pico-card-sectionning-background-color);
}

.layout-tile,
.layout-step {
  display: grid;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: var(--pico-border-radius);
}

.layout-bars span,
.layout-rail span {
  display: block;
  height: 0.75rem;
  border-radius: var(--pico-border-radius);
}

.layout-bars span:nth-child(2) {
  width: 78%;
}

.layout-bars span:nth-child(3) {
  width: 58%;
}

.layout-window {
  min-height: 4.5rem;
  padding: 0.75rem;
  border-radius: var(--pico-border-radius);
}

.layout-window span {
  display: block;
  width: 55%;
  height: 2rem;
  border-radius: var(--pico-border-radius);
  background: var(--pico-primary);
  opacity: 0.28;
}

.layout-rail {
  grid-template-columns: 0.75rem 1fr;
  align-items: center;
  padding: 0.75rem;
  border-radius: var(--pico-border-radius);
}

.layout-rail span {
  grid-column: 2;
}

.layout-side-nav,
.layout-panel {
  padding: 1rem;
  border-radius: var(--pico-border-radius);
}

.layout-panel p {
  margin-top: 0.5rem;
  margin-bottom: 0;
}
</style>
