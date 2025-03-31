import './App.css'
import MovieDetails from './pages/movie-details'
import { useMovieStore } from './store/movies.store'
import ThemeToggle from './theme/theme-toggle'
import { Box } from '@mui/material'
import { Outlet } from 'react-router'

function App() {
  const { activeMovie } = useMovieStore()

  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <ThemeToggle placement="fixed" />
      <Outlet context={{}} />
      {activeMovie?.imdbID && <MovieDetails />}
    </Box>
  )
}

export default App
