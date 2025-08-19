import { StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { BirthdayWithDaysUntil } from '@/types/birthday';
import { useThemeColor } from '@/hooks/useThemeColor';

interface BirthdayCardProps {
  birthday: BirthdayWithDaysUntil;
  onPress?: () => void;
  onDelete?: () => void;
}

export function BirthdayCard({ birthday, onPress, onDelete }: BirthdayCardProps) {
  const borderColor = useThemeColor({}, 'tabIconDefault');
  const successColor = '#00aa44';
  const warningColor = '#ff8800';

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getDaysText = () => {
    if (birthday.isToday) {
      return 'Today! 🎉';
    } else if (birthday.daysUntil === 1) {
      return 'Tomorrow';
    } else if (birthday.daysUntil <= 7) {
      return `${birthday.daysUntil} days`;
    } else {
      return `${birthday.daysUntil} days`;
    }
  };

  const getDaysColor = () => {
    if (birthday.isToday) return successColor;
    if (birthday.daysUntil <= 3) return warningColor;
    return undefined; // Use default theme color
  };

  const getAgeText = () => {
    if (birthday.age !== undefined) {
      const turningAge = birthday.isToday || birthday.isPast ? birthday.age : birthday.age + 1;
      return `Turning ${turningAge}`;
    }
    return '';
  };

  const handleLongPress = () => {
    Alert.alert(
      'Delete Birthday',
      `Are you sure you want to delete ${birthday.name}'s birthday?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: onDelete
        }
      ]
    );
  };

  return (
    <TouchableOpacity 
      onPress={onPress}
      onLongPress={handleLongPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`${birthday.name}'s birthday card`}
      accessibilityHint="Tap to edit, long press to delete"
      style={Platform.OS === 'web' ? { cursor: 'pointer' } : undefined}
    >
      <ThemedView style={[styles.card, { borderColor }]}>
        <ThemedView style={styles.leftContent}>
          <ThemedView style={styles.iconContainer}>
            <IconSymbol 
              name="gift.fill" 
              size={24} 
              color={birthday.isToday ? successColor : undefined}
            />
          </ThemedView>
          <ThemedView style={styles.textContainer}>
            <ThemedText type="defaultSemiBold" style={styles.name}>
              {birthday.name}
            </ThemedText>
            <ThemedText style={styles.date}>
              {formatDate(birthday.date)}
            </ThemedText>
            {birthday.notes && (
              <ThemedText style={styles.notes} numberOfLines={1}>
                {birthday.notes}
              </ThemedText>
            )}
          </ThemedView>
        </ThemedView>
        <ThemedView style={styles.rightContent}>
          <ThemedText 
            type="defaultSemiBold" 
            style={[styles.daysText, { color: getDaysColor() }]}
          >
            {getDaysText()}
          </ThemedText>
          {getAgeText() && (
            <ThemedText style={styles.ageText}>
              {getAgeText()}
            </ThemedText>
          )}
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  leftContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    marginBottom: 2,
  },
  date: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 2,
  },
  notes: {
    fontSize: 12,
    opacity: 0.5,
    fontStyle: 'italic',
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  daysText: {
    fontSize: 14,
    textAlign: 'right',
  },
  ageText: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 2,
    textAlign: 'right',
  },
});