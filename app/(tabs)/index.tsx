import { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, Modal, Alert, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { BirthdayCard } from '@/components/BirthdayCard';
import { BirthdayForm } from '@/components/BirthdayForm';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useBirthdays } from '@/hooks/useBirthdays';
import { BirthdayWithDaysUntil } from '@/types/birthday';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function BirthdaysScreen() {
  const { 
    birthdays, 
    loading, 
    error, 
    deleteBirthday, 
    updateBirthday, 
    refreshBirthdays 
  } = useBirthdays();
  
  const [editingBirthday, setEditingBirthday] = useState<BirthdayWithDaysUntil | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const backgroundColor = useThemeColor({}, 'background');
  const tintColor = useThemeColor({}, 'tint');

  const handleEditBirthday = (birthday: BirthdayWithDaysUntil) => {
    setEditingBirthday(birthday);
    setShowEditModal(true);
  };

  const handleUpdateBirthday = async (formData: any) => {
    if (!editingBirthday) return;
    
    try {
      await updateBirthday(editingBirthday.id, formData);
      setShowEditModal(false);
      setEditingBirthday(null);
    } catch {
      // Error handling is done in the hook
    }
  };

  const handleDeleteBirthday = async (birthday: BirthdayWithDaysUntil) => {
    try {
      await deleteBirthday(birthday.id);
    } catch {
      Alert.alert('Error', 'Failed to delete birthday');
    }
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setEditingBirthday(null);
  };

  const renderEmptyState = () => (
    <ThemedView style={styles.emptyState}>
      <IconSymbol name="gift" size={64} color={tintColor} />
      <ThemedText type="title" style={styles.emptyTitle}>
        No Birthdays Yet
      </ThemedText>
      <ThemedText style={styles.emptySubtitle}>
        Tap the &quot;Add Birthday&quot; tab to get started!
      </ThemedText>
    </ThemedView>
  );

  const renderBirthdayItem = ({ item }: { item: BirthdayWithDaysUntil }) => (
    <BirthdayCard
      birthday={item}
      onPress={() => handleEditBirthday(item)}
      onDelete={() => handleDeleteBirthday(item)}
    />
  );

  const todaysBirthdays = birthdays.filter(b => b.isToday);

  if (error) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor }]}>
        <ThemedView style={styles.errorContainer}>
          <IconSymbol name="exclamationmark.triangle" size={48} color="#ff4444" />
          <ThemedText type="subtitle" style={styles.errorText}>
            Something went wrong
          </ThemedText>
          <ThemedText style={styles.errorSubtext}>
            {error}
          </ThemedText>
          <TouchableOpacity 
            style={[styles.retryButton, { backgroundColor: tintColor }]}
            onPress={refreshBirthdays}
          >
            <ThemedText style={styles.retryButtonText}>Try Again</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Birthdays 🎉</ThemedText>
        {birthdays.length > 0 && (
          <ThemedText style={styles.subtitle}>
            {birthdays.length} birthday{birthdays.length !== 1 ? 's' : ''} tracked
          </ThemedText>
        )}
      </ThemedView>

      {birthdays.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={birthdays}
          keyExtractor={(item) => item.id}
          renderItem={renderBirthdayItem}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl 
              refreshing={loading} 
              onRefresh={refreshBirthdays}
              tintColor={tintColor}
            />
          }
          ListHeaderComponent={
            todaysBirthdays.length > 0 ? (
              <ThemedView style={styles.sectionHeader}>
                <ThemedText type="subtitle" style={styles.sectionTitle}>
                  Today&apos;s Birthdays 🎂
                </ThemedText>
              </ThemedView>
            ) : null
          }
        />
      )}

      <Modal
        visible={showEditModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={[styles.modalContainer, { backgroundColor }]}>
          <BirthdayForm
            initialData={editingBirthday || undefined}
            onSubmit={handleUpdateBirthday}
            onCancel={handleCloseModal}
            submitButtonText="Update"
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 4,
  },
  list: {
    paddingBottom: 16,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    textAlign: 'center',
    opacity: 0.7,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  errorText: {
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  errorSubtext: {
    textAlign: 'center',
    opacity: 0.7,
    marginBottom: 24,
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
  },
});
