# Entity Relationship Diagram - Movie Search App

## Entities

### Movie

- **imdbID** (Primary Key) - string
- Title - string
- Year - string
- Poster - string

### User

- **id** (Primary Key) - string
- username - string
- email - string

### Favorite

- id (Primary Key) - string
- userId (FK → User.id)
- movieId (FK → Movie.imdbID)
- addedAt - datetime

## Relationships

```
User ──(1:N)── Favorite ──(N:1)── Movie
  One user can have many favorite movies
```

## Notes

- Using OMDB API for movie data
- User favorites stored locally
