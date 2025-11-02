export interface Movie {
  imdbID: string
  Title: string
  Year: string
  Type: string
  Poster: string
}

export interface MovieDetails extends Movie {
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Actors: string
  Plot: string
  imdbRating: string
}

export interface SearchResponse {
  Search: Movie[]
  totalResults: string
  Response: string
}
