import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Navigation from './app/components/Navigation';
import { AuthProvider } from './app/context/AuthContext';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}

