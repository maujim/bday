import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenContainer, PrimaryButton, SecondaryButton } from '../../components';
import { colors } from '../../theme/colors';
import { useAuth } from '../../context/AuthContext';

export const FacebookImportScreen: React.FC = () => {
  const { setOnboardingComplete } = useAuth();

  const handleIWantThis = () => {
    setOnboardingComplete(true);
  };

  const handleSkip = () => {
    setOnboardingComplete(true);
  };

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>👤</Text>
            </View>
          </View>
          
          <Text style={styles.title}>Import from Facebook</Text>
          <Text style={styles.subtitle}>
            Connect with Facebook to automatically import birthdays from your friends and get notified when it's their special day.
          </Text>
          
          <View style={styles.buttonContainer}>
            <PrimaryButton
              title="I want this"
              onPress={handleIWantThis}
            />
            <View style={styles.secondaryButtonContainer}>
              <SecondaryButton
                title="Maybe later"
                onPress={handleSkip}
              />
            </View>
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 48,
    lineHeight: 24,
  },
  buttonContainer: {
    gap: 16,
  },
  secondaryButtonContainer: {
    alignItems: 'center',
  },
});