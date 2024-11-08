import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ScrollView, KeyboardAvoidingView, Platform, Dimensions, Keyboard } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Use Ionicons if available

const { width } = Dimensions.get('window');

const OTPScreen = ({ route, navigation }) => {
    const { confirm, phoneNumber } = route.params;
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputs = useRef([]);
    const [countdown, setCountdown] = useState(59);
    const [isCounting, setIsCounting] = useState(true);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    // Keyboard visibility listener
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    useEffect(() => {
        let timer;
        if (isCounting && countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        } else if (countdown === 0) {
            setIsCounting(false);
        }

        return () => clearInterval(timer);
    }, [countdown, isCounting]);

    const handleResendOTP = () => {
        setCountdown(59);
        setIsCounting(true);
        Alert.alert("OTP Resent", "A new OTP has been sent to your phone number.");
    };

    const handleChange = (text, index) => {
        const newOtp = [...otp];
        newOtp[index] = text;

        setOtp(newOtp);

        if (text && index < 5) {
            inputs.current[index + 1].focus();
        }
    };

    const handleBackspace = (text, index) => {
        if (!text && index > 0) {
            inputs.current[index - 1].focus();
        }
    };

    const confirmCode = async () => {
        try {
            const otpCode = otp.join('');
            await confirm.confirm(otpCode);
            // Navigate to ProfileScreen after successful OTP verification
            navigation.navigate('ProfileScreen');
        } catch (error) {
            Alert.alert('Invalid code', 'Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            {/* Back Button with Icon Fallback */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                {Ionicons ? (
                    <Ionicons name="arrow-back" size={width * 0.07} color="#164772" />
                ) : (
                    <Text style={{ fontSize: width * 0.07, color: "#164772" }}>{"<"}</Text>
                )}
            </TouchableOpacity>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0} // Reduced offset for smaller gap
                style={styles.keyboardAvoidingContainer}
            >
                <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
                    {/* Image */}
                    <Image source={require('../assets/registerGraphic.png')} style={styles.image} />

                    <View style={styles.headingContainer}>
                        <Text style={styles.title}>Enter OTP</Text>
                        <Text style={styles.subtitle}>
                            Enter the 6-digit code sent to {phoneNumber}
                        </Text>
                    </View>

                    <View style={styles.otpContainer}>
                        {otp.map((digit, index) => (
                            <TextInput
                                key={index}
                                ref={(ref) => (inputs.current[index] = ref)}
                                style={styles.otpInput}
                                keyboardType="number-pad"
                                maxLength={1}
                                value={digit}
                                onChangeText={(text) => handleChange(text, index)}
                                onKeyPress={({ nativeEvent }) => {
                                    if (nativeEvent.key === 'Backspace') {
                                        handleBackspace(digit, index);
                                    }
                                }}
                            />
                        ))}
                    </View>

                    <View style={styles.resendContainer}>
                        <Text style={styles.timerText}>
                            00:{countdown < 10 ? `0${countdown}` : countdown}
                        </Text>
                        <TouchableOpacity onPress={handleResendOTP} disabled={isCounting}>
                            <Text style={[styles.resendText, isCounting && styles.disabledText]}>
                                Resend OTP
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                
                {/* Verify Button */}
                <KeyboardAvoidingView style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, otp.includes('') && styles.buttonDisabled]}
                        onPress={confirmCode}
                        disabled={otp.includes('')}
                    >
                        <Text style={styles.buttonText}>Verify</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>

                {/* Footer Text - Fixed */}
                {!isKeyboardVisible && (
                    <View style={styles.footerContainer}>
                        <Text style={styles.footerText}>
                            By signing up or logging in, I accept the app's         {' '}
                            <Text style={styles.linkText}>Terms of Service</Text> and{' '}
                            <Text style={styles.linkText}>Privacy Policy</Text>
                        </Text>
                    </View>
                )}
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    keyboardAvoidingContainer: {
        flex: 1,
    },
    backButton: {
        position: 'absolute',
        top: width * 0.08, // Position closer to top
        left: width * 0.05,
        zIndex: 10,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: width * 0.05,
        paddingBottom: width * 0.05,
    },
    image: {
        width: width * 0.8,
        height: width * 0.5,
        resizeMode: 'contain',
        marginTop: width * 0.18, // Align image lower since back button is at top
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
        textAlign: 'left',
        paddingLeft: width * 0.02,
        marginBottom: width * 0.07,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start', // Align OTP inputs to the left
        width: '100%',
        paddingHorizontal: width * 0.02,
        marginBottom: width * 0.05,
        columnGap: width * 0.02, // Adds gap between OTP input boxes
    },
    otpInput: {
        borderWidth: 1,
        borderColor: '#D1D1D1',
        borderRadius: width * 0.02,
        width: width * 0.13,
        height: width * 0.13,
        textAlign: 'center',
        fontSize: width * 0.045,
        color: '#000000',
        backgroundColor: '#F6F6F6',
    },
    resendContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start', // Align timer and resend to the left
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: width * 0.05,
        marginBottom: width * 0.07,
    },
    timerText: {
        fontSize: width * 0.035,
        color: '#28A745',
        marginRight: width * 0.02,
    },
    resendText: {
        fontSize: width * 0.035,
        color: '#2E5BFF',
        fontWeight: '500',
    },
    disabledText: {
        color: '#B3B3B3',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: width * 0.05,
        width: '100%',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#164772',
        paddingVertical: width * 0.028,
        borderRadius: width * 0.038,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        alignSelf: 'center',
        marginBottom: width * 0.10,
    },
    buttonDisabled: {
        backgroundColor: '#B3B3B3',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: width * 0.04,
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
        width: '90%',
    },
    linkText: {
        color: '#2E5BFF',
        fontWeight: 'bold',
    },
});

export default OTPScreen;
