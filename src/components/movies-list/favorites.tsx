import { Box, Typography, useTheme } from '@mui/material'
import { useMovieStore } from '../../store/movies.store'
import { MovieGrid } from './movies-grid'
import { useEffect, useRef } from 'react'

export const FavoritesList = () => {
  const theme = useTheme()
  const { getFavoriteList } = useMovieStore()
  const favorites = getFavoriteList()

  const movieRefs = useRef<Record<string, HTMLDivElement | null>>({})

  useEffect(() => {
    const fromMovieId = localStorage.getItem('fromMovieId')
    if (fromMovieId && movieRefs.current[fromMovieId]) {
      movieRefs.current[fromMovieId].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
      window.history.replaceState({}, '')
    }
  }, [])

  return (
    <Box>
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
        My Favorites
      </Typography>

      {favorites.length === 0 ? (
        <Typography color="text.secondary">
          You don’t have any favorite movies yet.
        </Typography>
      ) : (
        <MovieGrid
          movies={favorites}
          isLoading={false}
          isError={false}
          page={1}
          movieRefs={movieRefs}
        />
      )}
    </Box>
  )
}
