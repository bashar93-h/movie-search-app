import tmdbApi from './tmdbApi'

export const tmdbServices = {
  async getTrendingMovies(page: number) {
    const response = await tmdbApi.get('/trending/movie/week', {
      params: { page },
    })
    return response.data.results
  },

  async getPopularMovies(page: number) {
    const response = await tmdbApi.get('/movie/popular', {
      params: { page },
    })
    return response.data.results
  },

  async fetchMovieDetails(movieId: string) {
    const response = await tmdbApi.get(`/movie/${movieId}`)
    return response.data
  },
}
