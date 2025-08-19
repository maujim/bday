import React from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenContainer, PrimaryButton, SecondaryButton } from '../../components';
import { colors } from '../../theme/colors';

export const ContactsPermissionScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleContinue = () => {
    navigation.navigate('LoadingData' as never);
  };

  const handleDontAllow = () => {
    navigation.navigate('LoadingData' as never);
  };

  return (
    <ScreenContainer>
      <View style={styles.background}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
        </View>
        
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>
              "Birthday App" Would Like to Access Your Contacts
            </Text>
            <Text style={styles.modalSubtitle}>
              We'll help you find friends who are already using the app and suggest people to invite.
            </Text>
            
            <View style={styles.buttonContainer}>
              <PrimaryButton
                title="Continue"
                onPress={handleContinue}
              />
              <View style={styles.secondaryButtonContainer}>
                <SecondaryButton
                  title="Don't Allow"
                  onPress={handleDontAllow}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.background,
  },
  avatarContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 60,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modal: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  modalSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 20,
  },
  buttonContainer: {
    gap: 16,
  },
  secondaryButtonContainer: {
    alignItems: 'center',
  },
});