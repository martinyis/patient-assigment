import { theme } from "@/utils/theme";
import { Stack } from "expo-router";
import { Provider as PaperProvider } from "react-native-paper";

export default function AppLayout() {
  // Create PaperProvider theme that matches our custom theme
  const paperTheme = {
    colors: {
      primary: theme.colors.primary.main,
      accent: theme.colors.secondary.main,
      background: theme.colors.neutral.background,
      surface: theme.colors.neutral.white,
      text: theme.colors.neutral.black,
      error: theme.colors.accent.error,
      disabled: theme.colors.neutral.mediumGray,
      placeholder: theme.colors.neutral.mediumGray,
      backdrop: "rgba(0, 0, 0, 0.5)",
      notification: theme.colors.accent.info,
    },
  };

  return (
    <PaperProvider theme={paperTheme}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="expert"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="patient"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="auth"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </PaperProvider>
  );
}
