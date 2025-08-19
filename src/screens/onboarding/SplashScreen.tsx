import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenContainer } from '../../components';
import { colors } from '../../theme/colors';

export const SplashScreen: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('PhoneNumber' as never);
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <Text style={styles.logo}>Birthday App</Text>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
  },
});