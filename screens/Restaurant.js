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
  const [orderItems, setOrderItems] = useState([])
  const [fontsLoaded] = useFonts({
    'Roboto-Black': require('../assets/fonts/Roboto-Black.ttf'),
    'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
  })

  const scrollX = new Animated.Value(0)

  function editOrder(action, menuId, price) {
    const orderList = orderItems.slice()
    const item = orderList.filter((item) => item.menuId === menuId)

    if (action === '+') {
      if (item.length > 0) {
        const newQuantity = item[0].quantity + 1
        item[0].quantity = newQuantity
        item[0].total = item[0].quantity * price
      } else {
        const newItem = {
          menuId,
          quantity: 1,
          price,
          total: price,
        }

        orderList.push(newItem)
      }
    } else {
      if (item.length > 0) {
        if (item[0]?.quantity > 0) {
          const newQuantity = item[0].quantity - 1
          item[0].quantity = newQuantity
          item[0].total = item[0].quantity * price
        }
      }
    }

    setOrderItems(orderList)
  }

  function getOrderQuantity(menuId) {
    const orderItem = orderItems.filter((item) => item.menuId === menuId)

    return orderItem.length > 0 ? orderItem[0].quantity : 0
  }

  function getBasketItemCount() {
    return orderItems.reduce((a, b) => a + (b.quantity || 0), 0)
  }

  function sumOrder() {
    return orderItems.reduce((a, b) => a + (b.total || 0), 0).toFixed(2)
  }

  useEffect(() => {
    const { item, currentLocation } = route.params

    setRestaurant(item)
    setCurrentLocation(currentLocation)
  }, [])

  return fontsLoaded ? (
    <SafeAreaView style={styles.container}>
      <Header restaurant={restaurant} navigation={navigation} />

      <FoodInfo
        restaurant={restaurant}
        scrollX={scrollX}
        editOrder={editOrder}
        getOrderQuantity={getOrderQuantity}
      />

      <Order
        restaurant={restaurant}
        scrollX={scrollX}
        getBasketItemCount={getBasketItemCount}
        sumOrder={sumOrder}
        navigation={navigation}
        currentLocation={currentLocation}
      />
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
