import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

function AddListCard(props) {

    const [fontsLoaded] = useFonts({
        'YanoneKaff': require('../assets/fonts/YanoneKaffeesatz-SemiBold.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <AntDesign name="plus" size={50} color="rgba(219, 219, 219, 0.7)" />
            <Text style={[styles.txtlabel, {fontFamily: 'YanoneKaff'}]}>Add emergency contact</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 75,
        backgroundColor: 'rgba(90, 93, 125, 0.5)',
        marginHorizontal: '4%',
        borderRadius: 8,
        alignItems: 'center',
        paddingHorizontal: '5%',
        flexDirection: 'row'
    },
    txtlabel: {
        fontSize: 20,
        color: 'rgba(219, 219, 219, 0.7)',
        marginLeft: '10%',
        letterSpacing: 1
    },
})

export default AddListCard;