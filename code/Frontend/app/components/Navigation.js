import React, { useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StartupScreen from '../screens/StartupScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import DriverHomeScreen from '../screens/DriverHomeScreen';
import AmbulanceHomeScreen from '../screens/AmbulanceHomeScreen';
import { AuthContext } from '../context/AuthContext';

const Stack = createNativeStackNavigator();

function Navigation(props) {
    const { userInfo } = useContext(AuthContext);

    return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName='StartUp'screenOptions={{headerShown: false}}>
        <Stack.Screen name='StartUp' component={StartupScreen}/>

        {userInfo.token ? (
          <>
            <Stack.Screen name='DriverHome' component={DriverHomeScreen}/>
            <Stack.Screen name='AmbulanceHome' component={AmbulanceHomeScreen}/>
          </>
        ) : (
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