import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useMovieStore } from '@/stores/movieStore'
import type { Movie } from '@/types/movie'

describe('Movie Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
    vi.clearAllMocks()
  })

  const mockMovie: Movie = {
    imdbID: 'tt0111161',
    Title: 'The Shawshank Redemption',
    Year: '1994',
    Type: 'movie',
    Poster: 'https://example.com/poster.jpg',
  }

  describe('Favorites', () => {
    it('should add movie to favorites', () => {
      const movieStore = useMovieStore()

      movieStore.addFavorite(mockMovie)

      expect(movieStore.favorites).toHaveLength(1)
      expect(movieStore.favorites[0]).toEqual(mockMovie)
      expect(movieStore.favoritesCount).toBe(1)
    })

    it('should remove movie from favorites', () => {
      const movieStore = useMovieStore()

      movieStore.addFavorite(mockMovie)
      expect(movieStore.favorites).toHaveLength(1)

      movieStore.removeFavorite(mockMovie.imdbID)

      expect(movieStore.favorites).toHaveLength(0)
      expect(movieStore.favoritesCount).toBe(0)
    })

    it('should toggle favorite on and off', () => {
      const movieStore = useMovieStore()

      // Add to favorites
      movieStore.toggleFavorite(mockMovie)
      expect(movieStore.isFavorite(mockMovie.imdbID)).toBe(true)
      expect(movieStore.favorites).toHaveLength(1)

      // Remove from favorites
      movieStore.toggleFavorite(mockMovie)
      expect(movieStore.isFavorite(mockMovie.imdbID)).toBe(false)
      expect(movieStore.favorites).toHaveLength(0)
    })

    it('should correctly check if movie is favorite', () => {
      const movieStore = useMovieStore()

      expect(movieStore.isFavorite(mockMovie.imdbID)).toBe(false)

      movieStore.addFavorite(mockMovie)

      expect(movieStore.isFavorite(mockMovie.imdbID)).toBe(true)
    })
  })

  describe('User Ratings', () => {
    it('should add a new rating', () => {
      const movieStore = useMovieStore()

      movieStore.userRatings.push({
        movieId: mockMovie.imdbID,
        userRating: 9,
      })

      expect(movieStore.userRatings).toHaveLength(1)
      expect(movieStore.userRatings[0].userRating).toBe(9)
      expect(movieStore.ratingsCount).toBe(1)
    })

    it('should update existing rating', () => {
      const movieStore = useMovieStore()

      // Add initial rating
      movieStore.userRatings.push({
        movieId: mockMovie.imdbID,
        userRating: 7,
      })

      // Update rating
      const ratingIndex = movieStore.userRatings.findIndex((r) => r.movieId === mockMovie.imdbID)
      movieStore.userRatings[ratingIndex].userRating = 9

      expect(movieStore.userRatings[0].userRating).toBe(9)
    })

    it('should get user rating for a specific movie', () => {
      const movieStore = useMovieStore()

      movieStore.userRatings.push({
        movieId: mockMovie.imdbID,
        userRating: 8,
      })

      const rating = movieStore.getUserRating(mockMovie.imdbID)

      expect(rating).toBe(8)
    })

    it('should return undefined for movie without rating', () => {
      const movieStore = useMovieStore()

      const rating = movieStore.getUserRating('tt9999999')

      expect(rating).toBeUndefined()
    })
  })

  describe('Computed Properties', () => {
    it('should have correct hasFavorites computed', () => {
      const movieStore = useMovieStore()

      expect(movieStore.hasFavorites).toBe(false)

      movieStore.addFavorite(mockMovie)

      expect(movieStore.hasFavorites).toBe(true)
    })

    it('should calculate favorites count correctly', () => {
      const movieStore = useMovieStore()

      expect(movieStore.favoritesCount).toBe(0)

      movieStore.addFavorite(mockMovie)
      movieStore.addFavorite({
        ...mockMovie,
        imdbID: 'tt0468569',
        Title: 'The Dark Knight',
      })

      expect(movieStore.favoritesCount).toBe(2)
    })
  })
})
