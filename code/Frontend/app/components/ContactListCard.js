import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

function ContactListCard({name, telephoneNo, image}) {

    const [fontsLoaded] = useFonts({
        'YanoneKaff': require('../assets/fonts/YanoneKaffeesatz-SemiBold.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image style={{width: '100%', height: '100%', borderRadius: 5}} source={image}/>
            </View>
            <View style={styles.details}>
                <Text style={[styles.txtlabel, {fontFamily: 'YanoneKaff', fontSize: 20}]}>{name}</Text>
                {/* <Text style={[styles.txtlabel, {fontFamily: 'YanoneKaff', fontSize: 15}]}>{email}</Text> */}
                <Text style={[styles.txtlabel, {fontFamily: 'YanoneKaff', fontSize: 17}]}>{telephoneNo}</Text>
            </View>

            <Foundation style={styles.expandIcon} name="list" size={20} color="rgba(219, 219, 219, 0.5)" />
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
        backgroundColor: 'rgba(90, 93, 125, 0.9)',
        borderRadius: 5
    },
    txtlabel: {
        color: 'rgba(219, 219, 219, 0.7)',
        letterSpacing: 1
    },
    details: {
        height: 75,
        paddingVertical: 5,
        marginLeft: '8%',
        flexDirection: 'column',
        justifyContent: 'space-evenly'
    },
    expandIcon: {
        position: 'absolute',
        alignContent: 'flex-start',
        right: 15,
        top: 10,
    }
})

export default ContactListCard;