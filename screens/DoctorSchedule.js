import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { doctorsList } from './sampleData'; 
const DoctorSchedule = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { doctor } = route.params; 

    const [openedDay, setOpenedDay] = useState(null);

    const toggleAccordion = (day) => {
        if (openedDay === day) {
            setOpenedDay(null); 
        } else {
            setOpenedDay(day); 
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Image
                            source={require('../assets/Vector8.png')}
                            style={styles.backButtonImage}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Clinics and Schedule</Text>
                </View>
            </View>

           
            <View style={styles.scheduleContainer}>
                <Text style={styles.heading}>Schedule for {doctor.name}</Text>

              
                {doctor.schedule.length > 0 ? (
                    doctor.schedule.map((slot, index) => (
                        <View key={index} style={styles.slotBox}>
                            <TouchableOpacity
                                onPress={() => toggleAccordion(slot.day)}
                                style={styles.timeText}
                            >
                                <Text style={styles.timeText}>{slot.day}</Text>
                            </TouchableOpacity>

                            {/* Render clinics for the selected day */}
                            {openedDay === slot.day && (
                                <View style={styles.clinicList}>
                                    {slot.clinics.map((clinic, clinicIndex) => (
                                        <View key={clinicIndex} style={styles.clinicBox}>
                                            <Image source={clinic.clinicImage} style={styles.clinicImage} />
                                            <Text style={styles.clinicName}>{clinic.clinicName}</Text>
                                            <Text style={styles.clinicLocation}>{clinic.location}</Text>
                                            <Text style={styles.timeText}>Timings: {clinic.timings.join(', ')}</Text>
                                        </View>
                                    ))}
                                </View>
                            )}
                        </View>
                    ))
                ) : (
                    <Text style={styles.noScheduleText}>No schedule available</Text>
                )}
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
        resizeMode: 'contain',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
    },
    scheduleContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    slotBox: {
        backgroundColor: '#EAF9F1',
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
    },
    clinicList: {
        paddingLeft: 12,
        paddingBottom: 10,
    },
    timeText: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
        paddingVertical: 10,
    },
    clinicBox: {
        marginBottom: 10,
    },
    clinicName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    clinicLocation: {
        fontSize: 14,
        color: '#666',
    },
    clinicImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginBottom: 8,
    },
    noScheduleText: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
    },
});
export default DoctorSchedule;