<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { PhArchive, PhCaretDown, PhCaretUp, PhUser, PhUsers } from '@phosphor-icons/vue'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import DarkModeToggle from './DarkModeToggle.vue'
import AdminDropdown from './AdminDropdown.vue'

const authStore = useAuthStore()
</script>

<template>
  <nav
    aria-label="Main navigation"
    role="navigation"
    class="text-text-light dark:text-text-dark hidden md:block"
  >
    <ul class="flex gap-8 items-center">
      <li>
        <RouterLink
          to="/"
          role="menuitem"
          class="hover:text-accent-light dark:hover:text-accent-dark transition-colors duration-300"
          exact-active-class="text-accent-light dark:text-accent-dark"
          >Home</RouterLink
        >
      </li>
      <li>
        <RouterLink
          to="/favorites"
          role="menuitem"
          class="hover:text-accent-light dark:hover:text-accent-dark transition-colors duration-300"
          exact-active-class="text-accent-light dark:text-accent-dark"
          >Favorites</RouterLink
        >
      </li>

      <li v-if="authStore.isAuthenticated" class="flex items-center gap-4">
        <div class="flex items-center gap-2">
          <PhUser />
          <span class="">{{ authStore.user?.name }}</span>
          <span
            class="text-xs p-1 rounded bg-accent-light/20 darkLbg-accent-dark/20 text-accent-light dark:text-accent-dark"
            >{{ authStore.userRole }}</span
          >
        </div>
        <button
          @click="authStore.logout"
          class="hover:text-accent-light dark:hover:text-accent-dark transition-colors duration-300"
        >
          logout
        </button>
      </li>
      <li v-else>
        <RouterLink
          to="/login"
          role="menuitem"
          class="hover:text-accent-light dark:hover:text-accent-dark transition-colors duration-300"
          exact-active-class="text-accent-light dark:text-accent-dark"
          >Login</RouterLink
        >
      </li>
      <li v-if="authStore.isAdmin" class="relative">
        <AdminDropdown />
      </li>
      <li>
        <DarkModeToggle />
      </li>
    </ul>
  </nav>
</template>
