<script setup lang="ts">
import { PhCaretDown, PhCaretUp, PhSquaresFour, PhUsers } from '@phosphor-icons/vue'
import { ref } from 'vue'
const isToggled = ref(false)
</script>

<template>
  <button
    @click="isToggled = !isToggled"
    class="hover:bg-accent-light p-2 transition-colors rounded-md"
  >
    <PhCaretDown v-if="!isToggled" />
    <PhCaretUp v-else />
  </button>
  <div
    v-if="isToggled"
    class="absolute top-10 py-3 pl-2 pr-4 rounded-md bg-accent-light text-text-dark dark:text-text-light"
  >
    <RouterLink
      to="/admin/users"
      class="hover:text-accent-dark transition-colors duration-300 flex gap-2 p-2 border-b-[0.5px] border-accent-dark"
      exact-active-class="text-accent-dark"
    >
      <PhUsers size="20" />
      <span>Users</span>
    </RouterLink>

    <RouterLink
      to="/admin/dashboard"
      class="hover:text-accent-dark transition-colors duration-300 flex gap-2 p-2"
      exact-active-class="text-accent-dark"
    >
      <PhSquaresFour size="20" />
      <span>Dashboard</span>
    </RouterLink>
  </div>
</template>
