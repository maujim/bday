import { Alert, StyleSheet } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BirthdayForm } from '@/components/BirthdayForm';
import { ThemedView } from '@/components/ThemedView';
import { useBirthdays } from '@/hooks/useBirthdays';
import { useThemeColor } from '@/hooks/useThemeColor';
import { BirthdayFormData } from '@/types/birthday';

export default function AddBirthdayScreen() {
  const { addBirthday } = useBirthdays();
  const backgroundColor = useThemeColor({}, 'background');

  const handleAddBirthday = async (formData: BirthdayFormData) => {
    try {
      await addBirthday(formData);
      Alert.alert(
        'Success! 🎉', 
        `${formData.name}'s birthday has been added to your list!`,
        [{ text: 'OK' }]
      );
    } catch (error) {
      // Error handling is done in the hook
      throw error; // Re-throw to show form error state
    }
  };

  const handleCancel = () => {
    // Since we can't navigate away from this tab, just provide helpful message
    Alert.alert(
      'Tip', 
      'Switch to the "Birthdays" tab to see your saved birthdays, or continue adding more here!',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <ThemedView style={styles.formContainer}>
        <BirthdayForm
          onSubmit={handleAddBirthday}
          onCancel={handleCancel}
          submitButtonText="Add Birthday"
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
  },
});
