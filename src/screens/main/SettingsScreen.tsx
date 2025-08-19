import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { ScreenContainer } from '../../components';
import { colors } from '../../theme/colors';

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
  'Sign Out',
];

export const SettingsScreen: React.FC = () => {
  return (
    <ScreenContainer>
      <ScrollView style={styles.container}>
        {settingsItems.map((item, index) => (
          <View key={index} style={styles.settingItem}>
            <Text style={styles.settingText}>{item}</Text>
          </View>
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
});