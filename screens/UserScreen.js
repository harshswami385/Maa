import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MyAppointments = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Appointments Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 24,
    color: '#164772',
  },
});

export default MyAppointments;
