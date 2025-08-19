import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { Contact } from '../api/mockData';

interface ContactCardProps {
  contact: Contact;
  isSelected: boolean;
  onSelect: (contactId: string) => void;
}

export const ContactCard: React.FC<ContactCardProps> = ({ 
  contact, 
  isSelected, 
  onSelect 
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {contact.name.split(' ').map(n => n[0]).join('').toUpperCase()}
          </Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{contact.name}</Text>
          <Text style={styles.birthday}>Birthday: {contact.birthday}</Text>
        </View>
      </View>
      
      <View style={styles.rightSection}>
        <View style={styles.daysContainer}>
          <Text style={styles.daysText}>{contact.daysLeft}</Text>
          <Text style={styles.daysLabel}>days</Text>
        </View>
        <TouchableOpacity 
          style={styles.starButton} 
          onPress={() => onSelect(contact.id)}
        >
          <Text style={[styles.star, isSelected && styles.selectedStar]}>
            {isSelected ? '★' : '☆'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  info: {
    flex: 1,
  },
  name: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  birthday: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  rightSection: {
    alignItems: 'center',
  },
  daysContainer: {
    backgroundColor: colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 8,
    minWidth: 40,
    alignItems: 'center',
  },
  daysText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  daysLabel: {
    color: colors.white,
    fontSize: 10,
  },
  starButton: {
    padding: 4,
  },
  star: {
    fontSize: 24,
    color: colors.textSecondary,
  },
  selectedStar: {
    color: colors.star,
  },
});