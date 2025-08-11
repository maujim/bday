import { useState, useEffect, useCallback } from 'react';
import { Birthday, BirthdayWithDaysUntil, BirthdayFormData } from '@/types/birthday';
import { birthdayUtils } from '@/utils/birthdayUtils';

export function useBirthdays() {
  const [birthdays, setBirthdays] = useState<BirthdayWithDaysUntil[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadBirthdays = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await birthdayUtils.getAllBirthdays();
      const enrichedData = birthdayUtils.enrichBirthdaysWithDetails(data);
      
      // Sort by days until birthday (closest first)
      enrichedData.sort((a, b) => a.daysUntil - b.daysUntil);
      
      setBirthdays(enrichedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load birthdays');
    } finally {
      setLoading(false);
    }
  }, []);

  const addBirthday = useCallback(async (formData: BirthdayFormData) => {
    try {
      const birthdayData = {
        name: formData.name,
        date: formData.date.toISOString().split('T')[0], // Convert to YYYY-MM-DD
        notes: formData.notes,
      };
      
      await birthdayUtils.saveBirthday(birthdayData);
      await loadBirthdays(); // Refresh the list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add birthday');
      throw err;
    }
  }, [loadBirthdays]);

  const updateBirthday = useCallback(async (id: string, formData: BirthdayFormData) => {
    try {
      const updates = {
        name: formData.name,
        date: formData.date.toISOString().split('T')[0],
        notes: formData.notes,
      };
      
      await birthdayUtils.updateBirthday(id, updates);
      await loadBirthdays(); // Refresh the list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update birthday');
      throw err;
    }
  }, [loadBirthdays]);

  const deleteBirthday = useCallback(async (id: string) => {
    try {
      await birthdayUtils.deleteBirthday(id);
      await loadBirthdays(); // Refresh the list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete birthday');
      throw err;
    }
  }, [loadBirthdays]);

  const getBirthdayById = useCallback((id: string): BirthdayWithDaysUntil | undefined => {
    return birthdays.find(birthday => birthday.id === id);
  }, [birthdays]);

  const getUpcomingBirthdays = useCallback((days: number = 7): BirthdayWithDaysUntil[] => {
    return birthdays.filter(birthday => birthday.daysUntil <= days && birthday.daysUntil >= 0);
  }, [birthdays]);

  const getTodaysBirthdays = useCallback((): BirthdayWithDaysUntil[] => {
    return birthdays.filter(birthday => birthday.isToday);
  }, [birthdays]);

  useEffect(() => {
    loadBirthdays();
  }, [loadBirthdays]);

  return {
    birthdays,
    loading,
    error,
    addBirthday,
    updateBirthday,
    deleteBirthday,
    getBirthdayById,
    getUpcomingBirthdays,
    getTodaysBirthdays,
    refreshBirthdays: loadBirthdays,
  };
}