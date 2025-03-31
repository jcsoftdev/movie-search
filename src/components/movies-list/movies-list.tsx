import { Typography, Button, useTheme, Box } from '@mui/material'
import { useMoviesList } from '../../hooks/use-movies-list'
import { Link } from 'react-router'
import { MovieFilters } from './movies-filter'
import { MovieGrid } from './movies-grid'

export const MoviesList = () => {
  const theme = useTheme()
  const {
    search,
    year,
    type,
    movies,
    isLoading,
    isError,
    observerRef,
    movieRefs,
    reset,
    handleFilterChange,
  } = useMoviesList()

  return (
    <Box>
      <Button
        component={Link}
        to="/"
        sx={{ mb: 2 }}
        onClick={() => {
          reset()
        }}
        viewTransition
      >
        ← Back
      </Button>

      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        color={theme.palette.text.primary}
        sx={{
          fontSize: { xs: '1rem', sm: '1.5rem' },
          lineHeight: { xs: 1.2, sm: 1.5 },
          mb: 4,
        }}
      >
        Results for: "{search}"
      </Typography>

      <MovieFilters
        year={year}
        type={type}
        query={search}
        onChange={handleFilterChange}
      />

      <MovieGrid
        movies={movies}
        isLoading={isLoading}
        isError={isError}
        page={1}
        observerRef={observerRef}
        movieRefs={movieRefs}
      />
    </Box>
  )
}
