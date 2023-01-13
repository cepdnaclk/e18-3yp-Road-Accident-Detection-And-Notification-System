import React from 'react';
import { View } from 'react-native';
import EmergencyTab from '../navigation/EmergencyTab';

function EmergencyScreen(props) {
    return (
        <View style={{flex: 1}}>
            <EmergencyTab />
        </View>
    );
}

export default EmergencyScreen;