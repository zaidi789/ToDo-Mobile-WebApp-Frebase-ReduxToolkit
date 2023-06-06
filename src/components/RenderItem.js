import React from 'react';
import {StyleSheet, View} from 'react-native';
import TextBox from './TextBox';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CheckBox from './CheckBox';
import {Colors} from './Colors';

export default function RenderItem({
  outputTitle,
  outputDes,
  completeGoalOnpress,
  editGoalHandlerOnpress,
  deleteAlertOnpress,
}) {
  return (
    <View style={styles.FlatlistmainView}>
      <View style={{paddingBottom: 20}}>
        <View style={styles.goalList}>
          <TextBox outputTitle={outputTitle} outputDes={outputDes} />
        </View>
        <View style={styles.listCompleteIconView}>
          <CheckBox
            onpressDelete={deleteAlertOnpress}
            onpressEdit={editGoalHandlerOnpress}
            onpressComplete={completeGoalOnpress}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  goalList: {
    alignItems: 'flex-start',
    width: wp('93%'),
    margin: wp(2),
    padding: wp(3),
    borderRadius: wp(2),
    borderWidth: wp(0.5),
    backgroundColor: Colors.flatListMainViewBackgroundColor,
  },
  listCompleteIconView: {
    width: wp('92%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(2),
    marginVertical: wp(2),
  },
  editDeleteIconView: {
    flexDirection: 'row',
  },
});
