import { Redirect } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Auth from "../components/Auth";
import { auth } from "../utils/firebase";
export default function Index() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsUserLoggedIn(user !== null);
      setLoading(false);

      if (user) {
        console.log("User ID:", user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <View style={styles.container} />;
  }

  // Show Settings component for debugging purposes

  if (isUserLoggedIn) {
    return <Redirect href="/patient" />;
  }

  return (
    <View style={styles.container}>
      <Auth />
      {/* <Redirect href="/patient" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  settingsWrapper: {
    flex: 1,
    width: "100%",
  },
});
