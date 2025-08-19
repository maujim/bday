import React from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components';
import { colors } from '../../theme/colors';
import { useAuth } from '../../context/AuthContext';

const settingsItems = [
  'Account Settings',
  'Privacy & Security',
  'Notifications',
  'Birthday Reminders',
  'Import/Export Data',
  'Connected Accounts',
  'Theme Preferences',
  'Language',
  'Support & Help',
  'Terms of Service',
  'Privacy Policy',
  'App Version 1.0.0',
  'View Onboarding',
  'Sign Out',
];

export const SettingsScreen: React.FC = () => {
  const { setOnboardingComplete } = useAuth();

  const handleSettingPress = (item: string) => {
    if (item === 'View Onboarding') {
      setOnboardingComplete(false);
    }
  };

  return (
    <ScreenContainer>
      <ScrollView style={styles.container}>
        {settingsItems.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.settingItem}
            onPress={() => handleSettingPress(item)}
          >
            <Text style={[
              styles.settingText,
              item === 'View Onboarding' && styles.onboardingText
            ]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  settingItem: {
    backgroundColor: colors.card,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginVertical: 4,
    borderRadius: 8,
  },
  settingText: {
    fontSize: 16,
    color: colors.text,
  },
  onboardingText: {
    color: colors.primary,
    fontWeight: '600',
  },
});