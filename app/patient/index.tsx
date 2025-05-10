import Calendar from "@/components/Calendar";
import Settings from "@/components/Settings";
import { db } from "@/utils/firebase";
import { theme } from "@/utils/theme";
import { useRouter } from "expo-router";
import { collection } from "firebase/firestore";
import React, { useEffect } from "react";
import { BackHandler, StyleSheet, View } from "react-native";

const COLORS = theme.colors;

export default function PatientHomeScreen() {
  const router = useRouter();
  const todos = collection(db, "todos");
  // Prevent going back to auth screen with hardware back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        // Return true to prevent default behavior (going back)
        return true;
      }
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Settings />
      <Calendar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: COLORS.neutral.background,
  },
  title: {
    fontSize: theme.typography.fontSize.xxl,
    fontWeight: "bold",
    marginBottom: theme.spacing.md,
    color: COLORS.neutral.black,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.md,
    color: COLORS.neutral.darkGray,
  },
});
