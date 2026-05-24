<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'
import { Document, type EnrichedDocumentSearchResults } from 'flexsearch'
import { useRouter } from 'vue-router'

type SearchDoc = { id: string; title: string; content: string; url: string }
type SearchResult = { title: string; url: string }

const router = useRouter()

const id = useId()

const searchInputId = `site-search-${id}`
const resultsId = `search-results-${id}`

const query = ref('')
const results = ref<SearchResult[]>([])
const activeIndex = ref(-1)
const wrapperEl = ref<HTMLElement | null>(null)

const isOpen = computed(() => query.value.length > 0)

const activeDescendant = computed(() =>
  activeIndex.value >= 0 ? `${resultsId}-option-${activeIndex.value}` : undefined,
)

let index: Document<SearchDoc> | null = null

function onGlobalKey(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    wrapperEl.value?.querySelector('input')?.focus()
  }
}

onMounted(async () => {
  index = new Document<SearchDoc>({
    document: {
      id: 'id',
      index: ['title', 'content'],
      store: ['title', 'url'],
    },
    tokenize: 'full',
    cache: true,
    context: true,
  })

  try {
    const res = await fetch('/search-index.json')
    const data: Record<string, string> = await res.json()

    await Promise.all(Object.entries(data).map(([key, val]) => index!.import(key, val)))
  } catch (err) {
    console.error('Failed to load search index:', err)
  }

  document.addEventListener('keydown', onGlobalKey)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onGlobalKey)
})

async function search() {
  if (!index) {
    results.value = []
    return
  }

  const raw = (await index.searchAsync(query.value, {
    enrich: true,
  })) as EnrichedDocumentSearchResults<SearchDoc>

  const seen = new Set<string | number>()

  results.value = raw
    .flatMap(({ result }) => result)
    .filter(({ id }) => {
      if (seen.has(id)) return false
      seen.add(id)
      return true
    })
    .filter((r): r is { id: string | number; doc: SearchDoc } => r.doc !== null)
    .map(({ doc }) => ({ title: doc.title, url: doc.url }))
    .slice(0, 8)
}

watch(query, () => {
  activeIndex.value = -1
  search()
})

function onKeydown(e: KeyboardEvent) {
  if (!isOpen.value) return

  if (e.key === 'ArrowDown') {
    e.preventDefault()

    if (results.value.length > 0) {
      activeIndex.value = (activeIndex.value + 1) % results.value.length
    }
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()

    if (results.value.length > 0) {
      activeIndex.value = (activeIndex.value - 1 + results.value.length) % results.value.length
    }
  } else if (e.key === 'Enter') {
    const target = results.value[activeIndex.value]

    if (target) {
      navigate(target.url)
    }
  } else if (e.key === 'Escape') {
    close()
    wrapperEl.value?.querySelector('input')?.blur()
  }
}

function onFocusOut(e: FocusEvent) {
  if (!wrapperEl.value?.contains(e.relatedTarget as Node)) {
    close()
  }
}

function navigate(url: string) {
  router.push(url)
  close()
}

function close() {
  query.value = ''
  results.value = []
  activeIndex.value = -1
}
</script>

<template>
  <div ref="wrapperEl" class="search-wrapper" @keydown="onKeydown" @focusout="onFocusOut">
    <label :for="searchInputId" class="p-sr-only"> Search documentation </label>

    <input
      :id="searchInputId"
      v-model="query"
      type="search"
      role="combobox"
      aria-autocomplete="list"
      :aria-expanded="isOpen"
      :aria-controls="resultsId"
      :aria-activedescendant="activeDescendant"
      placeholder="Search… ⌘K"
      class="search-input"
      autocomplete="off"
    />

    <div
      v-if="isOpen"
      :id="resultsId"
      class="search-panel"
      role="listbox"
      aria-label="Search results"
    >
      <template v-if="results.length > 0">
        <a
          v-for="(result, i) in results"
          :key="result.url"
          :id="`${resultsId}-option-${i}`"
          :href="result.url"
          class="search-result"
          :class="{ 'search-result--active': activeIndex === i }"
          role="option"
          :aria-selected="activeIndex === i"
          @mousedown.prevent
          @click.prevent="navigate(result.url)"
        >
          <span class="search-result-title">{{ result.title }}</span>
          <span class="search-result-path">{{ result.url }}</span>
        </a>
      </template>

      <div v-else class="search-empty">No results for "{{ query }}"</div>
    </div>
  </div>
</template>

<style scoped>
.search-wrapper {
  position: relative;
}

.search-panel {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  min-width: 100%;
  width: max-content;
  max-width: 24rem;
  max-height: 18rem;
  overflow-y: auto;
  z-index: 1000;
  background: var(--pico-card-background-color);
  border: 1px solid var(--pico-muted-border-color);
  border-radius: var(--pico-border-radius);
  box-shadow: 0 4px 16px color-mix(in srgb, var(--pico-color) 12%, transparent);
  padding: 0.25rem;
}

.search-result {
  display: block;
  padding: 0.5rem 0.75rem;
  border-left: 2px solid transparent;
  border-radius: 0 var(--pico-border-radius) var(--pico-border-radius) 0;
  text-decoration: none;
  cursor: pointer;
  transition:
    background-color 0.1s,
    border-color 0.1s;
}

.search-result:hover,
.search-result--active {
  background-color: var(--pico-card-sectionning-background-color);
  border-left-color: var(--pico-primary);
}

.search-result-title {
  display: block;
  font-size: 0.875rem;
  color: var(--pico-color);
  line-height: 1.4;
}

.search-result-path {
  display: block;
  font-size: 0.75rem;
  color: var(--pico-muted-color);
  margin-top: 0.1rem;
}

.search-empty {
  padding: 0.75rem;
  font-size: 0.875rem;
  color: var(--pico-muted-color);
  text-align: center;
}

.search-input {
  width: clamp(9rem, 22vw, 14rem);
  height: 2rem;
  padding: 0 0.625rem;
  margin: 0;
  border: 1px solid var(--pico-muted-border-color);
  border-radius: var(--pico-border-radius);
  background: var(--pico-background-color);
  color: var(--pico-color);
  font-size: 0.875rem;
  font-family: inherit;
  line-height: 1;
  outline: none;
  -webkit-appearance: none;
  appearance: none;
  transition: border-color 0.15s;
}

.search-input:focus {
  border-color: var(--pico-primary);
}

.search-input::-webkit-search-cancel-button {
  -webkit-appearance: none;
}

@media (max-width: 480px) {
  .search-input {
    width: 9rem;
  }
}
</style>
