<script setup lang="ts">
import { PhBookmarkSimple } from '@phosphor-icons/vue'
import { useRouter } from 'vue-router'

import { useMovieStore } from '@/stores/movieStore'
import { Movie } from '@/types/movie'

const movieStore = useMovieStore()
const router = useRouter()
const props = defineProps<{ movie: Movie }>()
const { imdbID, Title, Poster, Year, Type } = props.movie

const getToDetails = () => {
  router.push(`/movie/${imdbID}`)
}

//@click.stop is Vue shorthand for event.stopPropagation() — it prevents the click from reaching the parent (@click="getToDetails"), so only the icon’s handler runs.
//stop the click event from “bubbling up” to the parent
const toggleFavorite = () => {
  movieStore.toggleFavorite(props.movie)
}
</script>

<template>
  <div
    data-cy="movie-card"
    class="flex bg-secondary-light dark:bg-secondary-dark mb-3 rounded-xl overflow-hidden text-text-light dark:text-text-dark cursor-pointer"
    @click="getToDetails"
  >
    <div><img :src="Poster" alt="Poster" class="w-[100px] object-cover" /></div>
    <div class="flex items-center flex-1 justify-between p-4">
      <div class="flex flex-col gap-y-2">
        <h1 class="font-bold">{{ Title }}</h1>
        <p>{{ Year }}</p>
        <p>{{ Type }}</p>
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
