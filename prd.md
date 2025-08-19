### **PRD: Birthday App - Phased Implementation Plan**

**Objective:** To create a high-fidelity, mocked frontend of the Birthday App based on the provided screenshots. The focus is on UI, component reusability, and navigation flow. Backend logic will be simulated.

---

### **Phase 1: Foundation & Core Components**

First, build the core, reusable elements that will be used across multiple screens.

**Task 1.1: Setup Theme & Mock Data**
*   Create `src/theme/colors.ts` to export all app colors (e.g., `primary`, `secondary`, `background`, `white`, `text`, etc.).
*   Create `src/api/mockData.ts` and populate it with the mock contacts and user data as specified previously.

**Task 1.2: Build the Component Library**
Create the following reusable components in `src/components/`:

*   **`ScreenContainer({children})`**: A wrapper component that applies the standard dark blue background color and safe area padding for all screens.
*   **`PrimaryButton({title, onPress, disabled})`**: The main solid-color call-to-action button (e.g., "Continue", "Send Invites"). Style should reflect the examples.
*   **`SecondaryButton({title, onPress})`**: The underlined or plain text link-style button (e.g., "Nah, not right now", "Resend Code").
*   **`StyledTextInput({value, onChangeText, placeholder})`**: A styled text input with a light border, used for phone number and search.
*   **`ContactCard({contact, isSelected, onSelect})`**:
    *   **Props:** A `contact` object from `mockData`, a boolean for `isSelected` (to control the star's state), and a callback function `onSelect`.
    *   **UI:** Must replicate the design from the "Priority People" screen, including the days-left box, name, birthday, confetti background, and a tappable star icon on the right.

---

### **Phase 2: Navigation Scaffolding**

Create the entire navigation structure with empty placeholder screens. This builds the app's skeleton.

**Task 2.1: Create All Screen Files**
*   Create empty `.tsx` files for every screen listed in the flows below inside `src/screens/`.

**Task 2.2: Implement Navigators**
*   **`RootNavigator`**:
    *   This component will contain the master logic. Use a simple state management solution (like a React Context named `AuthContext`) to hold a boolean value: `isOnboardingComplete`.
    *   It will render `OnboardingStack` if `isOnboardingComplete` is `false`, and `MainTabNavigator` if it is `true`.
*   **`OnboardingStack` (Stack Navigator)**:
    *   Add all onboarding screens in order: `Splash`, `PhoneNumber`, `Verification`, `ContactsPermission`, `LoadingData`, `PriorityPeople`, `InviteFriends`, `FacebookImport`.
    *   Configure with `headerShown: false` for all screens except those needing a back button (`InviteFriends`).
*   **`MainTabNavigator` (Bottom Tab Navigator)**:
    *   Create four tabs: Home, Calendar, Gifts, Profile.
    *   Implement a custom, oversized floating action button in the center for the "Card Creator" modal. This button will sit on top of the tab bar.
*   **`ProfileStack` (Stack Navigator)**:
    *   Create a stack for the Profile tab containing `ProfileScreen` and `SettingsScreen`.
*   **`CardCreatorModalStack` (Stack Navigator)**:
    *   Create a stack to be presented modally. It will contain `CardCreatorScreen` and `CardPreviewScreen`.

---

### **Phase 3: Screen Implementation by Flow**

Now, implement the UI and logic for each screen, using the components and navigation shell created above.

#### **Flow A: Onboarding**

1.  **`SplashScreen`**
    *   **UI:** Center the "Birthday App" logo asset.
    *   **Logic:** `useEffect` with a 2-second `setTimeout` to navigate to `PhoneNumberScreen`.

2.  **`PhoneNumberScreen`**
    *   **UI:** Use `ScreenContainer`, text elements, `StyledTextInput`, and `PrimaryButton`.
    *   **Logic:** The `PrimaryButton` is disabled unless the input length is 10. On press, navigate to `VerificationScreen`.

3.  **`VerificationScreen`**
    *   **UI:** Use `ScreenContainer`. Create four individual text inputs for the code. Use `SecondaryButton` for "Resend Code" and `PrimaryButton` for "Continue". Show a custom numeric keyboard component at the bottom.
    *   **Logic:** `PrimaryButton` is enabled when all 4 inputs are filled. On press, navigate to `ContactsPermissionScreen`.

4.  **`ContactsPermissionScreen`**
    *   **UI:** A background view with an avatar. Overlay a custom modal/alert component that asks for permission.
    *   **Logic:** Both "Continue" and "Don't Allow" buttons on the alert navigate to `LoadingDataScreen`.

5.  **`LoadingDataScreen`**
    *   **UI:** Use `ScreenContainer` with the "Sit Tight!" text and koala illustration.
    *   **Logic:** `useEffect` with a 3-second `setTimeout` to navigate to `PriorityPeopleScreen`.

6.  **`PriorityPeopleScreen`**
    *   **UI:** Use `ScreenContainer`. Add a search bar (`StyledTextInput`) and a `FlatList` to render `ContactCard` components from `mockData`. The bottom button is a `PrimaryButton`.
    *   **Logic:** Maintain a local state array of selected contact IDs. Tapping a `ContactCard`'s star toggles its ID in the state. The `PrimaryButton` title updates with the count. On press, navigate to `InviteFriendsScreen`.

7.  **`InviteFriendsScreen`**
    *   **UI:** Use `ScreenContainer`. Re-use the `FlatList` and `ContactCard` to show only the selected friends. Add a `PrimaryButton` ("Send Invites") and `SecondaryButton` ("Nah, not right now").
    *   **Logic:** Both buttons navigate to `FacebookImportScreen`.

8.  **`FacebookImportScreen`**
    *   **UI:** Use `ScreenContainer` with the avatar, text, `PrimaryButton` ("I want this"), and `SecondaryButton`.
    *   **Logic:** On press of either button, call the function from `AuthContext` to set `isOnboardingComplete` to `true`.

#### **Flow B: Main Application**

1.  **`HomeScreen` (Home Tab)**
    *   **UI:** Plain screen with a search bar (`StyledTextInput`) at the top.

2.  **`CalendarScreen` (Calendar Tab)**
    *   **UI:** Implement a calendar view component. Below it, add a list view.
    *   **Logic:** When a date is selected, filter `mockData` and display the relevant birthdays in the list view below.

3.  **`GiftsScreen` (Gifts Tab)**
    *   **UI:** Title "My Gifts". Hardcode the single gift entry ("Sep 26 2025") as shown in the screenshot.

4.  **`ProfileScreen` (Profile Tab)**
    *   **UI:** Display the mock user's info. Add a settings cog icon to the header. Implement a two-tab view for "Sent Gifts" / "Received Gifts".
    *   **Logic:** The header cog icon navigates to `SettingsScreen`.

5.  **`SettingsScreen`**
    *   **UI:** A static `ScrollView` or `FlatList` displaying the menu items as text. Items are not interactive.

#### **Flow C: Card Creator Modal**

1.  **Card Creator Button (in Tab Navigator)**
    *   **Logic:** On press, present the `CardCreatorModalStack` modally.

2.  **`CardCreatorScreen`**
    *   **UI:** A grid `FlatList` displaying static images of the 6 card templates.
    *   **Logic:** Tapping any card navigates to `CardPreviewScreen`.

3.  **`CardPreviewScreen`**
    *   **UI:** Display the static preview image and a "Let's Play One Out!" `PrimaryButton`.
    *   **Logic:** On button press, dismiss the entire modal stack (`navigation.popToTop()` or equivalent).
