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
    Keyboard, 
} from 'react-native';
// import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';

const SignUpScreen = ({navigation}) => {
    
    const size = useWindowDimensions();
    const height = size.height + StatusBar.currentHeight + 13;
    
    const [state, setState] = useState(1);
    const [inputs, setInputs] = useState({
        firstname: '',
        lastname: '',
        email: '',
        NIC: '',
        telephoneNo: '',
        password: '',
        confPassword: '',
        hospital: '',
        licensePltNo: '',
        drivingLicense: '',
        vehicleType: '',
        devNo: '',
    });
    const [errors, setErrors] = useState({});

    const clearFields = () => {
        handleOnChange('', 'firstname');
        handleOnChange('', 'lastname');
        handleOnChange('', 'email');
        handleOnChange('', 'NIC');
        handleOnChange('', 'telephoneNo');
        handleOnChange('', 'password');
        handleOnChange('', 'confPassword');
        handleOnChange('', 'hospital');
        handleOnChange('', 'licensePltNo');
        handleOnChange('', 'drivingLicense');
        handleOnChange('', 'vehicleType');
        handleOnChange('', 'devNo');
        
        setErrors({});
    }
    
    const [fontsLoaded] = useFonts({
        'Poppins': require('../assets/fonts/Poppins-Medium.ttf'),
        'BebasNeue': require('../assets/fonts/BebasNeue-Regular.ttf'),
    });
    
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
                        onChangeText={(text) => handleOnChange(text, 'hospital')}
                        // error='This is an error message'
                        />
                    <CustomInput 
                        width='90%' 
                        font='Poppins' 
                        iconName='card-outline'
                        iconSize={20} 
                        placeholder='license plate number' 
                        onChangeText={(text) => handleOnChange(text, 'licensePltNo')}
                        // error='This is an error message'
                        />
                    <CustomInput 
                        width='90%' 
                        font='Poppins' 
                        iconName='account-outline'
                        iconSize={20} 
                        placeholder='driving license' 
                        onChangeText={(text) => handleOnChange(text, 'drivingLicense')}
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
                        onChangeText={(text) => handleOnChange(text, 'vehicalType')}
                        // error='This is an error message'
                        />
                    <CustomInput 
                        width='90%' 
                        font='Poppins' 
                        iconName='card-outline'
                        iconSize={20} 
                        placeholder='license plate number' 
                        onChangeText={(text) => handleOnChange(text, 'licensePltNo')}
                        error={errors.licensePltNo}
                        onFocus={() => {
                            handleError(null, 'licensePltNo');
                        }}
                        />
                    <CustomInput 
                        width='90%' 
                        font='Poppins' 
                        iconName='account-outline'
                        iconSize={20} 
                        placeholder='device number' 
                        onChangeText={(text) => handleOnChange(text, 'devNo')}
                        validate={true}
                        validateDevNo={() => {ValidateDevNo(inputs.devNo)}}
                        error={errors.devNo}
                        onFocus={() => {
                            handleError(null, 'devNo');
                        }}
                        />
                </View>
            )
        } else {
            return null
        }
    }

    const ValidateDevNo = (deviceNoInput) => {
        if (!deviceNoInput){
            handleError('Empty device no', 'devNo');
        } else if (deviceNoInput) {
            handleError('Valid', 'devNo');
        }
    }
    
    const handleOnChange = (text, input) => {
        setInputs(prevState => ({...prevState, [input]: text}));
    };
    
    const ValidateInputs = () => {
        // Keyboard.dismiss();
        let valid = true;

        if (!inputs.firstname) {
            handleError('Please input firstname', 'firstname');
            valid = false;
        } else if (inputs.firstname) {
            handleError('have something', 'firstname');
        }
        if (!inputs.lastname) {
            handleError('Please input lastname', 'lastname');
        } else if (inputs.lastname) {
            handleError('have something', 'lastname');
        }
        if (!inputs.email) {
            handleError('Please input lastname', 'email');
        } else if (!inputs.email.match(/\s+@\s+\.\s+/)) {
            handleError('Please input valid email', 'email');
        }
        if (!inputs.NIC) {
            handleError('Please input lastname', 'NIC');
        } else if (inputs.NIC) {
            handleError('have something', 'NIC');
        }
        if (!inputs.telephoneNo) {
            handleError('Please input lastname', 'telephoneNo');
        } else if (inputs.telephoneNo) {
            handleError('have something', 'telephoneNo');
        }
        if (!inputs.licensePltNo) {
            handleError('Please input lastname', 'licensePltNo');
        } else if (inputs.licensePltNo) {
            handleError('have something', 'licensePltNo');
        }
        ValidateDevNo(inputs.devNo)
        // min password length 4

        if (valid) {
            signUp()
        }
    };

    const signUp = () => {
        // Todo
    }

    const handleError = (errorMsg, input) => {
        setErrors((prevState) => ({...prevState, [input]: errorMsg}));
    };

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
                            activeOpacity={0.7}
                            style={styles.btnSelection}
                            onPress= {() => {setState(0); clearFields();}}>

                            <View style={[styles.buttons, state === 0 && styles.buttonsActive]}>
                                <Image source={require('../assets/img/ambulance.png')} style={styles.btnIcon}/>
                                {state === 0 && (<Text style={[styles.txtName, {fontFamily: 'BebasNeue'}]}>AMBULANCE</Text>)}
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            activeOpacity={0.7}
                            style={styles.btnSelection}
                            onPress= {() => {setState(1); clearFields();}}>
                                
                            <View style={[styles.buttons, state === 1 && styles.buttonsActive]}>
                                <Image source={require('../assets/img/driver.png')} style={styles.btnIcon}/>
                                {state === 1 && (<Text style={[styles.txtName, {fontFamily: 'BebasNeue'}]}>DRIVER</Text>)}
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.7} 
                            style={styles.btnSelection}
                            onPress= {() => {setState(2); clearFields();}}>

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
                                onChangeText={(text) => handleOnChange(text, 'firstname')}
                                value={inputs.firstname}
                                error={errors.firstname}
                                onFocus={() => {
                                    handleError(null, 'firstname');
                                }}
                                />
                            <CustomInput 
                                width='90%' 
                                font='Poppins' 
                                iconName='account-outline'
                                iconSize={20} 
                                placeholder='last name' 
                                onChangeText={(text) => handleOnChange(text, 'lastname')}
                                value={inputs.lastname}
                                error={errors.lastname}
                                onFocus={() => {
                                    handleError(null, 'lastname');
                                }}
                                />
                            <CustomInput 
                                width='90%' 
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
                                width='90%' 
                                font='Poppins' 
                                iconName='card-account-mail-outline'
                                iconSize={16} 
                                placeholder='NIC' 
                                onChangeText={(text) => handleOnChange(text, 'NIC')}
                                value={inputs.NIC}
                                error={errors.NIC}
                                onFocus={() => {
                                    handleError(null, 'NIC');
                                }}
                                />
                            <CustomInput 
                                width='90%' 
                                font='Poppins' 
                                iconName='cellphone'
                                iconSize={18} 
                                placeholder='telephone number' 
                                onChangeText={(text) => handleOnChange(text, 'telephoneNo')}
                                keyboardType='numeric'
                                value={inputs.telephoneNo}
                                error={errors.telephoneNo}
                                onFocus={() => {
                                    handleError(null, 'telephoneNo');
                                }}
                                />

                            {renderItem(state)}
                            {/* Driver Ambulance Emergency */}

                            <CustomInput 
                                width='90%' 
                                font='Poppins' 
                                iconName='lock-outline'
                                iconSize={18} 
                                placeholder='password'
                                onChangeText={(text) => handleOnChange(text, 'password')}
                                password 
                                // error='This is an error message'
                                />
                            <CustomInput 
                                width='90%' 
                                font='Poppins' 
                                iconName='lock-outline'
                                iconSize={18} 
                                placeholder='confirm password'
                                onChangeText={(text) => handleOnChange(text, 'confPassword')}
                                password
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
                                title='Sign Up'
                                // onPress={() => ValidateInputs()} />
                                // onPress={() => navigation.navigate('DriverHome')} />
                                onPress={() => navigation.navigate('AmbulanceHome')} />
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

        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity:  0.75,
        shadowRadius: 5,
        elevation: 8,
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
        // borderWidth: 1,
        // borderColor: 'rgba(1, 163, 235, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',

        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity:  0.2,
        shadowRadius: 5,
        elevation: 10
    },
    btnIconActive: {
        width: 55, 
        height: 55,
    },
    txtName: {
        position: 'absolute',
        color: '#DFDFDF',
        fontSize: 12,
        top: 85,
        letterSpacing: 1.5,
    }
})

export default SignUpScreen;