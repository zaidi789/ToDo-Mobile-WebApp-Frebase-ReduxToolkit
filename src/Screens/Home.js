import React, {useState, useEffect} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';
import Model from '../components/Model';
import RenderItem from '../components/RenderItem';
import {useDispatch, useSelector} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors} from '../components/Colors';
import {addGoal, removeGoal, updateTodo} from '../Redux/todoSlice';
import {addCompletedGoals} from '../Redux/completedGoalSlice';
import CustomAlert from '../components/CustomAlert';

const isWeb = Platform.OS === 'web';
export default function Home() {
  const navigation = useNavigation();
  const [enteredGoalText, setenteredGoalText] = useState('');
  const [goalTitle, setgoalTitle] = useState('');
  const [goalKey, setGoalKey] = useState();
  const [editGoalIndex, setEditGoalIndex] = useState(-1);
  const [titleError, setTitleError] = useState(false);
  const [desError, setDesError] = useState(false);
  const [updateButton, setUpdateButton] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [key, setDelKey] = useState();
  const dispatch = useDispatch();

  const todos = useSelector(state => state.todos);

  const completeTodos = useSelector(state => state.completedTodos);

  function validateTitleText() {
    if (goalTitle === '') {
      setTitleError(true);
      Alert.alert('Error', 'Please enter goal Title');
    } else if (enteredGoalText === '') {
      setDesError(true);
      Alert.alert('Error', 'Please enter goal description');
    } else {
      addGoalHandler();
    }
  }

  function editGoalHandler(obj, idx) {
    console.log(idx);
    setIsVisible(true);
    setUpdateButton(true);
    setenteredGoalText(obj.text);
    setgoalTitle(obj.title);
    setEditGoalIndex(idx);
    setGoalKey(obj.key);
  }

  function deleteGoal() {
    dispatch(removeGoal(key));
    alert('Goal Deleted Sucessfully');
  }

  function addGoalHandler() {
    if (editGoalIndex >= 0) {
      let updatedGoals = {
        title: goalTitle,
        text: enteredGoalText,
        key: goalKey,
      };
      dispatch(updateTodo(updatedGoals));
      setUpdateButton(false);
      setgoalTitle('');
      setenteredGoalText('');
      setEditGoalIndex(-1);
      setIsVisible(!isVisible);
      alert('Task Updated Successfully');
    } else if (enteredGoalText !== '' && goalTitle !== '') {
      let key = Math.random().toString();
      let obj = {
        key: key,
        title: goalTitle,
        text: enteredGoalText,
      };
      dispatch(addGoal(obj));
      setenteredGoalText('');
      setgoalTitle('');
      setIsVisible(!isVisible);
      setDesError(false);
      setTitleError(false);
      alert('Alert', 'Task Added Successfully');
    } else {
      alert(
        'Failed to Add',
        'Please enter a todo to add. Blank notes cannot be added.',
      );
    }
  }

  function completeGoal(itemData) {
    dispatch(addCompletedGoals(itemData));
    dispatch(removeGoal(itemData.key));
    alert('Goal added to completed goal List');
  }

  return (
    <View style={styles.container}>
      <CustomAlert
        modalVisible={alertModalVisible}
        setModalVisible={setAlertModalVisible}
        onPressOK={() => {
          deleteGoal();
          setAlertModalVisible(!alertModalVisible);
        }}
      />
      <Model
        modalVisible={isVisible}
        setModalVisible={setIsVisible}
        buttonName={updateButton ? 'Update' : 'Add'}
        onPress={validateTitleText}
        Titleplaceholder="Enter your Title"
        titleStyle={
          titleError === true ? styles.errgoalInput : styles.goalInput
        }
        TitleonChangeText={setgoalTitle}
        Titlevalue={goalTitle}
        Desplaceholder="Enter your Description"
        desStyle={desError === true ? styles.errgoalInput : styles.goalInput}
        DesonChangeText={setenteredGoalText}
        Desvalue={enteredGoalText}
      />
      <View style={styles.upperView}>
        <View style={styles.btnView}>
          <Button buttonName={'ADD'} onPress={() => setIsVisible(!isVisible)} />
          <Button
            buttonName={'C - Task'}
            onPress={() => navigation.navigate('CompletedGoalList')}
          />
        </View>

        <View style={styles.countView}>
          <Text style={styles.countText}>
            Total Goals completed: {completeTodos.length}
          </Text>
        </View>
      </View>
      <View style={styles.flatList}>
        <FlatList
          data={todos}
          renderItem={itemData => {
            return (
              <RenderItem
                outputTitle={itemData?.item?.title}
                outputDes={itemData?.item?.text}
                deleteAlertOnpress={() => {
                  setDelKey(itemData.item.key);
                  setAlertModalVisible(!alertModalVisible);
                }}
                completeGoalOnpress={() => completeGoal(itemData.item)}
                editGoalHandlerOnpress={() =>
                  editGoalHandler(itemData.item, itemData.index)
                }
              />
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: isWeb ? Dimensions.get('window').width : '100%',
    height: isWeb ? Dimensions.get('screen').height : '100%',
  },
  upperView: {
    width: wp('100%'),
  },
  btnView: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: wp(3),
    paddingBottom: wp(3),
  },
  countView: {
    borderBottomColor: 'black',
    borderBottomWidth: wp(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatList: {
    paddingBottom: 5,
  },

  countText: {
    fontWeight: 'bold',
    fontSize: wp(4),
    color: Colors.countTextColor,
    marginBottom: wp(3),
    borderRadius: wp(3),
    borderWidth: wp(0.5),
    width: wp('58%'),
    padding: wp(2),
    borderColor: Colors.countBorderColor,
  },

  goalInput: {
    width: '90%',
    borderColor: Colors.goalInputColor,
    borderWidth: wp(0.3),
    marginTop: wp(3),
    borderRadius: wp(0.1),
    paddingLeft: wp(2),
    fontSize: isWeb ? 60 : 14,
    borderRadius: 15,
  },
  errgoalInput: {
    width: '90%',
    borderColor: Colors.errorGoalInputColor,
    borderWidth: wp(0.1),
    marginTop: wp(1),
    borderRadius: wp(0.1),
    paddingLeft: wp(2),
    fontSize: isWeb ? 60 : 14,
  },
});
