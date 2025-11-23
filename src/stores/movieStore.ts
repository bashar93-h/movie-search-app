import { defineStore } from 'pinia'
import { Movie, MovieDetails, Rating, TmdbMovie } from '@/types/movie'
import { movieService } from '@/services/movieService'
import { tmdbServices } from '@/services/tmdbServices'
import { useToast } from 'vue-toastification'
import { computed, ref, watch } from 'vue'

const toast = useToast()
export const useMovieStore = defineStore('movieStore', () => {
  const loadFavoritesFromStorage = (): Movie[] => {
    try {
      const stored = localStorage.getItem('favorites')
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.log('Failed to load favorites', error)
      return []
    }
  }

  const loadUserRatings = (): Rating[] => {
    try {
      const stored = localStorage.getItem('userRatings')
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.log('Failed to load ratings')
      return []
    }
  }

  const currentPage = ref(1)
  const movies = ref<Movie[]>([])
  const trendingMovies = ref<any[]>([])
  const selectedMovie = ref<MovieDetails | null>(null)
  const favorites = ref<Movie[]>(loadFavoritesFromStorage())
  const userRatings = ref<Rating[]>(loadUserRatings())
  const loading = ref(false)
  const error = ref<string | null>(null)

  // wathcers
  watch(
    favorites,
    (newFavorites) => {
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
    },
    { deep: true },
  )
  watch(
    userRatings,
    (newRatings) => {
      localStorage.setItem('userRatings', JSON.stringify(newRatings))
    },
    { deep: true },
  )

  // Getters
  const hasFavorites = computed(() => favorites.value.length > 0)

  const hasMovies = computed(() => movies.value.length > 0)

  const favoritesCount = computed(() => favorites.value.length)

  const ratingsCount = computed(() => userRatings.value.length)

  const getUserRating = (movieId: string) => {
    return userRatings.value.find((r) => r.movieId === movieId)?.userRating
  }

  // Actions
  const searchMovie = async (query: string) => {
    loading.value = true
    error.value = null

    try {
      const response = await movieService.searchMovies(query)
      if (response.Response === 'True') {
        movies.value = response.Search
      } else {
        error.value = `No movies found for this "${query}"`
        movies.value = []
      }
    } catch (e) {
      error.value = 'Failed to search movies'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  const fetchMovieDetails = async (imdbID: string) => {
    loading.value = true
    error.value = null

    try {
      selectedMovie.value = await movieService.getMovieDetails(imdbID)
    } catch (e) {
      error.value = 'Failed to fetch movie details'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  const addFavorite = (movie: Movie) => {
    favorites.value.push(movie)
    toast.success(`${movie.Title} movie added to the list`)
  }
  const removeFavorite = (imdbID: string) => {
    favorites.value = favorites.value.filter((f) => f.imdbID !== imdbID)
    toast.success(`movie with ${imdbID} ID removed from the list`)
  }

  const fetchPopularMovies = async (page = currentPage.value) => {
    loading.value = true
    error.value = null

    try {
      const tmdbMovies = await tmdbServices.getPopularMovies(page)
      const moviesWithImdbID = await Promise.all(
        tmdbMovies.map(async (movie: TmdbMovie) => {
          try {
            const details = await tmdbServices.fetchMovieDetails(movie.id)
            return {
              imdbID: details.imdb_id,
              Title: movie.title,
              Year: movie.release_date?.split('-')[0] || '',
              Type: movie.media_type,
              Poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            }
          } catch (error) {
            console.log(`Faild to fethc details for movie ID ${movie.id}`, error)
            return null
          }
        }),
      )
      trendingMovies.value = moviesWithImdbID.filter((m) => m !== null)
      currentPage.value = page
    } catch (e) {
      error.value = 'Failed to fetch movies'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  const toggleFavorite = (movie: Movie) => {
    if (isFavorite(movie.imdbID)) removeFavorite(movie.imdbID)
    else addFavorite(movie)
  }

  const isFavorite = (imdbID: string) =>
    favorites.value.some((favorite) => favorite.imdbID === imdbID)

  return {
    movies,
    favorites,
    loading,
    error,
    selectedMovie,
    userRatings,
    trendingMovies,
    currentPage,
    hasFavorites,
    hasMovies,
    favoritesCount,
    ratingsCount,
    getUserRating,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    searchMovie,
    fetchMovieDetails,
    isFavorite,
    fetchPopularMovies,
  }
})
