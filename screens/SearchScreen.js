// SearchScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

const SearchScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentLabel, setCurrentLabel] = useState('');
    const [currentLabelIndex, setCurrentLabelIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('Hospitals');
    const searchLabels = ['Doctors', 'Hospitals', 'Specialities'];
    const [isTyping, setIsTyping] = useState(true);

    // Sample data for recent items
    const recentItems = [
        { id: '1', name: 'Dr. Sumitha', image: require('../assets/a.png') },
        { id: '2', name: 'Apex Hospital', image: require('../assets/b.png') },
        { id: '3', name: 'Dr. Pandit Ji', image: require('../assets/c.png') },
        { id: '4', name: 'Apollo Hospital', image: require('../assets/d.png')},
    ];

    // Sample data for "Are you suffering from?"
    const symptoms = [
        { id: '1', name: 'Cough', image: require('../assets/e.png') },
        { id: '2', name: 'Fever', image: require('../assets/f.png') },
        { id: '3', name: 'Headache', image: require('../assets/g.png') },
        { id: '4', name: 'Stomach Ache', image: require('../assets/e.png') },
    ];

    // Animation logic for the search bar placeholder
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
            {/* Custom header */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Text style={styles.backButtonText}>←</Text>
                    </TouchableOpacity>
                    <View style={styles.searchBar}>
                        <Text style={styles.searchIcon}>🔍</Text>
                        <TextInput
                            style={styles.searchInput}
                            placeholder={`Search ${currentLabel}`}
                            placeholderTextColor="#999"
                            value={searchQuery}
                            onChangeText={(text) => setSearchQuery(text)}
                        />
                    </View>
                </View>
            </View>
            {/* Tab section */}
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
            {/* Content section based on active tab */}
            {activeTab === 'Hospitals' ? (
                <ScrollView style={styles.scrollView}>
                    <Text style={styles.sectionTitle}>Recent</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={styles.horizontalScrollContainer}>
                            {recentItems.map((item) => (
                                <View key={item.id} style={styles.recentItemContainer}>
                                    <Image source={item.image} style={styles.circularImage} />
                                    <Text style={styles.itemText}>{item.name}</Text>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                    <Text style={styles.sectionTitle}>Are you suffering from?</Text>
                    <View style={styles.symptomsContainer}>
                        {symptoms.map((symptom) => (
                            <View key={symptom.id} style={styles.symptomItemContainer}>
                                <Image source={symptom.image} style={styles.circularImage} />
                                <Text style={styles.itemText}>{symptom.name}</Text>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            ) : (
                <ScrollView style={styles.scrollView}>
                    <Text style={styles.sectionTitle}>Doctors Near You</Text>
                    {/* Add content for doctors tab here */}
                    {recentItems.map((doctor) => (
                        <View key={doctor.id} style={styles.card}>
                            <Text style={styles.cardTitle}>{doctor.name}</Text>
                        </View>
                    ))}
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#164772',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        paddingTop: 50, // Adjust for status bar space
        paddingBottom: 15,
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
    backButtonText: {
        fontSize: 30,
        color: '#fff',
    },
    searchBar: {
        width: width * 0.8, // Decrease the width of the search bar
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: width * 0.02,
        paddingHorizontal: 10,
        height: width * 0.14, // Increase the height to match HomeScreen
    },
    searchIcon: {
        marginRight: 5,
        fontSize: 20,
        color: '#999',
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
    symptomsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    symptomItemContainer: {
        alignItems: 'center',
        marginBottom: width * 0.04,
        width: width * 0.22, // Adjusted for layout
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
    },
    cardTitle: {
        fontSize: width * 0.045,
        fontWeight: 'bold',
        marginBottom: 5,
    },
});

export default SearchScreen;
