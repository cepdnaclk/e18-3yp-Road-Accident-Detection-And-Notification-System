import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, StatusBar } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

import { AuthContext } from '../context/AuthContext';

function AccountSettingScreen(props) {
    const { isLoading, userInfo, Logout, toTitleCase } = useContext(AuthContext);

    const [fontsLoaded] = useFonts({
        'Poppins': require('../assets/fonts/Poppins-Medium.ttf'),
        'YanoneKaff': require('../assets/fonts/YanoneKaffeesatz-SemiBold.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    // useEffect(() => {
    //     console.log(userInfo)
    // }, [])

    function callLogout () {
        Logout()
    }

    return (
        <LinearGradient
            style={[styles.container, { alignItems: 'center', justifyContent: 'center'}]}
            colors={[ '#2A2B4D', '#2C2F54' ]}
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0}}>
                
            <Spinner visible={isLoading} />
            <View style={styles.mainContainer}>
                <LinearGradient
                    style={styles.top}
                    colors={[ '#21223E', '#242543' ]}
                    start={{x: 0, y: 0.5}}
                    end={{x: 0.5, y: 0}}>

                    <Image style={{position: 'absolute', width: '100%', resizeMode: 'cover'}} source={require('../assets/img/account_background.png')} />   
                    <Text style={{position: 'absolute', top: StatusBar.currentHeight + 12, left: 25, color: '#D8D5DF', fontFamily: 'YanoneKaff', fontSize: 24, letterSpacing: 0.8}}>Account</Text>
                    <TouchableOpacity 
                        onPress={() => {/*console.log('here');*/}}
                        style={styles.back}>

                        <Ionicons name="md-chevron-back" size={30} color="#B5B5B5" />
                    </TouchableOpacity>
                    <View style={styles.profilePic}>
                        <Image style={{width: '94%', height: '94%', borderRadius: 50}} source={require('../assets/profPic/picture2.jpg')}/>
                        <View style={styles.camera}>
                            <Image style={{width: '55%', height: '40%', borderRadius: 50}} source={require('../assets/icons/camera_icon.png')}/>
                        </View>
                    </View>
                    <Text style={{fontFamily: 'YanoneKaff', fontSize: 20, color: '#B5B5B5'}}>{(toTitleCase(userInfo.fname) + ' ' + toTitleCase(userInfo.lname)).trim()}</Text>
                    <Text style={{fontFamily: 'YanoneKaff', fontSize: 15, color: '#B5B5B5', marginTop: 3}}>{userInfo.email}</Text>
                    <Text style={{fontFamily: 'YanoneKaff', fontSize: 15, color: '#B5B5B5', marginTop: 3}}>{userInfo.telNum}</Text>
                </LinearGradient>
                <LinearGradient
                    style={styles.middle}
                    colors={[ '#21223E', '#242543' ]}
                    start={{x: 0, y: 0.5}}
                    end={{x: 0.5, y: 0}}>

                    <View style={styles.rows}>
                        <Image style={styles.img} source={require('../assets/icons/view_details_icon.png')} />
                        <TouchableOpacity onPress={() => {}}>
                            <Text style={[styles.text, {fontFamily: 'Poppins'}]}>View all details</Text>
                        </TouchableOpacity>
                        <MaterialIcons style={{position: 'absolute', right: 20}} name="keyboard-arrow-right" size={24} color="rgba(181, 181, 181, 0.7)" />
                        <View style={styles.line}/>
                    </View>
                    <View style={styles.rows}>
                        <Image style={styles.img} source={require('../assets/icons/edit_details_icon.png')} />
                        <TouchableOpacity onPress={() => {}}>
                            <Text style={[styles.text, {fontFamily: 'Poppins'}]}>Edit account details</Text>
                        </TouchableOpacity>
                        <MaterialIcons style={{position: 'absolute', right: 20}} name="keyboard-arrow-right" size={24} color="rgba(181, 181, 181, 0.7)" />
                        <View style={styles.line}/>
                    </View>
                    <View style={styles.rows}>
                        <Image style={styles.img} source={require('../assets/icons/password_icon.png')} />
                        <TouchableOpacity onPress={() => {}}>
                            <Text style={[styles.text, {fontFamily: 'Poppins'}]}>Change password</Text>
                        </TouchableOpacity>
                        <MaterialIcons style={{position: 'absolute', right: 20}} name="keyboard-arrow-right" size={24} color="rgba(181, 181, 181, 0.7)" />
                        <View style={styles.line}/>
                    </View>
                    <View style={styles.rows}>
                        <Image style={styles.img} source={require('../assets/icons/notification_icon.png')} />
                        <TouchableOpacity onPress={() => {}}>
                            <Text style={[styles.text, {fontFamily: 'Poppins'}]}>Notifications</Text>
                        </TouchableOpacity>
                        <MaterialIcons style={{position: 'absolute', right: 20}} name="keyboard-arrow-right" size={24} color="rgba(181, 181, 181, 0.7)" />
                        <View style={styles.line}/>
                    </View>
                    <View style={styles.rows}>
                        <Image style={styles.img} source={require('../assets/icons/security_icon.png')} />
                        <TouchableOpacity onPress={() => {}}>
                            <Text style={[styles.text, {fontFamily: 'Poppins'}]}>Security</Text>
                        </TouchableOpacity>
                        <MaterialIcons style={{position: 'absolute', right: 20}} name="keyboard-arrow-right" size={24} color="rgba(181, 181, 181, 0.7)" />
                    </View>
                </LinearGradient>
                <LinearGradient
                    style={styles.bottom}
                    colors={[ '#21223E', '#242543' ]}
                    start={{x: 0, y: 0.5}}
                    end={{x: 0.5, y: 0}}>
                    
                    <View style={styles.rows}>
                        <Image style={styles.img} source={require('../assets/icons/logout_icon.png')} />
                        <TouchableOpacity onPress={() => {callLogout()}}>
                            <Text style={[styles.text, {fontFamily: 'Poppins'}]}>Sign out account</Text>
                        </TouchableOpacity>
                        <View style={styles.line}/>
                    </View>
                    <View style={styles.rows}>
                        <Image style={styles.img} source={require('../assets/icons/trash_icon.png')} />
                        <TouchableOpacity onPress={() => {}}>
                            <Text style={[styles.text, {fontFamily: 'Poppins'}]}>Delete account</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainContainer: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center'
    },
    top: {
        // position: 'absolute',
        // top: 0,
        width: '100%',
        height: '48%',
        backgroundColor: 'white',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    middle: {
        width: '92%',
        height: 175,
        backgroundColor: 'white',
        marginTop: 16,
        borderRadius: 15
    },
    bottom: {
        width: '92%',
        height: 70,
        backgroundColor: 'white',
        marginTop: 16,
        borderRadius: 15
    },
    rows: {
        flexDirection: 'row',
        padding: 4,
        alignItems: 'center'
        // backgroundColor: 'red',
    },
    text: {
        color: '#B5B5B5',
        fontSize: 14,
        paddingTop: 2,
        letterSpacing: 0.9
    },
    line: {
        position: 'absolute',
        height: 1, 
        width: '94%', 
        marginLeft: '4%',
        backgroundColor: '#2C2D49',
        bottom: 0,
    },
    img: {
        marginLeft: 10, 
        marginRight: 20, 
        width: 16, 
        height: 16
    },
    profilePic: {
        height: 85,
        width: 85,
        // backgroundColor: 'rgba(90, 93, 125, 0.9)',
        backgroundColor: '#0798E0',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        marginTop: 30
    },
    camera: {
        position: 'absolute',
        width: 26,
        height: 26,
        backgroundColor: '#1C1B33',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 0,
        right: 0,
    },
    back: {
        position: 'absolute',
        top: StatusBar.currentHeight + 10,
        right: 20,
    }
})

export default AccountSettingScreen;