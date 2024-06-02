<script setup lang="ts">
import { isDark, toggleDark } from "../composables/dark";
</script>

<template>
  <nav mt-6 flex justify-center gap-2 text-xl>
    <button class="icon-btn" @click="toggleDark()">
      <div v-if="isDark" i-carbon-moon />
      <div v-else i-carbon-sun />
    </button>
    <a
      class="icon-btn"
      i-carbon-logo-github
      rel="noreferrer"
      href="https://github.com/Debbl"
      target="_blank"
      title="GitHub"
    />
  </nav>
</template>
