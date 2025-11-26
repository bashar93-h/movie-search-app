<script setup lang="ts">
import MainNav from './MainNav.vue'
import SearchInput from './SearchInput.vue'
import Logo from './Logo.vue'
import { ref } from 'vue'

const isToggled = ref<boolean>(false)
</script>

<template>
  <header
    class="bg-primary-light dark:bg-primary-dark transition-colors duration-500 hidden md:block"
  >
    <div class="max-w-7xl mx-auto flex justify-between items-center">
      <div class="h-[72px] w-auto flex items-center">
        <Logo styling="h-[50px]" />
      </div>
      <SearchInput styling="w-[500px] h-12 rounded-2xl dark:border dark:border-gray-600" />
      <MainNav />
    </div>
  </header>
</template>
