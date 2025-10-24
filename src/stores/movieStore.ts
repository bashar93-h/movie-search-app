import { defineStore } from 'pinia'

interface Movie {
  imdbID: string
  title: string
  year?: string
  poster?: string
}

export const useMovieStore = defineStore('movieStore', {
  state: () => ({
    movies: [] as Movie[],
    favorites: [] as Movie[],
  }),

  actions: {
    setMovies(data: Movie[]) {
      this.movies = data
    },
    addFavorite(movie: Movie) {
      if (!this.favorites.some((f) => f.imdbID === movie.imdbID)) this.favorites.push(movie)
    },
  },
})
