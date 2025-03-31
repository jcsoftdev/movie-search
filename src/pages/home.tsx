import { useNavigate } from 'react-router'
import HeroSearch from '../components/hero-search'

const Home = () => {
  const navigate = useNavigate()
  return (
    <div>
      <HeroSearch
        onSearch={async (query) => {
          console.log('Search query:', query)
          await navigate(`/movies?q=${encodeURIComponent(query)}`)
        }}
      />
    </div>
  )
}

export default Home
