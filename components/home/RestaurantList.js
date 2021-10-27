import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native'
import { SIZES, COLORS, FONTS, icons } from '../../constants'

const RestaurantList = ({
  restaurants,
  styles,
  categories,
  currentLocation,
  navigation,
}) => {
  function getCategoryNameById(id) {
    const category = categories.filter((item) => item.id === id)

    return category.length > 0 ? category[0].name : ''
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{ marginBottom: SIZES.padding * 2 }}
      onPress={() =>
        navigation.navigate('Restaurant', { item, currentLocation })
      }
    >
      <View style={{ marginBottom: SIZES.padding }}>
        <Image
          source={item.photo}
          resizeMode="cover"
          style={{
            width: '100%',
            height: 200,
            borderRadius: SIZES.radius,
          }}
        />

        <View
          style={{
            position: 'absolute',
            bottom: 0,
            height: 50,
            width: SIZES.width * 0.3,
            backgroundColor: COLORS.white,
            borderTopRightRadius: SIZES.radius,
            borderBottomLeftRadius: SIZES.radius,
            alignItems: 'center',
            justifyContent: 'center',
            ...styles.shadow,
          }}
        >
          <Text style={{ ...FONTS.h4 }}>{item.duration}</Text>
        </View>
      </View>

      <Text style={{ ...FONTS.body2 }}>{item.name}</Text>

      <View style={{ marginTop: SIZES.padding, flexDirection: 'row' }}>
        <Image
          source={icons.star}
          style={{
            height: 20,
            width: 20,
            tintColor: COLORS.primary,
            marginRight: 10,
          }}
        />

        <Text style={{ ...FONTS.body3 }}>{item.rating}</Text>

        <View style={{ flexDirection: 'row', marginLeft: 10 }}>
          {item.categories.map((categoryId) => (
            <View key={categoryId} style={{ flexDirection: 'row' }}>
              <Text style={{ ...FONTS.body3 }}>
                {getCategoryNameById(categoryId)}
              </Text>

              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.darkGray,
                  marginTop: -3,
                }}
              >
                {' '}
                .{' '}
              </Text>
            </View>
          ))}

          {[1, 2, 3].map((priceRating) => (
            <Text
              key={priceRating}
              style={{
                ...FONTS.body3,
                color:
                  priceRating <= item.priceRating
                    ? COLORS.black
                    : COLORS.darkGray,
              }}
            >
              $
            </Text>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <FlatList
      data={restaurants}
      keyExtractor={(item) => `${item.id}`}
      renderItem={renderItem}
      contentContainerStyle={{
        paddingHorizontal: SIZES.padding * 2,
        paddingBottom: 30,
      }}
    ></FlatList>
  )
}

export default RestaurantList

const styles = StyleSheet.create({})
