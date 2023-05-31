import { Dimensions, Button, StyleSheet, View, Alert } from 'react-native';
import React from 'react';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.innerView1}>
        <Button title='Test' Pressable={() => {
          console.log('addd');
          Alert.alert('Test', 'Alert Test')
        }} />
      </View>
      <View style={styles.innerView2}></View>
      <View style={styles.innerView3}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: 'green',
  },
  innerView1: {
    height: '30%',
    width: '100%',
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerView2: {
    height: '30%',
    width: '100%',
    backgroundColor: 'orange',
  },
  innerView3: {
    height: '40%',
    width: '100%',
    backgroundColor: 'blue',
  },
});
