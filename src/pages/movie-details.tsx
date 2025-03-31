import {
  Box,
  Button,
  Container,
  Typography,
  CircularProgress,
  Dialog,
  Grow,
} from '@mui/material'
import { useQueryMovieById } from '../services/queries/movies'
import { useMemo } from 'react'
import { useMovieStore } from '../store/movies.store'
import { ResponseMovieById } from '../services/movies'
import { CloseRounded } from '@mui/icons-material'

const MovieDetails = () => {
  const { activeMovie, setActiveMovie } = useMovieStore()

  const { data } = useQueryMovieById({
    id: activeMovie?.imdbID,
  })

  const movie = useMemo(
    () => data ?? (activeMovie as unknown as ResponseMovieById),
    [data, activeMovie]
  )

  if (!data && !activeMovie) {
    return (
      <Dialog open disablePortal>
        <Container sx={{ py: 8, textAlign: 'center' }}>
          <CircularProgress />
        </Container>
      </Dialog>
    )
  }

  return (
    <Dialog
      open
      disablePortal
      transitionDuration={400}
      maxWidth="lg"
      fullWidth
      sx={{
        '& .MuiDialog-container': {
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          transition: 'all 0.4s ease-in-out',
        },
        '& .MuiContainer-root': {
          borderRadius: 2,
          p: {
            xs: 2,
            md: 4,
          },
        },
      }}
    >
      <Grow in timeout={400}>
        <Container
          sx={{ py: 6, display: 'flex', gap: 2, flexDirection: 'column' }}
        >
          <Button
            variant="outlined"
            sx={{
              justifySelf: 'flex-end',
              alignSelf: 'flex-end',
            }}
            onClick={() => {
              setActiveMovie(null)
              localStorage.setItem('fromMovieId', movie.imdbID)
            }}
          >
            <CloseRounded />
          </Button>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 4,
            }}
          >
            <Box
              component="img"
              src={movie.Poster !== 'N/A' ? movie.Poster : '/fallback.png'}
              alt={movie.Title}
              height={400}
              sx={{
                borderRadius: 2,
                maxWidth: '100%',
                objectFit: 'cover',
                boxShadow: (theme) => theme.shadows[4],
              }}
            />

            <Box>
              <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
                style={{}}
              >
                {movie.Title}
              </Typography>

              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                  color: 'text.secondary',
                  fontWeight: 500,
                  viewTransitionName: `movie-year-${movie.imdbID}`,
                }}
              >
                {movie.Year} {movie.Genre ? `· ${movie.Genre}` : ''}
              </Typography>

              {movie.Plot && (
                <Typography variant="body1" gutterBottom>
                  {movie.Plot}
                </Typography>
              )}

              {movie.Director && (
                <Typography variant="body2" color="text.secondary">
                  Director: {movie.Director}
                </Typography>
              )}
              {movie.Actors && (
                <Typography variant="body2" color="text.secondary">
                  Actores: {movie.Actors}
                </Typography>
              )}
              {movie.imdbRating && (
                <Typography variant="body2" color="text.secondary">
                  Calificación: {movie.imdbRating}
                </Typography>
              )}
            </Box>
          </Box>
        </Container>
      </Grow>
    </Dialog>
  )
}

export default MovieDetails
