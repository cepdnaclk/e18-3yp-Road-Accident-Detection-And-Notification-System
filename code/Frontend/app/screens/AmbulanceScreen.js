import React from 'react';
import { View } from 'react-native';
import AmbulanceTabs from '../navigation/AmbulanceTab';

function AmbulanceScreen(props) {
    return (
        <View style={{flex: 1}}>
            <AmbulanceTabs />
        </View>
    );
}

export default AmbulanceScreen;