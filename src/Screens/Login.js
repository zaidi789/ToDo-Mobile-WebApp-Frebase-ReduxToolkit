import React, {useState} from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Images from '../Images/Images';
import Input from '../components/Input';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import app from '../Firebase/config';
import Loader from '../components/Loader';

const isWeb = Platform.OS === 'web';
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth(app);
  const navigation = useNavigation();

  function handelLogin() {
    try {
      setIsLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then(userCrenditial => {
          const user = userCrenditial.user;
          setIsLoading(false);
          // user.emailVerified(true);
          if (user.emailVerified === true) {
            // alert('Login sucessfully');
            navigation.navigate('Home');
          } else {
            alert('Please verify your email');
          }
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } catch (error) {
      alert('Email or Password is invalid');
    }
  }

  return (
    <View style={styles.container}>
      <Loader isLoading={isLoading} />
      <ImageBackground source={Images.Login} style={styles.backgroundImg}>
        <View style={styles.mainView}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 30, color: 'black'}}>Login</Text>
          </View>

          <View
            style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
            <Text style={{fontSize: 18, color: 'black'}}>
              Do you have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={{fontSize: 18, color: 'black', color: 'green'}}>
                Register
              </Text>
            </TouchableOpacity>
          </View>
          <Input
            placeholder={'Please enter your email'}
            style={styles.emailInput}
            onChangeText={setEmail}
            value={email}
          />
          <Input
            placeholder={'Please enter your password'}
            style={styles.emailInput}
            onChangeText={setPassword}
            value={password}
          />
          <View style={{alignItems: 'center'}}>
            <Button
              buttonName={'Login'}
              style={styles.button}
              stylesBtnText={styles.buttonText}
              onPress={() => handelLogin()}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  backgroundImg: {
    resizeMode: 'center',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainView: {
    height: isWeb ? '50%' : '45%',
    width: isWeb ? '40%' : '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
  },
  emailInput: {
    height: isWeb ? 40 : 50,
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: isWeb ? 10 : 15,
    marginBottom: 20,
    padding: 8,
  },
  button: {
    width: isWeb ? '20%' : '50%',
    padding: isWeb ? 20 : 5,
    backgroundColor: 'green',
    borderWidth: isWeb ? 0.5 : 1,
    borderRadius: isWeb ? 10 : 10,
  },
  buttonText: {
    fontSize: isWeb ? 20 : 14,
  },
});
// borderWidth: isWeb ? 0.5 : 1,
