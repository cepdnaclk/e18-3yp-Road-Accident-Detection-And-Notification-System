import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, Touchable, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

function CustomInput({
    width, 
    iconName,
    iconSize, 
    font, 
    error,
    password,
    onFocus = () => {},
    onPress = () => {},
    validateDevNo,
    validate,
    ...props }) {

    const [isFocused, setisFocused] = useState(false);
    const [hidePassword, setHidePassword] = useState(password);

    return (
        <View
            style={{
                height: error ? 58 : 42, 
                width: width, 
                marginTop: 20 }}>
                
            <View style={[styles.container, 
                {
                    borderWidth: error 
                        ? 1 
                        : isFocused 
                        ? 1 
                        : 0, 
                    borderColor: error 
                        ? 'rgba(255, 150, 150, 0.4)' 
                        : isFocused 
                        ? 'rgba(181, 181, 181, 0.2)' 
                        : 'rgba(181, 181, 181, 0)'
                }
                ]}>

                <MaterialCommunityIcons style={styles.icon} name={iconName} size={iconSize} color='rgba(181, 181, 181, 0.6)' />
                
                <TextInput style={{
                    flex: 1,
                    color: 'rgba(181, 181, 181, 0.7)', 
                    fontFamily: font, 
                    fontSize: 15,
                    letterSpacing: 0.1}}

                    secureTextEntry={hidePassword}
                    placeholderTextColor= 'rgba(181, 181, 181, 0.4)' 
                    autoCorrect= {false}
                    onFocus={() => { 
                        onFocus();
                        setisFocused(true); 
                    }}
                    onBlur={() => {
                        setisFocused(false);
                    }}

                    {...props} />

                {password && <TouchableOpacity activeOpacity={0.7} onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons 
                        name={hidePassword ? "eye-outline" : "eye-off-outline"} 
                        size={13} 
                        color="rgba(181, 181, 181, 0.6)" />
                </TouchableOpacity>}

                {validate && <TouchableOpacity activeOpacity={0.7} onPress={() => {validateDevNo()}}>
                    <MaterialCommunityIcons 
                        name="account-question-outline" 
                        size={15} 
                        color="rgba(181, 181, 181, 0.6)" />
                </TouchableOpacity>}

            </View>
            {error && (
                <Text style={{
                    fontFamily: font,
                    color: 'rgba(255, 150, 150, 0.4)',
                    height: 16,
                    fontSize: 12,
                    paddingLeft: 10
                }}>{error}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'rgba(143, 143, 143, 0.15)',
        borderRadius: 50,
        paddingRight: 15,
    },
    icon: {
        marginLeft: 15,
        marginRight: 8,
    },
})

export default CustomInput;