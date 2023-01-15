import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

function DeviceSettingScreen(props) {

    return (
        <View style={{flex: 1, backgroundColor: '#2E335A', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{marginBottom: 30, color: '#DBDBDB', fontSize: 16}}>
                Device Setting screen
            </Text>
        </View>
    );
}

export default DeviceSettingScreen;
// -----------------------------------------------

// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

// function DeviceSettingScreen(props) {

//     const [boxHeight, setBoxHeight] = useState(new Animated.Value(50));
//   const [expanded, setExpanded] = useState(false);

//   const handlePress = () => {
//     if (!expanded) {
//       Animated.timing(boxHeight, {
//         toValue: 150,
//         duration: 300,
//       }).start();
//     } else {
//       Animated.timing(boxHeight, {
//         toValue: 50,
//         duration: 300,
//       }).start();
//     }
//     setExpanded(!expanded);
//   }

//   return (
//     <View style={styles.container}>
//       <Animated.View style={[styles.box, {height: boxHeight}]}>
//         <Text>Hello World</Text>
//       </Animated.View>
//       <TouchableOpacity onPress={handlePress}>
//         <Text>Press to expand</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     box: {
//         position: 'absolute',
//         zIndex: 10,
//         height: '8%',
//         width: '95%',
//         backgroundColor: 'rgba(90, 93, 125, 0.55)',
//         borderRadius: 15,
//         top: 50,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         paddingRight: 8,
//     },
//   });

// export default DeviceSettingScreen;
