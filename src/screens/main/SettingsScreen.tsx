import React from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '../../components';
import { colors } from '../../theme/colors';
import { useAuth } from '../../context/AuthContext';

const settingsSections = [
  {
    title: 'Account',
    items: [
      { name: 'Account Settings', icon: 'person-outline' },
      { name: 'Privacy & Security', icon: 'shield-outline' },
      { name: 'Connected Accounts', icon: 'link-outline' },
    ]
  },
  {
    title: 'Preferences',
    items: [
      { name: 'Notifications', icon: 'notifications-outline' },
      { name: 'Birthday Reminders', icon: 'calendar-outline' },
      { name: 'Theme Preferences', icon: 'color-palette-outline' },
      { name: 'Language', icon: 'language-outline' },
    ]
  },
  {
    title: 'Data',
    items: [
      { name: 'Import/Export Data', icon: 'cloud-outline' },
    ]
  },
  {
    title: 'Support',
    items: [
      { name: 'Support & Help', icon: 'help-circle-outline' },
      { name: 'Terms of Service', icon: 'document-text-outline' },
      { name: 'Privacy Policy', icon: 'document-text-outline' },
    ]
  },
  {
    title: 'Debug',
    items: [
      { name: 'View Onboarding', icon: 'play-outline', special: true },
    ]
  },
  {
    title: 'Other',
    items: [
      { name: 'App Version 1.0.0', icon: 'information-circle-outline', disabled: true },
      { name: 'Sign Out', icon: 'log-out-outline', destructive: true },
    ]
  },
];

export const SettingsScreen: React.FC = () => {
  const { setOnboardingComplete } = useAuth();

  const handleSettingPress = (itemName: string) => {
    if (itemName === 'View Onboarding') {
      setOnboardingComplete(false);
    }
  };

  return (
    <ScreenContainer>
      <ScrollView style={styles.container}>
        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity 
                key={itemIndex} 
                style={[
                  styles.settingItem,
                  itemIndex === 0 && styles.firstItem,
                  itemIndex === section.items.length - 1 && styles.lastItem,
                  section.items.length === 1 && styles.singleItem
                ]}
                onPress={() => handleSettingPress(item.name)}
                disabled={item.disabled}
              >
                <View style={styles.settingContent}>
                  <View style={styles.settingLeft}>
                    <Ionicons 
                      name={item.icon as any} 
                      size={20} 
                      color={
                        item.disabled ? colors.disabled :
                        item.destructive ? colors.error :
                        item.special ? colors.primary :
                        colors.textSecondary
                      } 
                      style={styles.settingIcon}
                    />
                    <Text style={[
                      styles.settingText,
                      item.disabled && styles.disabledText,
                      item.destructive && styles.destructiveText,
                      item.special && styles.specialText
                    ]}>
                      {item.name}
                    </Text>
                  </View>
                  {!item.disabled && (
                    <Ionicons 
                      name="chevron-forward" 
                      size={16} 
                      color={colors.textSecondary} 
                    />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  settingItem: {
    backgroundColor: colors.card,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginVertical: 0,
  },
  firstItem: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  lastItem: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  singleItem: {
    borderRadius: 12,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    marginRight: 12,
    width: 20,
  },
  settingText: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
  },
  disabledText: {
    color: colors.disabled,
  },
  destructiveText: {
    color: colors.error,
  },
  specialText: {
    color: colors.primary,
    fontWeight: '600',
  },
});