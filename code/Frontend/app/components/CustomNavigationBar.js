import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

function CustomNavigationBar(props) {
    return (
        <LinearGradient 
            style={styles.container}
            colors={['rgba(34, 35, 63, 0.2)', 'rgba(32, 32, 58, 0.2)']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}>

            <View style={styles.navIcons}>
                <TouchableOpacity 
                    onPress={() => { /* Todo */ }}
                    style={styles.back}>

                    <AntDesign name="home" size={27} color="rgba(154, 154, 162, 0.8)" />
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => { /* Todo */ }}
                    style={styles.back}>

                    <MaterialCommunityIcons name="account-outline" size={32} color="rgba(77, 83, 129, 0.8)" />
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: 55,
        zIndex: 30,
        backgroundColor: 'rgba(34, 35, 63, 1)',
        bottom: 0,
        paddingHorizontal: 25,
        paddingVertical: 10,
        // borderRadius: 15,
        // marginBottom: 5,
        // elevation: 8,
    },
    navIcons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    }
})

export default CustomNavigationBar;