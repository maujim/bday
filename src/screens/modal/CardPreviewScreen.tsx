import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenContainer, PrimaryButton } from '../../components';
import { colors } from '../../theme/colors';

export const CardPreviewScreen: React.FC = () => {
  const navigation = useNavigation();

  const handlePlayOneOut = () => {
    // In a real app, this would handle the card creation/sending logic
    navigation.navigate('Main' as never);
  };

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <Text style={styles.title}>Card Preview</Text>
        
        <View style={styles.cardPreview}>
          <View style={styles.cardContainer}>
            <Text style={styles.cardEmoji}>🎂</Text>
            <Text style={styles.cardText}>Happy Birthday!</Text>
            <Text style={styles.cardSubtext}>Hope your day is amazing!</Text>
          </View>
        </View>
        
        <View style={styles.buttonContainer}>
          <PrimaryButton
            title="Let's Play One Out!"
            onPress={handlePlayOneOut}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 40,
  },
  cardPreview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    minWidth: 280,
    minHeight: 200,
    justifyContent: 'center',
  },
  cardEmoji: {
    fontSize: 60,
    marginBottom: 20,
  },
  cardText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.background,
    marginBottom: 8,
    textAlign: 'center',
  },
  cardSubtext: {
    fontSize: 16,
    color: colors.disabled,
    textAlign: 'center',
  },
  buttonContainer: {
    paddingBottom: 40,
  },
});