import api from './api'
import type { SearchResponse, MovieDetails } from '@/types/movie'

export const movieService = {
  searchMovies: async (query: string, page = 1): Promise<SearchResponse> => {
    const response = await api.get('/', {
      params: { s: query, page },
    })
    return response.data
  },
  getMovieDetails: async (imdbID: string): Promise<MovieDetails> => {
    const response = await api.get('/', {
      params: { i: imdbID, plot: 'full' },
    })
    return response.data
  },
}

console.log('OMDb URL:', import.meta.env.VITE_OMDB_BASE_URL)
console.log('OMDb KEY:', import.meta.env.VITE_OMDB_API_KEY)
