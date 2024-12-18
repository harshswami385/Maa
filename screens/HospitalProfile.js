import React, { useState, useEffect,memo } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Linking,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { doctorsList } from './sampleData'; // Import sample data for doctors

const HospitalProfile = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { hospital } = route.params;

    const [activeTab, setActiveTab] = useState('Doctors'); // Manage tabs: Doctors or About
    const [selectedDay, setSelectedDay] = useState('Monday'); // Default selected day
    const [filteredDoctors, setFilteredDoctors] = useState([]); // Doctors filtered by hospital and day

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    useEffect(() => {
        // Filter doctors by hospital and selected day
        const filtered = doctorsList.filter((doctor) => {
            const matchesHospital =
                doctor.hospitalName.trim().toLowerCase() === hospital.name.trim().toLowerCase();
            const matchesDay = doctor.schedule.some(
                (day) =>
                    day.day.toLowerCase() === selectedDay.toLowerCase() &&
                    day.clinics.some((clinic) => clinic.timings.length > 0)
            );
            return matchesHospital && matchesDay;
        });

        const updatedDoctors = filtered.map((doctor) => {
            const scheduleForDay = doctor.schedule.find(
                (day) => day.day.toLowerCase() === selectedDay.toLowerCase()
            );
            return {
                ...doctor,
                clinics: scheduleForDay ? scheduleForDay.clinics : [],
            };
        });

        setFilteredDoctors(updatedDoctors);
    }, [hospital, selectedDay]);

    const handleCallNow = (phoneNumber) => {
        Linking.openURL(`tel:${phoneNumber}`);
    };

    const handleDoctorClick = (doctor) => {
        navigation.navigate('DoctorProfile', { doctor }); // Pass doctor data to the DoctorProfile screen
    };

    const handleBackPress = () => {
        navigation.goBack(); // Navigate back to the previous screen
    };

    return (
        <View style={styles.container}>
            <ScrollView stickyHeaderIndices={[1]} showsVerticalScrollIndicator={false}>
                {/* Header Section */}
                <View style={styles.header}>
                    {/* Back Button */}
                    <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                        <Image
                            source={require('../assets/d.png')} // Replace with your back icon image
                            style={styles.backButtonImage}
                        />
                    </TouchableOpacity>

                    {/* Image */}
                    <Image source={hospital.image} style={styles.image} />

                    {/* Header Content */}
                    <View style={styles.headerContent}>
                        <Text style={styles.hospitalName}>{hospital.name}</Text>
                        <Text style={styles.hospitalAddress}>{hospital.address}</Text>
                    </View>
                </View>

                {/* Sticky Section */}
                <View style={styles.stickyContainer}>
                    <View style={styles.tabContainer}>
                        <TouchableOpacity
                            style={[styles.tabButton, activeTab === 'Doctors' && styles.activeTabButton]}
                            onPress={() => setActiveTab('Doctors')}
                        >
                            <Text style={[styles.tabText, activeTab === 'Doctors' && styles.activeTabText]}>
                                Doctors
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tabButton, activeTab === 'About' && styles.activeTabButton]}
                            onPress={() => setActiveTab('About')}
                        >
                            <Text style={[styles.tabText, activeTab === 'About' && styles.activeTabText]}>
                                About
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Days Section */}
                    {activeTab === 'Doctors' && (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.daysScroll}>
                            <View style={styles.daysContainer}>
                                {daysOfWeek.map((day, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={[
                                            styles.dayButton,
                                            selectedDay.toLowerCase() === day.toLowerCase() && styles.selectedDayButton,
                                        ]}
                                        onPress={() => setSelectedDay(day)}
                                    >
                                        <Text
                                            style={[
                                                styles.dayText,
                                                selectedDay.toLowerCase() === day.toLowerCase() &&
                                                    styles.selectedDayText,
                                            ]}
                                        >
                                            {day.slice(0, 3)}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </ScrollView>
                    )}
                </View>

                {/* Tab Content */}
                {activeTab === 'Doctors' ? (
                    <View>
                        {filteredDoctors.length > 0 ? (
                            filteredDoctors.map((doctor) => (
                                <TouchableOpacity
                                    key={doctor.id}
                                    style={styles.doctorCard}
                                    onPress={() => handleDoctorClick(doctor)} // Navigate to doctor profile
                                >
                                    <Image source={doctor.image} style={styles.doctorImage} />
                                    <View style={styles.doctorInfo}>
                                        <Text style={styles.doctorName}>{doctor.name}</Text>
                                        <Text style={styles.specialty}>{doctor.specialty}</Text>
                                        <Text style={styles.clinicName}>{doctor.clinicName}</Text>
                                        {doctor.clinics.map((clinic, index) => (
                                            <View key={index}>
                                                <Text style={styles.clinicLocation}>{clinic.location}</Text>
                                                <Text style={styles.schedule}>
                                                    Timings: {clinic.timings.join(', ')}
                                                </Text>
                                            </View>
                                        ))}
                                        <Text style={styles.fees}>Fees: {doctor.fees}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))
                        ) : (
                            <View style={styles.noDoctorsContainer}>
                                <Text style={styles.noDoctorsText}>No doctors available on {selectedDay}.</Text>
                            </View>
                        )}
                    </View>
                ) : (
                    <View style={styles.aboutContainer}>
                        <Text style={styles.aboutText}>
                            {hospital.name} is one of the leading healthcare institutions in the region, providing
                            exceptional care and services to patients from all walks of life. Our dedicated team of
                            professionals ensures that every patient receives top-notch medical treatment.
                        </Text>
                    </View>
                )}
            </ScrollView>

            {/* Call Now Button */}
            <TouchableOpacity
                style={styles.callNowHospitalButton}
                onPress={() => handleCallNow('+91-1234567890')}
            >
                <Text style={styles.callNowButtonText}>Call {hospital.name}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        position: 'relative',
        backgroundColor: '#FFFFFF',
        zIndex: 10,
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 16,
        zIndex: 20,
    },
    backButtonImage: {
        width: 24,
        height: 24,
        tintColor: '#FFFFFF', // Change color of the image if needed
    },
    image: {
        width: '100%',
        height: 200,
    },
    headerContent: {
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    hospitalName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#164772',
    },
    hospitalAddress: {
        fontSize: 14,
        color: '#666666',
        marginTop: 4,
    },
    stickyContainer: {
        backgroundColor: '#FFFFFF',
        zIndex: 10,
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 12,
    },
    activeTabButton: {
        borderBottomWidth: 2,
        borderBottomColor: '#164772',
    },
    tabText: {
        fontSize: 16,
        color: '#999999',
    },
    activeTabText: {
        color: '#164772',
        fontWeight: 'bold',
    },
    daysScroll: {
        backgroundColor: '#FFFFFF',
    },
    daysContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    dayButton: {
        backgroundColor: '#E8F4FC',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginHorizontal: 4,
    },
    selectedDayButton: {
        backgroundColor: '#164772',
    },
    dayText: {
        color: '#164772',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    selectedDayText: {
        color: '#FFFFFF',
    },
    doctorCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        marginHorizontal: 16,
        marginVertical: 8,
        padding: 16,
        borderRadius: 10,
    },
    doctorImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    doctorInfo: {
        marginLeft: 16,
        flex: 1,
    },
    doctorName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#164772',
    },
    specialty: {
        fontSize: 14,
        color: '#666666',
        marginVertical: 4,
    },
    clinicName: {
        fontSize: 12,
        color: '#999999',
    },
    clinicLocation: {
        fontSize: 12,
        color: '#666666',
    },
    schedule: {
        fontSize: 12,
        color: '#666666',
        marginVertical: 4,
    },
    fees: {
        fontSize: 12,
        color: '#164772',
        fontWeight: 'bold',
    },
    noDoctorsContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    noDoctorsText: {
        fontSize: 16,
        color: '#999999',
    },
    callNowHospitalButton: {
        backgroundColor: '#164772',
        paddingVertical: 16,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 16,
        borderRadius: 10,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    callNowButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    aboutContainer: {
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    aboutText: {
        fontSize: 14,
        color: '#666666',
        lineHeight: 22,
    },
});

export default HospitalProfile;
