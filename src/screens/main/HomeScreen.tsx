import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenContainer, StyledTextInput } from '../../components';

export const HomeScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <StyledTextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search for friends..."
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
  searchContainer: {
    marginBottom: 20,
  },
});