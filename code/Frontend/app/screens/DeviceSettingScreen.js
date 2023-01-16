// import React, { useContext, useEffect } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';

// function DeviceSettingScreen(props) {

//     return (
//         <View style={{flex: 1, backgroundColor: '#2E335A', alignItems: 'center', justifyContent: 'center'}}>
//             <Text style={{marginBottom: 30, color: '#DBDBDB', fontSize: 16}}>
//                 Device Setting screen
//             </Text>
//         </View>
//     );
// }

// export default DeviceSettingScreen;
// -----------------------------------------------

import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';

import * as Location from 'expo-location';

export default function DeviceSettingScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>{text}</Text>
    </View>
  );
}

