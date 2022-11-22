import {FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import LoadingComponent from '../components/LoadingComponent';
import {ItemCard} from '../components/ItemCard';

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
