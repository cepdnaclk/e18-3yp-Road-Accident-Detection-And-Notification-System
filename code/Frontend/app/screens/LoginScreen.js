import React from 'react';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { ImageBackground, Image, StyleSheet, View, StatusBar, TouchableOpacity } from 'react-native';
// import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';

const LoginScreen = ({navigation}) => {
    const [fontsLoaded] = useFonts({
        'Poppins': require('../assets/fonts/Poppins-Medium.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/img/Background.png')} style={styles.image}>
                <View style={styles.welcomeLogo}>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('Welcome')}
                        style={styles.back}>

                        <Ionicons name="md-chevron-back" size={35} color="#B5B5B5" />
                        {/* <Ionicons name="md-arrow-back-outline" size={30} color="#B5B5B5" /> */}
                    </TouchableOpacity>
                    <Image source={require('../assets/img/LogoLogin.png')} />
                </View>
                
                <View style={styles.bottom}>
                    <CustomInput 
                        width='90%' 
                        font='Poppins' 
                        iconName='account-outline'
                        iconSize={20} 
                        placeholder='username' 
                        label='username'
                        // error='This is an error message'
                         />
                    <CustomInput 
                        width='90%' 
                        font='Poppins' 
                        iconName='lock-outline'
                        iconSize={18}
                        placeholder='password' 
                        label='password'
                        // error='This is an error message'
                         />

                    <CustomButton 
                        width='90%' 
                        font='Poppins' 
                        primary='#5037A9' 
                        secondary='#48319D' 
                        color='#FFFFFF' 
                        title='Login' />
                </View>
                <ExpoStatusBar style='light'/>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    welcomeLogo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: '25%',
    },
    bottom: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: '25%',
    },
    back: {
        position: 'absolute',
        top: StatusBar.currentHeight + 10,
        right: 20,
    },
})

export default LoginScreen;