import { useQuery } from '@tanstack/react-query'

import { getMovieById, getMovies } from '../movies'
export const useQueryMovies = ({
  page,
  search,
  type,
  year,
}: {
  page: number
  search?: string
  type?: string
  year?: string
}) => {
  return useQuery({
    queryKey: ['movies', page, search, type, year],
    queryFn: () =>
      getMovies({
        page,
        search,
        type,
        year,
      }),
  })
}

export const useQueryMovieById = ({ id }: { id?: string }) => {
  return useQuery({
    queryKey: ['movie', id],
    queryFn: () =>
      getMovieById({
        id,
      }),
    enabled: !!id,
  })
}
