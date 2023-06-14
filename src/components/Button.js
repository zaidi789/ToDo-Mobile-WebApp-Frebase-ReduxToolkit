import React from 'react';
import {StyleSheet, Text, Platform, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors} from './Colors';

const isWeb = Platform.OS === 'web';
export default function Button({onPress, buttonName, style, stylesBtnText}) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.goalButton, style]}>
      <Text style={[styles.buttonText, stylesBtnText]}>{buttonName}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  goalButton: {
    width: isWeb ? 350 : 120,
    height: isWeb ? 0 : 40,
    borderRadius: isWeb ? 20 : 15,
    backgroundColor: Colors.flatListMainViewBackgroundColor,
    marginTop: hp(2),
    borderWidth: wp(0.4),
    justifyContent: 'center',
    alignItems: 'center',
    padding: isWeb ? 40 : 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: wp(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
