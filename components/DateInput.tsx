import { useState } from 'react';
import { TouchableOpacity, TextInput, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

interface DateInputProps {
  value: Date;
  onChange: (date: Date) => void;
  style?: any;
}

export function DateInput({ value, onChange, style }: DateInputProps) {
  const [showPicker, setShowPicker] = useState(false);
  const borderColor = useThemeColor({}, 'tabIconDefault');
  const textColor = useThemeColor({}, 'text');

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatDateForInput = (date: Date) => {
    // Format as YYYY-MM-DD for HTML date input
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'web') {
      // For web, handle the input change event
      if (event.target && event.target.value) {
        const newDate = new Date(event.target.value + 'T00:00:00');
        if (!isNaN(newDate.getTime())) {
          onChange(newDate);
        }
      }
    } else {
      // For mobile platforms
      setShowPicker(Platform.OS === 'ios');
      if (selectedDate) {
        onChange(selectedDate);
      }
    }
  };

  if (Platform.OS === 'web') {
    return (
      <TextInput
        style={[
          {
            borderWidth: 1,
            borderRadius: 8,
            padding: 12,
            fontSize: 16,
            borderColor,
            color: textColor,
            cursor: 'pointer',
          },
          style
        ]}
        value={formatDateForInput(value)}
        onChange={handleDateChange}
        placeholder="Select date"
        placeholderTextColor={borderColor}
        // @ts-ignore - Web-specific props
        type="date"
        max={formatDateForInput(new Date())} // Don't allow future dates
      />
    );
  }

  return (
    <>
      <TouchableOpacity 
        style={[
          {
            borderWidth: 1,
            borderRadius: 8,
            padding: 12,
            borderColor
          },
          style
        ]}
        onPress={() => setShowPicker(true)}
      >
        <ThemedText>{formatDate(value)}</ThemedText>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={value}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          maximumDate={new Date()}
        />
      )}
    </>
  );
}