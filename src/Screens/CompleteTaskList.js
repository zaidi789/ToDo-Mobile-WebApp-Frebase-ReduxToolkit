import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  Alert,
  Text,
} from 'react-native';
import TextBox from '../components/TextBox';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors} from '../components/Colors';
import {useDispatch, useSelector} from 'react-redux';
// import {removeCompletedGoals} from '../Redux/completedGoalSlice';
import CustomAlert from '../components/CustomAlert';
import {removeGoal} from '../Redux/todoSlice';

export default function CompleteTaskList() {
  const [key, setKey] = useState();
  const [alertModalVisible, setAlertModalVisible] = useState(false);

  const dispatch = useDispatch();
  // console.log(key);
  // const completeTodos = useSelector(state => state.todos);
  // console.log(completeTodos);
  const completeTodos = useSelector(state => state.todos);
  // console.log(completeTodos);

  function DeleteAlert() {
    dispatch(removeGoal(key));
    deleteGoalOnCloud(key);

    alert('Goal Deleted Sucessfully');
  }
  const deleteGoalOnCloud = async () => {
    let id = key;
    const docRef = doc(db, 'ToDo', email, 'ToDo-List', id);
    setIsLoading(true);
    await deleteDoc(docRef)
      .then(() => {
        setIsLoading(false);
        alert('Goal Deleted Sucessfully');
      })
      .catch(error => {
        console.log(error);
      });
  };

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
        kekeyExtractor={item => item.id}
        renderItem={itemData =>
          !itemData?.item?.isCompleted ? null : (
            <View style={styles.flatListMainView}>
              <TextBox
                outputTitle={itemData.item.title}
                outputDes={itemData.item.text}
                name={'trash-2'}
                color={'white'}
                onPressDelete={() => {
                  setKey(itemData.item.id);
                  setAlertModalVisible(!alertModalVisible);
                }}
              />
            </View>
          )
        }
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
