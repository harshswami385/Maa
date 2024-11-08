import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ActivityIndicator, Modal, Image, StatusBar, ScrollView, Platform, KeyboardAvoidingView, Dimensions, Keyboard } from 'react-native';
import auth from '@react-native-firebase/auth';

const { width } = Dimensions.get('window');

const RegisterScreen = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState('+91 ');
    const [loading, setLoading] = useState(false);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    // Track keyboard visibility to control footer position
    React.useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const sendOTP = async () => {
        if (phoneNumber.length < 14) {
            Alert.alert('Invalid phone number', 'Please enter a valid phone number');
            return;
        }

        setLoading(true);
        try {
            const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
            setLoading(false);
            Alert.alert('OTP Sent', 'Please check your messages for the verification code.');
            navigation.navigate('OTPScreen', { confirm: confirmation, phoneNumber: phoneNumber });
        } catch (error) {
            setLoading(false);
            Alert.alert('Error', error.message);
        }
    };

    const handlePhoneNumberChange = (input) => {
        if (!input.startsWith('+91 ')) {
            input = '+91 ';
        }
        setPhoneNumber(input);
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

            {/* Main Content - Fixed */}
            <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
                {/* Top Infographic Image */}
                <Image source={require('../assets/registerGraphic.png')} style={styles.image} />

                {/* Register Heading and Subtitle */}
                <View style={styles.headingContainer}>
                    <Text style={styles.title}>Register</Text>
                    <Text style={styles.subtitle}>Please enter your number to continue your registration</Text>
                </View>

                {/* Phone Number Input with Fixed Country Code */}
                <View style={styles.phoneInputContainer}>
                    <Text style={styles.label}>Phone Number</Text>
                    <View style={styles.inputField}>
                        <TextInput
                            style={styles.input}
                            keyboardType="phone-pad"
                            value={phoneNumber}
                            onChangeText={handlePhoneNumberChange}
                            maxLength={14} // Limit input length to "+91 " plus 10 digits
                        />
                    </View>
                </View>

                {/* Spacer to push the Send OTP button to the bottom */}
                <View style={styles.spacer} />
            </ScrollView>

            {/* Send OTP Button - Moves up with Keyboard */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0} // Smaller vertical offset for smaller gap
                style={[styles.buttonContainer, isKeyboardVisible && styles.buttonContainerKeyboardVisible]} // Dynamic bottom position
            >
                <TouchableOpacity
                    style={[styles.button, phoneNumber.length < 14 && styles.buttonDisabled]}
                    onPress={sendOTP}
                    disabled={phoneNumber.length < 14}
                >
                    <Text style={styles.buttonText}>Send OTP</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>

            {/* Footer Text - Fixed, does not move */}
            {!isKeyboardVisible && (
                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>
                        By signing up or logging in, I accept the app's                    {' '}
                        <Text style={styles.linkText}>Terms of Service</Text> and{' '}
                        <Text style={styles.linkText}>Privacy Policy</Text>
                    </Text>
                </View>
            )}

            {loading && (
                <Modal transparent={true} animationType="fade">
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color="#2E5BFF" />
                        <Text style={styles.loaderText}>Sending OTP...</Text>
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: width * 0.05,
        paddingBottom: width * 0.05,
    },
    image: {
        width: width * 1.2,
        height: width * 0.5,
        resizeMode: 'contain',
        marginTop: width * 0.1,
    },
    headingContainer: {
        width: '100%',
        marginTop: width * 0.05,
    },
    title: {
        fontSize: width * 0.07,
        fontWeight: '700',
        color: '#164772',
        textAlign: 'left',
        paddingLeft: width * 0.02,
        marginBottom: width * 0.01,
    },
    subtitle: {
        fontSize: width * 0.04,
        fontWeight: '400',
        color: '#7D7D7D',
        marginTop: width * 0.02,
        textAlign: 'left',
        paddingLeft: width * 0.02,
    },
    phoneInputContainer: {
        width: '100%',
        marginTop: width * 0.05,
        paddingHorizontal: width * 0.02,
    },
    label: {
        fontSize: width * 0.035,
        color: '#7D7D7D',
        marginBottom: width * 0.02,
    },
    inputField: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D1D1D1',
        borderRadius: width * 0.02,
        paddingHorizontal: width * 0.03,
        paddingVertical: width * 0.03,
        backgroundColor: '#FFFFFF',
    },
    input: {
        flex: 1,
        fontSize: width * 0.04,
        color: '#000000',
    },
    spacer: {
        flexGrow: 1,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: width * 0.15, // Default positioning above the footer
        width: '100%',
        alignItems: 'center',
    },
    buttonContainerKeyboardVisible: {
        bottom: width * 0.05, // Smaller gap when keyboard is visible
    },
    button: {
        backgroundColor: '#164772',
        paddingVertical: width * 0.028,
        borderRadius: width * 0.038,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%', 
    },
    buttonDisabled: {
        backgroundColor: '#B3B3B3',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: width * 0.038,
        fontWeight: 'bold',
    },
    footerContainer: {
        position: 'absolute',
        bottom: width * 0.05,
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: width * 0.05,
    },
    footerText: {
        fontSize: width * 0.03,
        textAlign: 'center',
        color: '#7D7D7D',
        lineHeight: width * 0.04,
    },
    linkText: {
        color: '#2E5BFF',
        fontWeight: 'bold',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    loaderText: {
        color: '#FFFFFF',
        marginTop: width * 0.02,
        fontSize: width * 0.035,
    },
});

export default RegisterScreen;
