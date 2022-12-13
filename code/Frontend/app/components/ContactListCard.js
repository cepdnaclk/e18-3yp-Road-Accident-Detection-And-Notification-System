import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

function ContactListCard(props) {

    const [fontsLoaded] = useFonts({
        'YanoneKaff': require('../assets/fonts/YanoneKaffeesatz-SemiBold.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>

            </View>
            <View style={styles.details}>
                <Text style={[styles.txtlabel, {fontFamily: 'YanoneKaff', fontSize: 20}]}>FIRESTNAME LASTNAME</Text>
                <Text style={[styles.txtlabel, {fontFamily: 'YanoneKaff', fontSize: 15}]}>email@gmail.com</Text>
                <Text style={[styles.txtlabel, {fontFamily: 'YanoneKaff', fontSize: 15}]}>077 777 7777</Text>
            </View>
            <MaterialCommunityIcons  style={styles.expandIcon} name="playlist-plus" size={24} color="rgba(90, 93, 125, 0.9)" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 75,
        backgroundColor: 'rgba(90, 93, 125, 0.5)',
        marginHorizontal: '4%',
        borderRadius: 8,
        marginBottom: 10,
        alignItems: 'center',
        paddingHorizontal: 7,
        flexDirection: 'row'
    },
    profile: {
        height: 61,
        width: 61,
        backgroundColor: '#FFFFFF',
        borderRadius: 5
    },
    txtlabel: {
        color: 'rgba(219, 219, 219, 0.7)',
        letterSpacing: 1
    },
    details: {
        marginLeft: '8%',
        flexDirection: 'column',
    },
    expandIcon: {
        position: 'absolute',
        alignContent: 'flex-start',
        right: 10
    }
})

export default ContactListCard;