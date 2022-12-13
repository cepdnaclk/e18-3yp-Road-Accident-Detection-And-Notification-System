import React, { useState, useEffect } from 'react';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { ImageBackground, Image, StyleSheet, View, StatusBar, TouchableOpacity, ScrollView, useWindowDimensions, Text } from 'react-native';
// import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';

const renderItem = (state) => {
    if (state === 0) {
        return (
            <View style={styles.additionalComp}>
                <CustomInput 
                    width='90%' 
                    font='Poppins' 
                    iconName='hospital-box-outline'
                    iconSize={20} 
                    placeholder='hospital' 
                    label='hospital'
                    // error='This is an error message'
                    />
                <CustomInput 
                    width='90%' 
                    font='Poppins' 
                    iconName='card-outline'
                    iconSize={20} 
                    placeholder='license plate number' 
                    label='licenseplateno'
                    // error='This is an error message'
                    />
                <CustomInput 
                    width='90%' 
                    font='Poppins' 
                    iconName='account-outline'
                    iconSize={20} 
                    placeholder='driving license' 
                    label='drivinglicense'
                    // error='This is an error message'
                    />

            </View>
        )
    } else if (state === 1) {
        return (
            <View style={styles.additionalComp}>
                <CustomInput 
                    width='90%' 
                    font='Poppins' 
                    iconName='hospital-box-outline'
                    iconSize={20} 
                    placeholder='vehicle type' 
                    label='vehicletype'
                    // error='This is an error message'
                    />
                <CustomInput 
                    width='90%' 
                    font='Poppins' 
                    iconName='card-outline'
                    iconSize={20} 
                    placeholder='license plate number' 
                    label='licenseplateno'
                    // error='This is an error message'
                    />
                <CustomInput 
                    width='90%' 
                    font='Poppins' 
                    iconName='account-outline'
                    iconSize={20} 
                    placeholder='device number' 
                    label='deviceno'
                    // error='This is an error message'
                    />
            </View>
        )
    } else {
        return null
    }
}

const SignUpScreen = ({navigation}) => {

    const [state, setState] = useState(1);

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
            <View style={styles.container}>
                <ImageBackground source={require('../assets/img/Background.png')} style={styles.image}>
                    <View style={styles.welcomeLogo}>
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('Welcome')}
                            style={styles.back}>

                            <Ionicons name="md-chevron-back" size={35} color="#B5B5B5" />
                        </TouchableOpacity>
                        <Image source={require('../assets/img/LogoSignUp.png')} />
                    </View>

                    <View style={styles.selection}>
                        <TouchableOpacity 
                            style={styles.btnSelection}
                            onPress= {() => {setState(0)}}
                            >
                            <Text style={{color: '#FFFFFF', fontSize: 15, backgroundColor: '#000', padding: 5, width: 100}}>Ambulance</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.btnSelection}
                            onPress= {() => {setState(1)}}
                            >
                            <Text style={{color: '#FFFFFF', fontSize: 15, backgroundColor: '#000', padding: 5, width: 100}}>Driver</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.btnSelection}
                            onPress= {() => {setState(2)}}
                            >
                            <Text style={{color: '#FFFFFF', fontSize: 15, backgroundColor: '#000', padding: 5, width: 100}}>Emergency</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.middle}>
                        <CustomInput 
                            width='90%' 
                            font='Poppins' 
                            iconName='account-outline'
                            iconSize={20} 
                            placeholder='first name' 
                            label='firstname'
                            // error='This is an error message'
                            />
                        <CustomInput 
                            width='90%' 
                            font='Poppins' 
                            iconName='account-outline'
                            iconSize={20} 
                            placeholder='last name' 
                            label='lastname'
                            // error='This is an error message'
                            />
                        <CustomInput 
                            width='90%' 
                            font='Poppins' 
                            iconName='email-outline'
                            iconSize={20} 
                            placeholder='email' 
                            label='email'
                            // error='This is an error message'
                            />
                        <CustomInput 
                            width='90%' 
                            font='Poppins' 
                            iconName='card-account-mail-outline'
                            iconSize={16} 
                            placeholder='NIC' 
                            label='nic'
                            // error='This is an error message'
                            />
                        <CustomInput 
                            width='90%' 
                            font='Poppins' 
                            iconName='cellphone'
                            iconSize={18} 
                            placeholder='telephone number' 
                            label='telephonenumber'
                            // error='This is an error message'
                            />

                        {renderItem(state)}
                        {/* Driver Ambulance Emergency */}

                        <CustomInput 
                            width='90%' 
                            font='Poppins' 
                            iconName='lock-outline'
                            iconSize={18} 
                            placeholder='password' 
                            label='password'
                            // error='This is an error message'
                            />
                        <CustomInput 
                            width='90%' 
                            font='Poppins' 
                            iconName='lock-outline'
                            iconSize={18} 
                            placeholder='confirm password' 
                            label='confirmpassword'
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
                            title='Sign Up' />
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
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop: StatusBar.currentHeight + 10,
        paddingLeft: '4%',
    },
    selection: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    middle: {
        flex: 3,
        justifyContent: 'flex-end',
        alignItems: 'center',
        // backgroundColor: '#5037A9'
    },
    bottom: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 50,
    },
    back: {
        position: 'absolute',
        top: StatusBar.currentHeight + 10,
        right: 20,
    },
    additionalComp: {
        width: '100%',
        alignItems: 'center'
    },
    btnSelection: {
        padding: 10,
    },
})

export default SignUpScreen;