import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import BottomNavigation from './BottomNavigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

const UserProfile = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Profile</Text>
            </View>
            <View style={styles.profileContainer}>
                <Image
                    source={require('../assets/Adarsh.jpg')} // Make sure the image path is correct
                    style={styles.profileImage}
                />
                <View style={styles.profileDetails}>
                    <Text style={styles.profileName}>Adarsh Mishra</Text>
                    <Text style={styles.profileNumber}>9517216808</Text>
                </View>
            </View>
            <View style={styles.optionsContainer}>
                <TouchableOpacity style={styles.option}>
                    <Icon name="person" size={24} color="#000" />
                    <Text style={styles.optionText}>Personal information</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                    <Icon name="notifications" size={24} color="#000" />
                    <Text style={styles.optionText}>Notifications</Text>
                </TouchableOpacity>
               
            </View>
            <BottomNavigation />
        </View>
       
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#003366',
        height: 80,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    headerText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    profileContainer: {
        flexDirection: 'row',
        
        marginTop: 20,
        gap:13,
        marginBottom:0,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        // marginleft:10,
    },
    profileDetails: {
        marginTop: 10,
       
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    profileNumber: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    optionsContainer: {
        marginTop: 10,
        paddingHorizontal: 16,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    optionText: {
        fontSize: 16,
        marginLeft: 16,
        color: '#000',
    },
});

export default UserProfile;
