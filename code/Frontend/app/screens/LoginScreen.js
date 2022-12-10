import React from 'react';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { ImageBackground, Image, StyleSheet, View, StatusBar, TouchableOpacity } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

import CustomButton from '../components/CustomButton';

const LoginScreen = ({navigation}) => {
    const [fontsLoaded] = useFonts({
        'Poppins': require('../assets/fonts/Poppins-Medium.ttf'),
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/img/Background.png')} style={styles.image}>
                <View style={styles.welcomeLogo}>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('Welcome')}
                        style={styles.back}>

                        <Image source={require('../assets/icons/back.png')} />
                    </TouchableOpacity>
                    <Image source={require('../assets/img/LogoLogin.png')} />
                </View>

                <View style={styles.bottom}>
                    <CustomButton width='90%' font='Poppins' primary='#5037A9' secondary='#48319D' color='#FFFFFF' title='Login' />
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
        top: StatusBar.currentHeight + 15,
        right: 20,
    },
})

export default LoginScreen;