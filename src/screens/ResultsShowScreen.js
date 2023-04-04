import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import yelp from '../api/yelp'

const ResultsShowScreen = ({ navigation }) => {
  const id = navigation.getParam('id')
  const [result, setResult] = useState(null)

  const getResult = async (id) => {
    try {
      const response = await yelp.get(`/${id}`)
      setResult(response.data)
      console.log(response.data.photos)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getResult(id)
  }, [])

  if (!result) {
    return null
  } else {
    return (
      <>
        <FlatList
          data={result.photos}
          keyExtractor={(photo) => photo}
          renderItem={({ item }) => (
            <Image style={styles.image} source={{ uri: item }} />
          )}
        />
      </>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 200,
  },
})

export default ResultsShowScreen
