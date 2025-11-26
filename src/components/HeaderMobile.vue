<script setup lang="ts">
import { PhList } from '@phosphor-icons/vue'
import SearchInput from './SearchInput.vue'
import DarkModeToggle from './DarkModeToggle.vue'
import Logo from './Logo.vue'
import MainNavMobile from './MainNavMobile.vue'
import { ref } from 'vue'

const isToggled = ref<boolean>(false)
</script>

<template>
  <header class="md:hidden">
    <div class="relative">
      <div class="w-[90%] flex justify-between items-center pb-5 mt-3 mx-auto">
        <PhList
          size="30"
          class="text-text-light dark:text-text-dark"
          @click="isToggled = !isToggled"
        />
        <Logo styling="h-[35px]" />
        <DarkModeToggle />
      </div>
      <MainNavMobile :isToggled="isToggled" @close="isToggled = false" />
    </div>
    <SearchInput styling="w-full dark:border-y dark:border-gray-600" />
  </header>
</template>
