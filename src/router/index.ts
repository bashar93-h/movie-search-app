import Favorites from '@/pages/FavoritesPage.vue'
import Home from '@/pages/HomePage.vue'
import MovieDetails from '@/pages/MovieDetails.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/movie/:id',
      component: MovieDetails,
    },
    {
      path: '/favorites',
      component: Favorites,
    },
  ],
})

export default router
