// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// const BottomNavigation = () => {
//     const navigation = useNavigation();
//     const route = useRoute();
//     const [selectedTab, setSelectedTab] = useState('Home');

//     useEffect(() => {
//         // Update the active tab based on the current route
//         switch (route.name) {
//             case 'HomeScreen':
//                 setSelectedTab('Home');
//                 break;
//             case 'AppointmentsScreen':
//                 setSelectedTab('Appointments');
//                 break;
//             case 'UserProfile':
//                 setSelectedTab('Profile');
//                 break;
//             default:
//                 setSelectedTab('Home');
//         }
//     }, [route.name]);

//     const navigateToTab = (tabName) => {
//         switch (tabName) {
//             case 'Home':
//                 navigation.navigate('HomeScreen');
//                 break;
//             case 'Appointments':
//                 navigation.navigate('AppointmentsScreen');
//                 break;
//             case 'Profile':
//                 navigation.navigate('UserProfile');
//                 break;
//             default:
//                 console.warn('Unknown tab: ', tabName);
//         }
//     };

//     const tabs = [
//         { name: 'Home', label: 'Home', icon: 'home' },
//         { name: 'Appointments', label: 'Appointments', icon: 'event' },
//         { name: 'Profile', label: 'Profile', icon: 'person' },
//     ];

//     return (
//         <View style={styles.container}>
//             {tabs.map((tab) => (
//                 <TouchableOpacity
//                     key={tab.name}
//                     style={[
//                         styles.tab,
//                         selectedTab === tab.name && styles.activeTab,
//                     ]}
//                     onPress={() => navigateToTab(tab.name)}
//                 >
//                     <View
//                         style={[
//                             styles.iconContainer,
//                             selectedTab === tab.name && styles.iconContainerActive,
//                         ]}
//                     >
//                         <Icon
//                             name={tab.icon}
//                             size={30}
//                             color={selectedTab === tab.name ? '#000' : '#000'}
//                         />
//                     </View>
//                     <Text
//                         style={[
//                             styles.text,
//                             selectedTab === tab.name && styles.textActive,
//                         ]}
//                     >
//                         {tab.label}
//                     </Text>
//                 </TouchableOpacity>
//             ))}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         backgroundColor: '#FFFFFF',
//         paddingVertical: 5,
//         position: 'absolute',
//         bottom: 0,
//         width: '100%',
//         borderTopLeftRadius: 15,
//         borderTopRightRadius: 15,
//         shadowColor: '#000',
//         shadowOpacity: 0.1,
//         shadowOffset: { width: 0, height: -2 },
//         elevation: 5,
//     },
//     tab: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         flex: 1,
//     },
//     activeTab: {
//         borderBottomWidth: 3,
//         borderBottomColor: '#000',
//     },
//     iconContainer: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderRadius: 30,
//         backgroundColor: 'transparent',
//     },
//     iconContainerActive: {
//         alignItems:'center',
//         justifyContent:'center',
//         backgroundColor: '#1BBA8D',
//         borderRadius: 16.262,
//         height:40,
//         width: 59,
//     },
//     text: {
//         color: '#000',
//         fontSize: 12,
//         marginTop: 4,
//         // fontWeight: 'normal',
//     },
//     textActive: {
//         color: '#000',
//         fontSize: 12,
//         fontWeight: 'bold',
//     },
// });

// export default BottomNavigation;
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BottomNavigation = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [selectedTab, setSelectedTab] = useState('Home');

    useEffect(() => {
        // Update the active tab based on the current route
        switch (route.name) {
            case 'HomeScreen':
                setSelectedTab('Home');
                break;
            case 'AppointmentsScreen':
                setSelectedTab('Appointments');
                break;
            case 'UserProfile':
                setSelectedTab('Profile');
                break;
            default:
                setSelectedTab('Home');
        }
    }, [route.name]);

    const navigateToTab = (tabName) => {
        switch (tabName) {
            case 'Home':
                navigation.navigate('HomeScreen');
                break;
            case 'Appointments':
                navigation.navigate('AppointmentsScreen');
                break;
            case 'Profile':
                navigation.navigate('UserProfile');
                break;
            default:
                console.warn('Unknown tab: ', tabName);
        }
    };

    const tabs = [
        { name: 'Home', label: 'Home', icon: 'home' },
        { name: 'Appointments', label: 'Appointments', icon: 'event' },
        { name: 'Profile', label: 'Profile', icon: 'person' },
    ];

    return (
        <View style={styles.container}>
            {tabs.map((tab) => (
                <TouchableOpacity
                    key={tab.name}
                    style={[
                        styles.tab,
                        selectedTab === tab.name && styles.activeTab,
                    ]}
                    onPress={() => navigateToTab(tab.name)}
                >
                    <View
                        style={[
                            styles.iconContainer,
                            selectedTab === tab.name && styles.iconContainerActive,
                        ]}
                    >
                        <Icon
                            name={tab.icon}
                            size={28}
                            color={selectedTab === tab.name ? '#000' : '#000'}
                        />
                    </View>
                    <Text
                        style={[
                            styles.text,
                            selectedTab === tab.name && styles.textActive,
                        ]}
                    >
                        {tab.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#FFFFFF',
        paddingVertical: 5,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: -2 },
        elevation: 5,
    },
    tab: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    activeTab: {
        borderBottomWidth: 3,
        borderBottomColor: '#000',
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        backgroundColor: 'transparent',
        height: 40,
        width: 59,
    },
    iconContainerActive: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1BBA8D',
        borderRadius: 16.262,
        height: 40,
        width: 59,
    },
    text: {
        color: '#000',
        fontSize: 12,
        marginTop: 4,
        fontWeight: 'normal',
    },
    textActive: {
        color: '#000',
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default BottomNavigation;

