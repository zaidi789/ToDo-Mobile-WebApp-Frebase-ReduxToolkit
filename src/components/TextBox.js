import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors} from './Colors';
import Images from '../Images/Images';

const isWeb = Platform.OS === 'web';
export default function TextBox({
  outputTitle,
  outputDes,
  name,
  onPressDelete,
  color,
}) {
  return (
    <View style={styles.container}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.listTitleText}>Title:</Text>
        {name ? (
          <TouchableOpacity onPress={onPressDelete}>
            <Image
              source={Images.Delete}
              style={{height: isWeb ? 50 : 25, width: isWeb ? 50 : 25}}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      <Text style={styles.listText}>{outputTitle}</Text>
      <Text style={styles.listTitleText}>Description: </Text>
      <Text style={styles.listText}>{outputDes}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  listTitleText: {
    fontSize: wp(4.5),
    fontWeight: 'bold',
    color: Colors.listTitleTextColor,
  },
  listText: {
    fontSize: wp(4),
    color: Colors.listTextColor,
  },
});
