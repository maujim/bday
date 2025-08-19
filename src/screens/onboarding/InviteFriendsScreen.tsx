import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenContainer, PrimaryButton, SecondaryButton, ContactCard } from '../../components';
import { colors } from '../../theme/colors';
import { mockContacts } from '../../api/mockData';

export const InviteFriendsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedContactIds] = useState<string[]>(['1', '3', '5']); // Mock selected friends

  const selectedContacts = mockContacts.filter(contact => 
    selectedContactIds.includes(contact.id)
  );

  const handleSendInvites = () => {
    navigation.navigate('FacebookImport' as never);
  };

  const handleSkip = () => {
    navigation.navigate('FacebookImport' as never);
  };

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <Text style={styles.title}>Invite Friends</Text>
        <Text style={styles.subtitle}>
          Send invites to your priority people so they can join Birthday App
        </Text>
        
        <FlatList
          data={selectedContacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ContactCard
              contact={item}
              isSelected={true}
              onSelect={() => {}} // Read-only in this screen
            />
          )}
          style={styles.list}
          showsVerticalScrollIndicator={false}
        />
        
        <View style={styles.buttonContainer}>
          <PrimaryButton
            title="Send Invites"
            onPress={handleSendInvites}
          />
          <View style={styles.secondaryButtonContainer}>
            <SecondaryButton
              title="Nah, not right now"
              onPress={handleSkip}
            />
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
  list: {
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 16,
    gap: 16,
  },
  secondaryButtonContainer: {
    alignItems: 'center',
  },
});