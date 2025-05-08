import { theme } from "@/utils/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CheckboxTreeProps {
  data: any;
  path: string[];
  onToggle: (path: string[], newValue: boolean) => void;
  indentLevel?: number;
}

// Using the theme colors
const COLORS = theme.colors;

export const CheckboxTree: React.FC<CheckboxTreeProps> = ({
  data,
  path,
  onToggle,
  indentLevel = 0,
}) => {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  const toggleExpand = (key: string) => {
    setExpanded((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isLeafNode = (value: any): boolean => typeof value === "boolean";
  const isChecked = (value: any): boolean => {
    if (isLeafNode(value)) {
      return value;
    }

    // For parent nodes, check if all children are checked
    return Object.values(value).every((val) =>
      isLeafNode(val) ? val : isChecked(val)
    );
  };

  const isMixed = (value: any): boolean => {
    if (isLeafNode(value)) {
      return false;
    }

    const childValues = Object.values(value).map((val) =>
      isLeafNode(val) ? val : isChecked(val)
    );

    return childValues.some(Boolean) && !childValues.every(Boolean);
  };

  const renderCheckbox = (key: string, value: any, currentPath: string[]) => {
    const isExpandable = !isLeafNode(value);
    const checked = isChecked(value);
    const mixed = isMixed(value);
    const isExpand = expanded[key];

    return (
      <View key={key} style={[styles.item, { marginLeft: indentLevel * 16 }]}>
        <View style={styles.checkboxRow}>
          {isExpandable ? (
            <TouchableOpacity
              onPress={() => toggleExpand(key)}
              style={styles.expandButton}
            >
              <Ionicons
                name={isExpand ? "chevron-down" : "chevron-forward"}
                size={18}
                color="#666"
              />
            </TouchableOpacity>
          ) : (
            <View style={styles.expandButton} />
          )}

          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => onToggle(currentPath, !checked)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.checkbox,
                checked ? styles.checked : styles.unchecked,
                mixed ? styles.mixed : null,
              ]}
            >
              {checked && !mixed && (
                <Ionicons name="checkmark" size={16} color="#fff" />
              )}
              {mixed && <View style={styles.mixedIndicator} />}
            </View>

            <Text style={styles.label}>
              {key.charAt(0).toUpperCase() +
                key.slice(1).replace(/([A-Z])/g, " $1")}
            </Text>
          </TouchableOpacity>
        </View>

        {isExpandable && isExpand && (
          <View style={styles.childrenContainer}>
            {Object.entries(value).map(([childKey, childValue]) =>
              renderCheckbox(childKey, childValue, [...currentPath, childKey])
            )}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {Object.entries(data).map(([key, value]) =>
        renderCheckbox(key, value, [...path, key])
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  item: {
    marginVertical: theme.spacing.xs + 2,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  expandButton: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingVertical: 6,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: theme.borderRadius.sm + 2,
    marginRight: theme.spacing.sm + 4,
    justifyContent: "center",
    alignItems: "center",
    ...theme.shadows.small,
  },
  checked: {
    backgroundColor: COLORS.primary.main,
    borderColor: COLORS.primary.main,
  },
  unchecked: {
    backgroundColor: COLORS.neutral.background,
    borderWidth: 1,
    borderColor: COLORS.neutral.mediumGray,
  },
  mixed: {
    backgroundColor: COLORS.primary.light + "33", // Adding transparency
    borderColor: COLORS.primary.main,
    borderWidth: 1,
  },
  mixedIndicator: {
    width: 12,
    height: 2,
    backgroundColor: COLORS.primary.main,
  },
  label: {
    fontSize: theme.typography.fontSize.md,
    color: COLORS.neutral.black,
    fontWeight: "400",
  },
  childrenContainer: {
    marginLeft: theme.spacing.md,
    marginTop: theme.spacing.xs,
    paddingLeft: theme.spacing.xs,
    borderLeftWidth: 1,
    borderLeftColor: COLORS.neutral.lightGray,
  },
});
