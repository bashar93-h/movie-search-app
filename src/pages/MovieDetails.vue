<script setup lang="ts">
import ErrorMessage from '@/components/ErrorMessage.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import SelectedMovieDetails from '@/components/SelectedMovieDetails.vue'
import SelectedMovieDetailsMobile from '@/components/SelectedMovieDetailsMobile.vue'
import { useMovieStore } from '@/stores/movieStore'
import { onMounted } from 'vue'
import { useRoute, RouterLink, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const movieStore = useMovieStore()

// onMounted ensures the movie is fetched after the component is ready.
// to call your store action fetchMovieDetails(id) after the component has mounted — this avoids running the fetch before Vue is ready.
onMounted(() => {
  const id = route.params.id as string
  movieStore.fetchMovieDetails(id)
})
</script>
<template>
  <div class="pt-8 pl-8">
    <button @click="router.back()" class="text-lg mt-4 text-text-light dark:text-text-dark">
      👉 Go Back
    </button>
  </div>
  <div v-if="movieStore.loading" class="flex justify-center items-center h-screen">
    <LoadingSpinner />
  </div>
  <div v-else-if="movieStore.error"><ErrorMessage :message="movieStore.error" /></div>
  <div v-else-if="movieStore.selectedMovie" class="relative mt-14">
    <div
      class="absolute inset-0 bg-cover bg-center"
      :style="{ backgroundImage: `url(${movieStore.selectedMovie.Poster})` }"
    >
      <div class="absolute inset-0 bg-black/85"></div>
    </div>
    <div class="relative z-10">
      <SelectedMovieDetails :movie="movieStore.selectedMovie" />
      <SelectedMovieDetailsMobile :movie="movieStore.selectedMovie" />
    </div>
  </div>
</template>
