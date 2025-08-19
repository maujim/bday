import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { DateInput } from '@/components/DateInput';
import { BirthdayFormData, Birthday } from '@/types/birthday';
import { useThemeColor } from '@/hooks/useThemeColor';

interface BirthdayFormProps {
  initialData?: Birthday;
  onSubmit: (data: BirthdayFormData) => Promise<void>;
  onCancel: () => void;
  submitButtonText?: string;
}

export function BirthdayForm({ initialData, onSubmit, onCancel, submitButtonText = 'Save' }: BirthdayFormProps) {
  const [name, setName] = useState(initialData?.name || '');
  const [date, setDate] = useState(initialData ? new Date(initialData.date) : new Date());
  const [notes, setNotes] = useState(initialData?.notes || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'tabIconDefault');
  const buttonColor = useThemeColor({}, 'tint');

  const handleDateChange = (selectedDate: Date) => {
    setDate(selectedDate);
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a name');
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit({
        name: name.trim(),
        date,
        notes: notes.trim() || undefined,
      });
      
      // Clear form after successful submission (only for new birthdays)
      if (!initialData) {
        setName('');
        setNotes('');
        setDate(new Date());
      }
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to save birthday');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        {initialData ? 'Edit Birthday' : 'Add Birthday'}
      </ThemedText>

      <ThemedView style={styles.form}>
        <ThemedView style={styles.fieldContainer}>
          <ThemedText type="defaultSemiBold" style={styles.label}>
            Name *
          </ThemedText>
          <TextInput
            style={[styles.input, { borderColor, color: textColor }]}
            value={name}
            onChangeText={setName}
            placeholder="Enter name"
            placeholderTextColor={borderColor}
            autoCapitalize="words"
            returnKeyType="next"
          />
        </ThemedView>

        <ThemedView style={styles.fieldContainer}>
          <ThemedText type="defaultSemiBold" style={styles.label}>
            Birthday *
          </ThemedText>
          <DateInput
            value={date}
            onChange={handleDateChange}
            style={styles.dateInput}
          />
        </ThemedView>

        <ThemedView style={styles.fieldContainer}>
          <ThemedText type="defaultSemiBold" style={styles.label}>
            Notes (optional)
          </ThemedText>
          <TextInput
            style={[styles.input, styles.notesInput, { borderColor, color: textColor }]}
            value={notes}
            onChangeText={setNotes}
            placeholder="Add notes..."
            placeholderTextColor={borderColor}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </ThemedView>

        <ThemedView style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[
              styles.button, 
              styles.cancelButton, 
              { borderColor },
              isSubmitting && styles.disabledButton,
              Platform.OS === 'web' && styles.webButton
            ]}
            onPress={onCancel}
            disabled={isSubmitting}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Cancel"
          >
            <ThemedText style={[
              styles.cancelButtonText,
              isSubmitting && styles.disabledText
            ]}>
              Cancel
            </ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.button, 
              styles.submitButton, 
              { backgroundColor: buttonColor },
              (isSubmitting || !name.trim()) && styles.disabledSubmitButton,
              Platform.OS === 'web' && styles.webButton
            ]}
            onPress={handleSubmit}
            disabled={isSubmitting || !name.trim()}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={submitButtonText}
          >
            <ThemedText style={styles.submitButtonText}>
              {isSubmitting ? 'Saving...' : submitButtonText}
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
  },
  form: {
    gap: 20,
  },
  fieldContainer: {
    gap: 8,
  },
  label: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  notesInput: {
    minHeight: 80,
  },
  dateInput: {
    // DateInput component handles its own styling
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    borderWidth: 1,
  },
  submitButton: {
    // backgroundColor set via style prop
  },
  cancelButtonText: {
    fontSize: 16,
  },
  submitButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
  webButton: {
    cursor: 'pointer',
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledSubmitButton: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  disabledText: {
    opacity: 0.5,
  },
});