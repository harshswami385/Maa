import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

const HospitalProfile = () => {
    const route = useRoute();
    const { hospital } = route.params;

    return (
        <ScrollView style={styles.container}>
            <Image source={hospital.image} style={styles.image} />
            <Text style={styles.name}>{hospital.name}</Text>
            <Text>Address: {hospital.address}</Text>
            <Text>Rating: {hospital.rating}⭐</Text>
            <Text>Description: {hospital.description}</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 8,
    },
});

export default HospitalProfile;
