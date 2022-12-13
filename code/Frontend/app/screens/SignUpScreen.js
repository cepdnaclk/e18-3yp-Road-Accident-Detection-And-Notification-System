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

    const size = useWindowDimensions();
    const height = size.height + StatusBar.currentHeight + 13;

    const [state, setState] = useState(1);

    const [fontsLoaded] = useFonts({
        'Poppins': require('../assets/fonts/Poppins-Medium.ttf'),
        'BebasNeue': require('../assets/fonts/BebasNeue-Regular.ttf'),
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
                        <Image source={require('../assets/img/LogoSignUp.png')} />
                    </View>

                    <View style={styles.selection}>
                        <TouchableOpacity 
                            style={styles.btnSelection}
                            onPress= {() => {setState(0)}}>

                            <View style={[styles.buttons, state === 0 && styles.buttonsActive]}>
                                <Image source={require('../assets/img/ambulance.png')} style={styles.btnIcon}/>
                                {state === 0 && (<Text style={[styles.txtName, {fontFamily: 'BebasNeue'}]}>AMBULANCE</Text>)}
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.btnSelection}
                            onPress= {() => {setState(1)}}>
                                
                            <View style={[styles.buttons, state === 1 && styles.buttonsActive]}>
                                <Image source={require('../assets/img/driver.png')} style={styles.btnIcon}/>
                                {state === 1 && (<Text style={[styles.txtName, {fontFamily: 'BebasNeue'}]}>DRIVER</Text>)}
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.btnSelection}
                            onPress= {() => {setState(2)}}>

                            <View style={[styles.buttons, state === 2 && styles.buttonsActive, {paddingLeft: '15%'}]}>
                                <Image source={require('../assets/img/emergency-contact.png')} style={styles.btnIcon}/>
                                {state === 2 && (<Text style={[styles.txtName, {fontFamily: 'BebasNeue'}]}>EMERGENCY</Text>)}
                            </View>
                        </TouchableOpacity>
                    </View>

                    <ScrollView>       
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
                    </ScrollView>
                </ImageBackground>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        height: '100%',
        flexDirection: 'column',
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    welcomeLogo: {
        // flex: 1,
        height: '20%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop: StatusBar.currentHeight + 10,
        paddingLeft: '4%',
        // backgroundColor: '#5037A9'
    },
    selection: {
        // flex: 1,
        height: '20%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: '10%',
        // backgroundColor: '#5037A9',
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
    buttons: {
        height: 68,
        width: 68,
        backgroundColor: 'rgba(42, 46, 83, 0.9)',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',

        shadowColor: "#1c1b21",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity:  0.9,
        shadowRadius: 5.62,
        elevation: 8
    },
    btnIcon: {
        width: 43, 
        height: 43,
    },
    buttonsActive: {
        position: 'relative',
        height: 82,
        width: 82,
        backgroundColor: 'rgba(42, 46, 83, 0.9)',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'rgba(1, 163, 235, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',

        shadowColor: "#1c1b21",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity:  0.9,
        shadowRadius: 5.62,
        elevation: 8
    },
    btnIconActive: {
        width: 55, 
        height: 55,
    },
    txtName: {
        position: 'absolute',
        color: '#FFFFFF',
        fontSize: 12,
        top: 85,
        letterSpacing: 1.5,
    }
})

export default SignUpScreen;