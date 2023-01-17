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

// import React, { useState, useEffect } from 'react';
// import { Platform, Text, View, StyleSheet } from 'react-native';

// import * as Location from 'expo-location';

// export default function DeviceSettingScreen() {
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);

//   useEffect(() => {
//     (async () => {
      
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setErrorMsg('Permission to access location was denied');
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       setLocation(location);
//     })();
//   }, []);

//   let text = 'Waiting..';
//   if (errorMsg) {
//     text = errorMsg;
//   } else if (location) {
//     text = JSON.stringify(location);
//   }

//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text>{text}</Text>
//     </View>
//   );
// }

//------------------------------
import React, { useState, useRef } from 'react';
import { View, Button, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const styles = {
  container: {
    flex: 1,
  },
};

const DeviceSettingScreen = () => {
  const [coordinates, setCoordinates] = useState([]);
  const mapRef = useRef(null);

  const handleAddPoint = (newPoint) => {
    setCoordinates([...coordinates, newPoint]);
    mapRef.current.fitToCoordinates([...coordinates, newPoint], {
      edgePadding: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      },
      animated: true,
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={{width: '100%', height: '100%'}}
      >
        {coordinates.map((coordinate) => (
          <Marker
            key={coordinate.latitude}
            coordinate={coordinate}
          />
        ))}
      </MapView>
      <Button
        title="Add Point"
        onPress={() => handleAddPoint({
          latitude: 6.12646,
          longitude: 80.20395,
        })}
      />
      <TouchableOpacity 
        style={{position: 'absolute', bottom: 100}}
        onPress={() => handleAddPoint({
            latitude: 6.32646,
            longitude: 81.30395,
          })}
        >
        <Text>Add point</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DeviceSettingScreen;



