import { theme } from "@/utils/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, getPatients } from "../utils/firebase";

// Interface for patient data structure
interface Patient {
  id: string;
  name: string;
  email: string;
  settings: any;
}

// Using the theme colors
const COLORS = theme.colors;

const ExpertDashboard = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedPatients, setExpandedPatients] = useState<string[]>([]);
  const router = useRouter();

  // Fetch patients data from Firebase
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const patientsData = await getPatients();
        setPatients(patientsData);
      } catch (error) {
        console.error("Error fetching patients:", error);
        Alert.alert("Error", "Failed to load patients data");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const toggleExpand = (patientId: string) => {
    setExpandedPatients((prev) =>
      prev.includes(patientId)
        ? prev.filter((id) => id !== patientId)
        : [...prev, patientId]
    );
  };

  // Helper function to navigate the settings object
  const getNestedSettings = (obj: any): { [key: string]: any } => {
    // Check if the settings object has the expected structure
    if (obj.settings) {
      return obj.settings;
    } else if (obj.settingsData && obj.settingsData.settings) {
      return obj.settingsData.settings;
    } else {
      // Return the object itself if it doesn't fit expected patterns
      return obj;
    }
  };

  const renderSettingItem = (key: string, value: any) => {
    if (typeof value === "object" && value !== null) {
      // Check if this is a setting with 'enabled' property
      if ("enabled" in value) {
        const enabled = value.enabled;
        return (
          <View key={key} style={styles.settingItem}>
            <View style={styles.settingHeader}>
              <Text style={styles.settingName}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Text>
              <View
                style={[
                  styles.statusIndicator,
                  {
                    backgroundColor: enabled
                      ? COLORS.primary.main
                      : COLORS.neutral.mediumGray,
                  },
                ]}
              />
            </View>
            {enabled && (
              <View style={styles.settingDetails}>
                {Object.entries(value)
                  .filter(([k]) => k !== "enabled")
                  .map(([k, v]) => (
                    <Text key={k} style={styles.settingValue}>
                      {k.charAt(0).toUpperCase() + k.slice(1)}: {String(v)}
                    </Text>
                  ))}
              </View>
            )}
          </View>
        );
      } else {
        // For objects without an 'enabled' property
        return (
          <View key={key} style={styles.settingGroup}>
            <Text style={styles.settingGroupName}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Text>
            <View style={styles.nestedSettings}>
              {Object.entries(value).map(([nestedKey, nestedValue]) =>
                renderSettingItem(nestedKey, nestedValue)
              )}
            </View>
          </View>
        );
      }
    } else if (value === true || value === false) {
      // For simple boolean settings
      return (
        <View key={key} style={styles.settingItem}>
          <View style={styles.settingHeader}>
            <Text style={styles.settingName}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Text>
            <View
              style={[
                styles.statusIndicator,
                {
                  backgroundColor: value
                    ? COLORS.primary.main
                    : COLORS.neutral.mediumGray,
                },
              ]}
            />
          </View>
        </View>
      );
    }
    return null;
  };

  const renderPatientItem = ({ item }: { item: Patient }) => {
    const isExpanded = expandedPatients.includes(item.id);
    const patientSettings = getNestedSettings(item);

    return (
      <View style={styles.patientCard}>
        <TouchableOpacity
          style={[
            styles.patientHeader,
            isExpanded && styles.patientHeaderExpanded,
          ]}
          onPress={() => toggleExpand(item.id)}
        >
          <View style={styles.patientInfo}>
            <Text style={styles.patientName}>{item.name}</Text>
            <Text style={styles.patientEmail}>{item.email}</Text>
          </View>
          <Ionicons
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={24}
            color={COLORS.neutral.black}
          />
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.settingsContainer}>
            <Text style={styles.settingsTitle}>Health Settings</Text>
            <ScrollView
              style={styles.settingsScrollView}
              nestedScrollEnabled={true}
            >
              {Object.keys(patientSettings).length === 0 ? (
                <Text style={styles.noSettings}>No settings configured</Text>
              ) : (
                Object.entries(patientSettings).map(([key, value]) =>
                  renderSettingItem(key, value)
                )
              )}
            </ScrollView>
          </View>
        )}
      </View>
    );
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Expert Dashboard</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons
            name="log-out-outline"
            size={22}
            color={COLORS.primary.main}
          />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary.main} />
          <Text style={styles.loadingText}>Loading patients data...</Text>
        </View>
      ) : patients.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="people-outline"
            size={60}
            color={COLORS.neutral.mediumGray}
          />
          <Text style={styles.emptyText}>No patients assigned</Text>
        </View>
      ) : (
        <FlatList
          data={patients}
          renderItem={renderPatientItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.patientsList}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing.md,
    backgroundColor: COLORS.neutral.white,
    ...theme.shadows.small,
  },
  title: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: "600",
    color: COLORS.neutral.black,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoutText: {
    marginLeft: theme.spacing.xs,
    color: COLORS.primary.main,
    fontWeight: "500",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: theme.spacing.md,
    color: COLORS.neutral.darkGray,
    fontSize: theme.typography.fontSize.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.xl,
  },
  emptyText: {
    marginTop: theme.spacing.md,
    fontSize: theme.typography.fontSize.lg,
    color: COLORS.neutral.darkGray,
    textAlign: "center",
  },
  patientsList: {
    flex: 1,
    padding: theme.spacing.md,
  },
  patientCard: {
    backgroundColor: COLORS.neutral.white,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
    overflow: "hidden",
    ...theme.shadows.small,
  },
  patientHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral.lightGray,
  },
  patientHeaderExpanded: {
    borderBottomColor: COLORS.neutral.lightGray,
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: "600",
    color: COLORS.neutral.black,
    marginBottom: theme.spacing.xs / 2,
  },
  patientEmail: {
    fontSize: theme.typography.fontSize.sm,
    color: COLORS.neutral.darkGray,
  },
  settingsContainer: {
    padding: theme.spacing.md,
  },
  settingsScrollView: {
    maxHeight: 300,
  },
  settingsTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: "600",
    color: COLORS.neutral.black,
    marginBottom: theme.spacing.md,
  },
  noSettings: {
    fontSize: theme.typography.fontSize.md,
    color: COLORS.neutral.mediumGray,
    fontStyle: "italic",
    textAlign: "center",
    paddingVertical: theme.spacing.md,
  },
  settingGroup: {
    marginBottom: theme.spacing.md,
  },
  settingGroupName: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: "600",
    color: COLORS.neutral.black,
    marginBottom: theme.spacing.xs,
  },
  nestedSettings: {
    paddingLeft: theme.spacing.md,
  },
  settingItem: {
    marginBottom: theme.spacing.sm,
  },
  settingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  settingName: {
    fontSize: theme.typography.fontSize.md,
    color: COLORS.neutral.black,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  settingDetails: {
    marginTop: theme.spacing.xs,
    paddingLeft: theme.spacing.md,
  },
  settingValue: {
    fontSize: theme.typography.fontSize.sm,
    color: COLORS.neutral.darkGray,
    marginBottom: 2,
  },
});

export default ExpertDashboard;
