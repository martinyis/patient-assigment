import { theme } from "@/utils/theme";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import ExpertDashboard from "../components/ExpertDashboard";

// Use the app's theme colors
const COLORS = theme.colors;

export default function ExpertScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ExpertDashboard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral.background,
  },
});
