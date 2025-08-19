import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CardCreatorScreen, CardPreviewScreen } from '../screens/modal';

const Stack = createStackNavigator();

export const CardCreatorModalStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="CardCreator" 
        component={CardCreatorScreen}
        options={{ title: 'Create Card' }}
      />
      <Stack.Screen 
        name="CardPreview" 
        component={CardPreviewScreen}
        options={{ title: 'Preview Card' }}
      />
    </Stack.Navigator>
  );
};