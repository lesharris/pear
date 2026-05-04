<p align="center">
  <a href="https://pear.ontic.cloud" target="_blank" rel="noopener noreferrer">
    <img width="180" src="https://content.ontic.cloud/media/peary.png" alt="Pear Logo">
  </a>
</p>
<br/>
<p align="center">
  <img src="https://img.shields.io/npm/v/@ontic/pear" alt="npm package"></a>
</p>
<br/>

# Pear

> Thin Vue 3 component library built on [PicoCSS](https://picocss.com/).

- 🪶 Lightweight — a thin wrapper around PicoCSS, no heavy dependencies
- 🎨 Themeable — built-in light/dark/system theme support
- 📐 Layout primitives — `PStack`, `PGrid`, `PSidebar`, and more from Every Layout
- 🧩 Composable forms — `PField` provides context to child inputs automatically
- 🪟 Modal system — `PModalProvider` + `useModal` for imperative modals
- 💪 Type safe — full TypeScript support with exported types

## Installation

Requires **Vue 3.5+**.

```bash
# bun
bun add @ontic/pear

# npm
npm install @ontic/pear

# pnpm
pnpm add @ontic/pear
```

`lucide-vue-next` is a peer dependency required only if you use `PThemeSwitcher`:

```bash
bun add lucide-vue-next
```

## Usage

### Register the plugin

```ts
import { createApp } from 'vue'
import App from './App.vue'

// Import Pear styles
import '@ontic/pear/style.css'

const app = createApp(App)
app.mount('#app')
```

Pear components are used directly — no global registration needed. Import what you use.

### Example

```vue
<script setup lang="ts">
import { PField, PInput, PButton, PStack } from '@ontic/pear'

const email = ref('')
</script>

<template>
  <PStack>
    <PField label="Email" :required="true">
      <PInput v-model="email" type="email" placeholder="you@example.com" />
    </PField>

    <PButton type="submit">Subscribe</PButton>
  </PStack>
</template>
```

`PField` automatically wires up `id`, `aria-describedby`, and validation state to any child form component — no prop drilling required.

### Theme switching

```ts
import { useTheme } from '@ontic/pear'

const { theme, setTheme } = useTheme()

setTheme('dark')   // 'light' | 'dark' | 'system'
```

### Imperative modals

Wrap your app with `PModalProvider`, then call `useModal()` anywhere:

```ts
import { useModal } from '@ontic/pear'

const modal = useModal()

modal.open({
  title: 'Confirm',
  description: 'Are you sure you want to continue?',
  actions: [
    { label: 'Cancel', variant: 'secondary' },
    { label: 'Confirm', variant: 'primary' },
  ],
})
```

## Documentation

For full API docs, examples, and guides, visit **[pear.ontic.cloud/docs](https://pear.ontic.cloud/docs)**.

## License

[MIT](http://opensource.org/licenses/MIT)
