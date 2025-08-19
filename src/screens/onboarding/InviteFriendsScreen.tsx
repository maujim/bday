import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenContainer } from '../../components';

export const InviteFriendsScreen: React.FC = () => {
  return (
    <ScreenContainer>
      <View style={styles.container}>
        <Text style={styles.title}>Invite Friends Screen</Text>
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
  title: {
    fontSize: 24,
    color: '#FFFFFF',
  },
});