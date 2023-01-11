import React from 'react';
import { View } from 'react-native';
import DriverTabs from '../navigation/DriverTabs';

function DriverScreen(props) {
    return (
        <View style={{flex: 1}}>
            <DriverTabs />
        </View>
    );
}

export default DriverScreen;