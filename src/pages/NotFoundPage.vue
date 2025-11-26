<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="flex flex-col items-center text-text-light dark:text-text-dark mt-10">
    <h1 class="text-4xl md:text-6xl font-bold mb-4">404</h1>
    <p class="text-lg md:text-xl mb-6">Oops! The page you're looking for doesn’t exist.</p>
    <RouterLink
      to="/"
      class="py-2 px-3 rounded-md text-white bg-accent-light dark:bg-accent-dark hover:opacity-90 transition"
      >Go back gome</RouterLink
    >
  </div>
</template>
