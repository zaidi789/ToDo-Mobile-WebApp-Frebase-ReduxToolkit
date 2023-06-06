import React from 'react';
import {StyleSheet, View} from 'react-native';
import TextBox from './TextBox';
// import BouncyCheckbox from 'react-native-bouncy-checkbox';
// import Feather from 'react-native-vector-icons/Feather';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CheckBox from './CheckBox';
import {Colors} from './Colors';
// import { Colors } from './Colors';

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
          {/* <TouchableOpacity>
            <BouncyCheckbox
              size={25}
              fillColor="red"
              unfillColor="#FFFFFF"
              text="Completed"
              iconStyle={{borderColor: 'red'}}
              innerIconStyle={{borderWidth: 2}}
              textStyle={{fontFamily: 'JosefinSans-Regular'}}
              onPress={completeGoalOnpress}
            />
          </TouchableOpacity>
          <View style={styles.editDeleteIconView}> */}
          {/* <TouchableOpacity>
              <Feather
                style={{marginRight: 30}}
                name="edit"
                size={25}
                color={Colors.editIconColor}
                onPress={editGoalHandlerOnpress}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Feather
                name="trash-2"
                size={25}
                color={Colors.deleteIconColor}
                onPress={deleteAlertOnpress}
              /> */}
          {/* </TouchableOpacity> */}
          {/* </View> */}
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
