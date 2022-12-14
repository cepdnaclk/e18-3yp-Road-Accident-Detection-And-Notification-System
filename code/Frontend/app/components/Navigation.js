import React, { useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StartupScreen from '../screens/StartupScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import DriverHomeScreen from '../screens/DriverHomeScreen';
import AmbulanceHomeScreen from '../screens/AmbulanceHomeScreen';
import EmergencyHomeScreen from '../screens/EmergencyHomeScreen';
import { AuthContext } from '../context/AuthContext';

const Stack = createNativeStackNavigator();

function Navigation(props) {
    const { userInfo } = useContext(AuthContext);

    return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName='StartUp'screenOptions={{headerShown: false}}>
        <Stack.Screen name='StartUp' component={StartupScreen}/>

        {userInfo.token ? (
          userInfo.userState === 0 ? (
            <Stack.Screen name='AmbulanceHome' component={AmbulanceHomeScreen}/>
          ) : userInfo.userState === 1 ? (
            <Stack.Screen name='DriverHome' component={DriverHomeScreen}/>
          ) : userInfo.userState === 2 ? (
            <Stack.Screen name='EmergencyHome' component={EmergencyHomeScreen}/>
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