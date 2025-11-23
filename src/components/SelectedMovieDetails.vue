<script setup lang="ts">
import { useMovieStore } from '@/stores/movieStore'
import { MovieDetails } from '@/types/movie'
import { PhBookmarkSimple } from '@phosphor-icons/vue'
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
  <div class="max-w-7xl mx-auto text-text-dark flex gap-x-6 p-7 font-poppins z-20">
    <div class="w-[360px] flex-shrink-0 rounded-xl overflow-hidden">
      <img :src="Poster" alt="Poster" class="h-[510px] w-full object-cover" />
    </div>
    <div class="flex flex-col gap-y-8 flex-1">
      <div class="flex justify-between">
        <div class="flex gap-x-3 items-center">
          <h1 class="font-goldman text-2xl font-bold">{{ Title }}</h1>
          <p class="font-light">({{ Released }})</p>
        </div>
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
      <div class="flex gap-x-10">
        <p>{{ Genre }}</p>
        <div class="flex flex-col gap-y-1 items-center">
          <p class="font-semibold">{{ Director }}</p>
          <p class="text-sm">director</p>
        </div>
        <div>
          <StarRating :starRating="10" :movieId="imdbID" :initialRating="userRating" />
        </div>
      </div>
      <div class="flex gap-x-10">
        <p class="font-goldman">{{ Runtime }}</p>
        <p class="font-goldman">{{ Rated }}</p>
        <p class="font-goldman">⭐{{ imdbRating }} IMDB rating</p>
        <p v-if="userRating" class="font-goldman">⭐{{ userRating }} your rating</p>
      </div>
      <div class="flex gap-x-10">
        <div class="flex flex-col items-center" v-for="actor in ActorList">
          <p class="font-goldman">{{ actor }}</p>
          <p>actor</p>
        </div>
      </div>
      <div>
        <h3 class="font-semibold">Overview</h3>
        <p class="font-light">{{ Plot }}</p>
      </div>
    </div>
  </div>
</template>
