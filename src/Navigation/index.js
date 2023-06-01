import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Screens/Home';
import Profile from '../Screens/Profile';


const Stack = createNativeStackNavigator();

export default function Nav() {
    return (
        <NavigationContainer linking={linking}>
            <Stack.Navigator

                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Profile" component={Profile} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const linking = {
    // prefixes: [prefix],
    config: {
        screens: {
            Home: "Home",
            Profile: "Profile",
        },
    },
};


