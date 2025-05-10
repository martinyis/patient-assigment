import React, { useState } from "react";
import { Button, Platform, StyleSheet, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface time {
  getTime: any;
}

const TimePicker = ({ getTime }: time) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string>("");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (time: Date) => {
    const formattedTime = time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    setSelectedTime(formattedTime);
    getTime(time);
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <Button title={selectedTime || "Select Time"} onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        is24Hour={false}
        display={Platform.OS === "ios" ? "spinner" : "default"}
        minuteInterval={15}
        locale="en_US"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});

export default TimePicker;
