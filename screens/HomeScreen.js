import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, StyleSheet, Dimensions, StatusBar, Modal,Keyboard,TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showHospitals, setShowHospitals] = useState(true);
    const [sortCriteria, setSortCriteria] = useState('distance');
    const [modalVisible, setModalVisible] = useState(false);
    const [currentLabel, setCurrentLabel] = useState('');
    const [currentLabelIndex, setCurrentLabelIndex] = useState(0);
    const searchLabels = ['Doctors', 'Hospitals', 'Specialities'];
    const [isTyping, setIsTyping] = useState(true);
    const navigation = useNavigation();

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
    const handleSearchNavigation = () => {
        Keyboard.dismiss(); // Dismiss the keyboard before navigating
        navigation.navigate('SearchScreen');
    };

    const specialities = [
        { id: '1', name: 'Cardiology', image: require('../assets/Cardiology.png.png') },
        { id: '2', name: 'Pediatrics', image: require('../assets/Pediatrics.png.png') },
        { id: '3', name: 'General Physician', image: require('../assets/GeneralPhysician.png.png') },
        { id: '4', name: 'Gastrology', image: require('../assets/Gastrology.png.png') },
    ];

    const hospitals = [
        {
            id: '1',
            name: 'BC Roy Hospital',
            address: 'Balarampur, IIT Kharagpur, Paschim Medinipur, West Bengal, 721306, India',
            distance: '10 KM',
            rating: '4.5',
            image: require('../assets/hospital.png'),
        },
        {
            id: '2',
            name: 'City Hospital',
            address: '456 Central Ave, City, State, 123456',
            distance: '12 KM',
            rating: '4.3',
            image: require('../assets/hospital.png'),
        },
        {
            id: '3',
            name: 'Community Health Center',
            address: '789 Main St, Town, State, 654321',
            distance: '8 KM',
            rating: '4.1',
            image: require('../assets/hospital.png'),
        },
    ];

    const doctors = [
        {
            id: '1',
            name: 'Dr. A. Sharma',
            specialty: 'Cardiologist',
            experience: '15 years',
            distance: '5 KM',
            rating: '4.7',
            image: require('../assets/registerGraphic.png'),
        },
        {
            id: '2',
            name: 'Dr. B. Verma',
            specialty: 'Pediatrician',
            experience: '10 years',
            distance: '7 KM',
            rating: '4.5',
            image: require('../assets/registerGraphic.png'),
        },
        {
            id: '3',
            name: 'Dr. C. Gupta',
            specialty: 'General Physician',
            experience: '8 years',
            distance: '6 KM',
            rating: '4.8',
            image: require('../assets/registerGraphic.png'),
        },
    ];

    const sortData = (data) => {
        return [...data].sort((a, b) => {
            if (sortCriteria === 'distance') {
                return parseInt(a.distance) - parseInt(b.distance);
            } else if (sortCriteria === 'rating') {
                return parseFloat(b.rating) - parseFloat(a.rating);
            }
        });
    };

    const filteredHospitals = hospitals.filter((hospital) =>
        hospital.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const filteredDoctors = doctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const filteredSpecialities = specialities.filter((speciality) =>
        speciality.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <StatusBar backgroundColor="#164772" barStyle="light-content" />
            <View style={styles.fullHeader}>
                <View style={styles.headerContent}>
                    <View style={styles.locationContainer}>
                        <Text style={styles.locationText}>Kharagpur, West Bengal</Text>
                        <Image
                            source={require('../assets/registerGraphic.png')}
                            style={styles.profileImage}
                        />
                    </View>
                    <Text style={styles.greeting}>Good Morning!</Text>
                 <Text style={styles.username}>Hi Samrat, how are you?</Text>
                </View>
                <View style={styles.searchBar}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder={`Search ${currentLabel}`}
                            placeholderTextColor="#999999"
                            value={searchQuery}
                            onChangeText={(text) => setSearchQuery(text)}
                            // No onFocus handler here
                            onTouchStart={handleSearchNavigation}
                        />
                    </View>
            </View>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.specialitiesHeader}>
                    <Text style={styles.sectionTitle}>Specialities</Text>
                    <TouchableOpacity>
                        <Text style={styles.viewAllButton}>View All (24)</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.specialitiesContainer}>
                    {filteredSpecialities.length > 0 ? (
                        filteredSpecialities.map((item) => (
                            <View key={item.id} style={styles.specialityContainer}>
                                <TouchableWithoutFeedback>
                                    <Image source={item.image} style={styles.specialityImage} />
                                </TouchableWithoutFeedback>
                                <Text style={styles.specialityText}>{item.name}</Text>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.noResultsText}>No specialities found.</Text>
                    )}
                </View>

                <View style={styles.hospitalsHeader}>
                    <Text style={styles.hospitalsNearYouTitle}>Hospitals Near You</Text>
                    <View style={styles.optionsContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => setModalVisible(true)}
                        >
                            <Text style={styles.buttonText}>Sort By ▼</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={showHospitals ? styles.buttonActive : styles.button}
                            onPress={() => setShowHospitals(true)}
                        >
                            <Text style={showHospitals ? styles.buttonTextActive : styles.buttonText}>
                                Hospitals
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={!showHospitals ? styles.buttonActive : styles.button}
                            onPress={() => setShowHospitals(false)}
                        >
                            <Text style={!showHospitals ? styles.buttonTextActive : styles.buttonText}>
                                Doctors
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {(showHospitals ? filteredHospitals : filteredDoctors).length > 0 ? (
                    (showHospitals ? filteredHospitals : filteredDoctors).map((item) => (
                        <TouchableOpacity activeOpacity={1} key={item.id} style={styles.hospitalContainer}>
                            <View style={styles.imageWrapper}>
                                <Image source={item.image} style={styles.hospitalImage} />
                                <View style={styles.ratingOverlay}>
                                    <Text style={styles.hospitalRatingText}>{item.rating} ★</Text>
                                </View>
                            </View>
                            <View style={styles.hospitalInfo}>
                                <Text style={styles.hospitalName}>{item.name}</Text>
                                <Text style={styles.hospitalAddress}>{item.address}</Text>
                                <View style={styles.hospitalDetails}>
                                    <View style={styles.distanceContainer}>
                                    <Image source={require('../assets/Vector.png')} style={styles.distanceIcon} />
                                      <Text style={styles.hospitalDistance}>{item.distance}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text style={styles.noResultsText}>
                        {showHospitals ? 'No hospitals found.' : 'No doctors found.'}
                    </Text>
                )}
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Sort</Text>
                        {['Rating: High To Low', 'Distance: Low To High'].map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.sortOption}
                                onPress={() => {
                                    const criteria = option.toLowerCase().includes('rating') ? 'rating' : 'distance';
                                    setSortCriteria(criteria);
                                    setModalVisible(false);
                                }}
                            >
                                <Text style={styles.sortOptionText}>{option}</Text>
                                {sortCriteria === (option.toLowerCase().includes('rating') ? 'rating' : 'distance') && (
                                    <Text style={styles.checkMark}>✓</Text>
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    fullHeader: {
        backgroundColor: '#164772',
        width: '100%',
        paddingTop: StatusBar.currentHeight || 20,
        paddingBottom: width * 0.12,
        borderBottomLeftRadius: width * 0.1,
        borderBottomRightRadius: width * 0.1,
        position: 'relative',
        zIndex: 1,
    },
    headerContent: {
        paddingHorizontal: width * 0.05,
        marginTop: -width * 0.02, // Adjusted to make the header layout more compact
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.47)', // White background for contrast
        borderRadius: width * 0.02, // Rounded corners for the container
        paddingVertical: width * 0.02, // Vertical padding for a compact look
        paddingHorizontal: width * 0.03, // Horizontal padding for the text
        width: width * 0.6, // Adjust the width to match the image's scale
        marginLeft: width*(-0.005), // Aligns the container to the left edge of the screen
        shadowColor: '#ff',
        shadowOffset: { width: 0, height: 2 },
        colorOpacity: 0.01,
        shadowRadius: 0,
        elevation: 0,
        borderColor: '#FFFFFF'
    
    },
    locationText: {
        fontSize: width * 0.04, // Adjusted font size for readability
        color: '#ffffff', // Darker text color for contrast
        fontWeight: '400',
    },
    profileImage: {
        width: width * 0.09, // Adjusted size for better visibility
        height: width * 0.10,
        borderRadius: width * 0.06,
        position: 'absolute', // Allows the image to be placed independently
        right: -width * 0.3, // Adjust this value to move the image further right
        top: width * 0.0, // Adjust this value to align the image vertically as needed
        borderColor: '#FFFFFF',
        borderWidth: 2, // Added a border for a clean look
    },
    greeting: {
        fontSize: width * 0.05,
        color: '#FFFFFF',
        fontWeight: '400',
        marginTop: width * 0.05, // Slightly reduced to decrease the gap
    },
    username: {
        fontSize: width * 0.06,
        color: '#1BBA8D',
        marginTop: width * 0.0, // Reduced to minimize the gap further
        fontWeight: '700',
    },
    searchBar: {
        position: 'absolute',
        bottom: -width * 0.05,
        left: '50%',
        transform: [{ translateX: -width * 0.4 }],
        width: width * 0.8,
        backgroundColor: '#FFFFFF',
        borderRadius: width * 0.02,
        paddingVertical: width * 0.015,
        paddingHorizontal: width * 0.03,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5,
        zIndex: 2,
    },
    searchInput: {
        fontSize: width * 0.04,
        color: '#333333',
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: width * 0.05,
        paddingTop: width * 0.1,
    },
    specialitiesHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: width * 0.05,
    },
    sectionTitle: {
        fontSize: width * 0.05,
        color: '#000000',
        fontweight: 500
    },
    viewAllButton: {
        fontSize: width * 0.035,
        color:'#1BBA8D',
        fontWeight: 700,
    },
    specialitiesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: width * 0.03,
    },
    specialityContainer: {
        alignItems: 'center',
        marginBottom: width * 0.02,
        width: width * 0.2,
    },
    specialityImage: {
        width: width * 0.18,
        height: width * 0.18,
        borderRadius: width * 0.04,
        marginBottom: width * 0.02,
    },
    specialityText: {
        fontSize: width * 0.033,
        color: '#333333',
        textAlign: 'center',
    },
    hospitalsHeader: {
        marginTop: width * 0.05,
    },
    hospitalsNearYouTitle: {
        fontSize: width * 0.05,
        fontWeight: 500,
        color: '#000',
        marginBottom: width * 0.02,
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: width * 0.06,
    },
    button: {
        flex: 1,
        backgroundColor: '#E0E0E0',
        borderRadius: 15,
        paddingVertical: 8,
        alignItems: 'center',
        marginHorizontal: 4,
    },
    buttonActive: {
        flex: 1,
        backgroundColor: '#1BBA8D',
        borderRadius: 15,
        paddingVertical: 8,
        alignItems: 'center',
        marginHorizontal: 4,
    },
    buttonText: {
        fontSize: width * 0.033,
        color: '#000',
        fontWeight: 400,
    },
    buttonTextActive: {
        fontSize: width * 0.033,
        color: '#FFFFFF',
        fontWeight: 400,
    },
    hospitalContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        overflow: 'hidden',
        marginBottom: width * 0.04,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5,
    },
    imageWrapper: {
        position: 'relative',
    },
    hospitalImage: {
        width: '100%',
        height: width * 0.45,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    ratingOverlay: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        paddingHorizontal: 8,
        paddingVertical: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    hospitalRatingText: {
        fontSize: width * 0.035,
        color: '#1BBA8D',
    },
    hospitalInfo: {
        padding: width * 0.03,
    },
    hospitalName: {
        fontSize: width * 0.045,
        fontWeight: 500,
        color: '#000',
    },
    hospitalAddress: {
        fontSize: width * 0.035,
        color: "rgba(0, 0, 0, 0.78)",
        fontWeight: 400,
        marginTop: 4,
    },
    hospitalDetails: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 4,
    },
    distanceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1BBA8D',
        borderRadius: 15,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    distanceIcon: {
        marginRight: 4,
        fontSize: width * 0.04,
        color: '#FFFFFF',
    },
    hospitalDistance: {
        fontSize: width * 0.04,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    noResultsText: {
        textAlign: 'center',
        fontSize: width * 0.04,
        color: '#B0BEC5',
        marginTop: width * 0.05,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: width * 0.05,
    },
    modalTitle: {
        fontSize: width * 0.05,
        fontWeight: 'bold',
        marginBottom: width * 0.03,
    },
    sortOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: width * 0.03,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    sortOptionText: {
        fontSize: width * 0.04,
    },
    checkMark: {
        fontSize: width * 0.05,
        color: '#164772',
    },
});

export default HomeScreen;
