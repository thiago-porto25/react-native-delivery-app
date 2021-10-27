import React from 'react'
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { icons, SIZES, COLORS, FONTS } from '../../constants'

const FoodInfo = ({ restaurant, scrollX, editOrder, getOrderQuantity }) => {
  return (
    <Animated.ScrollView
      horizontal
      pagingEnabled
      scrollEventThrottle={16}
      snapToAlignment="center"
      showsHorizontalScrollIndicator={false}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false }
      )}
    >
      {restaurant?.menu.map((item, idx) => (
        <View
          key={`${item}-${idx}`}
          style={{ alignItems: 'center', marginTop: 15 }}
        >
          <View style={{ height: SIZES.height * 0.35 }}>
            <Image
              source={item.photo}
              resizeMode="cover"
              style={{ width: SIZES.width, height: '100%' }}
            />

            <View
              style={{
                position: 'absolute',
                bottom: -20,
                width: SIZES.width,
                height: 50,
                justifyContent: 'center',
                flexDirection: 'row',
              }}
            >
              <TouchableOpacity
                onPress={() => editOrder('-', item.menuId, item.price)}
                style={{
                  width: 50,
                  backgroundColor: COLORS.white,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderTopLeftRadius: 25,
                  borderBottomLeftRadius: 25,
                }}
              >
                <Text style={{ ...FONTS.body1 }}>-</Text>
              </TouchableOpacity>

              <View
                style={{
                  width: 50,
                  backgroundColor: COLORS.white,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ ...FONTS.h2 }}>
                  {getOrderQuantity(item.menuId)}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => editOrder('+', item.menuId, item.price)}
                style={{
                  width: 50,
                  backgroundColor: COLORS.white,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderTopRightRadius: 25,
                  borderBottomRightRadius: 25,
                }}
              >
                <Text style={{ ...FONTS.body1 }}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              width: SIZES.width,
              alignItems: 'center',
              marginTop: 15,
              paddingHorizontal: SIZES.padding * 2,
            }}
          >
            <Text
              style={{ marginVertical: 10, textAlign: 'center', ...FONTS.h2 }}
            >
              {item.name} - ${item.price.toFixed(2)}
            </Text>
            <Text style={{ ...FONTS.body3 }}>{item.description}</Text>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Image
              source={icons.fire}
              style={{ width: 20, height: 20, marginRight: 10 }}
            />

            <Text style={{ ...FONTS.body3, color: COLORS.darkGray }}>
              {item.calories.toFixed(2)} cal
            </Text>
          </View>
        </View>
      ))}
    </Animated.ScrollView>
  )
}

export default FoodInfo
