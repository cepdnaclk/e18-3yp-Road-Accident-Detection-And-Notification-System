import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import StartupScreen from './app/screens/StartupScreen';
// import WelcomeScreen from './app/screens/WelcomeScreen';
// import LoginScreen from './app/screens/LoginScreen';
// import SignUpScreen from './app/screens/SignUpScreen';
// import DriverHomeScreen from './app/screens/DriverHomeScreen';
// import AmbulanceHomeScreen from './app/screens/AmbulanceHomeScreen';
import Navigation from './app/components/Navigation';
import { AuthProvider } from './app/context/AuthContext';

const Stack = createNativeStackNavigator();

export default function App() {
  // const { userInfo } = useContext(AuthContext);
  // console.log(userInfo);

  return (
    <AuthProvider>
      {/* <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name='StartUp' component={StartupScreen}/>
          <Stack.Screen name='Welcome' component={WelcomeScreen}/>
          <Stack.Screen name='Login' component={LoginScreen}/>
          <Stack.Screen name='SignUp' component={SignUpScreen}/>

          <Stack.Screen name='DriverHome' component={DriverHomeScreen}/>
          <Stack.Screen name='AmbulanceHome' component={AmbulanceHomeScreen}/>

        </Stack.Navigator>
      </NavigationContainer> */}
      <Navigation />
    </AuthProvider>
  );
}

