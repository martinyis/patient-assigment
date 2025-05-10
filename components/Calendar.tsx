import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import CalendarPicker from "react-native-calendar-picker";

interface date {
  getDate: any;
}

const Calendar = ({ getDate }: date) => {
  const [curDate, setCurDate] = useState(null);
  const voidFn = (date: any) => {
    getDate(date);
  };
  return (
    <View style={styles.container}>
      <CalendarPicker onDateChange={voidFn} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
  },
});
export default Calendar;
