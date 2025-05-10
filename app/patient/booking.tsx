import Booking from "@/components/Booking";
import { theme } from "@/utils/theme";

import React from "react";
import { StyleSheet, View } from "react-native";

const COLORS = theme.colors;

export default function PatientHomeScreen() {
  return (
    <View style={styles.container}>
      <Booking />
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
