<script setup lang="ts">
import { useMovieStore } from '@/stores/movieStore'
import { ref, watch } from 'vue'
const movieStore = useMovieStore()

const searchQuery = ref('')
watch(searchQuery, (value) => {
  if (value.trim().length >= 3) {
    movieStore.searchMovie(value)
  } else {
    movieStore.movies = []
  }
})
</script>

<template>
  <input
    type="text"
    v-model="searchQuery"
    aria-label="Search movies"
    placeholder="Search for a movie, tv show..."
    class="w-[500px] h-12 rounded-2xl px-5 py-3 outline-none text-lg font-poppins font-thin dark:bg-primary-dark dark:text-white dark:border dark:border-gray-600 transition-colors duration-500"
  />
</template>
