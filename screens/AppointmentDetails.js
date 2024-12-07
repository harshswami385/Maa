import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AppointmentDetails = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Appointment Details</Text>
            <Text style={styles.details}>Details of the appointment </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    details: {
        fontSize: 18,
        marginTop: 20,
    },
});

export default AppointmentDetails;
