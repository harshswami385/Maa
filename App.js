// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import RegisterScreen from './screens/RegisterScreen';
import OTPScreen from './screens/OTPScreen';
import ProfileScreen from './screens/ProfileScreen';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import DoctorProfile from './screens/DoctorProfile';
import HospitalProfile from './screens/HospitalProfile';
import DoctorSchedule from './screens/DoctorSchedule';
import AppointmentForm from './screens/AppointmentForm';
import AppointmentConfirmation from './screens/AppointmentConfirmation';
import AppointmentDetails from './screens/AppointmentDetails';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="RegisterScreen"
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: true, // Enable swiping gesture to go back
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Sliding animation
                }}
            >
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                <Stack.Screen name="OTPScreen" component={OTPScreen} />
                <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="SearchScreen" component={SearchScreen} />
                <Stack.Screen name="DoctorProfile" component={DoctorProfile} />
                <Stack.Screen name="HospitalProfile" component={HospitalProfile} />
                <Stack.Screen name="DoctorSchedule" component={DoctorSchedule} />
                <Stack.Screen name="AppointmentForm" component={AppointmentForm} />
                <Stack.Screen name="AppointmentConfirmation" component={AppointmentConfirmation} />
                <Stack.Screen name="AppointmentDetails" component={AppointmentDetails} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
