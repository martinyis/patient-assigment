import { auth, getUserRole, initializeUserAccount } from "@/utils/firebase";
import { theme } from "@/utils/theme";

import { useRouter } from "expo-router";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AuthForm from "./AuthForm";
import AuthLogo from "./AuthLogo";

// Color theme based on the provided design
const COLORS = theme.colors;

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // Get user role from Firestore
        const role = await getUserRole(user.uid);

        // Redirect based on role
        if (role === "expert") {
          router.replace("/expert");
        } else {
          // Default to patient route for any other role or if role is null
          router.replace("/patient");
        }
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (
    email: string,
    password: string,
    role?: string
  ) => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        // Sign up the user
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        // Initialize user account in Firestore with role and settings
        if (userCredential.user) {
          await initializeUserAccount(userCredential.user.uid, role);
        }
      }
    } catch (error: any) {
      Alert.alert("Error", error.message || "Authentication failed");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <AuthLogo />

            <Text style={styles.title}>Welcome to HealthMate</Text>
            <Text style={styles.subtitle}>Your personal health companion</Text>

            <View style={styles.formContainer}>
              {loading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color={COLORS.primary.main} />
                  <Text style={styles.loadingText}>Please wait...</Text>
                </View>
              ) : (
                <AuthForm
                  isLogin={isLogin}
                  onSubmit={handleSubmit}
                  onToggleMode={handleToggleMode}
                />
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral.white,
  },
  keyboardAvoidView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: theme.spacing.xl,
    paddingTop: 60,
    paddingBottom: 40,
  },
  title: {
    fontSize: theme.typography.fontSize.xxl,
    fontWeight: "700",
    color: COLORS.neutral.black,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.md,
    color: COLORS.neutral.darkGray,
    marginBottom: theme.spacing.xl + theme.spacing.md,
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing.lg,
  },
  loadingText: {
    marginTop: theme.spacing.sm,
    color: COLORS.neutral.darkGray,
    fontSize: theme.typography.fontSize.md,
  },
});
