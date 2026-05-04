<script setup lang="ts"></script>

<template>
  <article>
    <header v-if="$slots.header">
      <slot name="header" />
    </header>

    <slot />

    <footer v-if="$slots.footer">
      <slot name="footer" />
    </footer>
  </article>
</template>
