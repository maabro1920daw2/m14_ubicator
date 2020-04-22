import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; //Contiene las rutas
import { createStackNavigator } from '@react-navigation/stack'; //Crea la pila del navegador

import {HomeView} from './app/views/HomeView';
import {MarkerView} from './app/views/MarkerView';
import {CameraView} from './app/views/CameraView';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator initialRouteName="Ubicator">
        <Stack.Screen name="Ubicator" component={HomeView} />
        <Stack.Screen name="Info" component={MarkerView} />
        <Stack.Screen name="Camera" component={CameraView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
