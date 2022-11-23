import {
  Dimensions,
  Image,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import React, {useEffect, useState} from 'react';
import LoadingComponent from '../components/LoadingComponent';
import axios from 'axios';
import {handleDate, regionFrom} from '../utils/customfunctions';
import {Base_URL, Header_Data} from '../config';
import MapView, {Marker} from 'react-native-maps';

export default function DetailScreen({route}) {
  const [selecteddata, setSelectedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(false);

  const [mapRegion, setMapRegion] = useState({
    latitude: 37.421998333333335,
    longitude: -122.084,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
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

  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            setMapRegion(
              regionFrom(
                position?.coords?.latitude,
                position?.coords?.longitude,
                position?.coords?.accuracy,
              ),
            );
          },
          error => {
            console.log(error.code, error.message);
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
  };
  useEffect(() => {
    getLocation();
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

        <MapView style={styles.map} region={mapRegion}>
          <Marker coordinate={mapRegion} title={'marker'} />
        </MapView>
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
    flex: 0.25,
    alignItems: 'center',
    padding: '5%',
  },
  inner_container: {
    flex: 0.7,
    paddingHorizontal: '5%',
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
  map: {
    flex: 1,
  },
});

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === 'granted') {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};
