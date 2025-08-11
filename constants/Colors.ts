/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#ff6b9d'; // Birthday pink
const tintColorDark = '#ff8fa3'; // Lighter birthday pink for dark mode

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fef9ff', // Very light pink background
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#a855f7', // Purple for inactive tabs
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#1a1625', // Dark purple background
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#c084fc', // Light purple for dark mode tabs
    tabIconSelected: tintColorDark,
  },
};
