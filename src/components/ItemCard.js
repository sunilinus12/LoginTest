import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
export function ItemCard({item}) {
  return (
    <View
      style={[
        styles.container,
        {height: 0.3 * Dimensions.get('screen').height},
      ]}>
      <View style={styles.img_wrap}>
        <Image
          style={styles.img}
          source={{uri: item.picture}}
          resizeMode="contain"
        />
      </View>
      <View style={styles.bottom_wrap}>
        <Text style={styles.title}>
          {item.title}. {item.firstName} {item.lastName}
        </Text>
        <Text numberOfLines={1} style={styles.email}>
          {item.firstName}.{item.lastName}@example.com
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 4,
    marginVertical: 4,
    backgroundColor: 'white',
    padding: '4%',
    borderRadius: 3,
    justifyContent: 'space-between',
  },
  img_wrap: {
    width: '100%',
    height: '69%',
  },
  img: {
    flex: 1,
  },
  bottom_wrap: {
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 12,
  },
  email: {
    fontSize: 10,
    color: 'gray',
    fontWeight: '400',
  },
});
