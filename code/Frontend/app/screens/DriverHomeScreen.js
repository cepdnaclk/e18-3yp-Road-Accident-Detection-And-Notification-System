import React, { useState } from 'react';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { 
    ImageBackground, 
    Image, 
    StyleSheet, 
    View, 
    StatusBar, 
    TouchableOpacity, 
    ScrollView,
    useWindowDimensions,
    Text, 
} from 'react-native';
// import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

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

const DriverHomeScreen = ({navigation}) => {

    const size = useWindowDimensions();
    const height = size.height + StatusBar.currentHeight + 13;

    const [state, setState] = useState(1);

    const [fontsLoaded] = useFonts({
        'Poppins': require('../assets/fonts/Poppins-Medium.ttf'),
        'YanoneKaff': require('../assets/fonts/YanoneKaffeesatz-SemiBold.ttf'),
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
                        <Image source={require('../assets/img/LogoDriver.png')} style={{width: 110, height: 50}}/>
                    </View>

                    <View style={styles.label}>
                        <Text style={[styles.txtlabel, {fontFamily: 'YanoneKaff'}]}>My emergency contacts</Text>
                    </View>

                    <View style={{flex: 1}}>
                        
                    </View>
                </ImageBackground>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection: 'column',
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    welcomeLogo: {
        // flex: 1,
        height: '17%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop: StatusBar.currentHeight + 10,
        paddingLeft: '4%',
        // backgroundColor: '#5037A9'
    },
    back: {
        position: 'absolute',
        top: StatusBar.currentHeight + 10,
        right: 20,
    },
    label: {
        height: '4%',
        // backgroundColor: '#5037A9',
        justifyContent: 'center',
        paddingHorizontal: '4%',
    },
    txtlabel: {
        color: '#D8D5DF',
        fontSize: 17,
        letterSpacing: 1
    },
})

export default DriverHomeScreen;