<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { PThemeSwitcher } from '@ontic/pear'
import AppFooter from '@/components/layout/AppFooter.vue'
import { onMounted, ref } from 'vue'

const clientMounted = ref(false)
onMounted(() => {
  clientMounted.value = true
})
</script>

<template>
  <div class="not-found">
    <header class="nf-header">
      <RouterLink to="/" class="nf-brand" aria-label="Pear home">
        <img src="@/assets/peary.png" alt="" class="nf-brand-logo" />
        <span class="nf-brand-name brand-title">Pear</span>
      </RouterLink>
      <nav class="nf-nav">
        <RouterLink to="/docs" class="nf-nav-link">Documentation</RouterLink>
        <span class="nf-nav-divider" aria-hidden="true" />
        <PThemeSwitcher v-if="clientMounted" />
      </nav>
    </header>

    <main class="nf-main">
      <img src="@/assets/peary.png" alt="" class="nf-peary" aria-hidden="true" />
      <p class="nf-code">404</p>
      <h1 class="nf-title">Page not found</h1>
      <p class="nf-message">
        That path doesn't exist. Maybe a component moved, or the link was wrong.
      </p>
      <div class="nf-actions">
        <RouterLink to="/" class="nf-btn-primary">Go home</RouterLink>
        <RouterLink to="/docs" class="nf-btn-secondary">Documentation</RouterLink>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.not-found {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

.nf-header {
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

.nf-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  --pico-color: inherit;
  color: var(--pico-color);
}

.nf-brand-logo {
  height: 2.2rem;
  width: auto;
}

.nf-brand-name {
  font-size: 1.75rem;
  line-height: 1;
  color: var(--pico-color);
}

.nf-nav {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.nf-nav-link {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--pico-muted-color);
  text-decoration: none;
  transition: color 0.15s;
}

.nf-nav-link:hover {
  color: var(--pico-primary);
  text-decoration: none;
}

.nf-nav-divider {
  display: block;
  width: 1px;
  height: 1.2rem;
  background: var(--pico-muted-border-color);
}

.nf-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 1.5rem;
  position: relative;
  overflow: hidden;
}

.nf-main::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 60% 50% at 50% 0%,
    color-mix(in srgb, var(--pico-primary) 8%, transparent) 0%,
    transparent 70%
  );
  pointer-events: none;
}

.nf-peary {
  width: clamp(5rem, 10vw, 7rem);
  height: auto;
  margin-bottom: 1.5rem;
  opacity: 0.5;
  filter: grayscale(0.4);
}

.nf-code {
  font-size: clamp(5rem, 15vw, 9rem);
  font-weight: 900;
  font-family: var(--font-display);
  line-height: 1;
  margin: 0 0 0.25rem;
  color: var(--pico-primary);
  opacity: 0.25;
}

.nf-title {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 700;
  margin: 0 0 0.75rem;
  color: var(--pico-color);
}

.nf-message {
  font-size: 1rem;
  color: var(--pico-muted-color);
  max-width: 28rem;
  margin: 0 auto 2rem;
  line-height: 1.6;
}

.nf-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
}

.nf-btn-primary {
  display: inline-flex;
  align-items: center;
  background: var(--pico-primary);
  color: var(--pico-primary-inverse);
  padding: 0.7rem 1.75rem;
  border-radius: var(--pico-border-radius);
  font-weight: 700;
  font-size: 1rem;
  text-decoration: none;
  transition:
    opacity 0.15s,
    transform 0.15s;
  box-shadow: 0 2px 8px color-mix(in srgb, var(--pico-primary) 35%, transparent);
}

.nf-btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
  text-decoration: none;
  color: var(--pico-primary-inverse);
}

.nf-btn-secondary {
  display: inline-flex;
  align-items: center;
  background: transparent;
  color: var(--pico-color);
  padding: 0.7rem 1.75rem;
  border-radius: var(--pico-border-radius);
  border: 1.5px solid var(--pico-muted-border-color);
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition:
    border-color 0.15s,
    color 0.15s,
    transform 0.15s;
}

.nf-btn-secondary:hover {
  border-color: var(--pico-primary);
  color: var(--pico-primary);
  transform: translateY(-1px);
  text-decoration: none;
}

@media (max-width: 480px) {
  .nf-header {
    padding: 0 1rem;
  }
}
</style>
