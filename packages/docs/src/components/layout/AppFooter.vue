<script setup lang="ts">
import { RouterLink } from "vue-router";
import { ExternalLink, ArrowUpRight } from "lucide-vue-next";

const year = new Date().getFullYear();
</script>

<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-main">
        <div class="footer-brand">
          <p class="footer-wordmark" aria-hidden="true">Pear</p>
        </div>

        <div class="footer-columns">
          <div class="footer-col">
            <p class="footer-col-label">Project</p>
            <ul>
              <li>
                <a
                  href="https://github.com/onticcloud/pear"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub <ArrowUpRight :size="12" class="link-icon" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/onticcloud/pear/blob/main/LICENSE"
                  target="_blank"
                  rel="noreferrer"
                >
                  MIT License <ArrowUpRight :size="12" class="link-icon" />
                </a>
              </li>
            </ul>
          </div>

          <div class="footer-col">
            <p class="footer-col-label">Components</p>
            <ul>
              <li><RouterLink to="/docs/buttons">Buttons</RouterLink></li>
              <li><RouterLink to="/docs/text-inputs">Inputs</RouterLink></li>
              <li><RouterLink to="/docs/selects">Selects</RouterLink></li>
              <li><RouterLink to="/docs/layout">Layout</RouterLink></li>
              <li><RouterLink to="/docs/modals">Modals</RouterLink></li>
            </ul>
          </div>

          <div class="footer-col">
            <p class="footer-col-label">Built with</p>
            <ul>
              <li>
                <a href="https://picocss.com" target="_blank" rel="noreferrer">
                  Pico CSS <ArrowUpRight :size="12" class="link-icon" />
                </a>
              </li>
              <li>
                <a href="https://vuejs.org" target="_blank" rel="noreferrer">
                  Vue 3 <ArrowUpRight :size="12" class="link-icon" />
                </a>
              </li>
              <li>
                <a href="https://lucide.dev" target="_blank" rel="noreferrer">
                  Lucide Icons <ArrowUpRight :size="12" class="link-icon" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="footer-copy">
          &copy; {{ year }} Les Harris &mdash; MIT License
        </p>
      </div>
    </div>

    <img
      src="@/assets/peary.png"
      alt=""
      aria-hidden="true"
      class="footer-mascot"
    />
  </footer>
</template>

<style scoped>
.site-footer {
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 100%;
  margin-top: 4rem;
  border-top: 3px solid var(--pico-primary);
  background-color: var(--pico-card-background-color);
  padding: 0;
}

.footer-inner {
  max-width: 72rem;
  margin: 0 auto;
  padding: 3.5rem 2rem 1.75rem;
}

/* ── Main zone: brand + columns ── */
.footer-main {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  align-items: start;
  margin-bottom: 3rem;
}

/* ── Wordmark ── */
.footer-wordmark {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 700;
  font-size: clamp(4rem, 8vw, 7rem);
  line-height: 0.9;
  letter-spacing: -0.03em;
  margin: 0;
  color: var(--pico-color);
  opacity: 0.12;
  user-select: none;
  pointer-events: none;
}

/* ── Peeking mascot ── */
.footer-mascot {
  position: absolute;
  bottom: -0.5rem;
  left: -0.5rem;
  height: 13rem;
  width: auto;
  transform: rotate(16deg) translateY(20%);
  transform-origin: bottom center;
  filter: grayscale(100%);
  opacity: 0.32;
  mix-blend-mode: multiply;
  pointer-events: none;
  user-select: none;
}

/* ── Link columns ── */
.footer-columns {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.footer-col-label {
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--pico-muted-color);
  margin: 0 0 0.75rem;
}

.footer-col ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.footer-col li {
  margin: 0;
}

.footer-col a {
  font-size: 0.875rem;
  color: var(--pico-muted-color);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
  transition: color 0.15s;
}

.footer-col a:hover {
  color: var(--pico-primary);
  text-decoration: none;
}

.link-icon {
  opacity: 0.5;
  flex-shrink: 0;
  transition:
    opacity 0.15s,
    transform 0.15s;
}

.footer-col a:hover .link-icon {
  opacity: 1;
  transform: translate(1px, -1px);
}

/* ── Bottom bar ── */
.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 1.25rem;
  gap: 1rem;
  flex-wrap: wrap;
}

.footer-copy {
  font-size: 0.8125rem;
  color: var(--pico-muted-color);
  margin: 0;
}

.footer-gh {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8125rem;
  color: var(--pico-muted-color);
  text-decoration: none;
  transition: color 0.15s;
}

.footer-gh:hover {
  color: var(--pico-primary);
  text-decoration: none;
}

/* ── Responsive ── */
@media (max-width: 760px) {
  .footer-main {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .footer-wordmark {
    font-size: 5rem;
  }

  .footer-columns {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

@media (max-width: 480px) {
  .footer-inner {
    padding: 2.5rem 1.25rem 1.25rem;
  }

  .footer-columns {
    grid-template-columns: 1fr 1fr;
  }

  .footer-mascot {
    display: none;
  }
}

@media (max-width: 380px) {
  .footer-columns {
    grid-template-columns: 1fr;
  }
}
</style>
