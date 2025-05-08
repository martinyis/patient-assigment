import { theme } from "@/utils/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";

// Using the theme colors
const COLORS = theme.colors;

export default function AuthLogo() {
  return (
    <View style={styles.container}>
      <View style={styles.logoCircle}>
        <Ionicons name="heart" size={28} color={COLORS.neutral.white} />
        <View style={styles.heartline}>
          <Ionicons name="pulse" size={24} color={COLORS.neutral.white} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.xl,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary.main,
    alignItems: "center",
    justifyContent: "center",
    ...theme.shadows.medium,
  },
  heartline: {
    position: "absolute",
    bottom: 14,
  },
});
