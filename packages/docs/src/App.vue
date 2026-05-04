<script setup lang="ts">
import { RouterView } from "vue-router";
import { PModalProvider } from "@ontic/pear";
</script>

<template>
  <PModalProvider>
    <RouterView />
  </PModalProvider>
</template>
