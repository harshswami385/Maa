

import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Linking, Alert, FlatList } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const DoctorProfile = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { doctor } = route.params || {}; // Add a fallback to avoid undefined errors

    if (!doctor) {
        return (
            <View style={styles.errorMessageContainer}>
                <Text style={styles.errorMessage}>No doctor data available. Please go back and try again.</Text>
            </View>
        );
    }

    const [activeTab, setActiveTab] = useState('Reviews');
    const [expandedReviews, setExpandedReviews] = useState({});

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
        navigation.navigate('AppointmentForm', { doctor });
    };

    const toggleReviewExpansion = (index) => {
        setExpandedReviews((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const renderReview = ({ item, index }) => {
        const isExpanded = expandedReviews[index];
        const reviewText = isExpanded ? item.reviewText : item.reviewText.slice(0, 100) + '...';

        return (
            <View style={styles.reviewBox}>
                <View style={styles.reviewHeader}>
                    <Image source={{ uri: item.reviewerImage }} style={styles.reviewerImage} />
                    <View style={styles.reviewerInfo}>
                        <Text style={styles.reviewerName}>{item.reviewer}</Text>
                        <Text style={styles.reviewDate}>{item.date}</Text>
                    </View>
                    <View style={styles.ratingContainer}>
                        <Text style={styles.rating}>{item.rating} ★</Text>
                    </View>
                </View>
                <Text style={styles.reviewContent}>
                    {reviewText}
                    {item.reviewText.length > 100 && (
                        <Text
                            style={styles.readMore}
                            onPress={() => toggleReviewExpansion(index)}
                        >
                            {isExpanded ? ' See less' : ' Read more'}
                        </Text>
                    )}
                </Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Image source={typeof doctor.clinicImage === 'number' ? doctor.clinicImage : { uri: doctor.clinicImage }} style={styles.clinicImage} />

                <View style={styles.headerContainer}>
                    <View style={styles.profileOverlay}>
                        <Image source={typeof doctor.image === 'number' ? doctor.image : { uri: doctor.image }} style={styles.profileImage} />
                    </View>
                    <TouchableOpacity style={styles.scheduleButton} onPress={handleSchedulePress}>
                        <Text style={styles.scheduleButtonText}>Check Schedule</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.profileDetailsContainer}>
                    <Text style={styles.name}>
                        {doctor.name} <Text style={styles.specialization}>{doctor.specialty}</Text>
                    </Text>
                    <Text style={styles.address}>
                        {doctor.hospitalName}, {doctor.address}, {doctor.district}, {doctor.state}, {doctor.pinCode}
                    </Text>
                    <Text style={styles.waitTime}>
                        <Text style={styles.appointmentLabel}>Appointment Fee: </Text>
                        {doctor.fees}/Appointment
                    </Text>
                </View>

                <View style={styles.queueContainer}>
                    <View style={[styles.queueBox, { height: '85%' }]} >
                        <Text style={styles.queueText}> Current Queue</Text>
                        <Text style={styles.queueNumber}>{doctor.currentQueue}</Text>
                    </View>
                    <View style={styles.divider}></View>
                    <View style={[styles.queueBox, { height: '85%' }]} >
                        <Text style={styles.queueText}> Total Queue</Text>
                        <Text style={styles.queueNumber}>{doctor.yourQueue}</Text>
                    </View>
                </View>

                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'Reviews' ? styles.activeTab : styles.inactiveTab]}
                        onPress={() => setActiveTab('Reviews')}
                    >
                        <Text style={[styles.tabText, activeTab === 'Reviews' ? styles.activeTabText : styles.inactiveTabText]}>Reviews</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'About' ? styles.activeTab : styles.inactiveTab]}
                        onPress={() => setActiveTab('About')}
                    >
                        <Text style={[styles.tabText, activeTab === 'About' ? styles.activeTabText : styles.inactiveTabText]}>About</Text>
                    </TouchableOpacity>
                </View>

                {activeTab === 'Reviews' && (
                    <View>
                        <View style={styles.reviewSection}>
                            <Text style={styles.reviewTitle}>Reviews</Text>
                            <TouchableOpacity style={styles.seeReviewsContainer}>
                                <Text style={styles.seeReviews}>See Reviews ({doctor.reviews.length})</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={doctor.reviews}
                            renderItem={renderReview}
                            keyExtractor={(item, index) => index.toString()}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.reviewListContainer}
                        />
                    </View>
                )}

                {activeTab === 'About' && (
                    <View>
                        <View style={styles.aboutSection}>
                            <Text style={styles.aboutTitle}>About {doctor.name}</Text>
                        </View>
                        <View style={styles.aboutContainer}>
                            <Text style={styles.aboutText}>{doctor.about}</Text>
                        </View>
                    </View>
                )}
            </ScrollView>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.bookButton} onPress={handleBookAppointmentPress}>
                    <Text style={styles.bookButtonText}>Book Appointment</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.callButton} onPress={handleCallPress}>
                    <Text style={styles.buttonText}>Call Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    scrollContent: {
        paddingBottom: 100,
    },
    clinicImage: {
        width: '100%',
        height: 220,
        resizeMode: 'cover',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: 16,
        marginTop: -55,
    },
    profileOverlay: {
        backgroundColor: '#fff',
        borderRadius: 100,
        padding: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
    },
    profileImage: {
        width: 101,
        height: 101,
        borderRadius: 100,
    },
    scheduleButton: {
        width: 135,
        height: 38,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#1BBA8D',
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scheduleButtonText: {
        color: '#1BBA8D',
        fontWeight: 'bold',
        fontSize: 14,
    },
    profileDetailsContainer: {
        borderRadius: 12,
        padding: 16,
        marginHorizontal: 16,
        marginTop: 0,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    specialization: {
        fontSize: 16,
        color: '#555',
        fontWeight: '500',
    },
    address: {
        fontFamily: 'Poppins',
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 24,
        textAlign: 'left',
        color: '#6A6A6A',
    },
    waitTime: {
        fontSize: 14,
        color: '#1BBA8D',
        fontWeight: 'bold',
        marginTop: 8,
    },
    appointmentLabel: {
        color: '#1BBA8D',
        fontWeight: 'bold',
    },
    queueContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 16,
        marginVertical: 20,
        height: '7%',
    },
    queueBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        flex: 1,
        marginHorizontal: 5,
    },
    queueText: {
        fontSize: 14,
        color: '#333',
    },
    queueNumber: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
    },
    divider: {
        width: 1,
        height: 40,
        backgroundColor: '#ccc',
        marginHorizontal: 5,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 20,
    },
    tab: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 20,
    },
    activeTab: {
        backgroundColor: '#fff',
        borderColor: '#1BBA8D',
    },
    inactiveTab: {
        backgroundColor: '#E0E0E0',
        borderColor: 'transparent',
    },
    tabText: {
        fontSize: 16,
    },
    activeTabText: {
        color: '#1BBA8D',
        fontWeight: '600',
    },
    inactiveTabText: {
        color: '#6A6A6A',
    },
    reviewSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginTop: 16,
    },
    seeReviewsContainer: {},
    reviewTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    seeReviews: {
        fontSize: 16,
        color: '#1BBA8D',
        fontWeight: '600',
    },
    reviewListContainer: {
        paddingHorizontal: 16,
        paddingTop: 8,
    },
    reviewBox: {
        width: 250,
        marginRight: 16,
        padding: 16,
        borderRadius: 10,
        backgroundColor: '#fff',
        borderColor: '#1BBA8D',
        borderWidth: 1,
    },
    reviewHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    reviewerImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 8,
    },
    reviewerInfo: {
        flex: 1,
    },
    reviewerName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    reviewDate: {
        fontSize: 12,
        color: '#666',
    },
    ratingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    rating: {
        fontSize: 14,
        color: '#1BBA8D',
        fontWeight: 'bold',
    },
    reviewContent: {
        fontSize: 13,
        color: '#444',
        marginTop: 4,
    },
    readMore: {
        color: '#1BBA8D',
        fontWeight: '600',
    },
    aboutSection: {
        marginHorizontal: 16,
        marginTop: 16,
    },
    aboutTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    aboutContainer: {
        padding: 14,
        borderRadius: 10,
        backgroundColor: '#fff',
        marginHorizontal: 16,
    },
    aboutText: {
        fontSize: 14,
        color: '#444',
        lineHeight: 20,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        backgroundColor: '#f9f9f9',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    bookButton: {
        flex: 1,
        backgroundColor: '#164772', // Changed to blue
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginRight: 8,
    },
    callButton: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
    },
    buttonText: {
        color: '#164772',
        fontWeight: 'bold',
    },
    errorMessageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorMessage: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        margin: 16,
    },
});

export default DoctorProfile;



