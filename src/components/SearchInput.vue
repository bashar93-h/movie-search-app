<script setup lang="ts">
import { useMovieStore } from '@/stores/movieStore'
import { ref, watch } from 'vue'

const props = defineProps({
  styling: String,
})

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
    :class="`${props.styling} px-5 py-3 outline-none text-lg font-poppins font-thin dark:bg-primary-dark dark:text-white  transition-colors duration-500`"
  />
</template>
