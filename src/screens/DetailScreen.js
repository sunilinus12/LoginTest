import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import LoadingComponent from '../components/LoadingComponent';
import axios from 'axios';
import {handleDate} from '../utils/customfunctions';
import {Base_URL, Header_Data} from '../config';

export default function DetailScreen({route}) {
  const [selecteddata, setSelectedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getDetail = async id => {
    try {
      setLoading(true);

      let res = await axios.get(`${Base_URL}/data/v1/user/${id}`, Header_Data);

      setSelectedData(res?.data);
      setLoading(false);
    } catch (error) {}
  };
  useEffect(() => {
    const {id} = route?.params;
    getDetail(id);
  }, []);
  if (loading || selecteddata.length === 0) {
    return <LoadingComponent />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.icon_wrap}>
        <Image
          style={{
            width: '60%',
            height: '100%',
          }}
          resizeMode="contain"
          source={{uri: selecteddata?.picture}}
        />
      </View>
      <View style={styles.inner_container}>
        <Text>{selecteddata?.id}</Text>
        <Text style={[styles.boldTitle, {fontSize: 18}]}>
          {selecteddata?.title}. {selecteddata?.firstName}{' '}
          {selecteddata?.lastName}
        </Text>
        <Text style={[styles.boldTitle, {marginTop: '2%'}]}>
          Gender:{' '}
          <Text style={[styles.title, {textTransform: 'capitalize'}]}>
            {selecteddata.gender}
          </Text>
        </Text>
        <Text style={styles.boldTitle}>
          Date Of Birth:{' '}
          <Text style={styles.title}>
            {handleDate(selecteddata.dateOfBirth)}
          </Text>
        </Text>
        <Text style={styles.boldTitle}>
          Register Date:{' '}
          <Text style={styles.title}>
            {handleDate(selecteddata.registerDate)}
          </Text>
        </Text>
        <Text style={[styles.boldTitle, {marginTop: '4%'}]}>
          Email:{' '}
          <Text style={styles.title}>
            {selecteddata.firstName}.{selecteddata.lastName}@example.com
          </Text>
        </Text>
        <Text style={styles.boldTitle}>
          Phone : <Text style={styles.title}>{selecteddata.phone}</Text>
        </Text>
        <Text style={[styles.boldTitle, {marginTop: '4%'}]}>Address</Text>
        <Text style={styles.title}>
          {selecteddata.location.country}, {selecteddata.location.state},{' '}
          {selecteddata.location.city}
        </Text>
        <Text style={styles.title}>{selecteddata.location.street}</Text>
        <View style={styles.wrap_map}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'ios' ? '10%' : 0,
  },
  icon_wrap: {
    flex: 0.3,
    alignItems: 'center',
    padding: '5%',
  },
  inner_container: {
    flex: 0.7,
    paddingHorizontal: '5%',
    paddingBottom: '1.5%',
  },
  boldTitle: {
    fontWeight: 'bold',
    color: 'black',
  },
  title: {
    fontWeight: '400',
    color: 'black',
  },
  wrap_map: {
    flex: 1,
  },
});
