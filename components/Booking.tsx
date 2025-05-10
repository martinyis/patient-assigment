import { saveBooking } from "@/utils/firebase";
import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import Calendar from "./Calendar";
import TimePicker from "./TimePicker";

const Booking = () => {
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [userInfo, setUserInfo] = useState();
  const [name, onChangeName] = React.useState("");
  const [email, onChangeEmail] = React.useState("");
  const [service, onChangeService] = React.useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getDate = (date: any) => {
    setDate(date);
  };
  const getTime = (time: any) => {
    setTime(time);
  };
  const getUserInfo = (info: any) => {
    setUserInfo(info);
  };

  const submitBooking = async () => {
    if (!date || !time || !name || !email || !service) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await saveBooking({
        date,
        time,
        name,
        email,
        service,
      });

      if (success) {
        Alert.alert("Success", "Booking submitted successfully!");
        // Reset form
        setDate(undefined);
        setTime(undefined);
        onChangeName("");
        onChangeEmail("");
        onChangeService("");
      } else {
        Alert.alert("Error", "Failed to submit booking. Please try again.");
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Booking</Text>
      <Calendar getDate={getDate} />
      <TimePicker getTime={getTime} />
      <TextInput
        style={styles.input}
        onChangeText={onChangeName}
        value={name}
        placeholder="Enter your name"
      />
      <Text>Give us your email</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
        placeholder="Enter your email"
        keyboardType="email-address"
      />
      <Text>Give us service</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeService}
        value={service}
        placeholder="Enter service"
      />
      <Button
        onPress={submitBooking}
        title={isSubmitting ? "Submitting..." : "Submit booking"}
        disabled={isSubmitting}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Booking;
