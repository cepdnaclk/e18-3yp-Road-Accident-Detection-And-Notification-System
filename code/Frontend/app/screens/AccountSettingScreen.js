import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import { AuthContext } from '../context/AuthContext';

function AccountSettingScreen(props) {
    const { isLoading, userInfo, Logout } = useContext(AuthContext);

    useEffect(() => {
        console.log(userInfo)
    }, [])

    function callLogout () {
        Logout()
    }

    return (
        <View style={{flex: 1, backgroundColor: '#2E335A', alignItems: 'center', justifyContent: 'center'}}>
            <Spinner visible={isLoading} />
            <Text style={{marginBottom: 30, color: '#DBDBDB', fontSize: 16}}>
                Account Setting screen
            </Text>
            <TouchableOpacity onPress={() => { callLogout() }}>
                <Text style={{backgroundColor: '#5037A9', color: 'white', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8}} >
                    Sign out Account
                </Text>
            </TouchableOpacity>

        </View>
    );
}

export default AccountSettingScreen;