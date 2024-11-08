// SuccessScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const SuccessScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* Success Graphic Image (same as RegisterScreen) */}
            <Image source={require('../assets/registerGraphic.png')} style={styles.image} />

            <Text style={styles.title}>Verification Successful</Text>
            <Text style={styles.subtitle}>Your phone number has been verified successfully!</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('RegisterScreen')} // Navigate back to register or home screen
            >
                <Text style={styles.buttonText}>Go to Home</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    image: {
        width: 216,
        height: 211.67,
        resizeMode: 'contain',
        marginBottom: 30,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#164772',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#7D7D7D',
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#2E5BFF',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SuccessScreen;
