import React, {useState, useEffect} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  StyleSheet,
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
import {addGoal, removeGoal, updateTodo, fetchToDos} from '../Redux/todoSlice';
import CustomAlert from '../components/CustomAlert';
import {
  collection,
  setDoc,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import {db} from '../Firebase/config';
import uuid from 'react-native-uuid';
import Loader from '../components/Loader';

const isWeb = Platform.OS === 'web';
export default function Home() {
  const navigation = useNavigation();
  const [enteredGoalText, setenteredGoalText] = useState('');
  const [goalTitle, setgoalTitle] = useState('');
  const [editGoalIndex, setEditGoalIndex] = useState(-1);
  const [titleError, setTitleError] = useState(false);
  const [desError, setDesError] = useState(false);
  const [updateButton, setUpdateButton] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [delKey, setDelKey] = useState();
  const [delIndex, setDelIndex] = useState();
  const [fskey, setFsKey] = useState();
  const [isCompletedGoal, setIsCompletedGoal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);
  const user = useSelector(state => state.user);
  const email = user.email;

  useEffect(() => {
    try {
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  }, []);

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
    setIsVisible(true);
    setUpdateButton(true);
    setenteredGoalText(obj.text);
    setgoalTitle(obj.title);
    setEditGoalIndex(idx);
  }

  const deleteGoalOnCloud = async () => {
    let id = delKey;
    const docRef = doc(db, 'ToDo', email, 'ToDo-List', id);
    setIsLoading(true);
    dispatch(removeGoal(delIndex));
    await deleteDoc(docRef)
      .then(() => {
        setIsLoading(false);
        alert('Goal Deleted Sucessfully');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const updateGoalOnCloud = async (id, data) => {
    const docRef = doc(db, 'ToDo', email, 'ToDo-List', id);
    setIsLoading(true);
    await updateDoc(docRef, data)
      .then(() => {
        setIsLoading(false);
        alert('data updated');
      })
      .catch(error => {
        alert(error);
      });
  };

  const addGoalsOnCloud = async () => {
    let listId = uuid.v4();
    const data = {
      id: listId,
      title: goalTitle,
      text: enteredGoalText,
      isCompleted: false,
    };
    setIsLoading(true);

    try {
      await setDoc(doc(db, 'ToDo', email, 'ToDo-List', listId), {
        id: listId,
        title: goalTitle,
        text: enteredGoalText,
        isCompleted: false,
      });
      dispatch(addGoal(data));
      setIsLoading(false), alert('Note successfully Added!');
    } catch (e) {
      console.log(e);
      alert('Something bad happened!');
    }
  };

  const fetchTodos = async () => {
    setIsLoading(true);
    const querySnapshot = await getDocs(
      collection(db, 'ToDo', email, 'ToDo-List'),
    );
    setIsLoading(false);
    const res = [];
    try {
      querySnapshot.forEach(doc => {
        const data = {
          id: doc.id,
          title: doc.data().title,
          text: doc.data().text,
          isCompleted: doc.data().isCompleted,
        };
        res.push(data);
      });

      dispatch(fetchToDos(res));
    } catch (error) {
      console.log(error);
    }
  };

  function addGoalHandler() {
    if (editGoalIndex >= 0) {
      let updatedGoals = {
        title: goalTitle,
        text: enteredGoalText,
        id: fskey,
        isCompleted: isCompletedGoal,
      };
      dispatch(updateTodo(updatedGoals));
      updateGoalOnCloud(updatedGoals.id, updatedGoals);
      setUpdateButton(false);
      setgoalTitle('');
      setenteredGoalText('');
      setEditGoalIndex(-1);
      setIsVisible(!isVisible);
    } else if (enteredGoalText !== '' && goalTitle !== '') {
      addGoalsOnCloud();
      setenteredGoalText('');
      setgoalTitle('');
      setIsVisible(!isVisible);
      setDesError(false);
      setTitleError(false);
    } else {
      alert('Please enter a todo to add. Blank notes cannot be added.');
    }
  }

  function completeGoal(item) {
    setIsLoading(true);
    // console.log(item);
    try {
      const data = {
        title: item.title,
        text: item.text,
        id: item.id,
        isCompleted: true,
      };
      dispatch(updateTodo(data));
      updateGoalOnCloud(item.id, data);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Loader isLoading={isLoading} />
      <CustomAlert
        modalVisible={alertModalVisible}
        setModalVisible={setAlertModalVisible}
        onPressOK={() => {
          deleteGoalOnCloud();
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
      </View>
      <View style={styles.flatList}>
        <FlatList
          data={todos}
          kekeyExtractor={item => item.id}
          renderItem={itemData =>
            itemData?.item?.isCompleted ? null : (
              <RenderItem
                outputTitle={itemData.item.title}
                outputDes={itemData.item.text}
                //older was text new is description
                deleteAlertOnpress={() => {
                  setDelKey(itemData.item.id);
                  setDelIndex(itemData.index);
                  setAlertModalVisible(!alertModalVisible);
                  // console.log(delKey);
                }}
                completeGoalOnpress={() => {
                  completeGoal(itemData.item);
                  setIsCompletedGoal(!isCompletedGoal);
                }}
                editGoalHandlerOnpress={() =>
                  editGoalHandler(
                    itemData.item,
                    itemData.index,
                    setFsKey(itemData.item.id),
                  )
                }
              />
            )
          }
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
    paddingBottom: 90,
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
