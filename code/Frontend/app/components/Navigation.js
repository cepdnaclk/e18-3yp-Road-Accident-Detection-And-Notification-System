import React, { useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StartupScreen from '../screens/StartupScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import DriverScreen from '../screens/DriverScreen';
import AmbulanceScreen from '../screens/AmbulanceScreen';
import EmergencyScreen from '../screens/EmergencyScreen';
import { AuthContext } from '../context/AuthContext';

const Stack = createNativeStackNavigator();

function Navigation(props) {
    const { userInfo } = useContext(AuthContext);

    return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName='StartUp'screenOptions={{headerShown: false}}>

        {userInfo.token ? (
          userInfo.userState === 0 ? (
            <Stack.Screen name='Ambulance' component={AmbulanceScreen}/>
          ) : userInfo.userState === 1 ? (
            <Stack.Screen name='Driver' component={DriverScreen}/>
          ) : userInfo.userState === 2 ? (
            <Stack.Screen name='Emergency' component={EmergencyScreen}/>
          ) : (
            <Stack.Screen name='Welcome' component={WelcomeScreen}/>
          )) : (
            <>
              <Stack.Screen name='Welcome' component={WelcomeScreen}/>
              <Stack.Screen name='Login' component={LoginScreen}/>
              <Stack.Screen name='SignUp' component={SignUpScreen}/>
            </>
          )}
          
        </Stack.Navigator>
      </NavigationContainer>
    );
}

export default Navigation;