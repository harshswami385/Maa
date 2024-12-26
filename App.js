import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { Easing } from 'react-native';
import { enableScreens } from 'react-native-screens';

// Import Screens
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
import AppointmentsScreen from './screens/AppointmentsScreen';
import UserProfile from './screens/UserProfile';
import BottomNavigation from './screens/BottomNavigation';


// Enable native screens for better performance
enableScreens();

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="RegisterScreen"
                screenOptions={{
                    headerShown: false, // Hide headers
                    gestureEnabled: true, // Enable swipe gestures to go back
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Horizontal slide for all platforms
                    transitionSpec: {
                        open: {
                            animation: 'timing',
                            config: {
                                duration: 300, // Transition duration
                                easing: Easing.out(Easing.ease), // Smooth easing
                            },
                        },
                        close: {
                            animation: 'timing',
                            config: {
                                duration: 300,
                                easing: Easing.in(Easing.ease),
                            },
                        },
                    },
                }}
            >
                {/* Screens */}
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                <Stack.Screen name="OTPScreen" component={OTPScreen} />
                <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="AppointmentsScreen" component={AppointmentsScreen} />
                <Stack.Screen name="UserProfile" component={UserProfile} />
                <Stack.Screen name="SearchScreen" component={SearchScreen} />
                <Stack.Screen name="DoctorProfile" component={DoctorProfile} />
                <Stack.Screen name="HospitalProfile" component={HospitalProfile} />
                <Stack.Screen name="DoctorSchedule" component={DoctorSchedule} />
                <Stack.Screen name="AppointmentForm" component={AppointmentForm} />
                <Stack.Screen name="AppointmentConfirmation" component={AppointmentConfirmation} />
                <Stack.Screen name="AppointmentDetails" component={AppointmentDetails} />
                <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
