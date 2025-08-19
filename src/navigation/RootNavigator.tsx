import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import { OnboardingStack } from './OnboardingStack';
import { MainTabNavigator } from './MainTabNavigator';
import { CardCreatorModalStack } from './CardCreatorModalStack';

const RootStack = createStackNavigator();

export const RootNavigator: React.FC = () => {
  const { isOnboardingComplete } = useAuth();
  const [isCardCreatorVisible, setIsCardCreatorVisible] = useState(false);

  const handleCardCreatorPress = () => {
    setIsCardCreatorVisible(true);
  };

  const handleCardCreatorClose = () => {
    setIsCardCreatorVisible(false);
  };

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
          <RootStack.Screen name="Main">
            {() => <MainTabNavigator onCardCreatorPress={handleCardCreatorPress} />}
          </RootStack.Screen>
        )}
        
        {isCardCreatorVisible && (
          <RootStack.Screen
            name="CardCreatorModal"
            component={CardCreatorModalStack}
            options={{
              presentation: 'modal',
              headerShown: false,
            }}
            listeners={{
              beforeRemove: handleCardCreatorClose,
            }}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};