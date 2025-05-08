import { theme } from "@/utils/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { RadioButton } from "react-native-paper";

const COLORS = theme.colors;

type AuthFormProps = {
  isLogin: boolean;
  onSubmit: (email: string, password: string, role?: string) => void;
  onToggleMode: () => void;
};

export default function AuthForm({
  isLogin,
  onSubmit,
  onToggleMode,
}: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("patient");

  const handleSubmit = () => {
    onSubmit(email, password, isLogin ? undefined : role);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputWrapper}>
          <Ionicons
            name="mail-outline"
            size={20}
            color="#C5C5C5"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputWrapper}>
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color="#C5C5C5"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#C5C5C5"
            />
          </TouchableOpacity>
        </View>
      </View>

      {!isLogin && (
        <View style={styles.roleContainer}>
          <Text style={styles.label}>Account Type</Text>
          <View style={styles.roleOptionsCard}>
            <TouchableOpacity
              style={[
                styles.roleCard,
                role === "patient" ? styles.roleCardSelected : null,
              ]}
              onPress={() => setRole("patient")}
            >
              <View style={styles.roleIconContainer}>
                <Ionicons
                  name="person-outline"
                  size={24}
                  color={
                    role === "patient"
                      ? COLORS.neutral.white
                      : COLORS.primary.main
                  }
                />
              </View>
              <Text
                style={[
                  styles.roleCardText,
                  role === "patient" ? styles.roleCardTextSelected : null,
                ]}
              >
                Patient
              </Text>
              <Text
                style={[
                  styles.roleCardDescription,
                  role === "patient"
                    ? styles.roleCardDescriptionSelected
                    : null,
                ]}
              >
                Get health advice and track your progress
              </Text>
              <View style={styles.radioContainer}>
                <RadioButton
                  value="patient"
                  status={role === "patient" ? "checked" : "unchecked"}
                  onPress={() => setRole("patient")}
                  color={
                    role === "patient"
                      ? COLORS.neutral.white
                      : COLORS.primary.main
                  }
                  uncheckedColor={
                    role === "patient"
                      ? COLORS.neutral.white
                      : COLORS.neutral.mediumGray
                  }
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.roleCard,
                role === "expert" ? styles.roleCardSelected : null,
              ]}
              onPress={() => setRole("expert")}
            >
              <View style={styles.roleIconContainer}>
                <Ionicons
                  name="medical-outline"
                  size={24}
                  color={
                    role === "expert"
                      ? COLORS.neutral.white
                      : COLORS.primary.main
                  }
                />
              </View>
              <Text
                style={[
                  styles.roleCardText,
                  role === "expert" ? styles.roleCardTextSelected : null,
                ]}
              >
                Health Expert
              </Text>
              <Text
                style={[
                  styles.roleCardDescription,
                  role === "expert" ? styles.roleCardDescriptionSelected : null,
                ]}
              >
                Provide expertise and support to patients
              </Text>
              <View style={styles.radioContainer}>
                <RadioButton
                  value="expert"
                  status={role === "expert" ? "checked" : "unchecked"}
                  onPress={() => setRole("expert")}
                  color={
                    role === "expert"
                      ? COLORS.neutral.white
                      : COLORS.primary.main
                  }
                  uncheckedColor={
                    role === "expert"
                      ? COLORS.neutral.white
                      : COLORS.neutral.mediumGray
                  }
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>
          {isLogin ? "Sign In" : "Sign Up"}
          <Ionicons name="arrow-forward-outline" size={16} color="#fff" />
        </Text>
      </TouchableOpacity>

      <View style={styles.toggleContainer}>
        <Text style={styles.toggleText}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
        </Text>
        <TouchableOpacity onPress={onToggleMode}>
          <Text style={styles.toggleLink}>
            {isLogin ? "Sign up" : "Sign in"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputContainer: {
    marginBottom: theme.spacing.md,
  },
  label: {
    fontSize: theme.typography.fontSize.sm,
    marginBottom: theme.spacing.xs,
    color: COLORS.neutral.black,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.neutral.background,
    borderRadius: theme.borderRadius.md,
    paddingVertical: Platform.OS === "ios" ? 12 : 0,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: theme.spacing.xs,
  },
  input: {
    flex: 1,
    height: 46,
    color: COLORS.neutral.black,
  },
  eyeIcon: {
    padding: 4,
  },
  roleContainer: {
    marginBottom: theme.spacing.xl,
  },
  roleOptionsCard: {
    flexDirection: "column",
    gap: theme.spacing.md,
  },
  roleCard: {
    backgroundColor: COLORS.neutral.background,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    position: "relative",
    ...theme.shadows.small,
  },
  roleCardSelected: {
    backgroundColor: COLORS.primary.main,
  },
  roleIconContainer: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.round,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing.xs,
  },
  roleCardText: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: "bold",
    color: COLORS.neutral.black,
    marginBottom: theme.spacing.xs,
  },
  roleCardTextSelected: {
    color: COLORS.neutral.white,
  },
  roleCardDescription: {
    fontSize: theme.typography.fontSize.sm,
    color: COLORS.neutral.darkGray,
    marginRight: 30,
  },
  roleCardDescriptionSelected: {
    color: "rgba(255, 255, 255, 0.9)",
  },
  radioContainer: {
    position: "absolute",
    top: theme.spacing.md,
    right: theme.spacing.md,
  },
  submitButton: {
    backgroundColor: COLORS.primary.main,
    borderRadius: theme.borderRadius.md,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: theme.spacing.xl,
  },
  submitButtonText: {
    color: COLORS.neutral.white,
    fontSize: theme.typography.fontSize.md,
    fontWeight: "600",
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: theme.spacing.sm,
  },
  toggleText: {
    color: COLORS.neutral.darkGray,
    fontSize: theme.typography.fontSize.sm,
  },
  toggleLink: {
    color: COLORS.primary.main,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: "600",
    marginLeft: 5,
  },
});
