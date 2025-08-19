import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

interface StyledTextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric' | 'phone-pad';
  maxLength?: number;
}

export const StyledTextInput: React.FC<StyledTextInputProps> = ({ 
  value, 
  onChangeText, 
  placeholder,
  keyboardType = 'default',
  maxLength
}) => {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={colors.textSecondary}
      keyboardType={keyboardType}
      maxLength={maxLength}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: colors.text,
    minHeight: 56,
  },
});