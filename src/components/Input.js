import React from 'react';
import {StyleSheet, Platform, TextInput} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const isWeb = Platform.OS === 'web';
export default function Input({placeholder, value, onChangeText, style}) {
  return (
    <TextInput
      placeholder={placeholder}
      style={[styles.goalInput, style]}
      onChangeText={onChangeText}
      value={value}
    />
  );
}

const styles = StyleSheet.create({
  goalInput: {
    height: isWeb ? hp(50) : hp(7),
  },
});
