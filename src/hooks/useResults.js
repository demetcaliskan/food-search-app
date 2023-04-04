import { useState, useEffect } from 'react'
import yelp from '../api/yelp'

const useResults = () => {
  const [results, setResults] = useState([])
  const [errorMsg, setErrorMsg] = useState('')

  const searchApi = async (searchTerm) => {
    try {
      const response = await yelp.get('/search', {
        params: {
          term: searchTerm,
          location: 'san jose',
          limit: 50,
        },
      })
      setResults(response.data.businesses)
    } catch (error) {
      setErrorMsg('Something went wrong.')
    }
  }

  useEffect(() => {
    searchApi('pasta')
  }, [])

  return [searchApi, results, errorMsg]
}

export default useResults
