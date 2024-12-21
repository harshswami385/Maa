import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    StatusBar,
    Modal,
    FlatList
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { hospitalsList, doctorsList } from './sampleData'; // Import sample data
const { width } = Dimensions.get('window');

const HomeScreen = () => {
    const [selectedTab, setSelectedTab] = useState('Home');
    const [hospitalOrDoctor, setHospitalOrDoctor] = useState('Hospitals');
    const [sortBy, setSortBy] = useState(null); // Sorting criteria
    const [originalData, setOriginalData] = useState(hospitalsList); // Store original data for reset
    const [data, setData] = useState(hospitalsList); // Current displayed data
    const [showSortModal, setShowSortModal] = useState(false); // Show sort modal
    const [showSpecialitiesModal, setShowSpecialitiesModal] = useState(false); // Show all specialities modal
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    // Search bar state and animation
    const [currentPlaceholder, setCurrentPlaceholder] = useState('');
    const [currentLabelIndex, setCurrentLabelIndex] = useState(0);
    const searchLabels = ['Doctors', 'Hospitals', 'Specialities'];
    const [isTyping, setIsTyping] = useState(true);

    const specialities = [
        { id: '1', name: 'Cardiologist', image: require('../assets/Cardiology.png') },
        { id: '2', name: 'Pediatrician', image: require('../assets/Pediatrics.png') },
        { id: '3', name: 'General Physician', image: require('../assets/GeneralPhysician.png') },
        { id: '4', name: 'Gastrologist', image: require('../assets/Gastrology.png') },
        { id: '5', name: 'Dentist', image: require('../assets/Gastrology.png') },
    ];

    useEffect(() => {
        if (isFocused) {
            // Reset the tab to 'Home' when the screen is focused (navigated back to)
            setSelectedTab('Home');
        }
    }, [isFocused]);

    useEffect(() => {
        // Update data when toggling between Hospitals and Doctors
        if (hospitalOrDoctor === 'Hospitals') {
            setOriginalData([...hospitalsList]);
            setData([...hospitalsList]);
        } else {
            setOriginalData([...doctorsList]);
            setData([...doctorsList]);
        }
    }, [hospitalOrDoctor]);

    useEffect(() => {
        let typingInterval, erasingInterval;

        if (isTyping) {
            typingInterval = setInterval(() => {
                setCurrentPlaceholder((prev) => {
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
                    setCurrentPlaceholder((prev) => {
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

    const handleSpecialityClick = (specialityName) => {
        const filteredDoctors = doctorsList.filter(
            (doctor) => doctor.specialty === specialityName
        );
        navigation.navigate('SearchScreen', { doctors: filteredDoctors }); // Pass filtered doctors
    };

    const handleViewAllSpecialities = () => {
        setShowSpecialitiesModal(true);
    };

    const handleItemClick = (item) => {
        if (hospitalOrDoctor === 'Hospitals') {
            navigation.navigate('HospitalProfile', { hospital: item });
        } else {
            navigation.navigate('DoctorProfile', { doctor: item });
        }
    };

    const handleBottomNavigation = (tab) => {
        setSelectedTab(tab);
        if (tab === 'Appointments') {
            navigation.navigate('AppointmentsScreen');
        } else if (tab === 'Profile') {
            navigation.navigate('UserScreen');
        } else if (tab === 'Home') {
            navigation.navigate('HomeScreen');
        }
    };

    return (
        <>
            <StatusBar backgroundColor="#164772" barStyle="light-content" />
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <TouchableOpacity style={styles.locationSelector}>
                        <Text style={styles.locationText}>Kharagpur, West Bengal</Text>
                        <Image
                            source={require('../assets/down-icon.png')}
                            style={styles.dropdownIcon}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.notificationIcon}>
                        <Image
                            source={require('../assets/notification-3-fill.png')}
                            style={styles.notificationImage}
                        />
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>10</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.searchBarContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')} style={styles.searchBarTouchable}>
                        <Image
                            source={require('../assets/Vector.png')}
                            style={styles.searchIcon}
                        />
                        <TextInput
                            style={styles.searchBarInput}
                            placeholder={`Search ${currentPlaceholder}`}
                            placeholderTextColor="#999999"
                            editable={false}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.specialitiesHeader}>
                    <Text style={styles.sectionTitle}>Specialities</Text>
                    <TouchableOpacity onPress={handleViewAllSpecialities}>
                        <Text style={styles.viewAllButton}>View All (24)</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.specialitiesContainer}>
                    {specialities.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.specialityContainer}
                            onPress={() => handleSpecialityClick(item.name)}
                        >
                            <Image source={item.image} style={styles.specialityImage} />
                            <Text style={styles.specialityText}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.hospitalsHeader}>
                    <Text style={styles.sectionTitle}>
                        {hospitalOrDoctor === 'Hospitals' ? 'Hospitals Near You' : 'Doctors Near You'}
                    </Text>
                </View>

                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={styles.sortButton}
                        onPress={() => setShowSortModal(true)}
                    >
                        <Text style={styles.sortButtonText}>
                            Sort By {sortBy ? `: ${sortBy}` : ''}
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.toggleButtons}>
                        <TouchableOpacity
                            style={[
                                styles.toggleButton,
                                hospitalOrDoctor === 'Hospitals' && styles.toggleButtonActive,
                            ]}
                            onPress={() => setHospitalOrDoctor('Hospitals')}
                        >
                            <Text
                                style={[
                                    styles.toggleButtonText,
                                    hospitalOrDoctor === 'Hospitals' && styles.toggleButtonTextActive,
                                ]}
                            >
                                Hospitals
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.toggleButton,
                                hospitalOrDoctor === 'Doctors' && styles.toggleButtonActive,
                            ]}
                            onPress={() => setHospitalOrDoctor('Doctors')}
                        >
                            <Text
                                style={[
                                    styles.toggleButtonText,
                                    hospitalOrDoctor === 'Doctors' && styles.toggleButtonTextActive,
                                ]}
                            >
                                Doctors
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {data.map((item) => (
                    <TouchableOpacity key={item.id} style={styles.hospitalCard} onPress={() => handleItemClick(item)}>
                        <Image source={item.image} style={styles.hospitalImage} />
                        <View style={styles.hospitalInfo}>
                            <Text style={styles.hospitalName}>{item.name}</Text>
                            <Text style={styles.hospitalAddress}>{item.address}</Text>
                            <View style={styles.hospitalDetails}>
                                <Text style={styles.hospitalRating}>{item.rating} ★</Text>
                                <Text style={styles.hospitalDistance}>{item.distance}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <Modal
                visible={showSpecialitiesModal}
                transparent
                animationType="fade"
                onRequestClose={() => setShowSpecialitiesModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <FlatList
                            data={specialities}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.modalOptionContainer}
                                    onPress={() => {
                                        setShowSpecialitiesModal(false);
                                        handleSpecialityClick(item.name);
                                    }}
                                >
                                    <Text style={styles.modalOption}>{item.name}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity
                            style={styles.modalCancelContainer}
                            onPress={() => setShowSpecialitiesModal(false)}
                        >
                            <Text style={styles.modalCancel}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal
                visible={showSortModal}
                transparent
                animationType="fade"
                onRequestClose={() => setShowSortModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity onPress={() => handleSort('Distance')}>
                            <Text style={styles.modalOption}>Sort by Distance</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleSort('Rating')}>
                            <Text style={styles.modalOption}>Sort by Rating</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleSort('Reset')}>
                            <Text style={styles.modalOption}>Remove Sorting</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setShowSortModal(false)}>
                            <Text style={styles.modalCancel}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <View style={styles.bottomToggleContainer}>
            <TouchableOpacity
        style={[styles.toggleButton, selectedTab === 'Home' && styles.toggleButtonActive]}
        onPress={() => handleBottomNavigation('Home')}
    >
        <View style={[styles.iconContainer, selectedTab === 'Home' && styles.iconContainerActive]}>
            <Image source={require('../assets/home-6-line.png')} style={styles.toggleIcon} />
        </View>
        <Text style={selectedTab === 'Home' ? styles.toggleTextActive : styles.toggleText}>
            Home
        </Text>
    </TouchableOpacity>


    <TouchableOpacity
        style={[styles.toggleButton, selectedTab === 'Appointments' && styles.toggleButtonActive]}
        onPress={() => handleBottomNavigation('Appointments')}
    >
        <View style={[styles.iconContainer, selectedTab === 'Appointments' && styles.iconContainerActive]}>
            <Image source={require('../assets/Profile.png')} style={styles.toggleIcon} />
        </View>
        <Text style={selectedTab === 'Appointments' ? styles.toggleTextActive : styles.toggleText}>
           My Appointments
        </Text>
    </TouchableOpacity>
    <TouchableOpacity
        style={[styles.toggleButton, selectedTab === 'Profile' && styles.toggleButtonActive]}
        onPress={() => handleBottomNavigation('Profile')}
    >
        <View style={[styles.iconContainer, selectedTab === 'Profile' && styles.iconContainerActive]}>
            <Image source={require('../assets/Home.png')} style={styles.toggleIcon} />
        </View>
        <Text style={selectedTab === 'Profile' ? styles.toggleTextActive : styles.toggleText}>
            Profile
        </Text>
    </TouchableOpacity>
</View>

        </>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalOption: {
        fontSize: 16,
        color: '#333',
        paddingVertical: 10,
        textAlign: 'center',
        width: '100%',
    },
    modalCancel: {
        fontSize: 16,
        color: '#FF0000',
        marginTop: 10,
    },
    header: {
        backgroundColor: '#164772',
        paddingBottom: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: StatusBar.currentHeight || 20,
    },
    locationSelector: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: '500',
    },
    dropdownIcon: {
        marginLeft: 5,
        width: 16,
        height: 16,
    },
    notificationIcon: {
        position: 'relative',
    },
    notificationImage: {
        width: 24,
        height: 24,
    },
    badge: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: 'red',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: '#FFFFFF',
        fontSize: 12,
    },
    searchBarContainer: {
        marginTop: 25,
        marginHorizontal: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height:2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5,
    },
    searchBarTouchable: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchBarInput: {
        flex: 1,
        fontSize: 16,
        color: '#333333',
    },
    searchIcon: {
        width: 20,
        height: 20,
        marginLeft: 10,
        tintColor: '#999999',
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
    },
    specialitiesHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '500',
        color: '#000000',
    },
    viewAllButton: {
        fontSize: 14,
        color: '#1BBA8D',
        fontWeight: '700',
    },
    specialitiesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    specialityContainer: {
        alignItems: 'center',
        width: width * 0.2,
    },
    specialityImage: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginBottom: 5,
    },
    specialityText: {
        fontSize: 14,
        color: '#333333',
        textAlign: 'center',
    },
    hospitalsHeader: {
        marginTop: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 15,
    },
    sortButton: {
        backgroundColor: '#E0E0E0',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
    },
    sortButtonText: {
        fontSize: 14,
        color: '#333333',
    },
    toggleButtons: {
        flexDirection: 'row',
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    
    toggleButtonActive: {
        // backgroundColor: '#164772',
    },
    toggleButtonText: {
        fontSize: 14,
        color: '#333333',
    },
    toggleButtonTextActive: {
        color: '#FFFFFF',
    },
    hospitalCard: {
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
    hospitalImage: {
        width: '100%',
        height: 150,
        borderRadius: 10,
    },
    hospitalInfo: {
        marginTop: 10,
    },
    hospitalName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000000',
    },
    hospitalAddress: {
        fontSize: 14,
        color: '#666666',
    },
    hospitalDetails: {
        flexDirection: 'row',
        justifyContent: 'flex-end', // Align distance and rating to the right
        marginTop: 5,
    },
    hospitalRating: {
        fontSize: 14,
        color: '#1BBA8D',
        marginRight: 10,
    },
    hospitalDistance: {
        fontSize: 14,
        color: '#000000',
    },
    bottomToggleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderColor: '#E0E0E0',
    },
    toggleButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    toggleButtonActive: {
        // backgroundColor: '#E6F7F2', // Light green background
        borderRadius: 25, // Rounded corners for active button
        padding: 10,
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: 20, // Circular shape
        backgroundColor: 'transparent', // Default transparent background
    },
    iconContainerActive: {
        backgroundColor: '#1BBA8D',
        width: 38,
        height: 38,
        borderRadius:16.2, // Green background for active icon
    },
    toggleIcon: {
        width: 30,
        height: 30,

    },
    toggleText: {
        fontSize: 12,
        color: '#666666',
        marginTop: 5,
    },
    toggleTextActive: {
        fontSize: 12,
        // color: '#1BBA8D',
        fontWeight: 'bold',
        text:'black', // Bold text for active state
    },
    
});

export default HomeScreen;
