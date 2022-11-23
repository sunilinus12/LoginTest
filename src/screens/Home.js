import {FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import LoadingComponent from '../components/LoadingComponent';
import {ItemCard} from '../components/ItemCard';
import {Base_URL, Header_Data} from '../config';

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    try {
      setLoading(true);

      let res = await axios.get(
        `${Base_URL}/data/v1/user?limit=10`,
        Header_Data,
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
    paddingBottom: 9,
  },
});
