<script setup lang="ts">
import { RouterLink } from "vue-router";
import { ArrowUpRight } from "lucide-vue-next";

const year = new Date().getFullYear();
</script>

<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <p class="footer-wordmark" aria-hidden="true">Pear</p>

      <div class="footer-content">
        <section class="footer-note" aria-labelledby="footer-title">
          <h2 id="footer-title">Use the pieces you need.</h2>
          <p>
            Pear works best when it disappears into your app. Pico handles the
            look. Vue handles state. The HTML still makes sense.
          </p>

          <div class="footer-actions">
            <RouterLink to="/docs" class="footer-primary-link">
              Read the docs
            </RouterLink>
            <a
              href="https://github.com/onticcloud/pear"
              target="_blank"
              rel="noreferrer"
            >
              GitHub <ArrowUpRight :size="13" class="link-icon" />
            </a>
          </div>
        </section>

        <nav class="footer-link-grid" aria-label="Footer">
          <div class="footer-col">
            <p class="footer-col-label">Start</p>
            <ul>
              <li><RouterLink to="/docs">Getting Started</RouterLink></li>
              <li><RouterLink to="/docs/buttons">Buttons</RouterLink></li>
              <li><RouterLink to="/docs/fields">Fields</RouterLink></li>
              <li><RouterLink to="/docs/theme-switcher">Theme Switcher</RouterLink></li>
            </ul>
          </div>

          <div class="footer-col">
            <p class="footer-col-label">Patterns</p>
            <ul>
              <li><RouterLink to="/docs/layout">Layout Primitives</RouterLink></li>
              <li><RouterLink to="/docs/dropdowns">Dropdowns</RouterLink></li>
              <li><RouterLink to="/docs/modals">Modals</RouterLink></li>
              <li><RouterLink to="/docs/tooltips">Tooltips</RouterLink></li>
            </ul>
          </div>

          <div class="footer-col">
            <p class="footer-col-label">Project</p>
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
        </nav>

        <div class="footer-bottom">
          <p class="footer-copy">
            &copy; {{ year }} Les Harris. Made with Vue and Pico CSS.
          </p>
        </div>
      </div>
    </div>

    <div class="footer-mascot-frame" aria-hidden="true" />
  </footer>
</template>

<style scoped>
.site-footer {
  position: relative;
  overflow: hidden;
  overflow: clip;
  contain: paint;
  width: 100%;
  max-width: 100%;
  margin-top: 4rem;
  border-top: 3px solid var(--pico-primary);
  background-color: var(--pico-card-background-color);
  padding: 0;
}

.footer-inner {
  position: relative;
  max-width: 72rem;
  margin: 0 auto;
  padding: 3.25rem 2rem 1.75rem;
}

.footer-wordmark {
  position: absolute;
  top: 3.35rem;
  left: 2rem;
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

.footer-content {
  display: grid;
  grid-template-columns: minmax(16rem, 1fr) minmax(26rem, 1.35fr);
  gap: clamp(2rem, 5vw, 4.5rem);
  align-items: start;
  margin-left: min(15rem, 22vw);
}

.footer-note {
  max-width: 26rem;
}

.footer-note h2 {
  font-family: var(--font-display);
  font-style: italic;
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  line-height: 1.05;
  margin: 0;
}

.footer-note p {
  margin: 0.8rem 0 0;
  color: var(--pico-muted-color);
  line-height: 1.6;
}

.footer-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1rem;
  align-items: center;
  margin-top: 1.25rem;
}

.footer-actions a {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
}

.footer-primary-link {
  color: var(--pico-primary);
}

/* ── Peeking mascot ── */
.footer-mascot-frame {
  position: absolute;
  inset: 0;
  overflow: hidden;
  overflow: clip;
  contain: paint;
  pointer-events: none;
}

.footer-mascot-frame::before {
  content: "";
  position: absolute;
  bottom: 1.25rem;
  left: 0;
  height: 13rem;
  width: 10.875rem;
  background: url("@/assets/peary.png") 0 center / auto 13rem no-repeat;
  transform: rotate(16deg) translateY(20%);
  transform-origin: bottom left;
  filter: grayscale(100%);
  opacity: 0.32;
  mix-blend-mode: multiply;
}

.footer-link-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  padding-top: 0.25rem;
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
  align-items: flex-start;
}

.site-footer .footer-link-grid .footer-col li {
  margin: 0;
  padding: 0;
}

.site-footer .footer-link-grid .footer-col a {
  font-size: 0.875rem;
  color: var(--pico-muted-color);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
  margin: 0;
  padding: 0;
  line-height: 1.5;
  transition: color 0.15s;
}

.site-footer .footer-link-grid .footer-col a:hover {
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
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-top: 1.25rem;
  margin-top: 2rem;
  border-top: 1px solid color-mix(in srgb, var(--pico-muted-border-color) 70%, transparent);
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
@media (max-width: 900px) {
  .footer-content {
    grid-template-columns: 1fr;
    margin-left: 0;
    padding-top: 5.5rem;
  }

  .footer-note {
    max-width: 34rem;
  }

  .footer-wordmark {
    font-size: 5rem;
  }

  .footer-link-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

@media (max-width: 480px) {
  .footer-inner {
    padding: 2.5rem 1.25rem 1.25rem;
  }

  .footer-content {
    padding-top: 4.5rem;
  }

  .footer-link-grid {
    grid-template-columns: 1fr 1fr;
  }

  .footer-mascot-frame {
    display: none;
  }
}

@media (max-width: 380px) {
  .footer-link-grid {
    grid-template-columns: 1fr;
  }
}
</style>
