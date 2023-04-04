import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import SearchBar from '../components/SearchBar'
import yelp from '../api/yelp'

const SearchScreen = () => {
  const [term, setTerm] = useState('')
  const [results, setResults] = useState([])

  const searchApi = async () => {
    try {
      const response = await yelp.get('/search', {
        params: {
          term,
          location: 'san jose',
          limit: 50,
        },
      })
      setResults(response.data.businesses)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.backgroundStyle}>
      <Text>Search Screen</Text>
      <SearchBar term={term} onTermChange={setTerm} onTermSubmit={searchApi} />
      <Text>We have found {results.length} results</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: '#fff',
  },
})

export default SearchScreen
