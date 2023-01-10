import React, { useContext } from 'react';
import { View, Text } from 'react-native';

import { AuthContext } from '../context/AuthContext';

function AccountSettingScreen(props) {
    const { userInfo, Logout } = useContext(AuthContext);

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{marginBottom: 30}}>
                Account Setting screen
            </Text>
            <Text style={{backgroundColor: 'gray', padding: 6, borderRadius: 8}} onPress={() => {Logout}}>
                Sign out Account
            </Text>

        </View>
    );
}

export default AccountSettingScreen;