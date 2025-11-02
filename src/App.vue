<script setup lang="ts">
import { onMounted } from 'vue'
import { useLocalStorage } from './composables/useLocalStorage'
import LoadingSpinner from './components/LoadingSpinner.vue'
import ErrorMessage from './components/ErrorMessage.vue'
import { useToast } from 'vue-toastification'
const toast = useToast()

const darkMode = useLocalStorage('dark-mode', false)
const toggleDarkMode = () => {
  darkMode.value = !darkMode.value
  darkMode.value
    ? document.documentElement.classList.add('dark')
    : document.documentElement.classList.remove('dark')
}
onMounted(() => {
  darkMode.value
    ? document.documentElement.classList.add('dark')
    : document.documentElement.classList.remove('dark')
})

function handleClick() {
  toast.success('Search completed')
}
</script>

<template>
  <h1 class="text-3xl bg-white text-black dark:bg-background-dark dark:text-text-dark">
    Movie search app
  </h1>
  <RouterView />
  <button @click="toggleDarkMode">
    {{ darkMode ? '☀️' : '🌙' }}
  </button>

  <LoadingSpinner />
  <ErrorMessage :message="'movie cannot be loaded'" />

  <button @click="handleClick">search</button>
</template>

<style scoped></style>
//adding comments //adds
