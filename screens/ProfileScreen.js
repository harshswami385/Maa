// ProfileScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform, Dimensions, ScrollView, Keyboard } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const ProfileScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [sex, setSex] = useState('');
    const [dob, setDob] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const handleFinish = () => {
        if (!name || !sex || !dob) {
            Alert.alert("Error", "Please fill in all required fields.");
            return;
        }
        navigation.navigate('HomeScreen'); // Navigate to HomeScreen instead of SuccessScreen
    };

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || dob;
        setShowDatePicker(Platform.OS === 'ios');
        if (currentDate) {
            const formattedDate = currentDate.toISOString().split('T')[0];
            setDob(formattedDate);
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Complete Your Profile</Text>
            </View>

            {/* Main Content */}
            <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
                {/* Name Field */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Name <Text style={styles.required}>*</Text></Text>
                    <TextInput
                        style={styles.input}
                        placeholder="eg. Ayushi Kumari"
                        value={name}
                        onChangeText={setName}
                    />
                </View>

                {/* Sex and DOB Fields */}
                <View style={styles.rowContainer}>
                    {/* Sex Picker */}
                    <View style={styles.equalHalfContainer}>
                        <Text style={styles.label}>Sex <Text style={styles.required}>*</Text></Text>
                        <View style={[styles.pickerWrapper, styles.inputStyle]}>
                            <Picker
                                selectedValue={sex}
                                onValueChange={(itemValue) => setSex(itemValue)}
                                style={styles.picker}
                                dropdownIconColor="#000"
                            >
                                <Picker.Item label="Select sex" value="" />
                                <Picker.Item label="Male" value="Male" />
                                <Picker.Item label="Female" value="Female" />
                                <Picker.Item label="Other" value="Other" />
                            </Picker>
                        </View>
                    </View>

                    {/* DOB Picker */}
                    <View style={styles.equalHalfContainer}>
                        <Text style={styles.label}>DOB <Text style={styles.required}>*</Text></Text>
                        <TouchableOpacity style={[styles.input, styles.inputStyle]} onPress={() => setShowDatePicker(true)}>
                            <Text style={{ color: dob ? '#000' : '#7D7D7D' }}>
                                {dob || 'DD/MM/YYYY'}
                            </Text>
                            <Ionicons name="calendar" size={width * 0.05} color="#7D7D7D" style={styles.icon} />
                        </TouchableOpacity>
                        {showDatePicker && (
                            <DateTimePicker
                                value={dob ? new Date(dob) : new Date()}
                                mode="date"
                                display="default"
                                onChange={onDateChange}
                                maximumDate={new Date()}
                            />
                        )}
                    </View>
                </View>
            </ScrollView>

            {/* Finish Button */}
            <View style={[styles.buttonContainer, isKeyboardVisible && styles.buttonContainerKeyboardVisible]}>
                <TouchableOpacity
                    style={[styles.button, (!name || !sex || !dob) && styles.buttonDisabled]}
                    onPress={handleFinish}
                    disabled={!name || !sex || !dob}
                >
                    <Text style={styles.buttonText}>Finish</Text>
                </TouchableOpacity>
            </View>

            {/* Footer - Only shown when keyboard is hidden */}
            {!isKeyboardVisible && (
                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>
                        By signing up or logging in, I accept the app's{' '}
                        <Text style={styles.linkText}>Terms of Service</Text> and{' '}
                        <Text style={styles.linkText}>Privacy Policy</Text>
                    </Text>
                </View>
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
        paddingHorizontal: width * 0.05,
        paddingBottom: width * 0.15,
        paddingTop: width * 0.06,
    },
    header: {
        width: '100%',
        paddingTop: width * 0.06,
        paddingBottom: width * 0.03,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 0.8,
        borderBottomColor: '#E0E0E0',
    },
    headerTitle: {
        fontSize: width * 0.05,
        fontWeight: '600',
        color: '#164772',
        marginLeft: width * 0.05,
    },
    inputContainer: {
        marginBottom: width * 0.05,
    },
    label: {
        fontSize: width * 0.035,
        fontWeight: '500',
        color: '#000',
        marginBottom: width * 0.02,
    },
    required: {
        color: 'red',
    },
    input: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D1D1D1',
        borderRadius: width * 0.02,
        padding: width * 0.03,
        color: '#000',
        backgroundColor: '#F6F6F6',
    },
    inputStyle: {
        height: width * 0.12,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: width * 0.05,
    },
    equalHalfContainer: {
        flex: 1,
        marginHorizontal: width * 0.01,
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: '#D1D1D1',
        borderRadius: width * 0.02,
        backgroundColor: '#F6F6F6',
    },
    picker: {
        height: '100%',
        color: '#000',
        width: '100%',
    },
    icon: {
        position: 'absolute',
        right: width * 0.03,
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: width * 0.03,
        width: '100%',
        position: 'absolute',
        bottom: width * 0.15,
    },
    buttonContainerKeyboardVisible: {
        bottom: width * 0.02, // Adjust this value based on keyboard height
    },
    button: {
        backgroundColor: '#164772',
        paddingVertical: width * 0.028,
        borderRadius: width * 0.038,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        marginBottom: width * (-0.030),
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
        bottom: width * 0.04,
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

export default ProfileScreen;
