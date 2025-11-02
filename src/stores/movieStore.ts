import { defineStore } from 'pinia'
import { Movie, MovieDetails } from '@/types/movie'
import { movieService } from '@/services/movieService'

export const useMovieStore = defineStore('movieStore', {
  state: () => ({
    movies: [] as Movie[],
    selectedMovie: null as MovieDetails | null,
    favorites: [] as Movie[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async searchMovie(query: string) {
      this.loading = true
      this.error = null

      try {
        const response = await movieService.searchMovies(query)
        if (response.Response === 'True') {
          this.movies = response.Search
        } else {
          this.error = 'No movies found'
          this.movies = []
        }
      } catch (e) {
        this.error = 'Failed to search movies'
        console.error(e)
      } finally {
        this.loading = false
      }
    },

    async fetchMovieDetails(imdbID: string) {
      this.loading = true
      this.error = null

      try {
        this.selectedMovie = await movieService.getMovieDetails(imdbID)
      } catch (e) {
        this.error = 'Failed to fetch movie details'
        console.error(e)
      } finally {
        this.loading = false
      }
    },

    addFavorite(movie: Movie) {
      if (!this.favorites.some((f) => f.imdbID === movie.imdbID)) {
        this.favorites.push(movie)
      }
    },
    removeFavorite(imdbID: string) {
      this.favorites = this.favorites.filter((f) => f.imdbID !== imdbID)
    },
  },
})
