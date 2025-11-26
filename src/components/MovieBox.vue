<script setup lang="ts">
import { PhBookmarkSimple } from '@phosphor-icons/vue'
import { Movie } from '@/types/movie'
import { useMovieStore } from '@/stores/movieStore'
import { useRouter } from 'vue-router'

const props = defineProps<{ movie: Movie; added?: boolean }>()
const { imdbID, Poster, Title, Year } = props.movie

const router = useRouter()
const movieStore = useMovieStore()
const toggleFavorite = () => {
  movieStore.toggleFavorite(props.movie)
}

const getToDetails = () => {
  router.push(`/movie/${imdbID}`)
}
</script>

<template>
  <div
    data-cy="movie-card"
    class="bg-secondary-light dark:bg-secondary-dark text-text-light dark:text-text-dark w-44 md:w-64 rounded-xl overflow-hidden transition-colors duration-500 cursor-pointer"
    @click="getToDetails"
    role="button"
    tabindex="0"
  >
    <div class="w-full h-[250px] md:h-[333px]">
      <img :src="Poster" alt="Poster" class="w-full h-full object-cover" />
    </div>
    <div class="flex justify-between py-3 px-2">
      <div class="title-box">
        <h2 class="font-bold mb-2">{{ Title }}</h2>
        <p class="text-sm font-light">{{ Year }}</p>
      </div>
      <div class="group relative">
        <button
          class="transition-transform group-hover:scale-105"
          @click.stop="toggleFavorite"
          :aria-label="movieStore.isFavorite(imdbID) ? 'Remove from favorites' : 'Add to favorites'"
        >
          <PhBookmarkSimple
            size="32"
            :weight="movieStore.isFavorite(imdbID) ? 'fill' : 'regular'"
            class="group-hover:fill-accent-light"
          />
        </button>
      </div>
    </div>
  </div>
</template>
