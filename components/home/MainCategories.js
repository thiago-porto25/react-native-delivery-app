import React from 'react'
import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
import { COLORS, FONTS, SIZES } from '../../constants'

const MainCategories = ({
  categories,
  selectedCategory,
  styles,
  handleSelect,
}) => {
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => handleSelect(item)}
        style={{
          padding: SIZES.padding,
          paddingBottom: SIZES.padding * 2,
          backgroundColor:
            selectedCategory?.id === item.id ? COLORS.primary : COLORS.white,
          borderRadius: SIZES.radius,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: SIZES.padding,
          ...styles.shadow,
        }}
      >
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor:
              selectedCategory?.id === item.id
                ? COLORS.white
                : COLORS.lightGray,
          }}
        >
          <Image
            source={item.icon}
            resizeMode="contain"
            style={{ width: 30, height: 30 }}
          />
        </View>

        <Text
          style={{
            marginTop: SIZES.padding,
            color:
              selectedCategory?.id === item.id ? COLORS.white : COLORS.black,
            ...FONTS.body5,
          }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={{ padding: SIZES.padding * 2 }}>
      <Text style={{ ...FONTS.h1 }}>Main</Text>
      <Text style={{ ...FONTS.h1 }}>Categories</Text>

      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
      ></FlatList>
    </View>
  )
}

export default MainCategories
