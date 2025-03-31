import {
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextField,
} from '@mui/material'
import { useState } from 'react'
import { useDebounce } from '../../hooks/use-debounce'

const MOVIE_TYPES = new Map<string, string>([
  ['_', 'All'],
  ['movie', 'Movie'],
  ['series', 'Series'],
])

const YEARS = new Map<string, string>([
  ['_', 'All'],
  ['2025', '2025'],
  ['2024', '2024'],
  ['2023', '2023'],
  ['2022', '2022'],
  ['2021', '2021'],
  ['2020', '2020'],
  ['2015', '2015'],
  ['2010', '2010'],
  ['2000', '2000'],
  ['1990', '1990'],
  ['1980', '1980'],
])

interface Props {
  year: string
  type: string
  query: string
  onChange: (key: string, value: string) => void
}

export const MovieFilters = ({ year, type, query, onChange }: Props) => {
  const [localQuery, setLocalQuery] = useState(query)
  const debouncedQuery = useDebounce(localQuery, 500)

  if (debouncedQuery !== query) {
    onChange('q', debouncedQuery)
  }

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
      <TextField
        label="Search"
        value={localQuery}
        onChange={(e) => {
          setLocalQuery(e.target.value)
        }}
        placeholder="Enter movie title..."
        sx={{ minWidth: 200 }}
      />

      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id="year-label">Year</InputLabel>
        <Select
          labelId="year-label"
          value={year || '_'}
          onChange={(e) => {
            onChange('year', e.target.value.replace(/_/g, ''))
          }}
          label="Year"
        >
          {[...YEARS.entries()].map(([value, label]) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id="type-label">Type</InputLabel>
        <Select
          labelId="type-label"
          value={type || '_'}
          onChange={(e) => {
            onChange('type', e.target.value.replace(/_/g, ''))
          }}
          label="Type"
        >
          {[...MOVIE_TYPES.entries()].map(([value, label]) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
