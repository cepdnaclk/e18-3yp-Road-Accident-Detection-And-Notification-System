import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';

import StartupScreen from './app/screens/StartupScreen';
import WelcomeScreen from './app/screens/WelcomeScreen';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <StartupScreen /> */}
      <WelcomeScreen />

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
