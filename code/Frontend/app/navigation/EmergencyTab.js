import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import EmergencyHome from '../screens/EmergencyHomeScreen';
import AccountSettingScreen from "../screens/AccountSettingScreen";

const Tab = createBottomTabNavigator();

function EmergencyTab() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions= {{ 
        headerShown: false,
        tabBarActiveTintColor: '#0497E0',
        tabBraInactiveTintColor: 'gray',
        
        tabBarShowLabel: false,
        tabBarShowIcon: true,
        // tabBarStyle: {
        //     position: 'absolute',
        //     bottom: 18,
        //     left: 15,
        //     right: 15,
        //     elevation: 0,
        //     borderRadius: 15,
        //     height: 60,
        //     backgroundColor: 'rgba(34, 35, 63, 0.9)',

        //     // shadowColor: 'rgba(34, 35, 63, 1)',
        //     // shadowOffset: {
        //     //     width: 0,
        //     //     height: 10,
        //     // },
        //     // shadowOpacity: 0.25,
        //     // shadowRadius: 3.5,
        //     // elevation: 5, 
        // },
        tabBarStyle: {
            position: 'absolute',
            bottom: 0,
            borderRadius: 2,
            height: 55,
            backgroundColor: 'rgba(34, 35, 63, 0.96)',
        }
    }}
    >
      <Tab.Screen
        name="Home"
        component={EmergencyHome}
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
    </Tab.Navigator>
  );
}

export default EmergencyTab;