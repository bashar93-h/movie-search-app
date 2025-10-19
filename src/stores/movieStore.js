import { defineStore } from 'pinia'

export const useMovieStore = defineStore('movieStore', {
  state: () => ({
    movies: [],
    favorites: [],
  }),

  actions: {
    setMovies(data) {
      this.movies = data
    },
    addFavorite(movie) {
      if (!this.movies.some((f) => f.imdbID === movie.imdbID)) this.favorites.push(movie)
    },
  },
})
