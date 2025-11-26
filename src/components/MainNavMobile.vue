<script setup lang="ts">
import { RouterLink } from 'vue-router'
import {
  PhBookmark,
  PhHouse,
  PhSignIn,
  PhSignOut,
  PhSquaresFour,
  PhUser,
  PhUsers,
} from '@phosphor-icons/vue'
import { useAuthStore } from '@/stores/authStore'

const props = defineProps({
  isToggled: Boolean,
})

const emit = defineEmits(['close'])

const authStore = useAuthStore()
</script>

<template>
  <nav
    aria-label="Main navigation"
    role="navigation"
    class="fixed w-[90%] h-[calc(100vh-55px)] p-5 text-text-dark dark:text-text-light bg-background-dark dark:bg-background-light transition-all duration-300 transform z-50"
    :class="props.isToggled ? 'translate-x-0' : '-translate-x-full'"
  >
    <ul class="flex flex-col gap-8">
      <li v-if="authStore.isAuthenticated">
        <div class="flex items-center gap-2">
          <PhUser />
          <span class="">{{ authStore.user?.name }}</span>
          <span
            class="text-xs p-1 rounded bg-accent-light/20 dark:bg-accent-dark/20 text-accent-light dark:text-accent-dark"
            >{{ authStore.userRole }}</span
          >
        </div>
      </li>
      <li>
        <RouterLink
          to="/"
          @click="emit('close')"
          role="menuitem"
          class="flex gap-2 items-center hover:text-accent-light dark:hover:text-accent-dark transition-colors duration-300"
          exact-active-class="text-accent-light dark:text-accent-dark"
        >
          <PhHouse />
          <span>Home</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink
          to="/favorites"
          @click="emit('close')"
          role="menuitem"
          class="flex gap-2 items-center hover:text-accent-light dark:hover:text-accent-dark transition-colors duration-300"
          exact-active-class="text-accent-light dark:text-accent-dark"
          ><PhBookmark />
          <span> Favorites </span>
        </RouterLink>
      </li>
      <li v-if="authStore.isAdmin" class="relative">
        <RouterLink
          to="/admin/users"
          @click="emit('close')"
          class="flex gap-2 items-center hover:text-accent-dark transition-colors duration-300 mb-8"
          exact-active-class="text-accent-dark"
        >
          <PhUsers size="20" />
          <span>Users</span>
        </RouterLink>

        <RouterLink
          to="/admin/dashboard"
          @click="emit('close')"
          class="flex gap-2 items-center hover:text-accent-dark transition-colors duration-300"
          exact-active-class="text-accent-dark"
        >
          <PhSquaresFour size="20" />
          <span>Dashboard</span>
        </RouterLink>
      </li>
      <li v-if="authStore.isAuthenticated" class="flex items-center gap-4">
        <button
          @click="
            () => {
              authStore.logout()
              emit('close')
            }
          "
          class="flex gap-2 items-center hover:text-accent-light dark:hover:text-accent-dark transition-colors duration-300"
        >
          <PhSignOut />
          <span> logout </span>
        </button>
      </li>
      <li v-else>
        <RouterLink
          to="/login"
          @click="emit('close')"
          role="menuitem"
          class="flex gap-2 items-center hover:text-accent-light dark:hover:text-accent-dark transition-colors duration-300"
          exact-active-class="text-accent-light dark:text-accent-dark"
        >
          <PhSignIn />
          <span> Login </span>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
