<script setup lang="ts">
import { useMovieStore } from '@/stores/movieStore'
import { MovieDetails } from '@/types/movie'
import { PhBookmarkSimple, PhUser } from '@phosphor-icons/vue'
import { computed } from 'vue'
import StarRating from './StarRating.vue'
import { ref } from 'vue'

const props = defineProps<{ movie: MovieDetails }>()
const {
  imdbID,
  Poster,
  Title,
  Released,
  Rated,
  imdbRating,
  Genre,
  Runtime,
  Director,
  Actors,
  Plot,
  Year,
  Type,
} = props.movie

const ActorList = computed(() => {
  return Actors ? Actors.split(',') : []
})

const movieStore = useMovieStore()
const toggleFavorite = () => {
  const movie = {
    imdbID,
    Title,
    Year,
    Type,
    Poster,
  }
  movieStore.toggleFavorite(movie)
}

const userRating = computed(() => movieStore.getUserRating(imdbID))
</script>

<template>
  <div
    class="max-w-7xl mx-auto text-text-dark flex flex-col items-center md:hidden gap-6 p-7 font-poppins z-20"
  >
    <div class="w-[90%] flex-shrink-0 rounded-xl overflow-hidden">
      <img :src="Poster" alt="Poster" class="h-[450px] md:h-[510px] w-full object-cover" />
    </div>
    <div class="flex flex-col gap-y-8 flex-1">
      <div class="flex gap-x-3 items-center">
        <h1 class="font-goldman text-xl md:text-2xl font-bold">{{ Title }}</h1>
        <p class="font-light">({{ Released }})</p>
      </div>
      <div class="flex justify-between">
        <p>{{ Genre }}</p>
        <div class="group relative">
          <button
            class="transition-transform group-hover:scale-105"
            @click="toggleFavorite"
            :aria-label="
              movieStore.isFavorite(imdbID) ? 'Remove from favorites' : 'Add to favorites'
            "
          >
            <PhBookmarkSimple
              size="32"
              :weight="movieStore.isFavorite(imdbID) ? 'fill' : 'regular'"
              class="group-hover:fill-accent-light"
            />
          </button>
        </div>
      </div>

      <div class="flex gap-x-6 text-center">
        <p class="font-goldman">{{ Runtime }}</p>
        <p class="font-goldman">{{ Rated }}</p>
        <p class="font-goldman">⭐{{ imdbRating }} IMDB rating</p>
      </div>
      <p v-if="userRating" class="font-goldman">⭐{{ userRating }} your rating</p>

      <div class="flex flex-col gap-y-2">
        <div class="flex justify-between items-center">
          <p class="font-goldman">{{ Director }}</p>
          <div class="flex gap-x-2">
            <p class="text-sm font-light">director</p>
            <PhUser />
          </div>
        </div>
        <div class="flex justify-between" v-for="actor in ActorList">
          <p class="font-goldman">{{ actor }}</p>
          <div class="flex items-center gap-x-2">
            <p class="text-sm font-light">actor</p>
            <PhUser />
          </div>
        </div>
      </div>
      <div class="flex gap-x-2">
        <StarRating :starRating="10" :movieId="imdbID" :initialRating="userRating" />
      </div>

      <div>
        <h3 class="font-semibold">Overview</h3>
        <p class="font-light">{{ Plot }}</p>
      </div>
    </div>
  </div>
</template>
