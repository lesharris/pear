<!-- src/views/LayoutView.vue -->
<script lang="ts">
import type { DocsMeta } from "@/types/docs";

export const docsMeta = {
  title: "Layout Primitives | Pear",
  description:
    "Stack, cluster, inline, grid, sidebar, switcher, and scroll layout primitives in Pear.",
  tocItems: [
    { id: "stack", label: "PStack" },
    { id: "cluster", label: "PCluster" },
    { id: "inline", label: "PInline" },
    { id: "grid", label: "PGrid" },
    { id: "grid-min", label: "PGrid (min width)" },
    { id: "sidebar", label: "PSidebar" },
    { id: "switcher", label: "PSwitcher" },
    { id: "scroll", label: "PScroll" },
    { id: "api", label: "API" },
  ],
} satisfies DocsMeta;
</script>

<script setup lang="ts">
import { ref } from "vue";
import AppStack from "@/components/layout/AppStack.vue";
import DocsApiTable, { type DocsApiItem } from "@/components/DocsApiTable.vue";
import DocsExample from "@/components/DocsExample.vue";
import DocsIntroCard from "@/components/DocsIntroCard.vue";
import { PButton, PCard, PField, PInput, PStack, PCluster, PInline, PGrid, PSidebar, PSwitcher, PScroll } from "@ontic/pear";

const stackName = ref("");
const stackEmail = ref("");
const clusterSearch = ref("");

const stackCode = String.raw`
<p-stack gap="1rem">
  <p-field label="Name">
    <p-input v-model="stackName" placeholder="Jane Smith" />
  </p-field>
  <p-field label="Email">
    <p-input v-model="stackEmail" type="email" placeholder="jane@example.com" />
  </p-field>
  <p-button>Submit</p-button>
</p-stack>
`;

const clusterCode = String.raw`
<p-cluster gap="0.5rem">
  <p-button>Save</p-button>
  <p-button variant="secondary">Discard</p-button>
  <p-button variant="contrast" outline>Delete</p-button>
</p-cluster>
`;

const clusterTagsCode = String.raw`
<p-cluster gap="0.375rem">
  <small><kbd>vue</kbd></small>
  <small><kbd>typescript</kbd></small>
  <small><kbd>picocss</kbd></small>
</p-cluster>
`;

const clusterSearchCode = String.raw`
<p-cluster gap="0.5rem">
  <p-input v-model="clusterSearch" placeholder="Search..." aria-label="Search" />
  <p-button>Go</p-button>
</p-cluster>
`;

const inlinePairsCode = String.raw`
<p-inline gap="1.5rem">
  <p-inline gap="0.375rem">
    <span aria-hidden="true">File</span>
    <span>Documents</span>
  </p-inline>
  <p-inline gap="0.375rem">
    <span aria-hidden="true">Image</span>
    <span>Images</span>
  </p-inline>
</p-inline>
`;

const inlineBreadcrumbCode = String.raw`
<p-inline gap="0.5rem">
  <a href="#">Home</a>
  <span aria-hidden="true">/</span>
  <a href="#">Components</a>
  <span aria-hidden="true">/</span>
  <span>Layout</span>
</p-inline>
`;

const gridDefaultCode = String.raw`
<p-grid>
  <p-card>Alpha</p-card>
  <p-card>Beta</p-card>
  <p-card>Gamma</p-card>
</p-grid>
`;

const gridCode = String.raw`
<p-grid min="12rem" gap="1rem">
  <p-card>One</p-card>
  <p-card>Two</p-card>
  <p-card>Three</p-card>
</p-grid>
`;

const sidebarCode = String.raw`
<p-sidebar side-width="10rem" content-min="60%" gap="1.5rem">
  <nav>...</nav>
  <div>Main content</div>
</p-sidebar>
`;

const switcherCode = String.raw`
<p-switcher threshold="28rem" gap="1rem">
  <p-card>Step 1</p-card>
  <p-card>Step 2</p-card>
  <p-card>Step 3</p-card>
</p-switcher>
`;

const scrollCode = String.raw`
<p-scroll>
  <table>
    ...
  </table>
</p-scroll>
`;

const layoutProps: DocsApiItem[] = [
  { name: "PStack gap", type: "string", default: "'var(--pico-spacing)'", description: "Vertical spacing between children." },
  { name: "PStack as", type: "string", default: "'div'", description: "Rendered element." },
  { name: "PCluster/PInline gap", type: "string", default: "'var(--pico-spacing)'", description: "Horizontal spacing between children." },
  { name: "PCluster/PInline align", type: "string", default: "'center'", description: "CSS align-items value." },
  { name: "PCluster/PInline justify", type: "string", default: "'flex-start'", description: "CSS justify-content value." },
  { name: "PGrid min", type: "string", default: "'0%'", description: "Minimum column width before wrapping." },
  { name: "PGrid gap", type: "string", default: "'var(--pico-grid-column-gap, var(--pico-spacing))'", description: "Grid gap." },
  { name: "PSidebar side", type: "'left' | 'right'", default: "'left'", description: "Which side the sidebar appears on." },
  { name: "PSidebar sideWidth", type: "string", default: "'15rem'", description: "Preferred sidebar width." },
  { name: "PSidebar contentMin", type: "string", default: "'50%'", description: "Minimum content width before the layout stacks." },
  { name: "PSwitcher threshold", type: "string", default: "'30rem'", description: "Container width where children switch from stacked to side-by-side." },
  { name: "PScroll as", type: "string", default: "'div'", description: "Rendered element for the overflow wrapper." },
];

