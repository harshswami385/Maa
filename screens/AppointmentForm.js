import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, FlatList, Dimensions, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const AppointmentForm = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { doctor } = route.params;
    
    const [selectedDate, setSelectedDate] = useState(null);
    const [dob, setDob] = useState(''); // Prefill empty, will update once selected
    const [sex, setSex] = useState('Male'); // Prefill with Male
    const [name, setName] = useState('Adarsh Mishra'); // Prefill name
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showSexPicker, setShowSexPicker] = useState(false);
    const [calendarData, setCalendarData] = useState([]);
    const [startDate, setStartDate] = useState(new Date());

    const getFiveDays = (startDate) => {
        const fiveDays = [];
        for (let i = 0; i < 5; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            fiveDays.push(date);
        }
        return fiveDays;
    };

    useEffect(() => {
        setCalendarData([getFiveDays(startDate)]);
    }, [startDate]);

    const handlePayPress = () => {
        // Navigate to AppointmentConfirmation screen
        navigation.navigate('AppointmentConfirmation', {
            name: name,
            doctor: doctor,
            selectedDate: selectedDate,
            dob: dob,
            sex: sex
        });
    };

    const handleScrollEnd = (event) => {
        const contentWidth = event.nativeEvent.contentSize.width;
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const scrollWidth = event.nativeEvent.layoutMeasurement.width;

        if (contentOffsetX + scrollWidth >= contentWidth - 1) {
            setStartDate((prevDate) => {
                const newStartDate = new Date(prevDate);
                newStartDate.setDate(prevDate.getDate() + 5);
                return newStartDate;
            });
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.weekContainer}>
            {item.map((date, index) => {
                const dayOfWeek = date.toLocaleString('en-us', { weekday: 'short' });
                const dayNumber = date.getDate();
                const dateString = date.toISOString().split('T')[0];

                return (
                    <TouchableOpacity
                        key={index}
                        style={[styles.dayContainer, selectedDate === dateString && styles.selectedDay]}
                        onPress={() => setSelectedDate(dateString)}
                    >
                        <Text
                            style={[styles.dayText, selectedDate === dateString && styles.selectedText]}
                        >
                            {dayOfWeek}
                        </Text>
                        <Text
                            style={[styles.dateText, selectedDate === dateString && styles.selectedText]}
                        >
                            <Text style={styles.boldText}>{dayNumber}</Text>
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );

    const formatMonth = (date) => {
        const options = { year: 'numeric', month: 'long' };
        return new Intl.DateTimeFormat('en-US', options).format(date);
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
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Image
                            source={require('../assets/Vector8.png')}
                            style={styles.backButtonImage}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Appointment</Text>
                    <TouchableOpacity>
                        <Text style={styles.dateText2}>{formatMonth(startDate)}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <FlatList
                    data={calendarData}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.flatListContainer}
                    onMomentumScrollEnd={handleScrollEnd}
                />
                <View style={styles.borderLine}></View>

                {/* Name Field with red asterisk */}
                <Text style={styles.label}>
                    Name <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Name"
                    value={name} // Pre-filled with Adarsh Mishra
                    onChangeText={setName}
                    placeholderTextColor="#7D7D7D"
                />

                <View style={styles.row}>
                    <View style={styles.rowContainer}>
                        {/* Sex Picker with red asterisk */}
                        <Text style={styles.label}>
                            Sex <Text style={styles.required}>*</Text>
                        </Text>
                        <TouchableOpacity
                            style={[styles.input, styles.halfInput, styles.pickerWrapper]}
                            onPress={() => setShowSexPicker(!showSexPicker)}
                        >
                            <Text style={{ color: sex ? '#000' : '#7D7D7D' }}>
                                {sex || 'Select Sex'}
                            </Text>
                            <Ionicons name="caret-down" size={width * 0.05} color="#7D7D7D" style={styles.icon} />
                        </TouchableOpacity>
                        {showSexPicker && (
                            <View style={styles.pickerWrapper}>
                                <Picker
                                    selectedValue={sex}
                                    onValueChange={(itemValue) => {
                                        setSex(itemValue);
                                        setShowSexPicker(false);
                                    }}
                                    style={styles.picker}
                                >
                                    <Picker.Item label="Select sex" value="" />
                                    <Picker.Item label="Male" value="Male" />
                                    <Picker.Item label="Female" value="Female" />
                                    <Picker.Item label="Other" value="Other" />
                                </Picker>
                            </View>
                        )}
                    </View>

                    {/* DOB Picker with red asterisk */}
                    <View style={styles.rowContainer}>
                        <Text style={styles.label}>
                            DOB <Text style={styles.required}>*</Text>
                        </Text>
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

                {/* Mobile Number with red asterisk */}
                <Text style={styles.label}>
                    Mobile Number <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Mobile Number"
                    value={''}
                    keyboardType="phone-pad"
                    placeholderTextColor="#7D7D7D"
                />
            </ScrollView>

            <View style={styles.payButtonContainer}>
                <TouchableOpacity style={styles.payButton} onPress={handlePayPress}>
                    <Text style={styles.payButtonText}>Pay {doctor.fees}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    scrollContainer: {
        padding: 16,
        paddingBottom: 100,
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
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    dateText2: {
        color: '#fff',
        backgroundColor: '#164772',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    flatListContainer: {
        paddingVertical: 20,
        paddingLeft: 10,
    },
    weekContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 12,
    },
    dayContainer: {
        height: 72,
        width: 60, // Reduced width to fit 5 days
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#FFF',
        boxShadow: '0px 0px 10px -1px rgba(203, 203, 203, 0.87)',
    },
    selectedDay: {
        backgroundColor: '#1BBA8D',
        boxShadow: '0px 0px 10px -1px rgba(203, 203, 203, 0.87)',
    },
    dayText: {
        marginTop: 5,
        fontSize: 12,
        color: '#1BBA8D',
        textAlign: 'center',
    },
    dateText: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#1BBA8D',
        textAlign: 'center',
    },
    selectedText: {
        color: '#fff',
    },
    boldText: {
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowContainer: {
        width: '48%',
    },
    halfInput: {
        flex: 0.48,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
        color: '#333',
    },
    required: {
        color: 'red',
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#fff',
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
    payButtonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#f9f9f9',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    payButton: {
        backgroundColor: '#164772',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    payButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    borderLine: {
        width: 385,
        height: 1,
        backgroundColor: '#E9E9E9',
        marginVertical: 10,
    }
});

export default AppointmentForm;
