<script setup lang="ts">
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { PThemeSwitcher } from "@ontic/pear";
import AppFooter from "@/components/layout/AppFooter.vue";

const clientMounted = ref(false);

onMounted(() => {
  clientMounted.value = true;
});
</script>

<template>
  <div class="landing">
    <header class="landing-header">
      <RouterLink to="/" class="landing-brand" aria-label="Pear home">
        <img src="@/assets/peary.png" alt="" class="landing-brand-logo" />
        <span class="landing-brand-name brand-title">Pear</span>
      </RouterLink>
      <nav class="landing-nav">
        <RouterLink to="/docs" class="landing-nav-link"
          >Documentation</RouterLink
        >
        <a
          href="https://github.com/onticcloud/pear"
          target="_blank"
          rel="noreferrer"
          class="landing-nav-link"
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
        <span class="landing-nav-divider" aria-hidden="true" />
        <PThemeSwitcher v-if="clientMounted" />
      </nav>
    </header>

    <main>
      <section class="hero">
        <img
          src="@/assets/peary.png"
          alt="Peary, the Pear mascot"
          class="hero-peary"
        />
        <p class="hero-eyebrow">Vue 3 · PicoCSS · TypeScript</p>
        <h1 class="hero-title brand-title">Pear</h1>
        <p class="hero-tagline">
          Beautiful Vue 3 components built on <strong>PicoCSS</strong>.<br />
          Semantic HTML, accessible by default, and delightfully simple.
        </p>
        <div class="hero-ctas">
          <RouterLink to="/docs" class="hero-btn-primary"
            >Get Started →</RouterLink
          >
          <a
            href="https://github.com/onticcloud/pear"
            target="_blank"
            rel="noreferrer"
            class="hero-btn-secondary"
            >View on GitHub</a
          >
        </div>
      </section>

      <section class="features">
        <div class="features-inner">
          <div class="features-heading">
            <h2>Components without the clutter</h2>
            <p>A thin Vue layer on top of PicoCSS</p>
          </div>
          <div class="feature-grid">
            <div class="feature-card">
              <span class="feature-icon" aria-hidden="true">🌿</span>
              <h3>Semantic HTML</h3>
              <p>
                Components render native elements — <code>&lt;input&gt;</code>,
                <code>&lt;button&gt;</code>, <code>&lt;dialog&gt;</code> —
                letting PicoCSS do the heavy lifting.
              </p>
            </div>
            <div class="feature-card">
              <span class="feature-icon" aria-hidden="true">♿</span>
              <h3>Accessible by default</h3>
              <p>
                ARIA attributes, keyboard navigation, and focus management are
                handled for you out of the box.
              </p>
            </div>
            <div class="feature-card">
              <span class="feature-icon" aria-hidden="true">🎨</span>
              <h3>Light &amp; dark mode</h3>
              <p>
                Full theme support via PicoCSS custom properties. Switch themes
                at runtime with the built-in PThemeSwitcher.
              </p>
            </div>
            <div class="feature-card">
              <span class="feature-icon" aria-hidden="true">📐</span>
              <h3>Layout primitives</h3>
              <p>
                PStack, PGrid, PCluster, PSidebar, PSwitcher and more —
                composable layouts without writing CSS.
              </p>
            </div>
            <div class="feature-card">
              <span class="feature-icon" aria-hidden="true">🔷</span>
              <h3>TypeScript first</h3>
              <p>
                Strict mode, <code>noUncheckedIndexedAccess</code>, and fully
                typed props and emits across every component.
              </p>
            </div>
            <div class="feature-card">
              <span class="feature-icon" aria-hidden="true">⚡</span>
              <h3>Vue 3 modern APIs</h3>
              <p>
                <code>defineModel()</code>, <code>provide</code>/<code
                  >inject</code
                >
                contexts, and composables — built for Vue 3.4+.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.landing {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

/* ── Header ── */
.landing-header {
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

.landing-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  --pico-color: inherit;
  color: var(--pico-color);
}

.landing-brand-logo {
  height: 2.2rem;
  width: auto;
}

.landing-brand-name {
  font-size: 1.75rem;
  line-height: 1;
  color: var(--pico-color);
}

.landing-nav {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.landing-nav-link {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--pico-muted-color);
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: color 0.15s;
}

.landing-nav-link:hover {
  color: var(--pico-primary);
  text-decoration: none;
}

.landing-nav-divider {
  display: block;
  width: 1px;
  height: 1.2rem;
  background: var(--pico-muted-border-color);
}

/* ── Hero ── */
.hero {
  text-align: center;
  padding: 5rem 1.5rem 4rem;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 60% 50% at 50% 0%,
    color-mix(in srgb, var(--pico-primary) 12%, transparent) 0%,
    transparent 70%
  );
  pointer-events: none;
}

.hero-peary {
  display: block;
  width: clamp(7rem, 14vw, 10rem);
  height: auto;
  margin: 0 auto 2rem;
  filter: drop-shadow(
    0 12px 32px color-mix(in srgb, var(--pico-primary) 25%, transparent)
  );
  animation: peary-float 4s ease-in-out infinite;
}

@keyframes peary-float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.hero-eyebrow {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--pico-primary);
  margin-bottom: 0.75rem;
}

.hero-title {
  font-size: clamp(3.5rem, 10vw, 6.5rem);
  line-height: 0.95;
  margin-bottom: 1.25rem;
  color: var(--pico-color);
}

.hero-tagline {
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: var(--pico-muted-color);
  max-width: 38rem;
  margin: 0 auto 2.5rem;
  line-height: 1.6;
}

.hero-tagline strong {
  color: var(--pico-color);
  font-weight: 600;
}

.hero-ctas {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
}

.hero-btn-primary {
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

.hero-btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
  text-decoration: none;
  color: var(--pico-primary-inverse);
}

.hero-btn-secondary {
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

.hero-btn-secondary:hover {
  border-color: var(--pico-primary);
  color: var(--pico-primary);
  transform: translateY(-1px);
  text-decoration: none;
}

/* ── Features ── */
.features {
  padding: 5rem 1.5rem;
}

.features-inner {
  max-width: 72rem;
  margin: 0 auto;
}

.features-heading {
  text-align: center;
  margin-bottom: 3rem;
}

.features-heading h2 {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
  color: var(--pico-color);
}

.features-heading p {
  color: var(--pico-muted-color);
  font-size: 1rem;
  margin: 0;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.feature-card {
  background: var(--pico-card-background-color);
  border: 1px solid var(--pico-muted-border-color);
  border-radius: var(--pico-border-radius);
  padding: 1.5rem;
  transition:
    border-color 0.2s,
    transform 0.2s;
}

.feature-card:hover {
  border-color: var(--pico-primary);
  transform: translateY(-2px);
}

.feature-icon {
  display: block;
  font-size: 1.75rem;
  margin-bottom: 0.75rem;
  line-height: 1;
}

.feature-card h3 {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
  color: var(--pico-color);
}

.feature-card p {
  font-size: 0.875rem;
  color: var(--pico-muted-color);
  line-height: 1.6;
  margin: 0;
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .feature-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .landing-header {
    padding: 0 1rem;
  }
}

@media (max-width: 480px) {
  .feature-grid {
    grid-template-columns: 1fr;
  }
  .hero {
    padding: 3rem 1rem 3rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-peary {
    animation: none;
  }
}
</style>
