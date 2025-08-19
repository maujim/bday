import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  SplashScreen,
  PhoneNumberScreen,
  VerificationScreen,
  ContactsPermissionScreen,
  LoadingDataScreen,
  PriorityPeopleScreen,
  InviteFriendsScreen,
  FacebookImportScreen,
} from '../screens/onboarding';

const Stack = createStackNavigator();

export const OnboardingStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="PhoneNumber" component={PhoneNumberScreen} />
      <Stack.Screen name="Verification" component={VerificationScreen} />
      <Stack.Screen name="ContactsPermission" component={ContactsPermissionScreen} />
      <Stack.Screen name="LoadingData" component={LoadingDataScreen} />
      <Stack.Screen name="PriorityPeople" component={PriorityPeopleScreen} />
      <Stack.Screen 
        name="InviteFriends" 
        component={InviteFriendsScreen}
        options={{ headerShown: true, title: 'Invite Friends' }}
      />
      <Stack.Screen name="FacebookImport" component={FacebookImportScreen} />
    </Stack.Navigator>
  );
};