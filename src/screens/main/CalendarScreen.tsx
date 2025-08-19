import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ScreenContainer, ContactCard } from '../../components';
import { colors } from '../../theme/colors';
import { mockContacts } from '../../api/mockData';

export const CalendarScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Mock calendar data - in a real app this would come from a calendar library
  const currentMonth = selectedDate.getMonth();
  const currentYear = selectedDate.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  // Filter contacts by selected date (simplified logic)
  const selectedDateString = `${String(currentMonth + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
  const birthdaysOnSelectedDate = mockContacts.filter(contact => 
    contact.birthday === selectedDateString
  );

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.calendarHeader}>
          <Text style={styles.monthYear}>{monthNames[currentMonth]} {currentYear}</Text>
        </View>
        
        <View style={styles.calendarContainer}>
          <View style={styles.dayNamesRow}>
            {dayNames.map((dayName) => (
              <Text key={dayName} style={styles.dayName}>{dayName}</Text>
            ))}
          </View>
          
          <View style={styles.calendarGrid}>
            {calendarDays.map((day, index) => (
              <TouchableOpacity 
                key={index} 
                style={[
                  styles.calendarDay,
                  day === selectedDate.getDate() && styles.selectedDay
                ]}
                onPress={() => {
                  if (day) {
                    setSelectedDate(new Date(currentYear, currentMonth, day));
                  }
                }}
              >
                <Text style={[
                  styles.dayText, 
                  day === selectedDate.getDate() && styles.selectedDayText
                ]}>
                  {day}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.birthdaysList}>
          <Text style={styles.listTitle}>
            Birthdays on {selectedDate.getDate()}/{currentMonth + 1}
          </Text>
          
          {birthdaysOnSelectedDate.length > 0 ? (
            <FlatList
              data={birthdaysOnSelectedDate}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <ContactCard
                  contact={item}
                  isSelected={false}
                  onSelect={() => {}}
                />
              )}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <Text style={styles.noBirthdaysText}>No birthdays on this date</Text>
          )}
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calendarHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  monthYear: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  calendarContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  dayNamesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  dayName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    width: 40,
    textAlign: 'center',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDay: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  selectedDay: {
    backgroundColor: colors.primary,
  },
  dayText: {
    fontSize: 16,
    color: colors.text,
  },
  selectedDayText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  birthdaysList: {
    flex: 1,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  noBirthdaysText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 40,
  },
});