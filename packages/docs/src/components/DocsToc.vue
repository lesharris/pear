<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps<{
  items?: Array<{ id: string; label: string }>;
}>();

const activeSection = ref(props.items?.[0]?.id ?? "");
let observer: IntersectionObserver | null = null;

onMounted(() => {
  if (!("IntersectionObserver" in window)) return;

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) activeSection.value = entry.target.id;
      }
    },
    { rootMargin: "-10px 0px -80% 0px", threshold: 0 },
  );

  for (const { id } of props.items ?? []) {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  }
});

onBeforeUnmount(() => observer?.disconnect());

function scrollTo(id: string, event: Event) {
  event.preventDefault();
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  activeSection.value = id;
}
</script>

<template>
  <nav class="docs-toc" aria-label="On this page">
    <p class="docs-toc-label">On this page</p>
    <div class="docs-toc-scroll">
      <ul>
        <li
          v-for="item in items ?? []"
          :key="item.id"
          :class="{ 'docs-toc-active': activeSection === item.id }"
        >
          <a
            :href="`#${item.id}`"
            @click="scrollTo(item.id, $event)"
          >{{ item.label }}</a>
        </li>
      </ul>
    </div>
  </nav>
</template>
