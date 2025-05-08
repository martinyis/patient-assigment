import { FirebaseApp, getApps, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import {
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSKlytDTWrbHZo-Yo3Dn3RAochPbq8bcU",
  authDomain: "take-home-5f2a1.firebaseapp.com",
  projectId: "take-home-5f2a1",
  storageBucket: "take-home-5f2a1.firebasestorage.app",
  messagingSenderId: "760328329678",
  appId: "1:760328329678:web:8b713cb0a9f6788eb3f39f",
  measurementId: "G-E9TERBWRSF",
};

// Initialize Firebase
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

auth = getAuth(app);
db = getFirestore(app);

// Default settings data
export const defaultSettingsData = {
  settings: {
    notifications: {
      email: true,
      sms: false,
      push: {
        android: true,
        ios: false,
      },
    },
    privacy: {
      location: false,
      camera: true,
      microphone: false,
    },
    security: {
      twoFactorAuth: true,
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
          catalan: false,
          quechua: false,
        },
      },
    },
  },
  integrations: {
    slack: true,
    github: {
      issues: true,
      pullRequests: true,
    },
    jira: {
      basic: false,
      advanced: {
        workflows: false,
        automations: false,
      },
    },
  },
};

// Initialize user account info in Firestore
export const initializeUserAccount = async (userId: string, role?: string) => {
  try {
    const userAccountRef = doc(db, "userAccountInfo", userId);
    const userAccountData = {
      role: role || "patient", // Use provided role or default to "patient"
      settingsData: defaultSettingsData, // Include settings data inside user account
      createdAt: new Date().toISOString(),
      email: auth.currentUser?.email || "", // Store the user's email
      name: auth.currentUser?.displayName || "User", // Store display name if available
    };

    await setDoc(userAccountRef, userAccountData);
    console.log("User account initialized successfully");
    return true;
  } catch (error) {
    console.error("Error initializing user account:", error);
    return false;
  }
};

// Get user role from Firestore
export const getUserRole = async (userId: string): Promise<string | null> => {
  try {
    const userAccountRef = doc(db, "userAccountInfo", userId);
    const userAccountDoc = await getDoc(userAccountRef);

    if (userAccountDoc.exists()) {
      const userData = userAccountDoc.data();
      return userData.role || "patient"; // Default to patient if role is not set
    } else {
      console.warn("User account document not found");
      return "patient"; // Default to patient if document doesn't exist
    }
  } catch (error) {
    console.error("Error getting user role:", error);
    return null;
  }
};

// Get all patients from Firestore
export const getPatients = async () => {
  try {
    // Query users with role "patient"
    const usersRef = collection(db, "userAccountInfo");
    const q = query(usersRef, where("role", "==", "patient"));
    const querySnapshot = await getDocs(q);

    const patients = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name || "Patient", // Fallback if name isn't set
        email: data.email || doc.id, // Use stored email or ID as fallback
        settings: data.settingsData || defaultSettingsData, // Use the settings data
        createdAt: data.createdAt,
      };
    });

    return patients;
  } catch (error) {
    console.error("Error fetching patients:", error);
    return [];
  }
};

// Keeping this for backward compatibility, but it will be deprecated
export const initializeUserSettings = async (userId: string) => {
  return initializeUserAccount(userId);
};

export { app, auth, db };
