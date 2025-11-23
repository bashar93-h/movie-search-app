<script setup lang="ts">
import { PhStar } from '@phosphor-icons/vue'
import { ref } from 'vue'
import { useMovieStore } from '@/stores/movieStore'

const movieStore = useMovieStore()
const props = defineProps<{ starRating: number; movieId: string; initialRating?: number }>()
const rating = ref(props.initialRating || 0)
const tempRating = ref(0)
const stars = Array.from({ length: props.starRating }, (_, i) => i)

const setTempRating = (val: number) => {
  tempRating.value = val
}

const setRating = (val: number) => {
  rating.value = val
}

const addOrUpdateRating = () => {
  const ratingIndex = movieStore.userRatings.findIndex((r) => r.movieId === props.movieId)
  if (ratingIndex !== -1) {
    console.log(ratingIndex)
    movieStore.userRatings[ratingIndex].userRating = rating.value
  } else movieStore.userRatings.push({ movieId: props.movieId, userRating: rating.value })
}
</script>

<template>
  <div data-cy="star-rating" class="flex flex-col gap-x-3 items-center text-accent-light">
    <div class="flex gap-x-1">
      <div
        v-for="val in stars"
        class="group cursor-pointer"
        @mouseenter="setTempRating(val + 1)"
        @mouseleave="setTempRating(0)"
        @click="setRating(val + 1)"
      >
        <PhStar
          size="20"
          :weight="(tempRating ? tempRating >= val + 1 : rating >= val + 1) ? 'fill' : 'regular'"
        />
      </div>
      <p>{{ tempRating || rating || '' }}</p>
    </div>
    <button class="" v-if="rating && rating !== initialRating" @click="addOrUpdateRating">
      {{ initialRating ? 'Update rating movie' : '+Add rating movie' }}
    </button>
  </div>
</template>
