import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenContainer, StyledTextInput, PrimaryButton, ContactCard } from '../../components';
import { colors } from '../../theme/colors';
import { mockContacts } from '../../api/mockData';

export const PriorityPeopleScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedContactIds, setSelectedContactIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContactSelect = (contactId: string) => {
    setSelectedContactIds(prev => 
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleContinue = () => {
    navigation.navigate('InviteFriends' as never);
  };

  const buttonTitle = selectedContactIds.length > 0 
    ? `Continue with ${selectedContactIds.length} selected`
    : 'Continue';

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <Text style={styles.title}>Priority People</Text>
        <Text style={styles.subtitle}>
          Select the people whose birthdays matter most to you
        </Text>
        
        <View style={styles.searchContainer}>
          <StyledTextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search contacts..."
          />
        </View>
        
        <FlatList
          data={filteredContacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ContactCard
              contact={item}
              isSelected={selectedContactIds.includes(item.id)}
              onSelect={handleContactSelect}
            />
          )}
          style={styles.list}
          showsVerticalScrollIndicator={false}
        />
        
        <View style={styles.buttonContainer}>
          <PrimaryButton
            title={buttonTitle}
            onPress={handleContinue}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  searchContainer: {
    marginBottom: 16,
  },
  list: {
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 16,
  },
});