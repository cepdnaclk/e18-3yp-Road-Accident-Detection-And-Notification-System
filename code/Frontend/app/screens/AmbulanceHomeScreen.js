import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity, Image, Animated, Text } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { SwipeButton } from 'react-native-expo-swipe-button';
import { MaterialIcons, Ionicons, FontAwesome, FontAwesome5, Octicons, Feather } from '@expo/vector-icons';
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

let paddingval = 8
let bgCol = 'rgba(90, 93, 125, 0.55)'

function AmbulanceHome({navigation}) {
  const { GetAccidentLocation, updateAmbLocation, accidentState } = useContext(AuthContext);
  
  const [origin, setOrigin] = useState({
    latitude: 6.12646,
    longitude: 80.20395,
  });
  
  const [destination, setDestination] = useState({
    latitude: 6.13235,
    longitude: 80.21062,
  });
  const [state, setState] = useState(0);

    const [boxHeight, setBoxHeight] = useState(new Animated.Value(60));
    const [expanded, setExpanded] = useState(false);

    const handlePress = () => {
      if (!expanded) {
        Animated.timing(boxHeight, {
          toValue: 170,
          duration: 300,
          useNativeDriver: false
        }).start();
      } else {
        Animated.timing(boxHeight, {
          toValue: 60,
          duration: 300,
          useNativeDriver: false
        }).start();
      }
      setExpanded(!expanded);
    }

    const [fontsLoaded] = useFonts({
      'YanoneKaff': require('../assets/fonts/YanoneKaffeesatz-SemiBold.ttf')
    });


    useEffect(() => {
      setTimeout(() => {
       setState(1);
      }, 10000);
    }, []);

    useEffect(() => {
      setInterval(() => {
        updateAmbLocation(13,16)
        GetAccidentLocation("154879")
      }, 3000);
    }, [])

    // useEffect(() => {
    //   updateAmbLocation(origin.latitude, origin.longitude)
    // }, [origin])

    useEffect(() => {
      console.log(accidentState);
      if (accidentState === 'Not Active') {
        
      } else if (accidentState === 'Active') {
        handlePress()
      } else if (accidentState === 'Assigned') {
        handlePress()
      }
    }, [accidentState])

    // useEffect(() => {
    //   setInterval(() => {
    //    console.log('1');
    //   }, 1000);
    // }, []);

    if (!fontsLoaded) {
      return null;
    }
    
    return (
        <View style={styles.container}>
            {/* <View style={styles.topPanel}> */}
            <Animated.View style={[styles.topPanel, {height: boxHeight, backgroundColor: expanded ? 'rgba(90, 93, 125, 0.9)' : 'rgba(90, 93, 125, 0.7)'}]}>
              {expanded ? (
                <View style={styles.patientCard}>
                  <View style={{width: '100%', height: '100%'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', width: '100%', height: '66%'}}>
                      <View style={{flexDirection: 'column', alignItems: 'center', width:85 , height: '100%', justifyContent: 'center'}}>
                        <View style={styles.profilePic}>
                          <Image style={{width: '100%', height: '100%', borderRadius: 15}} source={require('../assets/profPic/picture3.jpg')}/>
                        </View>
                        <View style={{backgroundColor: '#FF6161', borderRadius:10, height: 8, width: 66, marginTop: 5}}/>  
                      </View>
                      <View style={{flex: 1, height: '100%', flexDirection: 'column', justifyContent: 'space-evenly'}}>
                        <View style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}>
                          <View style={{justifyContent:'center', alignItems: 'center', width: 20, height: 20, marginHorizontal: 16}}>
                            <FontAwesome5 name="user-injured" size={15} color="#a9a9a9" />
                          </View>
                          <Text style={{fontFamily: 'YanoneKaff', fontSize: 21, color: '#E1E1E1', letterSpacing: 0.9}}>Firstname Lastname</Text>
                        </View>
                        <View style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}>
                          <View style={{justifyContent:'center', alignItems: 'center', width: 20, height: 20, marginHorizontal: 16}}>
                            <FontAwesome name="drivers-license-o" size={14} color="#a9a9a9" />
                          </View>
                          <Text style={{fontFamily: 'YanoneKaff', fontSize: 21, color: '#E1E1E1', letterSpacing: 0.9}}>NIC-number</Text>
                        </View>
                        <View style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}>
                          <View style={{justifyContent:'center', alignItems: 'center',  width: 20, height: 20, marginHorizontal: 16}}>
                            <Octicons name="number" size={17} color="#a9a9a9" />
                          </View>
                          <Text style={{fontFamily: 'YanoneKaff', fontSize: 21, color: '#E1E1E1', letterSpacing: 0.9}}>Plate-number</Text>
                        </View>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 8, paddingRight: 2, width: '100%', height: '27%', marginTop: '3%'}}>
                      <View>
                        <Text style={{fontFamily: 'YanoneKaff', fontSize: 20, color: '#C2C2C2', marginTop: 5}}>13 min (9.5 km)</Text>
                      </View>
                      <View style={{flexDirection: 'row', width: 97, justifyContent: 'space-between'}}>
                        <TouchableOpacity 
                          // onPress={() => navigation.navigate('Welcome')}
                          onPress={handlePress}
                          style={{height: '100%', width: 46, borderRadius: 10, backgroundColor: '#2D2B4B', justifyContent: 'center', alignItems: 'center'}}>
                          <Feather name="phone-call" size={21} color="#B5B5B5" />
                        </TouchableOpacity>
                        <TouchableOpacity 
                          // onPress={() => navigation.navigate('Welcome')}
                          onPress={handlePress}
                          style={{height: '100%', width: 46, borderRadius: 10, backgroundColor: '#2D2B4B', justifyContent: 'center', alignItems: 'center'}}>
                          <FontAwesome5 name="sync" size={21} color="#B5B5B5" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              ) : (
                <>
                  <Image style={{marginTop: 6}} source={require('../assets/img/LogoAmbulance.png')} />
                  <TouchableOpacity 
                      // onPress={() => navigation.navigate('Welcome')}
                      onPress={handlePress}
                      style={styles.back}>

                      <Ionicons name="md-chevron-back" size={35} color="#B5B5B5" />
                  </TouchableOpacity>
                </>
              )}
            </Animated.View>
            {/* </View> */}
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
            <View style={styles.bottom}>
              {/* <SwipeButton
                Icon={
                  <MaterialIcons name="keyboard-arrow-right" size={50} color="white" />
                }
                height= {74}
                width= {280}
                circleSize={73}
                circleBackgroundColor='#2B2A46'
                onComplete={() => {console.log('Success!'); handlePress()}}
                containerStyle={{
                  backgroundColor: 'rgba(90, 93, 125, 0.8)',
                  alignItems: 'center',
                }}
                title="Slide to pick the patient"
                titleStyle={{ color: '#F4F4F4', fontFamily: 'YanoneKaff', fontSize: 18, textAlign: 'center' }}
                borderRadius={180}
                underlayTitle="Release to complete"
                underlayTitleStyle={{ color: 'white', fontFamily: 'YanoneKaff', fontSize: 18 }}
              /> */}
              {accidentState === 'Active' ? (
                <SwipeButton
                  Icon={
                    <MaterialIcons name="keyboard-arrow-right" size={50} color="white" />
                  }
                  width= {280}
                  // circleSize={60}
                  goBackToStart={false}
                  completeThresholdPercentage={50}
                  onComplete={() => {
                    console.log('Success!'); 
                    setOrigin({
                      latitude: origin.latitude + 1,
                      longitude: origin.longitude + 1
                    })}}
                  title="Slide to pick the patient"
                  titleStyle={{color: '#F4F4F4', fontFamily: 'YanoneKaff', fontSize: 18}}
                  titleContainerStyle={{marginLeft: 'auto', width: '90%'}}
                  borderRadius={180}
                  containerStyle={{ backgroundColor: 'rgba(90, 93, 125, 0.8)' }}
                  underlayStyle={{backgroundColor: 'rgba(90, 93, 125, 1)'}}
                  underlayTitle="Slide to complete the Job"
                  underlayTitleStyle={{ color: 'white', fontFamily: 'YanoneKaff', fontSize: 18}}
                  underlayTitleContainerStyle={{width: '80%'}}
                  circleBackgroundColor='#2B2A46'
                />
              ) : (
                null
              )}
              
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
        width: '92%',
        borderRadius: 15,
        top: StatusBar.currentHeight,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: paddingval,
    },
    patientCard: {
        margin: 4,
        borderRadius: 15,
        height: '100%',
        width: '100%',
        // backgroundColor: 'red',
        paddingHorizontal: '9%',
        paddingVertical: '3%',
        paddingTop: '5%'
    },
    profilePic: {
        height: 70,
        width: 70,
        backgroundColor: 'rgba(90, 93, 125, 0.9)',
        borderRadius: 15
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

export default AmbulanceHome;