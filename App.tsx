import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { registerRootComponent } from 'expo';
import { AuthProvider } from './src/context/AuthContext';
import { RootNavigator } from './src/navigation';

function App() {
  return (
    <AuthProvider>
      <RootNavigator />
      <StatusBar style="light" />
    </AuthProvider>
  );
}

export default registerRootComponent(App);