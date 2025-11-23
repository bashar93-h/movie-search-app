<script setup lang="ts">
import MovieBox from '@/components/MovieBox.vue'
import { useMovieStore } from '@/stores/movieStore'
import MovieSearchBox from '@/components/MovieSearchBox.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import { onMounted } from 'vue'
import { PhCaretLeft, PhCaretRight } from '@phosphor-icons/vue'
import FakeLogin from './FakeLogin.vue'
import LoginPage from './LoginPage.vue'

const movieStore = useMovieStore()

onMounted(async () => {
  await movieStore.fetchPopularMovies()
})
</script>

<template>
  <div v-if="movieStore.loading">
    <LoadingSpinner />
  </div>
  <div v-else-if="movieStore.error">
    <ErrorMessage :message="movieStore.error" />
  </div>
  <div v-else-if="movieStore.hasMovies" class="max-w-7xl mx-auto mt-10 px-10">
    <MovieSearchBox v-for="movie in movieStore.movies" :key="movie.imdbID" :movie="movie" />
  </div>
  <div v-else class="mt-[100px] max-w-7xl mx-auto" data-cy="trending-section">
    <h1 class="text-xl font-bold mb-3 text-text-ligt dark:text-text-dark" data-cy="trending-title">
      Popular movies
    </h1>
    <div class="text-text-light dark:text-text-dark">
      <button
        @click="movieStore.fetchPopularMovies(movieStore.currentPage + 1)"
        class="fixed top-[50%] -translate-y-2/4 right-0 transition-transform hover:scale-110"
      >
        <PhCaretRight size="50" class="hover:text-accent-dark" />
      </button>
      <button
        @click="movieStore.fetchPopularMovies(movieStore.currentPage - 1)"
        :disabled="movieStore.currentPage === 1"
        v-if="movieStore.currentPage !== 1"
        class="fixed top-[50%] -translate-y-2/4 left-0 transition-transform hover:scale-110"
      >
        <PhCaretLeft size="50" class="hover:text-accent-dark" />
      </button>
      <div data-cy="trending-movies" class="grid grid-cols-5 gap-3">
        <MovieBox v-for="trend in movieStore.trendingMovies" :key="trend.Title" :movie="trend" />
      </div>
    </div>
  </div>
</template>
