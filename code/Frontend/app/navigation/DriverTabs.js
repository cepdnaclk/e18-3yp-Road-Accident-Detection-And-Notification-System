import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Ionicons } from '@expo/vector-icons';

import DriverHomeScreen from "../screens/DriverHomeScreen";
import AccountSettingScreen from "../screens/AccountSettingScreen";
import DeviceSettingScreen from "../screens/DeviceSettingScreen";

const Tab = createBottomTabNavigator();

const DriverTabs = () => {
    return (
        <Tab.Navigator
            screenOptions= {{ 
                headerShown: false,
                tabBarShowLabel: false,
                tabBarShowIcon: true,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 18,
                    left: 15,
                    right: 15,
                    elevation: 0,
                    borderRadius: 15,
                    height: 60,
                    backgroundColor: 'rgba(34, 35, 63, 0.8)',

                    // shadowColor: 'rgba(34, 35, 63, 1)',
                    // shadowOffset: {
                    //     width: 0,
                    //     height: 10,
                    // },
                    // shadowOpacity: 0.25,
                    // shadowRadius: 3.5,
                    // elevation: 5, 
                },
                // tabBarStyle: {
                //     position: 'absolute',
                //     bottom: 0,
                //     borderRadius: 2,
                //     height: 55,
                //     backgroundColor: 'rgba(34, 35, 63, 0.9)',
                // }
            }}
        >
            <Tab.Screen name='Home' component={DriverHomeScreen} options={{
                tabBarIcon: ({focused}) => {
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        {focused ? (
                            <Ionicons name="home" size={25} color="black" />
                        ) : (
                            <AntDesign name="home" size={25} color="black" />
                        )}
                    </View>
                }
            }} />
            <Tab.Screen name='Account' component={AccountSettingScreen} />
            <Tab.Screen name='DeviceSettings' component={DeviceSettingScreen} />
        </Tab.Navigator>
    );
}

export default DriverTabs;