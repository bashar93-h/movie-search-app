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
  <div v-else-if="movieStore.hasMovies" class="max-w-7xl mx-auto mt-10 px-5 md:px-10">
    <MovieSearchBox v-for="movie in movieStore.movies" :key="movie.imdbID" :movie="movie" />
  </div>
  <div
    v-else
    class="mt-[50px] md:mt-[100px] max-w-7xl mx-auto text-text-light dark:text-text-dark"
    data-cy="trending-section"
  >
    <button
      @click="movieStore.fetchPopularMovies(movieStore.currentPage + 1)"
      class="fixed md:top-[50%] -translate-y-2/4 right-2 md:right-0 transition-transform hover:scale-110"
    >
      <PhCaretRight size="30" class="hover:text-accent-dark md:hidden" />
      <PhCaretRight size="50" class="hover:text-accent-dark hidden md:block" />
    </button>
    <button
      @click="movieStore.fetchPopularMovies(movieStore.currentPage - 1)"
      :disabled="movieStore.currentPage === 1"
      v-if="movieStore.currentPage !== 1"
      class="fixed md:top-[50%] -translate-y-2/4 left-2 md:left-0 transition-transform hover:scale-110"
    >
      <PhCaretLeft size="30" class="hover:text-accent-dark md:hidden" />
      <PhCaretLeft size="50" class="hover:text-accent-dark hidden md:block" />
    </button>

    <h1
      class="text-lg md:text-xl ml-4 pt-10 mb-3 font-bold text-text-light dark:text-text-dark"
      data-cy="trending-title"
    >
      Popular movies
    </h1>
    <div
      data-cy="trending-movies"
      class="grid grid-cols-2 justify-items-center md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-2 md:gap-3"
    >
      <MovieBox v-for="trend in movieStore.trendingMovies" :key="trend.Title" :movie="trend" />
    </div>
  </div>
</template>
