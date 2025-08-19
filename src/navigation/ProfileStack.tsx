import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileScreen, SettingsScreen } from '../screens/main';

const Stack = createStackNavigator();

export const ProfileStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ProfileMain" 
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
    </Stack.Navigator>
  );
};