### Firebase Structure

- **Authentication**: Firebase Authentication for user login and registration
- **Firestore Database**:
  - `userAccountInfo` collection: Stores user data and settings
    - Documents are keyed by user ID
    - Contains roles (expert/patient), email, name, and settings

### Settings Data Structure

Settings are organized in a nested hierarchical structure:

```javascript
{
  settings: {
    notifications: {
      email: true,
      sms: false,
      push: {
        android: true,
        ios: false
      }
    },
    privacy: { ... },
    security: { ... }
  },
  preferences: { ... },
  integrations: { ... }
}
```

## Component Implementation

### CheckBoxes.tsx

The `CheckboxTree` component provides an interactive, recursive UI for displaying and manipulating nested boolean settings:

- **Recursive Rendering**: Dynamically renders checkboxes for any depth of nested settings
- **Three-State Logic**: Supports checked, unchecked, and mixed (indeterminate) states
- **Path-Based Updates**: Uses array paths to target specific nodes in the settings tree
- **Expandable Sections**: Toggle visibility of child settings for better UI organization

### Settings.tsx

The `Settings` component manages user settings with Firestore integration:

- **Data Synchronization**: Loads settings from Firestore and saves changes in real-time
- **Recursive Updates**: When toggling parent nodes, recursively updates all children
- **Type Safety**: Uses TypeScript interfaces to ensure settings structure consistency
- **Default Fallbacks**: Provides default settings when user data is missing or incomplete

## Approach for Checked Boxes

Settings with boolean values (true/false) represent toggle switches or checkboxes in the UI.

## Performance Notes & Enhancements

### Current Optimizations

1. **Virtualized Lists**: Using React Native's `FlatList` for efficient rendering of patient data
2. **Lazy Expansion**: Patient settings only load when expanded, reducing initial render time

### Implemented Enhancements

1. **Scrollable Containers**: Patient settings use scrollable containers with fixed maximum height to prevent overflow issues
2. **User Data Storage**: Email and name stored during account creation for proper identification
