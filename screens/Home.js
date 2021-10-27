import React, { useState } from 'react'
import { useFonts } from 'expo-font'
import AppLoading from 'expo-app-loading'
import { COLORS } from '../constants'
import { Header, MainCategories, RestaurantList } from '../components/home'
import { StyleSheet, SafeAreaView, StatusBar, Platform } from 'react-native'
import {
  categoryData,
  initialCurrentLocation,
  restaurantData,
} from '../utils/dummyData'

const Home = ({ navigation }) => {
  const [categories, setCategories] = useState(categoryData)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [restaurants, setRestaurants] = useState(restaurantData)
  const [currentLocation, setCurrentLocation] = useState(initialCurrentLocation)
  const [fontsLoaded] = useFonts({
    'Roboto-Black': require('../assets/fonts/Roboto-Black.ttf'),
    'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
  })

  function handleSelectCategory(category) {
    const restaurantList = restaurantData.filter((item) =>
      item.categories.includes(category.id)
    )

    setRestaurants(restaurantList)

    setSelectedCategory(category)
  }

  return (
    <SafeAreaView style={styles.container}>
      {fontsLoaded ? (
        <>
          <Header currentLocation={currentLocation} />

          <MainCategories
            handleSelect={handleSelectCategory}
            categories={categories}
            selectedCategory={selectedCategory}
            styles={styles}
          />

          <RestaurantList
            categories={categories}
            restaurants={restaurants}
            styles={styles}
            currentLocation={currentLocation}
            navigation={navigation}
          />
        </>
      ) : (
        <AppLoading />
      )}
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
