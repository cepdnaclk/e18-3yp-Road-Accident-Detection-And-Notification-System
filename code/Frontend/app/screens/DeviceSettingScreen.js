import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { AuthContext } from '../context/AuthContext';

function DeviceSettingScreen(props) {
    const { userInfo, Logout } = useContext(AuthContext);

    useEffect(() => {
        console.log(userInfo)
    }, [])

    return (
        <View style={{flex: 1, backgroundColor: '#2E335A', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{marginBottom: 30, color: '#DBDBDB', fontSize: 16}}>
                Device Setting screen
            </Text>
        </View>
    );
}

export default DeviceSettingScreen;