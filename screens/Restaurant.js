import React, { useState, useEffect } from 'react'
import { useFonts } from 'expo-font'
import AppLoading from 'expo-app-loading'
import { COLORS } from '../constants'
import { Header, FoodInfo, Order } from '../components/restaurants'
import {
  Animated,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native'

const Restaurant = ({ route, navigation }) => {
  const [restaurant, setRestaurant] = useState(null)
  const [currentLocation, setCurrentLocation] = useState(null)
  const [fontsLoaded] = useFonts({
    'Roboto-Black': require('../assets/fonts/Roboto-Black.ttf'),
    'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
  })

  const scrollX = new Animated.Value(0)

  useEffect(() => {
    const { item, currentLocation } = route.params

    setRestaurant(item)
    setCurrentLocation(currentLocation)
  }, [])

  return fontsLoaded ? (
    <SafeAreaView style={styles.container}>
      <Header restaurant={restaurant} navigation={navigation} />

      <FoodInfo restaurant={restaurant} scrollX={scrollX} />

      <Order restaurant={restaurant} scrollX={scrollX} />
    </SafeAreaView>
  ) : (
    <AppLoading />
  )
}

export default Restaurant

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
})
