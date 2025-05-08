// Default settings tree structure provided in the requirements
export const defaultSettingsTree = {
  settings: {
    notifications: {
      email: true,
      sms: false,
      push: {
        android: false,
        ios: true,
      },
    },
    privacy: {
      location: false,
      camera: true,
      microphone: false,
    },
    security: {
      twoFactorAuth: false,
      backupCodes: true,
    },
  },
  preferences: {
    theme: {
      darkMode: false,
      highContrast: false,
    },
    language: {
      english: true,
      spanish: false,
      nested: {
        regionalDialects: {
          catalan: true,
          quechua: false,
        },
      },
    },
  },
  integrations: {
    slack: false,
    github: {
      issues: true,
      pullRequests: false,
    },
    jira: {
      basic: false,
      advanced: {
        workflows: true,
        automations: false,
      },
    },
  },
};

// Mock user data for the Expert view
export const mockPatients = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    settings: {
      ...defaultSettingsTree,
      preferences: {
        ...defaultSettingsTree.preferences,
        theme: {
          darkMode: true,
          highContrast: true,
        },
      },
    },
    logs: {
      "2025-05-01": "Completed all exercises",
      "2025-05-02": "Missed afternoon session",
      "2025-05-04": "Extra stretching exercises",
    },
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    settings: defaultSettingsTree,
    logs: {
      "2025-05-03": "Followed all recommendations",
      "2025-05-04": "Experiencing mild discomfort",
    },
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    settings: {
      ...defaultSettingsTree,
      integrations: {
        slack: true,
        github: {
          issues: true,
          pullRequests: true,
        },
        jira: {
          basic: true,
          advanced: {
            workflows: true,
            automations: true,
          },
        },
      },
    },
    logs: {
      "2025-05-01": "Started new program",
      "2025-05-02": "Feeling great",
    },
  },
];
