// Health App Color Palette

export const colors = {
  // Primary colors
  primary: {
    main: "#4CAF50", // Green - represents health, vitality, growth
    light: "#81C784", // Light green - for highlights and secondary elements
    dark: "#388E3C", // Dark green - for primary actions and focus
    contrast: "#FFFFFF", // White - text on primary colors
  },

  // Secondary colors
  secondary: {
    main: "#42A5F5", // Blue - represents trust, reliability, calmness
    light: "#90CAF9", // Light blue - for information, data visualization
    dark: "#1976D2", // Dark blue - for secondary actions
    contrast: "#FFFFFF", // White - text on secondary colors
  },

  // Accent colors
  accent: {
    success: "#66BB6A", // Green - success states and positive indicators
    warning: "#FFA726", // Orange - warning states and caution indicators
    error: "#EF5350", // Red - error states and critical information
    info: "#29B6F6", // Blue - informational states
  },

  // Neutral colors
  neutral: {
    white: "#FFFFFF", // Pure white - backgrounds, cards
    background: "#F5F7FA", // Light gray - main background
    lightGray: "#E0E0E0", // Light gray - borders, dividers
    mediumGray: "#9E9E9E", // Medium gray - disabled text, placeholders
    darkGray: "#616161", // Dark gray - secondary text
    black: "#212121", // Off-black - primary text
  },

  // Specialty colors for health features
  health: {
    heartRate: "#F44336", // Red - heart rate, pulse
    sleep: "#5E35B1", // Purple - sleep tracking
    activity: "#FF9800", // Orange - activity tracking
    nutrition: "#8BC34A", // Light green - nutrition tracking
    hydration: "#29B6F6", // Light blue - water/hydration tracking
    meditation: "#9575CD", // Lavender - meditation, mindfulness
    calories: "#FF7043", // Deep orange - calorie tracking
    progress: "#26A69A", // Teal - progress indicators
  },

  // Gradients
  gradients: {
    primary: ["#4CAF50", "#81C784"],
    secondary: ["#42A5F5", "#90CAF9"],
    success: ["#66BB6A", "#A5D6A7"],
    progress: ["#26A69A", "#80CBC4"],
  },
};

// Spacing system
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Typography
export const typography = {
  fontFamily: {
    regular: "System",
    medium: "System-Medium",
    bold: "System-Bold",
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
};

// Border radius
export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 999,
};

// Shadow styles
export const shadows = {
  small: {
    shadowColor: colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: colors.neutral.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: colors.neutral.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
};

// Export default theme object
export const theme = {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
};

export default theme;
