import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/context/AuthContext';
import { RootNavigator } from './src/navigation';

export default function App() {
  return (
    <AuthProvider>
      <RootNavigator />
      <StatusBar style="light" />
    </AuthProvider>
  );
}