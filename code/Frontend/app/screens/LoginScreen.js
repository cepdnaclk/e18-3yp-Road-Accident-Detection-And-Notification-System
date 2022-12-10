import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Image, StyleSheet, View } from 'react-native';
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
                    <Image source={require('../assets/img/LogoLogin.png')} />
                </View>

                {/* <View style={styles.buttons}>
                    <CustomButton width='45%' font='Poppins' primary='#5037A9' secondary='#48319D' color='#FFFFFF' title='Sign Up' onPress={() => navigation.navigate('SignUp')}/>
                    <CustomButton width='45%' font='Poppins' primary='#C7C0E3' secondary='#AEA6CC' color='#5037A9' title='Login' onPress={() => navigation.navigate('Login')}/>
                </View> */}
                <StatusBar style='light'/>
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
    buttons: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: '25%',
    },
})

export default LoginScreen;