import { create } from 'zustand'
import { persist, PersistOptions } from 'zustand/middleware'
import { MovieSearch } from '../services/movies'

type SearchKey = string

interface MovieState {
  movies: MovieSearch[]
  page: number
}

interface MovieStore {
  movieMap: Map<SearchKey, MovieState>
  favorites: Map<string, MovieSearch>
  activeMovie: MovieSearch | null
  setActiveMovie: (movie: MovieSearch | null) => void
  setMovies: (key: SearchKey, movies: MovieSearch[]) => void
  appendMovies: (key: SearchKey, newMovies: MovieSearch[]) => void
  getMovies: (key: SearchKey) => MovieState
  setPageForKey: (key: SearchKey, page: number) => void
  toggleFavorite: (movie: MovieSearch) => void
  isFavorite: (id: string) => boolean
  getFavoriteList: () => MovieSearch[]
  reset: () => void
}

type StoreWithPersist = MovieStore & {
  favorites: Map<string, MovieSearch>
}

export const useMovieStore = create<MovieStore>()(
  persist<MovieStore>(
    (set, get) => {
      const updateMap = (
        updater: (map: Map<SearchKey, MovieState>) => void
      ) => {
        const nextMap = new Map(get().movieMap)
        updater(nextMap)
        set({ movieMap: nextMap })
      }

      return {
        movieMap: new Map(),
        favorites: new Map(),
        activeMovie: null,

        setActiveMovie: (movie) => {
          set({ activeMovie: movie })
        },

        setMovies: (key, movies) => {
          updateMap((map) => {
            map.set(key, { movies, page: 1 })
          })
        },

        appendMovies: (key, newMovies) => {
          updateMap((map) => {
            const prev = map.get(key) ?? { movies: [], page: 1 }
            map.set(key, {
              movies: [...prev.movies, ...newMovies],
              page: prev.page,
            })
          })
        },

        setPageForKey: (key, page) => {
          updateMap((map) => {
            const prev = map.get(key) ?? { movies: [], page: 1 }
            map.set(key, { ...prev, page })
          })
        },

        getMovies: (key) => {
          return get().movieMap.get(key) ?? { movies: [], page: 1 }
        },

        toggleFavorite: (movie) => {
          const current = new Map(get().favorites)
          if (current.has(movie.imdbID)) {
            current.delete(movie.imdbID)
          } else {
            current.set(movie.imdbID, movie)
          }
          set({ favorites: current })
        },

        isFavorite: (id) => get().favorites.has(id),

        getFavoriteList: () => Array.from(get().favorites.values()),

        reset: () => {
          set((state) => ({
            movieMap: new Map(),
            favorites: state.favorites,
            activeMovie: null,
          }))
        },
      }
    },
    {
      name: 'movie-store',
      partialize: (state) => ({
        favorites: Array.from(state.favorites.entries()) as unknown as Map<
          string,
          MovieSearch
        >,
      }),
      merge: (persistedState, currentState) => {
        return {
          ...currentState,
          favorites: new Map<string, MovieSearch>(
            (persistedState as { favorites: [string, MovieSearch][] }).favorites
          ),
        }
      },
    } as PersistOptions<MovieStore, StoreWithPersist>
  )
)
