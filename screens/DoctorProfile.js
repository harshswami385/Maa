import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const DoctorProfile = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { doctor } = route.params || {}; // Add a fallback to avoid undefined errors

    const [bookingStatus, setBookingStatus] = useState(false); // Tracks booking availability (mocked initially)

    useEffect(() => {
        // Simulate fetching booking status from backend
        const fetchBookingStatus = async () => {
            try {
                const response = await fakeApiCall();
                setBookingStatus(response.bookingStarted);
            } catch (error) {
                console.error('Error fetching booking status:', error);
            }
        };

        fetchBookingStatus();
    }, []);

    const fakeApiCall = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ bookingStarted: true }); // Change to 'false' to simulate booking closed
            }, 1000);
        });
    };

    const handleCallPress = () => {
        if (doctor.contactNumber) {
            const phoneNumber = `tel:${doctor.contactNumber}`;
            Linking.openURL(phoneNumber).catch(err => Alert.alert('Error', 'Unable to open dial pad.'));
        } else {
            Alert.alert('Info', 'Contact number not available.');
        }
    };

    const handleSchedulePress = () => {
        navigation.navigate('DoctorSchedule', { doctor });
    };

    const handleBookAppointmentPress = () => {
        if (bookingStatus) {
            navigation.navigate('AppointmentForm', { doctor });
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Clinic Image */}
                <Image source={typeof doctor.clinicImage === 'number' ? doctor.clinicImage : { uri: doctor.clinicImage }} style={styles.clinicImage} />

                {/* Header */}
                <View style={styles.headerContainer}>
                    <View style={styles.profileOverlay}>
                        <Image source={typeof doctor.image === 'number' ? doctor.image : { uri: doctor.image }} style={styles.profileImage} />
                    </View>
                    <TouchableOpacity style={styles.scheduleButton} onPress={handleSchedulePress}>
                        <Text style={styles.scheduleButtonText}>Check Schedule</Text>
                    </TouchableOpacity>
                </View>

                {/* Doctor Details */}
                <View style={styles.profileDetailsContainer}>
                    <Text style={styles.name}>
                        {doctor.name} <Text style={styles.specialization}>{doctor.specialty}</Text>
                    </Text>
                    <Text style={styles.address}>
                        {doctor.hospitalName}, {doctor.address}, {doctor.district}, {doctor.state}, {doctor.pinCode}
                    </Text>
                    <Text style={styles.waitTime}>
                        Rs. {doctor.fees}/Appointment
                    </Text>

                    {/* Booking Message */}
                    {bookingStatus ? (
                        <View style={styles.estimatedTimeContainer}>
                            <Text style={styles.estimatedTimeText}>
                                Your estimated wait time will be around <Text style={styles.boldGreenText}>9:30 AM</Text> if you book now
                            </Text>
                        </View>
                    ) : (
                        <View style={styles.bookingNotAvailableContainer}>
                            <Text style={styles.bookingNotAvailableText}>
                                Queue booking will start in about <Text style={styles.boldOrangeText}>23hrs 4min</Text>
                                {'\n'}Please check back then to reserve your spot!
                            </Text>
                        </View>
                    )}
                </View>

                {/* About Section */}
                <View style={styles.aboutSection}>
                    <Text style={styles.aboutTitle}>About</Text>
                </View>
                <View style={styles.aboutContainer}>
                    <Text style={styles.aboutText}>{doctor.about}</Text>
                </View>

                {/* Image Gallery */}
                <View style={styles.galleryContainer}>
                    <Text style={styles.galleryTitle}>Gallery</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.galleryScroll}>
                        {doctor.galleryImages && doctor.galleryImages.length > 0 ? (
                            doctor.galleryImages.map((img, index) => (
                                <Image
                                    key={index}
                                    source={{ uri: img }}
                                    style={styles.galleryImage}
                                />
                            ))
                        ) : (
                            <Text style={styles.noImagesText}>No images available</Text>
                        )}
                    </ScrollView>
                </View>
            </ScrollView>

            {/* Bottom Buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[
                        styles.bookButton,
                        bookingStatus ? styles.bookButtonEnabled : styles.bookButtonDisabled,
                    ]}
                    onPress={handleBookAppointmentPress}
                    disabled={!bookingStatus}
                >
                    <Text
                        style={[
                            styles.bookButtonText,
                            bookingStatus ? styles.bookButtonTextEnabled : styles.bookButtonTextDisabled,
                        ]}
                    >
                        Book Appointment
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.callButton} onPress={handleCallPress}>
                    <Text style={styles.buttonText}>Call Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9f9f9' },
    scrollContent: { paddingBottom: 100 },
    clinicImage: { width: '100%', height: 220, resizeMode: 'cover' },
    headerContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: -55, paddingHorizontal: 16 },
    profileOverlay: { backgroundColor: '#fff', borderRadius: 100, elevation: 6, padding: 4 },
    profileImage: { width: 101, height: 101, borderRadius: 100 },
    scheduleButton: { width: 135, height: 38, borderRadius: 16, borderWidth: 1, borderColor: '#1BBA8D', alignItems: 'center', justifyContent: 'center' },
    scheduleButtonText: { color: '#1BBA8D', fontWeight: 'bold' },
    profileDetailsContainer: { padding: 16 },
    name: { fontSize: 22, fontWeight: 'bold' },
    specialization: { fontSize: 16, color: '#555' },
    address: { fontSize: 14, color: '#6A6A6A' },
    waitTime: { color: '#1BBA8D', marginTop: 8 },
    boldGreenText: { color: '#1BBA8D' },
    boldOrangeText: { color: '#F2994A' },
    bookingNotAvailableContainer: { backgroundColor: '#FDF2E9', padding: 10, borderRadius: 8 },
    estimatedTimeContainer: { backgroundColor: '#1BBA8D', padding: 10, borderRadius: 8 },
    aboutSection: { marginHorizontal: 16, marginTop: 16 },
    aboutContainer: { padding: 14, backgroundColor: '#fff', borderRadius: 8 },
    aboutTitle: { fontSize: 18, fontWeight: 'bold' },
    aboutText: { fontSize: 14, color: '#444' },
    galleryContainer: { marginTop: 16 },
    galleryTitle: { fontSize: 18, fontWeight: 'bold', marginHorizontal: 16 },
    galleryScroll: { marginTop: 10, paddingLeft: 16 },
    galleryImage: { width: 120, height: 100, borderRadius: 8, marginRight: 10 },
    noImagesText: { color: '#888', fontStyle: 'italic' },
    buttonContainer: { flexDirection: 'row', padding: 16 },
    bookButton: { flex: 1, borderRadius: 8, padding: 12, alignItems: 'center', marginRight: 8 },
    bookButtonEnabled: { backgroundColor: '#1BBA8D' },
    bookButtonDisabled: { backgroundColor: '#E0E0E0' },
    bookButtonText: { fontWeight: 'bold' },
    bookButtonTextEnabled: { color: '#FFFFFF' },
    bookButtonTextDisabled: { color: '#9E9E9E' },
    callButton: { flex: 1, backgroundColor: '#FFFFFF', borderColor: '#BDBDBD', borderWidth: 1, borderRadius: 8, padding: 12, alignItems: 'center' },
    buttonText: { color: '#164772' },
});

export default DoctorProfile;
