import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  Dimensions,
  Modal,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import {useNavigation,useRoute } from '@react-navigation/native';

const { width } = Dimensions.get("window");


const AppointmentForm = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [dob, setDob] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("Morning");
  const [calendarData, setCalendarData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sex, setSex] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const navigation = useNavigation();
  const route = useRoute();
  const { doctor } = route.params;

  
  

  useEffect(() => {
    setCalendarData(generateDates());
  }, []);

  const handlePayPress = () => {
    // Navigate to AppointmentConfirmation screen
    navigation.navigate('AppointmentConfirmation', {
        name: name,
        doctor: doctor,
        selectedDate: selectedDate,
        dob: dob,
        sex: sex
    });
};

  const generateDates = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const handleDateChange = (event, selected) => {
    setShowDatePicker(false);
    if (selected) setDob(selected.toISOString().split("T")[0]);
  };

  const handleMonthChange = (event, selected) => {
    if (selected) {
      setSelectedMonth(selected);
      setShowMonthPicker(false);
    }
  };

  const renderDateItem = (date) => {
    const day = date.toLocaleString("en-US", { weekday: "short" });
    const dayNumber = date.getDate();
    const dateKey = date.toISOString().split("T")[0];

    return (
      <TouchableOpacity
        key={dateKey}
        style={[
          styles.dateContainer,
          selectedDate === dateKey && styles.selectedDate,
        ]}
        onPress={() => setSelectedDate(dateKey)}
      >
        <Text
          style={[
            styles.dateText,
            selectedDate === dateKey && styles.selectedDateText,
          ]}
        >
          {day}
        </Text>
        <Text
          style={[
            styles.dayNumber,
            selectedDate === dateKey && styles.selectedDateText,
          ]}
        >
          {dayNumber}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate("DoctorProfile")}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
        <Text style={styles.headerText}>Appointment</Text>
        <TouchableOpacity onPress={() => setShowMonthPicker(true)}>
          <Text style={styles.monthText}>
            {selectedMonth.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Month Picker */}
      {showMonthPicker && (
        <DateTimePicker
          value={selectedMonth}
          mode="date"
          display="calendar"
          onChange={handleMonthChange}
          maximumDate={new Date(2030, 11, 31)}
          minimumDate={new Date(2020, 0, 1)}
        />
      )}

      {/* Fixed Calendar and Time Slots */}
      <View style={styles.fixedContainer}>
        {/* Horizontal Scrollable Calendar */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.calendar}>
          {calendarData.map((date) => renderDateItem(date))}
        </ScrollView>

        {/* Time Slots */}
        <View style={styles.timeSlotContainer}>
          <TouchableOpacity
            style={[
              styles.timeSlot,
              selectedTimeSlot === "Morning" && styles.selectedTimeSlot,
            ]}
            onPress={() => setSelectedTimeSlot("Morning")}
          >
            <Text
              style={[
                styles.timeSlotText,
                selectedTimeSlot === "Morning" && styles.selectedTimeSlotText,
              ]}
            >
              Morning{"\n"}9AM - 12PM
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.timeSlot,
              selectedTimeSlot === "Afternoon" && styles.selectedTimeSlot,
            ]}
            onPress={() => setSelectedTimeSlot("Afternoon")}
          >
            <Text
              style={[
                styles.timeSlotText,
                selectedTimeSlot === "Afternoon" && styles.selectedTimeSlotText,
              ]}
            >
              Afternoon{"\n"}2PM - 5PM
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Scrollable Form */}
      <ScrollView style={styles.formContainer}>
        <View style={styles.form}>
          <Text style={styles.label}>Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#aaa"
            value={name}
            onChangeText={setName}
          />

          <View style={styles.row}>
            <View style={styles.halfInputContainer}>
              <Text style={styles.label}>Sex *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your sex"
                placeholderTextColor="#aaa"
                value={sex}
                onChangeText={setSex}
              />
            </View>
            <View style={styles.halfInputContainer}>
              <Text style={styles.label}>DOB *</Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={{ color: dob ? "#000" : "#aaa" }}>
                  {dob || "DD/MM/YYYY"}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={dob ? new Date(dob) : new Date()}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                  maximumDate={new Date()}
                />
              )}
            </View>
          </View>

          <Text style={styles.label}>Institute Email ID *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
      </ScrollView>

      {/* Footer */}
       <View style={styles.payButtonContainer}>
                <TouchableOpacity style={styles.payButton} onPress={handlePayPress}>
                    <Text style={styles.payButtonText}>Pay {doctor.fees}</Text>
                </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    backgroundColor: "#164772",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 30, // Add rounded corner
    borderBottomRightRadius: 30, // Add rounded corner
  },
  headerText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  monthText: { color: "#fff", fontSize: 16 },
  fixedContainer: { backgroundColor: "#fff" },
  calendar: { marginVertical: 10 },
  dateContainer: {
    width: 60,
    height: 80,
    marginHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
  },
  selectedDate: { backgroundColor: "#1BBA8D" },
  dateText: { fontSize: 12, color: "#1BBA8D" },
  dayNumber: { fontSize: 20, fontWeight: "bold", color: "#1BBA8D" },
  selectedDateText: { color: "#fff" },
  timeSlotContainer: { flexDirection: "row", justifyContent: "space-evenly" },
  timeSlot: {
    backgroundColor: "#E5E5E5",
    borderRadius: 10,
    paddingVertical: 12,
    width: "45%",
    alignItems: "center",
  },
  selectedTimeSlot: { backgroundColor: "#1BBA8D" },
  timeSlotText: { color: "#333", textAlign: "center" },
  selectedTimeSlotText: { color: "#fff" },
  formContainer: { flex: 1 ,},
  form: { paddingHorizontal: 20,marginTop:15 },
  label: { marginBottom:10, color: "#333", fontWeight: "bold" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#F9F9F9",
  },
  row: { flexDirection: "row", justifyContent: "space-between" },
  halfInputContainer: { width: "48%" },
  footer: { padding: 20 },
  payButton: {
    backgroundColor: "#164772",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
  },
  payButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default AppointmentForm;
