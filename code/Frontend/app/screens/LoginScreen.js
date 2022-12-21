import React, { useContext, useState } from 'react';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { ImageBackground, Image, StyleSheet, View, StatusBar, TouchableOpacity, ScrollView, useWindowDimensions, Text } from 'react-native';
// import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { AuthContext } from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';

const LoginScreen = ({navigation}) => {

    const size = useWindowDimensions();
    const height = size.height + StatusBar.currentHeight + 13;

    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const { isLoading, UserLogin } = useContext(AuthContext);  
    const { userInfo } = useContext(AuthContext);

    const handleOnChange = (text, input) => {
        setInputs(prevState => ({...prevState, [input]: text}));
    };

    const ValidateInputs = () => {
        // Keyboard.dismiss();
        let valid = true;

        if (!inputs.email) {
            handleError('Please input email', 'email');
            valid = false;
        } else if (!isValidEmail(inputs.email)) {
            handleError('Please input valid email', 'email');
            valid = false;
        } else {
            handleError('', 'email');
        }

        if (!inputs.password) {
            handleError('Please input password', 'password');
            valid = false;
        } else if (inputs.password.length <= 4) {
            handleError('Password should have at least 5 characters', 'password');
            valid = false;
        }
        
        if (valid) {
            LogIn()
        }
    };

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    const LogIn = () => {
        UserLogin(inputs.email, inputs.password);
        navigation.replace('DriverHome')
    }

    const handleError = (errorMsg, input) => {
        setErrors((prevState) => ({...prevState, [input]: errorMsg}));
    };

    const [fontsLoaded] = useFonts({
        'Poppins': require('../assets/fonts/Poppins-Medium.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <ScrollView>
            <View style={[styles.container, {height: height}]}>
                <Spinner visible={isLoading} />
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
                            width='85%' 
                            font='Poppins' 
                            iconName='email-outline'
                            iconSize={20} 
                            placeholder='email'
                            onChangeText={(text) => handleOnChange(text, 'email')}
                            value={inputs.email}
                            error={errors.email}
                            onFocus={() => {
                                handleError(null, 'email');
                            }}
                            />
                        <CustomInput 
                            width='85%' 
                            font='Poppins' 
                            iconName='lock-outline'
                            iconSize={18}
                            placeholder='password'
                            onChangeText={(text) => handleOnChange(text, 'password')}
                            password 
                            value={inputs.password}
                            error={errors.password}
                            onFocus={() => {
                                handleError(null, 'password');
                            }}
                            />

                    </View>

                    <View style={styles.bottom}>
                        <CustomButton 
                            width='85%' 
                            font='Poppins' 
                            primary='#5037A9' 
                            secondary='#48319D' 
                            color='#FFFFFF' 
                            title='Login'
                            onPress={() => ValidateInputs()} />
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