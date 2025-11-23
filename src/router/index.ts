import ArchivePage from '@/pages/admin/ArchivePage.vue'
import DashboardPage from '@/pages/admin/DashboardPage.vue'
import UsersPage from '@/pages/admin/UsersPage.vue'
import Favorites from '@/pages/FavoritesPage.vue'
import Home from '@/pages/HomePage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import MovieDetails from '@/pages/MovieDetails.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'
import { useAuthStore } from '@/stores/authStore'
import { createRouter, createWebHistory } from 'vue-router'
import { useToast } from 'vue-toastification'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/movie/:id',
      name: 'MovieDetails',
      component: MovieDetails,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage,
      meta: {
        requiresAuth: false,
        hideForAuth: true,
      },
    },
    {
      path: '/favorites',
      name: 'Favorites',
      component: Favorites,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/admin/users',
      name: 'UsersPage',
      component: UsersPage,
      meta: {
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: '/admin/archive',
      name: 'ArchivePage',
      component: ArchivePage,
      meta: {
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: '/admin/dashboard',
      name: 'DashboardPage',
      component: DashboardPage,
      meta: {
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFoundPage,
    },
  ],
})

router.beforeEach((to, from, next) => {
  const toast = useToast()
  const authStore = useAuthStore()
  const requiresAuth = to.meta.requiresAuth
  const requiredRoles = to.meta.roles as string[] | undefined
  const hideForAuth = to.meta.hideForAuth

  if (hideForAuth && authStore.isAuthenticated) {
    return next('/')
  }

  if (requiresAuth && !authStore.checkAuth()) {
    toast.error('Please login to access this page')
    return next({
      name: 'Login',
      query: { redirect: to.fullPath },
    })
  }

  if (requiresAuth && requiredRoles && requiredRoles.length > 0) {
    if (!authStore.hasRole(requiredRoles)) {
      toast.error('You do not have permission to access this page')
      return next('/')
    }
  }
  next()
})

export default router
