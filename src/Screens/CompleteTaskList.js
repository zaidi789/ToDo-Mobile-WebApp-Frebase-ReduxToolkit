import React, {useState} from 'react';
import {StyleSheet, View, FlatList, Dimensions, Alert} from 'react-native';
import TextBox from '../components/TextBox';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors} from '../components/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {removeCompletedGoals} from '../Redux/completedGoalSlice';
import CustomAlert from '../components/CustomAlert';

export default function CompleteTaskList() {
  const [key, setKey] = useState();
  const [alertModalVisible, setAlertModalVisible] = useState(false);

  const dispatch = useDispatch();

  const completeTodos = useSelector(state => state.completedTodos);
  // console.log(completeTodos);

  function DeleteAlert() {
    dispatch(removeCompletedGoals(key));
    alert('Goal Deleted Sucessfully');
    // return Alert.alert('Confirm Delete', 'Are you sure ?', [
    //   {text: 'cancel'},
    //   {
    //     text: 'ok',
    //     onPress: () => {
    //
    //     },
    //   },
    // ]);
  }

  return (
    <View style={styles.container}>
      <CustomAlert
        modalVisible={alertModalVisible}
        setModalVisible={setAlertModalVisible}
        onPressOK={() => {
          DeleteAlert();
          setAlertModalVisible(!alertModalVisible);
        }}
      />
      <CustomAlert
        modalVisible={alertModalVisible}
        setModalVisible={setAlertModalVisible}
        onPressOK={() => {
          DeleteAlert();
          setAlertModalVisible(!alertModalVisible);
        }}
      />
      <FlatList
        data={completeTodos}
        keyExtractor={item => item.id}
        renderItem={itemData => {
          return (
            <View style={styles.flatListMainView}>
              <TextBox
                outputTitle={itemData.item.title}
                outputDes={itemData.item.text}
                name={'trash-2'}
                color={'white'}
                onPressDelete={() => {
                  setKey(itemData.item.key);
                  setAlertModalVisible(!alertModalVisible);
                }}
              />
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopColor: Colors.completeTaskContainerBorderTopColor,
    borderBottomColor: Colors.completeTaskContainerBorderBottomColor,
    borderLeftColor: Colors.completeTaskContainerBorderLeftColor,
    borderRightColor: Colors.completeTaskContainerBorderRightColor,
    borderWidth: wp(2),
    padding: wp(0.5),
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },

  flatListMainView: {
    margin: wp(2),
    padding: wp(2),
    borderRadius: wp(3),
    borderWidth: wp(0.5),
    justifyContent: 'center',
    backgroundColor: Colors.flatListMainViewBackgroundColor,
  },
});
