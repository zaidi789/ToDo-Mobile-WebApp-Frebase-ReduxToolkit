import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../Screens/Home';
import CompleteTaskList from '../Screens/CompleteTaskList';
import Login from '../Screens/Login';
import Register from '../Screens/Register';

const Stack = createNativeStackNavigator();

export default function Nav() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CompletedGoalList" component={CompleteTaskList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const linking = {
  config: {
    screens: {
      Home: 'Home',
      Profile: 'Profile',
      Login: 'Login',
      Register: 'Register',
    },
  },
};
