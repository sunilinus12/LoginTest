import {FlatList, Platform, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import LoadingComponent from '../components/LoadingComponent';
import {ItemCard} from '../components/ItemCard';
import {Base_URL, Header_Data} from '../config';
import SimpleToast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay';

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  const getData = async () => {
    try {
      setLoading(true);
      let res = await axios.get(
        `${Base_URL}/data/v1/user?page=${page}`,
        Header_Data,
      );
      if (res.status) {
        setData([...data, ...res?.data?.data]);
        setLoading(false);
      }
    } catch (error) {
      SimpleToast.show(error, SimpleToast.SHORT);
    }
  };

  useEffect(() => {
    if (page <= 4) {
      getData();
    }
  }, [page]);
  if (data.length === 0) {
    return <LoadingComponent />;
  }

  return (
    <>
      <View style={styles.container}>
        <Spinner visible={loading} />
        <FlatList
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (page <= 4) {
              setPage(page + 1);
            }
          }}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <ItemCard item={item} />}
        />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    paddingBottom: 9,
    paddingTop: Platform.OS === 'ios' ? '10%' : 0,
  },
});