const layoutSlots: DocsApiItem[] = [
  { name: "default", type: "slot", description: "Layout children." },
];
</script>

<template>
      <!-- PStack -->
      <section id="stack" data-section class="docs-section">
        <DocsIntroCard name="PStack">
          <code>PStack</code> lays children out vertically with a single
          configurable gap and resets child margins so Pico spacing does not
          double up.
        </DocsIntroCard>

        <p-card>
          <template #header>PStack</template>
          <p>Vertical flex stack. Gap defaults to <code>--pico-spacing</code>. Resets <code>margin-bottom</code> on children so Pico's element spacing doesn't double up with <code>gap</code>.</p>
          <DocsExample :code="stackCode">
            <PStack gap="1rem">
              <PField label="Name">
                <PInput v-model="stackName" placeholder="Jane Smith" />
              </PField>
              <PField label="Email">
                <PInput v-model="stackEmail" type="email" placeholder="jane@example.com" />
              </PField>
              <PButton>Submit</PButton>
            </PStack>
          </DocsExample>
        </p-card>
      </section>

      <!-- PCluster -->
      <section id="cluster" data-section class="docs-section">
        <DocsIntroCard name="PCluster">
          <code>PCluster</code> lays children out horizontally with wrapping,
          useful for actions, tags, and compact inline form controls.
        </DocsIntroCard>

        <p-card>
          <template #header>PCluster</template>
          <p>Horizontal wrapping flex. Items size to their content — Pico's <code>width: 100%</code> on form elements is reset so inputs and buttons don't fill the row.</p>
          <PStack gap="1.5rem">
            <div>
              <h4>Button group</h4>
              <DocsExample :code="clusterCode">
                <PCluster gap="0.5rem">
                  <PButton>Save</PButton>
                  <PButton variant="secondary">Discard</PButton>
                  <PButton variant="contrast" outline>Delete</PButton>
                </PCluster>
              </DocsExample>
            </div>
            <div>
              <h4>Tags</h4>
              <DocsExample :code="clusterTagsCode">
                <PCluster gap="0.375rem">
                  <small><kbd>vue</kbd></small>
                  <small><kbd>typescript</kbd></small>
                  <small><kbd>picocss</kbd></small>
                  <small><kbd>layout</kbd></small>
                  <small><kbd>cloudflare</kbd></small>
                </PCluster>
              </DocsExample>
            </div>
            <div>
              <h4>Inline search (input inside cluster)</h4>
              <DocsExample :code="clusterSearchCode">
                <PCluster gap="0.5rem">
                  <PInput v-model="clusterSearch" placeholder="Search..." aria-label="Search" />
                  <PButton>Go</PButton>
                </PCluster>
              </DocsExample>
            </div>
          </PStack>
        </p-card>
      </section>

      <!-- PInline -->
      <section id="inline" data-section class="docs-section">
        <DocsIntroCard name="PInline">
          <code>PInline</code> lays children out horizontally without wrapping
          when a row must stay together.
        </DocsIntroCard>

        <p-card>
          <template #header>PInline</template>
          <p>Horizontal non-wrapping flex. Same API as <code>PCluster</code>. Use inside nav slots or anywhere items must stay on one line regardless of container width.</p>
          <PStack gap="1.5rem">
            <div>
              <h4>Icon + label pairs</h4>
              <DocsExample :code="inlinePairsCode">
                <PInline gap="1.5rem">
                  <PInline gap="0.375rem">
                    <span aria-hidden="true">File</span>
                    <span>Documents</span>
                  </PInline>
                  <PInline gap="0.375rem">
                    <span aria-hidden="true">Image</span>
                    <span>Images</span>
                  </PInline>
                  <PInline gap="0.375rem">
                    <span aria-hidden="true">Audio</span>
                    <span>Audio</span>
                  </PInline>
                </PInline>
              </DocsExample>
            </div>
            <div>
              <h4>Breadcrumb-style row</h4>
              <DocsExample :code="inlineBreadcrumbCode">
                <PInline gap="0.5rem">
                  <a href="#">Home</a>
                  <span aria-hidden="true">/</span>
                  <a href="#">Components</a>
                  <span aria-hidden="true">/</span>
                  <span>Layout</span>
                </PInline>
              </DocsExample>
            </div>
          </PStack>
        </p-card>
      </section>

      <!-- PGrid (default) -->
      <section id="grid" data-section class="docs-section">
        <DocsIntroCard name="PGrid">
          <code>PGrid</code> provides a responsive auto-fit grid that can match
          Pico's grid defaults or wrap based on a minimum column width.
        </DocsIntroCard>

        <p-card>
          <template #header>PGrid</template>
          <p>Responsive auto-fit grid. Default (<code>min="0%"</code>) is identical to Pico's <code>.grid</code>: single column below 768 px, equal columns above. Uses Pico's <code>--pico-grid-column-gap</code> token.</p>
          <DocsExample :code="gridDefaultCode">
            <PGrid>
              <p-card>Alpha</p-card>
              <p-card>Beta</p-card>
              <p-card>Gamma</p-card>
            </PGrid>
          </DocsExample>
        </p-card>
      </section>

      <!-- PGrid with min -->
      <section id="grid-min" data-section class="docs-section">
        <p-card>
          <template #header>PGrid — min column width</template>
          <p>Setting <code>min="12rem"</code> makes columns collapse naturally when they'd be narrower than 12 rem — no fixed breakpoint needed.</p>
          <DocsExample :code="gridCode">
            <PGrid min="12rem" gap="1rem">
              <p-card>One</p-card>
              <p-card>Two</p-card>
              <p-card>Three</p-card>
              <p-card>Four</p-card>
              <p-card>Five</p-card>
            </PGrid>
          </DocsExample>
        </p-card>
      </section>

      <!-- PSidebar -->
      <section id="sidebar" data-section class="docs-section">
        <DocsIntroCard name="PSidebar">
          <code>PSidebar</code> creates a two-column sidebar/content layout that
          stacks naturally when the content area would get too narrow.
        </DocsIntroCard>

        <p-card>
          <template #header>PSidebar</template>
          <p>Two-column layout. The first slot child is the sidebar; the second is the main content. When the content would be narrower than <code>contentMin</code>, both children stack.</p>
          <DocsExample :code="sidebarCode">
            <PSidebar side-width="10rem" content-min="60%" gap="1.5rem">
              <nav>
                <PStack gap="0.25rem">
                  <a href="#">Overview</a>
                  <a href="#">Settings</a>
                  <a href="#">Billing</a>
                </PStack>
              </nav>
              <div>
                <h4>Main content</h4>
                <p>Resize the browser window to see the sidebar collapse below the content when the viewport is narrow.</p>
              </div>
            </PSidebar>
          </DocsExample>
        </p-card>
      </section>

      <!-- PSwitcher -->
      <section id="switcher" data-section class="docs-section">
        <DocsIntroCard name="PSwitcher">
          <code>PSwitcher</code> switches children between stacked and
          side-by-side layouts based on container width, without page-level
          media queries.
        </DocsIntroCard>

        <p-card>
          <template #header>PSwitcher</template>
          <p>Items sit side-by-side when the container is wider than <code>threshold</code>, and stack when narrower — with zero media queries. Default threshold is <code>30rem</code>.</p>
          <DocsExample :code="switcherCode">
            <PSwitcher threshold="28rem" gap="1rem">
              <p-card>
                <template #header>Step 1</template>
                Choose a plan that fits your needs.
              </p-card>
              <p-card>
                <template #header>Step 2</template>
                Set up your account details.
              </p-card>
              <p-card>
                <template #header>Step 3</template>
                You're ready to go.
              </p-card>
            </PSwitcher>
          </DocsExample>
        </p-card>
      </section>

      <!-- PScroll -->
      <section id="scroll" data-section class="docs-section">
        <DocsIntroCard name="PScroll">
          <code>PScroll</code> wraps wide or overflowing content in a simple
          overflow container.
        </DocsIntroCard>

        <p-card>
          <template #header>PScroll</template>
          <p>Wraps content in <code>overflow: auto</code>. Most useful for wide tables on narrow viewports.</p>
          <DocsExample :code="scrollCode">
            <PScroll>
              <table>
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Basis</th>
                  <th>flex-wrap</th>
                  <th>Resets width</th>
                  <th>Resets margin-bottom</th>
                  <th>Resets min-width</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>PStack</td><td>Novel</td><td>column</td><td>No</td><td>Yes</td><td>No</td></tr>
                <tr><td>PCluster</td><td>Novel</td><td>wrap</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
                <tr><td>PInline</td><td>Novel</td><td>nowrap</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
                <tr><td>PGrid</td><td>Pico .grid superset</td><td>—</td><td>No</td><td>Yes</td><td>Yes</td></tr>
                <tr><td>PSidebar</td><td>Novel</td><td>wrap</td><td>No</td><td>Yes</td><td>Yes</td></tr>
                <tr><td>PSwitcher</td><td>Novel</td><td>wrap</td><td>No</td><td>Yes</td><td>Yes</td></tr>
                <tr><td>PScroll</td><td>overflow-auto</td><td>—</td><td>No</td><td>No</td><td>No</td></tr>
              </tbody>
              </table>
            </PScroll>
          </DocsExample>
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
