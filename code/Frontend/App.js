import React, { useState, useEffect } from 'react';
import { hideAsync } from 'expo-splash-screen';

import Navigation from './app/components/Navigation';
import { AuthProvider } from './app/context/AuthContext';
import StartupScreen from './app/screens/StartupScreen';


export default function App() {

  // const [isLoadingSplash, setIsLoadingSplash] = useState(true);

  // useEffect(() => {
  //   setTimeout(async () => {
  //     hideAsync().catch(console.warn);
  //     setIsLoadingSplash(false);
  //   }, 2500);
  // }, []);

  return (
    // <AuthProvider>
    //   {isLoadingSplash && <StartupScreen />}
    //   {!isLoadingSplash &&  <Navigation /> }
    // </AuthProvider>
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}

