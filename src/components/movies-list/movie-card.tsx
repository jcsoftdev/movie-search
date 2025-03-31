import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  useTheme,
  IconButton,
  Tooltip,
} from '@mui/material'
import { Favorite, FavoriteBorder } from '@mui/icons-material'
import { useMovieStore } from '../../store/movies.store'

interface Props {
  movie: {
    Title: string
    Year: string
    Poster: string
    imdbID: string
    Type: string
  }
}

export const MovieCard = ({ movie }: Readonly<Props>) => {
  const theme = useTheme()
  const { isFavorite, toggleFavorite, setActiveMovie } = useMovieStore()
  const isFav = isFavorite(movie.imdbID)

  const handleOpen = () => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setActiveMovie(movie)
      })
    } else {
      setActiveMovie(movie)
    }
  }

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleFavorite(movie)
  }

  return (
    <Card
      sx={{
        position: 'relative',
        textDecoration: 'none',
        color: theme.palette.text.primary,
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      onClick={handleOpen}
    >
      <Tooltip title={isFav ? 'Remove from favorites' : 'Add to favorites'}>
        <IconButton
          onClick={handleFavoriteToggle}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: theme.palette.background.paper,
            zIndex: 1,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          }}
        >
          {isFav ? <Favorite color="error" /> : <FavoriteBorder />}
        </IconButton>
      </Tooltip>

      <CardMedia
        component="img"
        image={movie.Poster !== 'N/A' ? movie.Poster : '/fallback.png'}
        alt={movie.Title}
        sx={{
          height: { xs: 500, sm: 350 },
          objectFit: 'cover',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        }}
      />
      <CardContent>
        <Typography variant="subtitle1" fontWeight={600}>
          {movie.Title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.Year}
        </Typography>
      </CardContent>
    </Card>
  )
}
