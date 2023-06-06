import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  View,
} from 'react-native';
import React from 'react';
import Images from '../Images/Images';

const isWeb = Platform.OS === 'web';
export default function CheckBox({
  onpressComplete,
  onpressEdit,
  onpressDelete,
}) {
  return (
    <View style={styles.mainIconView}>
      <View>
        <TouchableOpacity onPress={onpressComplete}>
          <Image source={Images.Completed} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.editDeleteView}>
        <View>
          <TouchableOpacity onPress={onpressEdit}>
            <Image source={Images.Edit} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={onpressDelete}>
            <Image source={Images.Delete} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainIconView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    paddingRight: 5,
    paddingBottom: isWeb ? 7 : 5,
    paddingLeft: 5,
  },

  editDeleteView: {
    width: isWeb ? '10%' : '40%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    height: 50,
    width: 50,
  },
});
