import { memo, useEffect, useState } from 'react'
import { Tabs, Tab, Box, Container } from '@mui/material'
import MoviesList from '../components/movies-list'
import { FavoritesList } from '../components/movies-list/favorites'
import { Outlet, useSearchParams } from 'react-router'

const TabSwitcher = memo(() => {
  const [searchParams, setSearchParams] = useSearchParams()

  const tabParam = searchParams.get('tab')
  const initialTab = tabParam === 'favorites' ? 1 : 0

  const [activeTab, setActiveTab] = useState(initialTab)

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    const newParams = new URLSearchParams(searchParams.toString())
    newParams.set('tab', newValue === 1 ? 'favorites' : 'search')
    setSearchParams(newParams)
    setActiveTab(newValue)
  }

  console.log({ activeTab, initialTab, tabParam })

  useEffect(() => {
    setActiveTab(initialTab)
  }, [initialTab, tabParam])

  return (
    <Container>
      <Tabs
        value={activeTab}
        onChange={handleChange}
        aria-label="Movie tabs"
        sx={{ mb: 4, pl: 2 }}
      >
        <Tab label="Search Results" />
        <Tab label="Favorites" />
      </Tabs>
      <Box hidden={activeTab !== 0}>{activeTab === 0 && <MoviesList />}</Box>
      <Box hidden={activeTab !== 1}>{activeTab === 1 && <FavoritesList />}</Box>
    </Container>
  )
})

const MoviesResults = () => {
  return (
    <>
      <TabSwitcher />
      <Outlet />
    </>
  )
}

export default MoviesResults
