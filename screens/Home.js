import React, { useState } from 'react'
import { useFonts } from 'expo-font'
import { icons, images, SIZES, COLORS, FONTS } from '../constants'
import { Header, MainCategories } from '../components/home'
import { StyleSheet, SafeAreaView, StatusBar, Platform } from 'react-native'
import {
  categoryData,
  initialCurrentLocation,
  restaurantData,
} from '../utils/dummyData'

const Home = () => {
  const [categories, setCategories] = useState(categoryData)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [restaurants, setRestaurants] = useState(restaurantData)
  const [currentLocation, setCurrentLocation] = useState(initialCurrentLocation)

  function handleSelectCategory(category) {
    const restaurantList = restaurantData.filter((item) =>
      item.categories.includes(category.id)
    )

    setRestaurants(restaurantList)

    setSelectedCategory(category)
  }

  let [fontsLoaded] = useFonts({
    'Roboto-Black': require('../assets/fonts/Roboto-Black.ttf'),
    'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
  })

  return (
    <SafeAreaView style={styles.container}>
      <Header currentLocation={currentLocation} fontsLoaded={fontsLoaded} />
      <MainCategories
        handleSelect={handleSelectCategory}
        categories={categories}
        selectedCategory={selectedCategory}
        styles={styles}
      />
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
})
