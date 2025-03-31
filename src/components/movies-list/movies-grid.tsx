import { Box, CircularProgress, Grid, Typography } from '@mui/material'
import { MovieCard } from './movie-card'
import { MovieSearch } from '../../services/movies'

interface Props {
  movies: MovieSearch[]
  isLoading: boolean
  isError: boolean
  page: number
  observerRef?: React.RefObject<HTMLDivElement | null>
  movieRefs?: React.RefObject<Record<string, HTMLDivElement | null>>
}

export const MovieGrid = ({
  movies,
  isLoading,
  isError,
  page,
  observerRef,
  movieRefs,
}: Props) => {
  if ((isError && page === 1) || (movies.length === 0 && !isLoading)) {
    return <Typography color="error">No results found.</Typography>
  }

  return (
    <Grid container spacing={2}>
      {movies.map((movie) => (
        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 4,
            lg: 3,
          }}
          key={movie.imdbID}
          ref={(el) => {
            if (!movieRefs) return
            movieRefs.current[movie.imdbID] = el
          }}
        >
          <MovieCard movie={movie} />
        </Grid>
      ))}
      <div ref={observerRef} style={{ height: 1 }} />
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <CircularProgress />
        </Box>
      )}
    </Grid>
  )
}
