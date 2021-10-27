import React from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import { icons, SIZES, COLORS, FONTS } from '../../constants'

const Header = ({ restaurant, navigation }) => {
  return (
    <View style={{ flexDirection: 'row', height: 50 }}>
      <TouchableOpacity
        style={{
          width: 50,
          paddingLeft: SIZES.padding * 2,
          justifyContent: 'center',
        }}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={icons.back}
          resizeMode="contain"
          style={{ width: 30, height: 30 }}
        />
      </TouchableOpacity>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View
          style={{
            height: 50,
            backgroundColor: COLORS.lightGray3,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: SIZES.radius,
            paddingHorizontal: SIZES.padding * 3,
          }}
        >
          <Text style={{ ...FONTS.h3 }}>{restaurant?.name}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={{
          width: 50,
          paddingRight: SIZES.padding * 2,
          justifyContent: 'center',
        }}
      >
        <Image
          source={icons.list}
          resizeMode="contain"
          style={{ width: 30, height: 30 }}
        />
      </TouchableOpacity>
    </View>
  )
}

export default Header
