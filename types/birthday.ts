export interface Birthday {
  id: string;
  name: string;
  date: string; // ISO date string (YYYY-MM-DD)
  notes?: string;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}

export interface BirthdayFormData {
  name: string;
  date: Date;
  notes?: string;
}

export type BirthdayWithDaysUntil = Birthday & {
  daysUntil: number;
  age?: number;
  isToday: boolean;
  isPast: boolean;
};