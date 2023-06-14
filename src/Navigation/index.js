import React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../Screens/Home';
import CompleteTaskList from '../Screens/CompleteTaskList';
import Login from '../Screens/Login';
import Register from '../Screens/Register';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../components/Button';
import {removeUser} from '../Redux/userDetails';

const Stack = createNativeStackNavigator();

export default function Nav() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const handelLogout = () => {
    const data = {};
    try {
      dispatch(removeUser(data));
      alert('Logout Sucessfully');
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        screenOptions={
          {
            // headerShown: false,
          }
        }>
        {user.email ? (
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerRight: () => (
                <Button onPress={() => handelLogout()} buttonName="Logout" />
              ),
            }}
          />
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}

        <Stack.Screen name="Register" component={Register} />

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
