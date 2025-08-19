import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenContainer } from '../../components';
import { colors } from '../../theme/colors';

export const LoadingDataScreen: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('PriorityPeople' as never);
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.illustration}>
          <Text style={styles.koala}>🐨</Text>
        </View>
        <Text style={styles.title}>Sit Tight!</Text>
        <Text style={styles.subtitle}>
          We're loading your contacts and setting things up...
        </Text>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  illustration: {
    marginBottom: 40,
  },
  koala: {
    fontSize: 80,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
});