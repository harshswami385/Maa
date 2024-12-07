import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { recentItems, symptoms, doctorsList, hospitalsList, specialistCategories } from './sampleData';

const { width } = Dimensions.get('window');

const SearchScreen = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('Hospitals');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentLabel, setCurrentLabel] = useState('');
    const [currentLabelIndex, setCurrentLabelIndex] = useState(0);
    const searchLabels = ['Doctors', 'Hospitals', 'Specialities'];
    const [isTyping, setIsTyping] = useState(true);

    const filteredDoctors = doctorsList.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const filteredHospitals = hospitalsList.filter((hospital) =>
        hospital.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        let typingInterval;
        let erasingInterval;

        if (isTyping) {
            typingInterval = setInterval(() => {
                setCurrentLabel((prev) => {
                    const fullLabel = searchLabels[currentLabelIndex];
                    if (prev.length < fullLabel.length) {
                        return fullLabel.slice(0, prev.length + 1);
                    } else {
                        clearInterval(typingInterval);
                        setIsTyping(false);
                        return prev;
                    }
                });
            }, 150);
        } else {
            setTimeout(() => {
                erasingInterval = setInterval(() => {
                    setCurrentLabel((prev) => {
                        if (prev.length > 0) {
                            return prev.slice(0, -1);
                        } else {
                            clearInterval(erasingInterval);
                            setIsTyping(true);
                            setCurrentLabelIndex((prevIndex) => (prevIndex + 1) % searchLabels.length);
                            return prev;
                        }
                    });
                }, 100);
            }, 1500);
        }

        return () => {
            clearInterval(typingInterval);
            clearInterval(erasingInterval);
        };
    }, [isTyping, currentLabelIndex]);

    return (
        <View style={styles.container}>
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
                    <View style={styles.searchBar}>
                        <Image
                            source={require('../assets/Vector.png')}
                            style={styles.searchIconImage}
                            resizeMode="contain"
                        />
                        <TextInput
                            style={styles.searchInput}
                            placeholder={`Search ${currentLabel}`}
                            placeholderTextColor="#999"
                            value={searchQuery}
                            onChangeText={(text) => setSearchQuery(text)}
                            autoFocus={true}  // Ensure no auto-focus
                        />
                    </View>
                </View>
            </View>
            {/* Tab Section */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'Hospitals' && styles.activeTab]}
                    onPress={() => setActiveTab('Hospitals')}
                >
                    <Text style={[styles.tabText, activeTab === 'Hospitals' && styles.activeTabText]}>Hospitals</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'Doctors' && styles.activeTab]}
                    onPress={() => setActiveTab('Doctors')}
                >
                    <Text style={[styles.tabText, activeTab === 'Doctors' && styles.activeTabText]}>Doctors</Text>
                </TouchableOpacity>
            </View>
            {/* Content Section */}
            <ScrollView style={styles.scrollView}>
                {activeTab === 'Hospitals' ? (
                    searchQuery ? (
                        filteredHospitals.length > 0 ? (
                            filteredHospitals.map((hospital) => (
                                <TouchableOpacity
                                    key={hospital.id}
                                    style={styles.card}
                                    onPress={() => navigation.navigate('HospitalProfile', { hospital })}
                                >
                                    <Image source={hospital.image} style={styles.cardImage} />
                                    <View style={styles.cardContent}>
                                        <Text style={styles.cardTitle}>{hospital.name}</Text>
                                        <Text>Address: {hospital.address}</Text>
                                        <Text>Rating: {hospital.rating}⭐</Text>
                                    </View>
                                </TouchableOpacity>
                            ))
                        ) : (
                            <Text>No hospitals found.</Text>
                        )
                    ) : (
                        <View>
                            <Text style={styles.sectionTitle}>Recent</Text>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <View style={styles.horizontalScrollContainer}>
                                    {recentItems.map((item) => (
                                        <TouchableOpacity
                                            key={item.id}
                                            style={styles.recentItemContainer}
                                            onPress={() => {
                                                if (item.type === 'doctor') {
                                                    navigation.navigate('DoctorProfile', { doctor: item });
                                                } else if (item.type === 'hospital') {
                                                    navigation.navigate('HospitalProfile', { hospital: item });
                                                }
                                            }}
                                        >
                                            <Image source={item.image} style={styles.circularImage} />
                                            <Text style={styles.itemText}>{item.name}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </ScrollView>
                            {/* "Are you suffering from?" Section */}
                            <Text style={styles.sectionTitle}>Are you suffering from?</Text>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.symptomsContainer}>
                                {symptoms.map((symptom) => (
                                    <TouchableOpacity
                                        key={symptom.id}
                                        style={styles.symptomItemContainer}
                                        onPress={() => navigation.navigate('SymptomDetails', { symptom })}
                                    >
                                        <Image source={symptom.image} style={styles.circularImage} />
                                        <Text style={styles.itemText}>{symptom.name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    )
                ) : (
                    searchQuery ? (
                        filteredDoctors.length > 0 ? (
                            filteredDoctors.map((doctor) => (
                                <TouchableOpacity
                                    key={doctor.id}
                                    style={styles.card}
                                    onPress={() => navigation.navigate('DoctorProfile', { doctor })}
                                >
                                    <Image source={doctor.image} style={styles.cardImage} />
                                    <View style={styles.cardContent}>
                                        <Text style={styles.cardTitle}>{doctor.name}</Text>
                                        <Text>{doctor.specialization} | {doctor.hospital}</Text>
                                        <Text>Rating: {doctor.rating}⭐ | Wait Time: {doctor.waitingTime}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))
                        ) : (
                            <Text>No doctors found.</Text>
                        )
                    ) : (
                        <Text style={styles.sectionTitle}>Doctors Near You</Text>
                    )
                )}
            </ScrollView>
        </View>
    );
};

// Using the provided CSS and adding styles for the "Are you suffering from?" section
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
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
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    searchBar: {
        width: width * 0.8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: width * 0.02,
        paddingHorizontal: 10,
        height: width * 0.14,
    },
    searchIconImage: {
        width: 20,
        height: 20,
        marginRight: 5,
    },
    searchInput: {
        flex: 1,
        fontSize: width * 0.04,
        color: '#333',
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        marginTop: 10,
    },
    tab: {
        paddingVertical: 10,
        flex: 1,
        alignItems: 'center',
    },
    activeTab: {
        borderBottomWidth: 3,
        borderBottomColor: '#28A745',
    },
    tabText: {
        fontSize: width * 0.04,
        color: '#666',
    },
    activeTabText: {
        color: '#28A745',
        fontWeight: 'bold',
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: width * 0.05,
    },
    sectionTitle: {
        fontSize: width * 0.05,
        fontWeight: 'bold',
        marginVertical: width * 0.03,
    },
    horizontalScrollContainer: {
        flexDirection: 'row',
    },
    recentItemContainer: {
        alignItems: 'center',
        marginRight: width * 0.04,
    },
    circularImage: {
        width: width * 0.18,
        height: width * 0.18,
        borderRadius: width * 0.09,
        marginBottom: width * 0.02,
        
    },
    itemText: {
        fontSize: width * 0.035,
        textAlign: 'center',
    },
    symptomsContainer: {
        flexDirection: 'row',
        marginTop: width * 0.02,
        
    },
    symptomItemContainer: {
        alignItems: 'center',
        marginRight: width * 0.04,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
        flexDirection: 'row',
    },
    cardImage: {
        width: width * 0.2,
        height: width * 0.2,
        borderRadius: width * 0.1,
        marginRight: 15,
    },
    cardContent: {
        flex: 1,
        justifyContent: 'center',
    },
    cardTitle: {
        fontSize: width * 0.045,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    // Additional CSS for enhanced presentation:
    symptomItemContainer: {
        alignItems: 'center',
        marginHorizontal: width * (-0.019),
        padding: width * 0.02,
        marginRight: width * 0.023,
    },
    circularImage: {
        width: width * 0.2,
        height: width * 0.2,
        borderRadius: width * 0.1,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    itemText: {
        fontSize: width * 0.035,
        textAlign: 'center',
        marginTop: width * 0.02,
        color: '#333',
    },
});

export default SearchScreen;
