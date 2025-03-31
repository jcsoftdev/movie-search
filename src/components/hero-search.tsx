import { Box, Button, Container, TextField, Typography } from '@mui/material'
import { useMemo, useState } from 'react'
import { useQueryMovies } from '../services/queries/movies'
import { useTheme } from '@mui/material/styles'

const searchTerms = ['love', 'hello', 'when']

const HeroSearch = ({
  onSearch,
}: {
  onSearch: (query: string) => Promise<void>
}) => {
  const [query, setQuery] = useState('')
  const theme = useTheme()
  const randomTerm = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * searchTerms.length)
    return searchTerms[randomIndex]
  }, [])

  const { data } = useQueryMovies({
    page: 1,
    search: randomTerm,
  })

  const filteredPosters = useMemo(() => {
    return (
      data?.Search.filter((movie) => movie.Poster && movie.Poster !== 'N/A') ??
      []
    )
  }, [data])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      void onSearch(query)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: '100%',
        left: 0,
        top: 0,
        right: 0,
        backgroundColor: theme.palette.background.default,
        background: `url(https://images.pexels.com/photos/2335048/pexels-photo-2335048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1) no-repeat center center`,
        backgroundSize: 'cover',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        zIndex: 0,
        position: 'relative',
      }}
    >
      <Box
        sx={{
          backgroundColor: theme.palette.background.default + '22',
          position: 'absolute',
          inset: 0,
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          zIndex: -1,
        }}
      />
      <Container
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          borderRadius: 2,
          height: {
            xs: '100vh',
            md: '90vh',
          },
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gridTemplateRows: 'repeat(2, auto)',
            gap: 0,
            width: '100%',
            maxWidth: '1200px',
            position: 'absolute',
          }}
        >
          {filteredPosters.slice(0, 8).map((movie) => (
            <Box
              key={movie.imdbID}
              component="img"
              src={movie.Poster}
              alt={movie.Title}
              sx={{
                width: '100%',
                height: '100%',
                boxShadow: theme.shadows[4],
                objectFit: 'cover',
              }}
            />
          ))}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            padding: {
              xs: 2,
              sm: 4,
              md: 6,
            },
            borderRadius: 2,
            backdropFilter: 'blur(8px)',
            backgroundColor: `${theme.palette.background.paper}cc`,
            WebkitBackdropFilter: 'blur(8px)',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              zIndex: 1,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold',
                color: theme.palette.text.primary,
                mb: 2,
              }}
            >
              Find your favorite movies
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'stretch',
                gap: 1,
                borderRadius: 4,
                p: 1,
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <TextField
                variant="outlined"
                placeholder="Search for a movie..."
                size="small"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                }}
                sx={{
                  input: {
                    color: theme.palette.text.primary,
                    fontWeight: 500,
                  },
                  '& .MuiOutlinedInput-root': {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    '& fieldset': { border: 'none' },
                  },
                  width: { xs: '200px', sm: '300px', md: '400px' },
                }}
              />

              <Button
                variant="contained"
                type="submit"
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  fontWeight: 'bold',
                  px: 3,
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                  },
                }}
              >
                Search
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default HeroSearch
