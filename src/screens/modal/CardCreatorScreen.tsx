import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenContainer } from '../../components';
import { colors } from '../../theme/colors';

const cardTemplates = [
  { id: '1', name: 'Birthday Cake', preview: '🎂' },
  { id: '2', name: 'Party Hat', preview: '🎉' },
  { id: '3', name: 'Balloons', preview: '🎈' },
  { id: '4', name: 'Gift Box', preview: '🎁' },
  { id: '5', name: 'Confetti', preview: '🎊' },
  { id: '6', name: 'Flowers', preview: '🌸' },
];

export const CardCreatorScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleCardSelect = (cardId: string) => {
    navigation.navigate('CardPreview' as never, { cardId });
  };

  const renderCardTemplate = ({ item }: { item: typeof cardTemplates[0] }) => (
    <TouchableOpacity 
      style={styles.cardTemplate} 
      onPress={() => handleCardSelect(item.id)}
    >
      <View style={styles.cardPreview}>
        <Text style={styles.cardEmoji}>{item.preview}</Text>
      </View>
      <Text style={styles.cardName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <Text style={styles.title}>Choose a Card Template</Text>
        <Text style={styles.subtitle}>
          Select a template to create your birthday card
        </Text>
        
        <FlatList
          data={cardTemplates}
          renderItem={renderCardTemplate}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
        />
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  grid: {
    paddingHorizontal: 10,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cardTemplate: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    width: '48%',
    aspectRatio: 0.8,
    justifyContent: 'center',
  },
  cardPreview: {
    width: 80,
    height: 80,
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  cardEmoji: {
    fontSize: 40,
  },
  cardName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
});