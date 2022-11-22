import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import LoadingComponent from '../components/LoadingComponent';

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          'app-id': '6149ac924e29ce2338d6f836',
        },
      };
      let res = await axios.get(
        'https://dummyapi.io/data/v1/user?limit=10',
        config,
      );

      setData(res?.data?.data);
      setLoading(false);
    } catch (error) {}
  };
  useEffect(() => {
    getData();
  }, []);

  const dujm = [
    {
      id: '60d0fe4f5311236168a109ce',
      title: 'mr',
      firstName: 'Rudi',
      lastName: 'Droste',
      picture: 'https://randomuser.me/api/portraits/med/men/83.jpg',
    },
  ];
  const ItemCard = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
          height: 0.3 * Dimensions.get('screen').height,
          marginHorizontal: 4,
          marginVertical: 4,
          backgroundColor: 'white',
          padding: '4%',
          borderRadius: 3,
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            width: '100%',
            height: '69%',
          }}>
          <Image
            style={{
              flex: 1,
            }}
            source={{uri: item.picture}}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: 'black',

              fontSize: 12,
            }}>
            {item.title}. {item.firstName} {item.lastName}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 10,
            }}>
            {item.firstName}.{item.lastName}@example.com
          </Text>
        </View>
      </View>
    );
  };
  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <View style={styles.container}>
          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={data}
            keyExtractor={item => item.id}
            renderItem={({item}) => <ItemCard item={item} />}
          />
        </View>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    backgroundColor: 'pink',
  },
});
