import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { MaterialIcons } from '@expo/vector-icons';

import { AuthContext } from '../context/AuthContext';

function AccountSettingScreen(props) {
    const { isLoading, userInfo, Logout } = useContext(AuthContext);

    const [fontsLoaded] = useFonts({
        'Poppins': require('../assets/fonts/Poppins-Medium.ttf'),
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

                    <Image style={{width: '100%', resizeMode: 'cover'}} source={require('../assets/img/account_background.png')} />
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
    }
})

export default AccountSettingScreen;