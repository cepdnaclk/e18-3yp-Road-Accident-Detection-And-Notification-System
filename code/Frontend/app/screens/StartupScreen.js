import React, { useContext, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, StyleSheet } from 'react-native';

import { AuthContext } from '../context/AuthContext';

const StartupScreen = ({navigation}) => {
    const { userInfo } = useContext(AuthContext);

    useEffect(() => {
        console.log('state - ' + userInfo.userState)
    }, [userInfo.userState])

    return (
        <LinearGradient 
            style={styles.container}
            colors={['#2E335A', '#1C1B33']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}>

            <Image source={require('../assets/img/Logo.png')} />
            <StatusBar style='light'/>

        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
})

export default StartupScreen;