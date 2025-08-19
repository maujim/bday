import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import { OnboardingStack } from './OnboardingStack';
import { MainTabNavigator } from './MainTabNavigator';
import { CardCreatorModalStack } from './CardCreatorModalStack';

const RootStack = createStackNavigator();

export const RootNavigator: React.FC = () => {
  const { isOnboardingComplete } = useAuth();

  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!isOnboardingComplete ? (
          <RootStack.Screen name="Onboarding" component={OnboardingStack} />
        ) : (
          <>
            <RootStack.Screen name="Main" component={MainTabNavigator} />
            <RootStack.Screen
              name="CardCreatorModal"
              component={CardCreatorModalStack}
              options={{
                presentation: 'modal',
              }}
            />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};