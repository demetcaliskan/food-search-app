import React, { useState } from 'react'
import { Text, StyleSheet } from 'react-native'
import SearchBar from '../components/SearchBar'
import useResults from '../hooks/useResults'
import ResultsList from '../components/ResultsList'
import { ScrollView } from 'react-native-gesture-handler'

const SearchScreen = () => {
  const [term, setTerm] = useState('')
  const [searchApi, results, errorMsg] = useResults()

  const filterResultsByPrice = (price) => {
    return results.filter((result) => {
      return result.price === price
    })
  }

  return (
    <>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => searchApi(term)}
      />
      {errorMsg?.length > 1 && <Text>{errorMsg}</Text>}
      <ScrollView>
        <ResultsList
          title='Cost Effective'
          results={filterResultsByPrice('$')}
        />
        <ResultsList title='Bit Pricier' results={filterResultsByPrice('$$')} />
        <ResultsList
          title='Big Spender'
          results={filterResultsByPrice('$$$')}
        />
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({})

export default SearchScreen
