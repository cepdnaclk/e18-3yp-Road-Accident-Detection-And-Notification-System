import React, { useState} from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

const AmbulanceImg = require('../assets/icons/ambulance_3d_left.png')

function AmbulanceHome({navigation}) {

    const [origin, setOrigin] = useState({
        latitude: 7.91739,
        longitude: 79.85887,
    });

    const [destination, setDestination] = useState({
        latitude: 6.81739,
        longitude: 79.95887,
    });

    return (
        <View style={styles.container}>
            <View style={styles.topPanel}>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('Welcome')}
                    style={styles.back}>

                    <Ionicons name="md-chevron-back" size={35} color="#B5B5B5" />
                </TouchableOpacity>
            </View>
            <MapView 
                style={styles.map}
                initialRegion={{
                    latitude: origin.latitude,
                    longitude: origin.longitude,
                    latitudeDelta: 0.09,
                    longitudeDelta: 0.04,
                }}>

                <Marker 
                    coordinate={origin}
                    image={AmbulanceImg}/>
                {/* <Marker 
                    coordinate={destination}/> */}
            </MapView>
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
        height: '9%',
        width: '90%',
        backgroundColor: 'rgba(90, 93, 125, 0.8)',
        borderRadius: 15,
        top: StatusBar.currentHeight,
    },
    map: {
        width: '100%',
        height: '100%',
    },
})

export default AmbulanceHome;