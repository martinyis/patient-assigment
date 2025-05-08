import { theme } from "@/utils/theme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

// Use the app's theme colors
const COLORS = theme.colors;

export default function PatientLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary.main,
        tabBarInactiveTintColor: COLORS.neutral.darkGray,
        headerShown: false,
        tabBarStyle: {
          elevation: 8,
          backgroundColor: COLORS.neutral.white,
          shadowColor: COLORS.neutral.black,
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
          height: 70,
          paddingBottom: 12,
          paddingTop: 8,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: theme.typography.fontSize.sm,
          fontWeight: "600",
          marginBottom: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={26} />
          ),
        }}
      />
    </Tabs>
  );
}
