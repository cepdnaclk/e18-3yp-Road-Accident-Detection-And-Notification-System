import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import CustomNavigationBar from '../components/CustomNavigationBar';
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

// const mapStyle = [
//     {
//       "elementType": "geometry",
//       "stylers": [
//         {
//           "color": "#212121"
//         }
//       ]
//     },
//     {
//       "elementType": "labels.icon",
//       "stylers": [
//         {
//           "visibility": "off"
//         }
//       ]
//     },
//     {
//       "elementType": "labels.text.fill",
//       "stylers": [
//         {
//           "color": "#757575"
//         }
//       ]
//     },
//     {
//       "elementType": "labels.text.stroke",
//       "stylers": [
//         {
//           "color": "#212121"
//         }
//       ]
//     },
//     {
//       "featureType": "administrative",
//       "elementType": "geometry",
//       "stylers": [
//         {
//           "color": "#757575"
//         }
//       ]
//     },
//     {
//       "featureType": "administrative.country",
//       "elementType": "labels.text.fill",
//       "stylers": [
//         {
//           "color": "#9e9e9e"
//         }
//       ]
//     },
//     {
//       "featureType": "administrative.land_parcel",
//       "stylers": [
//         {
//           "visibility": "off"
//         }
//       ]
//     },
//     {
//       "featureType": "administrative.locality",
//       "elementType": "labels.text.fill",
//       "stylers": [
//         {
//           "color": "#bdbdbd"
//         }
//       ]
//     },
//     {
//       "featureType": "poi",
//       "elementType": "labels.text.fill",
//       "stylers": [
//         {
//           "color": "#757575"
//         }
//       ]
//     },
//     {
//       "featureType": "poi.park",
//       "elementType": "geometry",
//       "stylers": [
//         {
//           "color": "#181818"
//         }
//       ]
//     },
//     {
//       "featureType": "poi.park",
//       "elementType": "labels.text.fill",
//       "stylers": [
//         {
//           "color": "#616161"
//         }
//       ]
//     },
//     {
//       "featureType": "poi.park",
//       "elementType": "labels.text.stroke",
//       "stylers": [
//         {
//           "color": "#1b1b1b"
//         }
//       ]
//     },
//     {
//       "featureType": "road",
//       "elementType": "geometry.fill",
//       "stylers": [
//         {
//           "color": "#2c2c2c"
//         }
//       ]
//     },
//     {
//       "featureType": "road",
//       "elementType": "labels.text.fill",
//       "stylers": [
//         {
//           "color": "#8a8a8a"
//         }
//       ]
//     },
//     {
//       "featureType": "road.arterial",
//       "elementType": "geometry",
//       "stylers": [
//         {
//           "color": "#373737"
//         }
//       ]
//     },
//     {
//       "featureType": "road.highway",
//       "elementType": "geometry",
//       "stylers": [
//         {
//           "color": "#3c3c3c"
//         }
//       ]
//     },
//     {
//       "featureType": "road.highway.controlled_access",
//       "elementType": "geometry",
//       "stylers": [
//         {
//           "color": "#4e4e4e"
//         }
//       ]
//     },
//     {
//       "featureType": "road.local",
//       "elementType": "labels.text.fill",
//       "stylers": [
//         {
//           "color": "#616161"
//         }
//       ]
//     },
//     {
//       "featureType": "transit",
//       "elementType": "labels.text.fill",
//       "stylers": [
//         {
//           "color": "#757575"
//         }
//       ]
//     },
//     {
//       "featureType": "water",
//       "elementType": "geometry",
//       "stylers": [
//         {
//           "color": "#000000"
//         }
//       ]
//     },
//     {
//       "featureType": "water",
//       "elementType": "labels.text.fill",
//       "stylers": [
//         {
//           "color": "#3d3d3d"
//         }
//       ]
//     }
//   ]

function AmbulanceHome({navigation}) {

    const [origin, setOrigin] = useState({
        latitude: 6.12646,
        longitude: 80.20395,
    });

    const [destination, setDestination] = useState({
        latitude: 6.13235,
        longitude: 80.21062,
    });
    const [state, setState] = useState(0);

    const { GetAccidentLocation } = useContext(AuthContext);

    useEffect(() => {
      setTimeout(() => {
       setState(1);
      }, 10000);
    }, []);
    
    return (
        <View style={styles.container}>
            <View style={styles.topPanel}>
                <Image style={{marginTop: 6}} source={require('../assets/img/LogoAmbulance.png')} />
                <TouchableOpacity 
                    onPress={() => navigation.navigate('Welcome')}
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
                {state == 1 && (
                  <Marker 
                  coordinate={destination}
                  image={PatientImg}/>
                )}
                
            </MapView>
            <CustomNavigationBar />
            <ExpoStatusBar style='dark'/>
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
        backgroundColor: 'rgba(90, 93, 125, 0.3)',
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
})

export default AmbulanceHome;