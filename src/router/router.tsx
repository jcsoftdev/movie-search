import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router'
import App from '../App'
import Home from '../pages/home'
import MoviesResults from '../pages/movies-results'
import MovieDetails from '../pages/movie-details'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="movies" element={<MoviesResults />}>
        <Route path=":id" element={<MovieDetails />} />
      </Route>
    </Route>
  )
)

export default router
