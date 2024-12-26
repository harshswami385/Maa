import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';

const { width } = Dimensions.get('window');

const AppointmentConfirmation = ({ route, navigation }) => {
    return (
        <ScrollView style={styles.container}>
            {/* Payment Section */}
            <View style={styles.paymentContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../assets/appointment-confirmation.gif')}  // Your GIF here
                        style={styles.paymentImage}
                        resizeMode="contain"
                    />
                </View>
                <Text style={styles.text}>
                    Appointment Booked successfully
                </Text>
                <Text style={styles.text2}>
                    Click Continue to get appointment details
                </Text>
                <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => navigation.navigate('AppointmentDetails')}  // Navigate to AppointmentDetails page
                >
                    <Text style={styles.confirmButtonText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
        paddingHorizontal: 20,
    },
    
    paymentContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        padding: 20,
    },
    imageContainer: {
        width: 400,
        height: 450,
        overflow: 'hidden',  // Optional: ensures the GIF doesn't overflow the container
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    paymentImage: {
        width: '100%',
        height: '100%',
    },
    confirmButton: {
        backgroundColor: '#164772',
        paddingVertical: 15,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    confirmButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    text: {
        color: '#164772',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    text2: {
        color: '#7D7D7D',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
});

export default AppointmentConfirmation;
