export const colors = {
  primary: '#6366F1', // Indigo-500
  secondary: '#A855F7', // Purple-500
  background: '#1E293B', // Dark blue background
  backgroundLight: '#334155', // Lighter dark blue
  white: '#FFFFFF',
  text: '#F1F5F9', // Light text
  textSecondary: '#94A3B8', // Secondary text
  border: '#475569', // Border color
  success: '#10B981', // Green
  warning: '#F59E0B', // Amber
  error: '#EF4444', // Red
  card: '#334155', // Card background
  disabled: '#64748B', // Disabled state
  accent: '#F472B6', // Pink accent
  star: '#FBBF24', // Golden star color
} as const;

export type ColorKeys = keyof typeof colors;