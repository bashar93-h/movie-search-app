<script setup lang="ts">
import MovieBox from '@/components/MovieBox.vue'
import { useMovieStore } from '@/stores/movieStore'
import { onMounted } from 'vue'
import FakeLogin from './FakeLogin.vue'

const movieStore = useMovieStore()
</script>
<template>
  <div class="max-w-7xl mx-auto mt-10 text-text-light dark:text-text-dark">
    <div v-if="!movieStore.hasFavorites">
      <h2 class="text-xl font-semibold">No favorite movies yet 🎬</h2>
      <p class="mt-2">start exploring and add movies to your favorites!</p>
    </div>
    <div v-else class="grid justify-items-center grid-cols-2 xl:grid-cols-5 gap-y-3 md:gap-8">
      <MovieBox
        v-for="favorite in movieStore.favorites"
        :key="favorite.imdbID"
        :movie="favorite"
        :added="true"
      />
    </div>
  </div>
</template>
