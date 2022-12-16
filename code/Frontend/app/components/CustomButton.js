import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

function CustomButton(props) {
    return (
        <TouchableOpacity 
            onPress={() => props.onPress?.()}
            style={{
                height: 42, 
                width: props.width, 
                marginTop: 20 }}>
                
            <LinearGradient
                style={styles.container}
                colors={[ props.primary, props.secondary ]}
                start={{x: 0.5, y: 0}}
                end={{x: 0.5, y: 1}}>
                
                <Text style={{
                    color: props.color, 
                    fontFamily: props.font, 
                    fontSize: (props.fontSize ? props.fontSize : 17),
                    letterSpacing: 0.8}}> 

                    {props.title}
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    }
})

export default CustomButton;