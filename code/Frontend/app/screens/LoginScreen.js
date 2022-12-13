import React from 'react';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { ImageBackground, Image, StyleSheet, View, StatusBar, TouchableOpacity, ScrollView, useWindowDimensions, Text } from 'react-native';
// import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';

const LoginScreen = ({navigation}) => {

    const size = useWindowDimensions();
    const height = size.height + StatusBar.currentHeight + 13;

    const [fontsLoaded] = useFonts({
        'Poppins': require('../assets/fonts/Poppins-Medium.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <ScrollView>
            <View style={[styles.container, {height: height}]}>
                <ImageBackground source={require('../assets/img/Background.png')} style={styles.image}>
                    <View style={styles.welcomeLogo}>
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('Welcome')}
                            style={styles.back}>

                            <Ionicons name="md-chevron-back" size={35} color="#B5B5B5" />
                        </TouchableOpacity>
                        <Image source={require('../assets/img/LogoLogin.png')} />
                    </View>
                    
                    <View style={styles.middle}>
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

                    </View>

                    <View style={styles.bottom}>
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
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
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
    middle: {
        flex: 3,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    bottom: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    back: {
        position: 'absolute',
        top: StatusBar.currentHeight + 10,
        right: 20,
    },
})

export default LoginScreen;