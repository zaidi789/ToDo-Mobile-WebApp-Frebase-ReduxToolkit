import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Images from '../Images/Images';
import {useNavigation} from '@react-navigation/native';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import app from '../Firebase/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const saveUserSession = async value => {
//   try {
//     await AsyncStorage.setItem('@is_logged_in', value);
//   } catch (e) {
//     // saving error
//   }
// };

// export {saveUserSession};

// const getUserSession = async () => {
//   try {
//     const value = await AsyncStorage.getItem('@is_logged_in');
//     if (value !== null) {
//       return value;
//     }
//     return 'false';
//   } catch (e) {
//     // error reading value
//   }
// };

// export {getUserSession};

// /***  this will be called by user trying to loguot
//  *
//  * this will empty the flag of true
//  * for the user logged in session
//  *
//  */
// async function removeUserSession(navigation) {
//   try {
//     await AsyncStorage.setItem('@is_logged_in', '');
//     navigation.replace('Login');
//   } catch (e) {
//     // saving error
//   }
// }

// export {removeUserSession};

export default function SplashScreen() {
  //   [initializing, setInitializing] = useState(true);
  //   const [user, setUser] = useState();
  const navigation = useNavigation;
  const auth = getAuth(app);
  //   setUser(auth.currentUser);

  //   useEffect(() => {
  //     onUserAuthStateChanged();
  //   }, [navigation]);
  //   function onUserAuthStateChanged() {
  //     // const user = auth.currentUser;
  //     try {
  //       onAuthStateChanged(auth, user => {
  //         if (user) {
  //           () => navigation.navigate('Home');
  //         } else {
  //           () => navigation.navigate('Login');
  //         }
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   useEffect(() => {
  //     const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
  //     return subscriber; // unsubscribe on unmount
  //   }, []);

  //   if (initializing) return null;

  //   if (!user) {
  //     {
  //       () => navigation.navigate('Login');
  //     }
  //   } else {
  //   }

  //   return (
  //     <View>
  //       <Text>Welcome {user.email}</Text>
  //     </View>
  //   );
  // }

  //   function NavigateToAuthScreen() {
  //     const currentUser = auth.currentUser;
  //     setTimeout(function () {
  //       if (currentUser !== null) {
  //         navigation.reset({
  //           index: 0,
  //           routes: [{name: 'Home'}],
  //         });
  //       } else {
  //         navigation.reset({
  //           index: 0,
  //           routes: [{name: 'Login'}],
  //         });
  //       }
  //     }, 1000);
  //   }

  return (
    <View style={styles.container}>
      <Image source={Images.Splash} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    alignSelf: 'center',
    // height: '60%',
    // width: '50%',
  },
});
