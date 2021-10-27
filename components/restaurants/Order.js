import React from 'react'
import { View, Animated, Text, Image, TouchableOpacity } from 'react-native'
import { COLORS, FONTS, icons, SIZES } from '../../constants'
import { isIphoneX } from 'react-native-iphone-x-helper'

const Order = ({ restaurant, scrollX }) => {
  function renderDots() {
    const dotPosition = Animated.divide(scrollX, SIZES.width)

    return (
      <View style={{ height: 30 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: SIZES.padding,
          }}
        >
          {restaurant?.menu.map((item, idx) => {
            const opacity = dotPosition.interpolate({
              inputRange: [idx - 1, idx, idx + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            })

            const dotSize = dotPosition.interpolate({
              inputRange: [idx - 1, idx, idx + 1],
              outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
              extrapolate: 'clamp',
            })

            const dotColor = dotPosition.interpolate({
              inputRange: [idx - 1, idx, idx + 1],
              outputRange: [COLORS.darkGray, COLORS.primary, COLORS.darkGray],
              extrapolate: 'clamp',
            })

            return (
              <Animated.View
                key={`dot-${idx}`}
                opacity={opacity}
                style={{
                  borderRadius: SIZES.radius,
                  marginHorizontal: 6,
                  width: dotSize,
                  height: dotSize,
                  backgroundColor: dotColor,
                }}
              />
            )
          })}
        </View>
      </View>
    )
  }

  return (
    <View>
      {renderDots()}

      <View
        style={{
          backgroundColor: COLORS.white,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: SIZES.padding * 2,
            paddingHorizontal: SIZES.padding * 3,
            borderBottomColor: COLORS.lightGray2,
            borderBottomWidth: 1,
          }}
        >
          <Text style={{ ...FONTS.h3 }}>Items in Cart</Text>
          <Text style={{ ...FONTS.h3 }}>$45</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: SIZES.padding * 2,
            paddingHorizontal: SIZES.padding * 3,
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={icons.pin}
              resizeMode="contain"
              style={{ width: 20, height: 20, tintColor: COLORS.darkGray }}
            />

            <Text style={{ ...FONTS.h4, marginLeft: SIZES.padding }}>
              Location
            </Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Image
              source={icons.mastercard}
              resizeMode="contain"
              style={{ width: 20, height: 20, tintColor: COLORS.darkGray }}
            />

            <Text style={{ ...FONTS.h4, marginLeft: SIZES.padding }}>0000</Text>
          </View>
        </View>

        <View
          style={{
            padding: SIZES.padding * 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TouchableOpacity
            style={{
              width: SIZES.width * 0.9,
              padding: SIZES.padding,
              backgroundColor: COLORS.primary,
              alignItems: 'center',
              borderRadius: SIZES.radius,
            }}
          >
            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Order</Text>
          </TouchableOpacity>
        </View>
      </View>

      {isIphoneX() && (
        <View
          style={{
            position: 'absolute',
            bottom: -34,
            right: 0,
            left: 0,
            height: 34,
            backgroundColor: COLORS.white,
          }}
        ></View>
      )}
    </View>
  )
}

export default Order
