import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import DriverHomeScreen from "../screens/DriverHomeScreen";
import AccountSettingScreen from "../screens/AccountSettingScreen";
import DeviceSettingScreen from "../screens/DeviceSettingScreen";

const Tab = createBottomTabNavigator();

function DriverTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions= {{ 
        headerShown: false,
        tabBarActiveTintColor: '#0497E0',
        tabBraInactiveTintColor: 'gray',
        
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
      <Tab.Screen
        name="Home"
        component={DriverHomeScreen}
        options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                size *= 0.9;
                if (focused) {
                    iconName = 'ios-home';
                } else {
                    iconName = 'ios-home-outline';
                }
                return <Ionicons name={iconName} color={color} size={size} />;
            },
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountSettingScreen}
        options={{
            tabBarLabel: 'Account',
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                size *= 0.9;
                if (focused) {
                    iconName = 'ios-person';
                } else {
                    iconName = 'ios-person-outline';
                }
                return <Ionicons name={iconName} color={color} size={size} />;
            },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={DeviceSettingScreen}
        options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                size *= 0.9;
                if (focused) {
                    iconName = 'ios-settings';
                } else {
                    iconName = 'ios-settings-outline';
                }
                return <Ionicons name={iconName} color={color} size={size} />;
            },
        }}
      />
    </Tab.Navigator>
  );
}

export default DriverTabs;