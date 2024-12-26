import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
import BottomNavigation from './BottomNavigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const AppointmentsScreen = ({ navigation }) => {
    const [selectedTab, setSelectedTab] = useState('Appointments');

    const upcomingAppointments = [
        {
            id: '1',
            doctorName: 'Dr. Amitabh Pahdi',
            specialty: 'Cardiologist',
            hospital: 'BC Roy Hospital, IIT Kharagpur',
            appointmentTime: 'in 23hrs',
            isUpcoming: true,
            image: require('../assets/Maledoc.jpg'), // Replace with your doctor image asset
        },
    ];

    const pastAppointments = [
        {
            id: '2',
            doctorName: 'Dr. Munna Bhaiya',
            specialty: 'Pediatrics',
            hospital: 'BC Roy Hospital, IIT Kharagpur',
            appointmentTime: 'on 24 Oct 2024',
            isUpcoming: false,
            image: require('../assets/Maledoc.jpg'), // Replace with your doctor image asset
        },
        {
            id: '3',
            doctorName: 'Dr. Kallu ',
            specialty: 'Dentist',
            hospital: 'BC Roy Hospital, IIT Kharagpur',
            appointmentTime: 'on 24 Oct 2024',
            isUpcoming: false,
            image: require('../assets/Maledoc.jpg'), // Replace with your doctor image asset
        },
    ];

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Appointments</Text>
            </View>

            {/* Search Bar */}
            <View style={styles.searchBarContainer}>
                <Icon name="search" size={24} color="#000" />

                <TextInput
                    style={styles.searchInput}
                    placeholder="Search for a doctor or clinic"
                    placeholderTextColor="#999"
                />
                <TouchableOpacity>
                    <Image
                        source={require('../assets/calendar-schedule-line.png')} // Replace with your search icon asset
                        style={styles.searchIcon}
                    />
                </TouchableOpacity>
            </View>

            {/* Appointments List */}
            <ScrollView style={styles.scrollView}>
                {/* Upcoming Appointments */}
                <Text style={styles.sectionTitle}>Upcoming Appointment</Text>
                {upcomingAppointments.map((appointment) => (
                    <View key={appointment.id} style={styles.appointmentCard}>
                        <Image source={appointment.image} style={styles.doctorImage} />
                        <View style={styles.cardContent}>
                            <Text style={styles.specialty}>{appointment.specialty}</Text>
                            <Text style={styles.doctorName}>{appointment.doctorName}</Text>
                            <Text style={styles.hospital}>{appointment.hospital}</Text>
                            <Text
                                style={styles.appointmentTimeUpcoming}
                            >
                                {`Appointment ${appointment.appointmentTime}`}
                            </Text>
                        </View>
                    </View>
                ))}

                {/* Past Appointments */}
                <Text style={styles.sectionTitle}>Past Appointment</Text>
                {pastAppointments.map((appointment) => (
                    <View key={appointment.id} style={styles.appointmentCard}>
                        <Image source={appointment.image} style={styles.doctorImage} />
                        <View style={styles.cardContent}>
                            <Text style={styles.specialty}>{appointment.specialty}</Text>
                            <Text style={styles.doctorName}>{appointment.doctorName}</Text>
                            <Text style={styles.hospital}>{appointment.hospital}</Text>
                            <Text
                                style={styles.appointmentTimePast}
                            >
                                {`Appointment ${appointment.appointmentTime}`}
                            </Text>
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* Bottom Navigation */}
            <BottomNavigation />
        </View>
    );
};

export default AppointmentsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        backgroundColor: '#164772',
        padding: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        margin: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: '#333',
    },
    searchIcon: {
        width: 20,
        height: 20,
        tintColor: '#999',
    },
    scrollView: {
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#164772',
        marginVertical: 10,
    },
    appointmentCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5,
    },
    doctorImage: {
        width: 95, // Square image dimensions
        height: 95,
        marginRight: 5,
        borderRadius: 8, // Slightly rounded edges (optional)
    },
    cardContent: {
        flex: 1,
    },
    specialty: {
        fontSize: 14,
        fontWeight: '400',
        color: 'black', // Greyish color
        backgroundColor: '#F5F5F5', // Light grey background
        paddingHorizontal: 5,
        paddingVertical: 3,
        borderRadius: 5,
        alignSelf: 'flex-start',
    },
    doctorName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    hospital: {
        fontSize: 13,
        color: 'black',
    },
    appointmentTime: {
        fontWeight: '600',
        color: '#1BBA8D',
    },
    appointmentTimeUpcoming: {
        color: '#1BBA8D', 
        fontStyle: 'italic',
        fontSize: 14,// Green color for upcoming appointments
    },
    appointmentTimePast: {
        // color: '#999999',
        color: '#767676',
        fontSize: 14,
        fontStyle: 'italic',
         // Greyish color for past appointments
    },
});
