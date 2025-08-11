import AsyncStorage from '@react-native-async-storage/async-storage';
import { Birthday, BirthdayWithDaysUntil } from '@/types/birthday';

const STORAGE_KEY = 'birthdays';

export const birthdayUtils = {
  async getAllBirthdays(): Promise<Birthday[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading birthdays:', error);
      return [];
    }
  },

  async saveBirthday(birthday: Omit<Birthday, 'id' | 'createdAt' | 'updatedAt'>): Promise<Birthday> {
    try {
      const birthdays = await this.getAllBirthdays();
      const now = new Date().toISOString();
      const newBirthday: Birthday = {
        ...birthday,
        id: Date.now().toString(),
        createdAt: now,
        updatedAt: now,
      };

      birthdays.push(newBirthday);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(birthdays));
      return newBirthday;
    } catch (error) {
      console.error('Error saving birthday:', error);
      throw error;
    }
  },

  async updateBirthday(id: string, updates: Partial<Birthday>): Promise<Birthday> {
    try {
      const birthdays = await this.getAllBirthdays();
      const index = birthdays.findIndex(b => b.id === id);
      
      if (index === -1) {
        throw new Error('Birthday not found');
      }

      const updatedBirthday: Birthday = {
        ...birthdays[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      birthdays[index] = updatedBirthday;
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(birthdays));
      return updatedBirthday;
    } catch (error) {
      console.error('Error updating birthday:', error);
      throw error;
    }
  },

  async deleteBirthday(id: string): Promise<void> {
    try {
      const birthdays = await this.getAllBirthdays();
      const filtered = birthdays.filter(b => b.id !== id);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error deleting birthday:', error);
      throw error;
    }
  },

  calculateDaysUntilBirthday(dateString: string): number {
    const today = new Date();
    const birthday = new Date(dateString);
    
    // Set this year's birthday
    const thisYearBirthday = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate());
    
    // If birthday already passed this year, use next year
    if (thisYearBirthday < today) {
      thisYearBirthday.setFullYear(today.getFullYear() + 1);
    }
    
    const timeDiff = thisYearBirthday.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  },

  calculateAge(dateString: string): number {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  },

  enrichBirthdaysWithDetails(birthdays: Birthday[]): BirthdayWithDaysUntil[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return birthdays.map(birthday => {
      const daysUntil = this.calculateDaysUntilBirthday(birthday.date);
      const age = this.calculateAge(birthday.date);
      const birthdayDate = new Date(birthday.date);
      const thisYearBirthday = new Date(today.getFullYear(), birthdayDate.getMonth(), birthdayDate.getDate());
      
      return {
        ...birthday,
        daysUntil,
        age,
        isToday: daysUntil === 0,
        isPast: thisYearBirthday < today,
      };
    });
  },
};