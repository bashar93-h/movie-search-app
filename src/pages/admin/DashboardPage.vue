<script setup lang="ts">
import { ref } from 'vue'
import { PhUsers, PhHeart, PhStar, PhFilmReel, PhTrendUp, PhChartLine } from '@phosphor-icons/vue'

// Mock stats - all static for demo
const totalUsers = ref(156)
const activeUsersToday = ref(42)
const totalMoviesViewed = ref(1234)
const totalFavorites = ref(342)
const totalRatings = ref(567)
const averageRating = ref(7.8)

// Recent activity mock data
const recentActivities = ref([
  { user: 'John Doe', action: 'added to favorites', movie: 'Inception', time: '2 min ago' },
  { user: 'Jane Smith', action: 'rated', movie: 'The Dark Knight', time: '15 min ago' },
  { user: 'Mike Johnson', action: 'added to favorites', movie: 'Interstellar', time: '1 hour ago' },
  { user: 'Sarah Wilson', action: 'rated', movie: 'The Matrix', time: '2 hours ago' },
  { user: 'Tom Brown', action: 'added to favorites', movie: 'Pulp Fiction', time: '3 hours ago' },
])

// Most popular movies (mock data - in real app would come from all users' favorites)
const topMovies = ref([
  {
    title: 'The Shawshank Redemption',
    year: '1994',
    favoriteCount: 89,
    poster: 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
  },
  {
    title: 'The Dark Knight',
    year: '2008',
    favoriteCount: 76,
    poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
  },
  {
    title: 'Inception',
    year: '2010',
    favoriteCount: 68,
    poster: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
  },
  {
    title: 'Pulp Fiction',
    year: '1994',
    favoriteCount: 54,
    poster: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
  },
  {
    title: 'Interstellar',
    year: '2014',
    favoriteCount: 51,
    poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
  },
])
</script>

<template>
  <div class="max-w-7xl mx-auto p-6 font-poppins text-text-light dark:text-text-dark">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-goldman font-bold mb-2">Dashboard</h1>
      <p>Overview of your movie platform</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Total Users -->
      <div class="bg-secondary-light dark:bg-background-dark p-6 rounded-xl border border-gray-700">
        <div class="flex items-center justify-between mb-4">
          <PhUsers size="32" class="text-blue-400" />
          <span class="text-xs text-green-400 flex items-center gap-1">
            <PhTrendUp size="16" />
            +12%
          </span>
        </div>
        <p class="text-text-muted text-sm mb-1">Total Users</p>
        <p class="text-3xl font-bold">{{ totalUsers }}</p>
        <p class="text-xs text-text-muted mt-2">{{ activeUsersToday }} active today</p>
      </div>

      <!-- Total Favorites -->
      <div class="bg-secondary-light dark:bg-background-dark p-6 rounded-xl border border-gray-700">
        <div class="flex items-center justify-between mb-4">
          <PhHeart size="32" class="text-red-400" weight="fill" />
          <span class="text-xs text-green-400 flex items-center gap-1">
            <PhTrendUp size="16" />
            +8%
          </span>
        </div>
        <p class="text-text-muted text-sm mb-1">Total Favorites</p>
        <p class="text-3xl font-bold">{{ totalFavorites }}</p>
        <p class="text-xs text-text-muted mt-2">Across all users</p>
      </div>

      <!-- Total Ratings -->
      <div class="bg-secondary-light dark:bg-background-dark p-6 rounded-xl border border-gray-700">
        <div class="flex items-center justify-between mb-4">
          <PhStar size="32" class="text-yellow-400" weight="fill" />
          <span class="text-xs text-green-400 flex items-center gap-1">
            <PhTrendUp size="16" />
            +15%
          </span>
        </div>
        <p class="text-text-muted text-sm mb-1">Total Ratings</p>
        <p class="text-3xl font-bold">{{ totalRatings }}</p>
        <p class="text-xs text-text-muted mt-2">Avg: {{ averageRating }} ⭐</p>
      </div>

      <!-- Movies Viewed -->
      <div class="bg-secondary-light dark:bg-background-dark p-6 rounded-xl border border-gray-700">
        <div class="flex items-center justify-between mb-4">
          <PhFilmReel size="32" class="text-purple-400" />
          <span class="text-xs text-green-400 flex items-center gap-1">
            <PhTrendUp size="16" />
            +20%
          </span>
        </div>
        <p class="text-text-muted text-sm mb-1">Movies Viewed</p>
        <p class="text-3xl font-bold">
          {{ totalMoviesViewed }}
        </p>
        <p class="text-xs text-text-muted mt-2">This month</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-secondary-light dark:bg-background-dark rounded-xl border border-gray-700 p-6">
        <div class="flex items-center gap-2 mb-6">
          <PhChartLine size="24" class="text-accent-light dark:text-accent-dark" />
          <h2 class="text-xl font-bold">Recent Activity</h2>
        </div>

        <div class="space-y-4">
          <div
            v-for="(activity, index) in recentActivities"
            :key="index"
            class="flex items-start gap-3 pb-4 border-b border-gray-700 last:border-0"
          >
            <div class="w-2 h-2 rounded-full bg-accent-light dark:bg-accent-dark mt-2"></div>
            <div class="flex-1">
              <p class="text-sm">
                <span class="font-semibold">{{ activity.user }}</span>
                <span> {{ activity.action }} </span>
                <span class="font-semibold">{{ activity.movie }}</span>
              </p>
              <p class="text-xs mt-1">{{ activity.time }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-secondary-light dark:bg-background-dark rounded-xl border border-gray-700 p-6">
        <div class="flex items-center gap-2 mb-6">
          <PhFilmReel size="24" class="text-accent-light dark:text-accent-dark" />
          <h2 class="text-xl font-bold">Most Popular Movies</h2>
        </div>

        <div class="space-y-3">
          <div
            v-for="(movie, index) in topMovies"
            :key="index"
            class="flex items-center gap-4 p-3 rounded-lg hover:bg-background-dark/50 dark:hover:bg-background-light/50 transition-colors"
          >
            <span class="text-2xl font-bold text-accent-light dark:text-accent-dark w-8">
              {{ index + 1 }}
            </span>
            <img :src="movie.poster" :alt="movie.title" class="w-12 h-16 object-cover rounded" />
            <div class="flex-1">
              <p class="font-semibold">{{ movie.title }}</p>
              <p class="text-sm">{{ movie.year }}</p>
            </div>
            <div class="text-right">
              <p class="font-bold text-accent-light dark:text-accent-dark">
                {{ movie.favoriteCount }}
              </p>
              <p class="text-xs">favorites</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
