import { ApiKey, ApiUrl } from '../constants'
import { httpRequest } from './httt-request'

const buildUrl = ({
  page,
  search,
  type,
  year,
  id,
}: {
  page: number
  search?: string
  type?: string
  year?: string
  id?: string
}) => {
  const url = new URL(ApiUrl)
  url.searchParams.append('page', page.toString())
  url.searchParams.append('apikey', ApiKey)
  if (search) url.searchParams.append('s', search.trim())
  if (type) url.searchParams.append('type', type)
  if (year) url.searchParams.append('y', year)
  if (id) url.searchParams.append('i', id)
  url.searchParams.append('plot', 'full')
  url.searchParams.append('r', 'json')
  return url.toString()
}

export interface ResponseMovies {
  Search: MovieSearch[]
  totalResults: string
  Response: string
}

export interface MovieSearch {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export const getMovies = async ({
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
  const res = await httpRequest.get<ResponseMovies>(
    buildUrl({
      page,
      search,
      type,
      year,
    })
  )
  return res
}

export interface ResponseMovieById {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: {
    Source: string
    Value: string
  }[]
  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: string
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
  Response: string
}

export const getMovieById = async ({ id }: { id?: string }) => {
  const res = await httpRequest.get<ResponseMovieById>(
    buildUrl({
      page: 1,
      id,
    })
  )
  return res
}
