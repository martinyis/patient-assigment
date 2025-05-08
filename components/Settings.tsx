import { auth, db, defaultSettingsData } from "@/utils/firebase";
import { theme } from "@/utils/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CheckboxTree } from "./CheckBoxes";

export interface SettingsData {
  settings: {
    notifications: {
      email: boolean;
      sms: boolean;
      push: {
        android: boolean;
        ios: boolean;
      };
    };
    privacy: {
      location: boolean;
      camera: boolean;
      microphone: boolean;
    };
    security: {
      twoFactorAuth: boolean;
      backupCodes: boolean;
    };
  };
  preferences: {
    theme: {
      darkMode: boolean;
      highContrast: boolean;
    };
    language: {
      english: boolean;
      spanish: boolean;
      nested: {
        regionalDialects: {
          catalan: boolean;
          quechua: boolean;
        };
      };
    };
  };
  integrations: {
    slack: boolean;
    github: {
      issues: boolean;
      pullRequests: boolean;
    };
    jira: {
      basic: boolean;
      advanced: {
        workflows: boolean;
        automations: boolean;
      };
    };
  };
}

// Using the theme colors
const COLORS = theme.colors;

const Settings: React.FC = () => {
  const [settingsData, setSettingsData] =
    useState<SettingsData>(defaultSettingsData);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Load user settings from Firestore
  useEffect(() => {
    const loadUserSettings = async () => {
      if (!auth.currentUser) {
        setLoading(false);
        return;
      }

      try {
        const userId = auth.currentUser.uid;
        const userAccountRef = doc(db, "userAccountInfo", userId);
        const userAccountDoc = await getDoc(userAccountRef);

        if (userAccountDoc.exists()) {
          const userData = userAccountDoc.data();
          if (userData.settingsData) {
            setSettingsData(userData.settingsData as SettingsData);
          } else {
            // Handle case where settingsData field doesn't exist
            console.warn("settingsData field missing from user account");
            setSettingsData(defaultSettingsData);

            // Update the document with default settings
            await updateDoc(userAccountRef, {
              settingsData: defaultSettingsData,
            });
          }
        } else {
          console.warn("User account document not found");
          setSettingsData(defaultSettingsData);
        }
      } catch (error) {
        console.error("Error loading user settings:", error);
        setSettingsData(defaultSettingsData);
      } finally {
        setLoading(false);
      }
    };

    loadUserSettings();
  }, []);

  // Function to toggle a checkbox state and update Firestore
  const handleToggle = async (path: string[], newValue: boolean) => {
    // Create a deep copy of current settings to modify and save to Firestore
    const updatedSettings = JSON.parse(
      JSON.stringify(settingsData)
    ) as SettingsData;

    // Traverse the object using the path to find the target node
    let current: any = updatedSettings;
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }

    const lastKey = path[path.length - 1];

    // If the target is a boolean leaf node, simply update its value
    if (typeof current[lastKey] === "boolean") {
      current[lastKey] = newValue;
    } else {
      // If the target is a parent node, update all its children recursively
      setAllValues(current[lastKey], newValue);
    }

    // Update local state
    setSettingsData(updatedSettings);

    // Save updates to Firestore using the updatedSettings directly
    if (auth.currentUser) {
      try {
        const userId = auth.currentUser.uid;
        const userAccountRef = doc(db, "userAccountInfo", userId);
        // Update only the settingsData field rather than the entire document
        await updateDoc(userAccountRef, {
          settingsData: updatedSettings,
        });
      } catch (error) {
        console.error("Error saving settings:", error);
      }
    }
  };

  // Helper function to recursively set all values in an object
  const setAllValues = (obj: any, value: boolean) => {
    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === "boolean") {
        obj[key] = value;
      } else {
        setAllValues(obj[key], value);
      }
    });
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/");
    } catch (error) {
      console.error("Error signing out:", error);
      Alert.alert("Error", "Failed to sign out. Please try again.");
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={COLORS.primary.main} />
        <Text style={styles.loadingText}>Loading settings...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Customize your preferences</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.settingsContainer}>
          <CheckboxTree data={settingsData} path={[]} onToggle={handleToggle} />
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons
            name="log-out-outline"
            size={24}
            color={COLORS.neutral.white}
          />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral.background,
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: theme.spacing.md,
    fontSize: theme.typography.fontSize.md,
    color: COLORS.neutral.darkGray,
  },
  header: {
    padding: theme.spacing.md,
    backgroundColor: COLORS.neutral.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral.lightGray,
    ...theme.shadows.small,
  },
  title: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: "600",
    color: COLORS.neutral.black,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.md,
    color: COLORS.neutral.darkGray,
  },
  settingsContainer: {
    padding: theme.spacing.lg,
    backgroundColor: COLORS.neutral.white,
    borderRadius: theme.borderRadius.md,
    margin: theme.spacing.md,
    ...theme.shadows.small,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary.main,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: theme.borderRadius.md,
    margin: theme.spacing.md,
    marginBottom: theme.spacing.xl,
    ...theme.shadows.small,
  },
  logoutButtonText: {
    color: COLORS.neutral.white,
    fontSize: theme.typography.fontSize.md,
    fontWeight: "600",
    marginLeft: theme.spacing.xs,
  },
});

export default Settings;
