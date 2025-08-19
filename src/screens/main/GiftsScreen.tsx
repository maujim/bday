import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenContainer } from '../../components';
import { colors } from '../../theme/colors';

export const GiftsScreen: React.FC = () => {
  return (
    <ScreenContainer>
      <View style={styles.container}>
        <Text style={styles.title}>My Gifts</Text>
        
        <View style={styles.giftContainer}>
          <View style={styles.giftItem}>
            <View style={styles.giftIcon}>
              <Text style={styles.giftEmoji}>🎁</Text>
            </View>
            <View style={styles.giftInfo}>
              <Text style={styles.giftDate}>Sep 26 2025</Text>
              <Text style={styles.giftDescription}>Birthday gift sent</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>
            Your gift history will appear here
          </Text>
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
    marginBottom: 24,
  },
  giftContainer: {
    marginBottom: 20,
  },
  giftItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
  },
  giftIcon: {
    width: 48,
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  giftEmoji: {
    fontSize: 24,
  },
  giftInfo: {
    flex: 1,
  },
  giftDate: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  giftDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});