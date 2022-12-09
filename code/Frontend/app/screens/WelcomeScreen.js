import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, StyleSheet, View, Pressable, Text } from 'react-native';

const StartupScreen = () => {
    return (
        <LinearGradient 
            style={styles.container}
            colors={['#2E335A', '#1C1B33']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}>
            
            <View style={styles.welcomeLogo}>
                <Image source={require('../assets/img/LogoWelcome.png')} />
            </View>

            <View style={styles.buttons}>
                <Pressable><Text>Sign Up</Text></Pressable>
                {/* <Pressable>Login</Pressable> */}
            </View>
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
    welcomeLogo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttons: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default StartupScreen;