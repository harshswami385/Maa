import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const DoctorSchedule = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { doctor } = route.params;

    const [openedDay, setOpenedDay] = useState(null);

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    useEffect(() => {
        const today = new Date().getDay();
        const initialDay = today === 1 ? daysOfWeek[0] : daysOfWeek[today];
        setOpenedDay(initialDay);
    }, []);

    const toggleAccordion = (day) => {
        setOpenedDay(openedDay === day ? null : day);
    };

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Image
                            source={require('../assets/Vector8.png')}
                            style={styles.backButtonImage}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Clinics and Schedules</Text>
                </View>
            </View>

            {/* Schedule Section */}
            <View style={styles.scheduleContainer}>
                {doctor.schedule.map((slot, index) => (
                    <View key={index}>
                        {/* Day Row */}
                        <TouchableOpacity
                            style={[styles.dayRow, openedDay === slot.day && styles.dayRowExpanded]}
                            onPress={() => toggleAccordion(slot.day)}
                        >
                            <Text style={styles.dayText}>{slot.day}</Text>
                            <Image
                                source={
                                    openedDay === slot.day
                                        ? require('../assets/down-arrow.png')
                                        : require('../assets/right-arrow.png')
                                }
                                style={styles.arrowIcon}
                            />
                        </TouchableOpacity>

                        {/* Clinics List */}
                        {openedDay === slot.day && (
                            <View style={styles.clinicList}>
                                {slot.clinics.map((clinic, clinicIndex) => (
                                    <View key={clinicIndex} style={styles.clinicBox}>
                                        {/* Row: Clinic Image and Details */}
                                        <View style={styles.clinicRow}>
                                            <Image source={clinic.clinicImage} style={styles.clinicImage} />
                                            <View style={styles.detailsContainer}>
                                                {/* Clinic Name and Location */}
                                                <Text style={styles.clinicName}>{clinic.clinicName}</Text>
                                                <Text style={styles.clinicLocation}>{clinic.location}</Text>
                                            </View>
                                        </View>

                                        {/* Timings (Start below the image) */}
                                        <View style={styles.timingContainer}>
                                            {clinic.timings.map((time, i) => (
                                                <View key={i} style={styles.timingBox}>
                                                    <Text style={styles.timingText}>{time}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    header: {
        backgroundColor: '#164772',
        borderBottomLeftRadius: 55,
        borderBottomRightRadius: 55,
        paddingTop: 50,
        paddingBottom: 55,
        alignItems: 'center',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
    },
    backButton: {
        marginRight: 10,
    },
    backButtonImage: {
        width: 20,
        height: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    scheduleContainer: {
        // backgroundColor: '#fff',
        marginHorizontal: 16,
        marginTop: 10,
        // borderRadius: 10,
        paddingVertical: 5,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.1,
        // shadowRadius: 3,
        // elevation: 2,
    },
    dayRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderColor: '#E0E0E0',
    },
    dayRowExpanded: {
        borderBottomWidth: 0,
    },
    dayText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    arrowIcon: {
        width: 20,
        height: 20,
    },
    clinicList: {
        paddingVertical: 10,
    },
    clinicBox: {
        flexDirection: 'column',
        marginBottom: 10,
        paddingHorizontal: 16,
    },
    clinicRow: {
        flexDirection: 'row', // Image and details are in a row
        alignItems: 'center',
        marginBottom: 8,
    },
    clinicImage: {
        width: 72,
        height: 98,
        borderRadius: 8,
        marginRight: 12,
    },
    detailsContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    clinicName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000',
        letterSpacing: -0.364,
        fontFamily: 'Poppins',
    },
    clinicLocation: {
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 21,
        color: '#666',
    },
    timingContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 8,
        gap: 8,
    },
    timingBox: {
        width: 140,              
        height: 37,             
        gap: 2,                 
        borderRadius: 16,        
        borderWidth: 0.4,        
        borderColor: '#1BBA8D',  
        backgroundColor: '#FFFFFF', 
        justifyContent: 'center', 
        alignItems: 'center',    
    },
    
    timingText: {
        fontSize: 14,
        fontWeight: '700',
        
        color: '#1BBA8D',          
        textTransform: 'uppercase',
        fontFamily: 'Poppins',
    },
    
});

export default DoctorSchedule;
