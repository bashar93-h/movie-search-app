<script setup lang="ts">
import MainNav from './MainNav.vue'
import SearchInput from './SearchInput.vue'
</script>

<template>
  <header class="bg-primary-light dark:bg-primary-dark transition-colors duration-500">
    <div class="max-w-7xl mx-auto flex justify-between items-center">
      <div class="h-[72px] w-auto flex items-center">
        <RouterLink to="/">
          <img src="/logo.png" alt="Movie search app logo" class="h-[50px]" />
        </RouterLink>
      </div>
      <SearchInput />
      <MainNav />
    </div>
  </header>
</template>
