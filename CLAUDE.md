# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm start` or `npx expo start` - Start the Expo development server with QR code
- `npx expo start --android` - Start with Android emulator
- `npx expo start --ios` - Start with iOS simulator  
- `npx expo start --web` - Start web version
- `npm run lint` - Run ESLint for code quality checks
- `npm run reset-project` - Move current app to app-example and create blank app directory

## Architecture Overview

This is a React Native app built with Expo SDK 53 using:

- **Routing**: File-based routing with expo-router (typed routes enabled)
- **Navigation**: Tab-based navigation using @react-navigation/bottom-tabs
- **Theming**: Built-in light/dark mode support with automatic detection
- **Package Manager**: pnpm
- **Platforms**: Android, iOS, and web support

## Project Structure

```
app/
├── (tabs)/           # Tab navigation group
│   ├── _layout.tsx   # Tab bar configuration
│   ├── index.tsx     # Home tab screen
│   └── explore.tsx   # Explore tab screen
├── _layout.tsx       # Root layout with theme provider and font loading
└── +not-found.tsx    # 404 error screen

components/
├── ThemedText.tsx    # Text component with automatic theming
├── ThemedView.tsx    # View component with automatic theming
├── ParallaxScrollView.tsx # Scrollview with parallax header effect
└── ui/               # Platform-specific UI components

constants/Colors.ts   # Theme color definitions for light/dark modes
hooks/                # Custom hooks for theme and color management
```

## Key Development Patterns

### Theming System
- Use `ThemedText` and `ThemedView` components instead of raw React Native components
- Access theme colors via `useThemeColor()` hook
- Color scheme detection via `useColorScheme()` hook
- Colors defined in `constants/Colors.ts` for light/dark modes

### Path Aliases
- `@/*` maps to root directory (configured in tsconfig.json)
- Example: `import { ThemedText } from '@/components/ThemedText'`

### Platform-Specific Code
- Use `Platform.select()` for platform-specific implementations
- Separate files with `.ios.tsx` and `.android.tsx` extensions when needed

### TypeScript Configuration
- Strict mode enabled
- Expo TypeScript base configuration extended
- Typed routes experimental feature enabled for expo-router

### Component Styling
- StyleSheet.create() for performance optimized styles
- Themed components automatically adapt to light/dark mode
- Custom SpaceMono font loaded in root layout
- use pnpm