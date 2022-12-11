import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { icons } from '../assets/icons/icons'

function CustomInput(props) {
    return (
        <View
            style={{
                height: 42, 
                width: props.width, 
                marginTop: 20 }}>
                
            <View style={styles.container}>
                <MaterialCommunityIcons style={styles.icon} name={props.iconName} size={20} color="#B5B5B5" />
                
                <Text style={{
                    color: '#B5B5B5', 
                    fontFamily: props.font, 
                    fontSize: 15,
                    letterSpacing: 0.8}}> 

                    {props.title}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#8F8F8F',
        borderRadius: 50,
    },
    icon: {
        marginLeft: 15,
        marginRight: 6,
    }
})

export default CustomInput;