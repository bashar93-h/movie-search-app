<script setup lang="ts">
import { useLocalStorage } from '@/composables/useLocalStorage'
import { PhMoon, PhSun } from '@phosphor-icons/vue'
import { onMounted, ref } from 'vue'

const darkMode = useLocalStorage('darkMode', false)

const isHovered = ref(false)

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
</script>

<template>
  <button
    @mousemove="isHovered = true"
    @mouseleave="isHovered = false"
    @click="toggleDarkMode"
    class="transition-transform hover:scale-105"
  >
    <PhMoon v-if="!darkMode" size="32" color="#FFC107" :weight="isHovered ? 'fill' : 'regular'" />
    <PhSun v-else size="32" color="#FFC107" :weight="isHovered ? 'fill' : 'regular'" />
  </button>
</template>
