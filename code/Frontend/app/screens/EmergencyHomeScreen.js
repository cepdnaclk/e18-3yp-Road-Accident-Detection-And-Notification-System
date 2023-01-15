import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SwipeButton } from 'react-native-expo-swipe-button';
import { MaterialIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

import { AuthContext } from '../context/AuthContext';

const AmbulanceImg = require('../assets/icons/ambulance_3d_left.png')
const PatientImg = require('../assets/icons/patient.png')

const mapStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#263c3f"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#6b9a76"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#38414e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#212a37"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9ca5b3"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#1f2835"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#f3d19c"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#2f3948"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#515c6d"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    }
  ]

function EmergencyHome({navigation}) {

    const [origin, setOrigin] = useState({
        latitude: 6.12646,
        longitude: 80.20395,
    });

    const [destination, setDestination] = useState({
        latitude: 6.13235,
        longitude: 80.21062,
    });

    const [fontsLoaded] = useFonts({
      'YanoneKaff': require('../assets/fonts/YanoneKaffeesatz-SemiBold.ttf')
    });

    const { GetAccidentLocation } = useContext(AuthContext);

    if (!fontsLoaded) {
      return null;
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.topPanel}>
                <Image style={{marginTop: 6}} source={require('../assets/img/LogoEmergency.png')} />
                <TouchableOpacity 
                    // onPress={() => navigation.navigate('Welcome')}
                    onPress={() => console.log('back-emergency')}
                    style={styles.back}>

                    <Ionicons name="md-chevron-back" size={35} color="#B5B5B5" />
                </TouchableOpacity>
            </View>
            <MapView 
                style={styles.map}
                customMapStyle={mapStyle}
                initialRegion={{
                    latitude: origin.latitude,
                    longitude: origin.longitude,
                    latitudeDelta: 0.09,
                    longitudeDelta: 0.04,
                }}>

                <Marker 
                    coordinate={origin}
                    image={AmbulanceImg}/>
                {/* {state == 1 && (
                  <Marker 
                  coordinate={destination}
                  image={PatientImg}/>
                )} */}
                
            </MapView>
            <View style={styles.bottom}>
              <SwipeButton
                Icon={
                  <MaterialIcons name="keyboard-arrow-right" size={50} color="white" />
                }
                height= {74}
                width= {280}
                circleSize={73}
                circleBackgroundColor='#2B2A46'
                onComplete={() => {console.log('Success!')}}
                containerStyle={{
                  backgroundColor: 'rgba(90, 93, 125, 0.8)',
                }}
                title="Slide to pick the patient"
                titleStyle={{ color: '#F4F4F4', fontFamily: 'YanoneKaff', fontSize: 18 }}
                borderRadius={180}
                underlayTitle="Release to complete"
                underlayTitleStyle={{ color: 'white', fontFamily: 'YanoneKaff', fontSize: 18 }}
              />
            </View>
            <ExpoStatusBar style='light'/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    topPanel: {
        position: 'absolute',
        zIndex: 10,
        height: '8%',
        width: '95%',
        backgroundColor: 'rgba(90, 93, 125, 0.55)',
        borderRadius: 15,
        top: StatusBar.currentHeight,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 8,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    bottom: {
      position: 'absolute',
      zIndex: 10,
      bottom: 100,
      // backgroundColor: '#000000',
    }
})

export default EmergencyHome;