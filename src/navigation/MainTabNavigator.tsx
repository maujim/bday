import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreen, CalendarScreen, GiftsScreen } from '../screens/main';
import { ProfileStack } from './ProfileStack';
import { colors } from '../theme/colors';

const Tab = createBottomTabNavigator();

const FloatingActionButton: React.FC = () => {
  const navigation = useNavigation();
  
  const handlePress = () => {
    navigation.navigate('CardCreatorModal' as never);
  };

  return (
    <TouchableOpacity style={styles.fab} onPress={handlePress}>
      <Ionicons name="add" size={32} color={colors.white} />
    </TouchableOpacity>
  );
};

export const MainTabNavigator: React.FC = () => {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            switch (route.name) {
              case 'Home':
                iconName = focused ? 'home' : 'home-outline';
                break;
              case 'Calendar':
                iconName = focused ? 'calendar' : 'calendar-outline';
                break;
              case 'Gifts':
                iconName = focused ? 'gift' : 'gift-outline';
                break;
              case 'Profile':
                iconName = focused ? 'person' : 'person-outline';
                break;
              default:
                iconName = 'home-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarStyle: styles.tabBar,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="Gifts" component={GiftsScreen} />
        <Tab.Screen name="Profile" component={ProfileStack} />
      </Tab.Navigator>
      
      <FloatingActionButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: colors.card,
    borderTopColor: colors.border,
    paddingBottom: 8,
    paddingTop: 8,
    height: 70,
  },
  fab: {
    position: 'absolute',
    bottom: 35,
    alignSelf: 'center',
    backgroundColor: colors.primary,
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});