import { useEffect, useMemo, useRef, useCallback } from 'react'
import { useSearchParams } from 'react-router'
import { useInfiniteScroll } from './use-infinite-scroll'
import { useMovieStore } from '../store/movies.store'
import { useQueryMovies } from '../services/queries/movies'

export const useMoviesList = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('q') ?? ''
  const year = searchParams.get('year') ?? ''
  const type = searchParams.get('type') ?? ''

  const queryKey = useMemo(
    () => `${search}-${year}-${type}`,
    [search, year, type]
  )

  const { getMovies, setMovies, appendMovies, setPageForKey, reset } =
    useMovieStore()
  const { movies, page } = getMovies(queryKey)
  const { data, isLoading, isError } = useQueryMovies({
    search,
    year,
    type,
    page,
  })

  const movieRefs = useRef<Record<string, HTMLDivElement | null>>({})

  useEffect(() => {
    if (!data?.Search) return

    const existingIds = new Set(movies.map((m) => m.imdbID))
    const newMovies = data.Search.filter((m) => !existingIds.has(m.imdbID))

    if (page === 1) {
      setMovies(queryKey, data.Search)
    } else if (newMovies.length > 0) {
      appendMovies(queryKey, newMovies)
    }
  }, [appendMovies, data, movies, page, queryKey, setMovies])

  const handleLoadMore = useCallback(() => {
    const totalResults = Number(data?.totalResults ?? 0)
    if (movies.length < totalResults) {
      setPageForKey(queryKey, page + 1)
    }
  }, [data?.totalResults, movies.length, queryKey, page, setPageForKey])

  const { observerRef } = useInfiniteScroll({
    canLoadMore:
      Boolean(data?.totalResults) && movies.length < Number(data?.totalResults),
    isLoading,
    onLoadMore: handleLoadMore,
  })

  useEffect(() => {
    const fromMovieId = localStorage.getItem('fromMovieId')
    if (fromMovieId && movieRefs.current[fromMovieId]) {
      movieRefs.current[fromMovieId].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
      localStorage.removeItem('fromMovieId')
      window.history.replaceState({}, '')
    }
  }, [])

  const handleFilterChange = (key: string, value: string) => {
    const nextParams = new URLSearchParams(searchParams)
    if (value) {
      nextParams.set(key, value)
    } else {
      nextParams.delete(key)
    }
    setSearchParams(nextParams)
  }

  return {
    search,
    year,
    type,
    movies,
    isLoading,
    isError,
    observerRef,
    movieRefs,
    reset,
    setSearchParams,
    handleFilterChange,
  }
}
