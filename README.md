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

- 🪶 Lightweight
- 🎨 Themeable
- 📐 Layout primitives
- 🧩 Composable forms
- 🪟 Modal system
- 💪 Type safe

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

### Import the styles

```ts
import { createApp } from 'vue'
import App from './App.vue'

// Import Pear styles
import '@ontic/pear/style.css'

const app = createApp(App)
app.mount('#app')
```

No global registration, Pear components are used directly. Import what you use.

### Example

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { PField, PInput, PButton, PStack } from '@ontic/pear'

const email = ref('')
</script>

<template>
  <PStack>
    <PField label="Email" helper="Used for account notifications.">
      <PInput
        v-model="email"
        type="email"
        name="email"
        placeholder="you@example.com"
        autocomplete="email"
        required
      />
    </PField>

    <PButton type="submit">Subscribe</PButton>
  </PStack>
</template>
```

`PField` automatically wires up `id`, `aria-describedby`, and validation state to any child form component.

### Theme switching

```ts
import { useTheme } from '@ontic/pear'

const { theme, toggleTheme } = useTheme()

theme.value = 'dark'   // 'light' | 'dark'
toggleTheme()
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
    { label: 'Confirm' },
  ],
})
```

## Documentation

For full API docs, examples, and guides, visit **[pear.ontic.cloud/docs](https://pear.ontic.cloud/docs)**.

## License

[MIT](http://opensource.org/licenses/MIT)
