import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';

import StartupScreen from './app/screens/StartupScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <StartupScreen />
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
