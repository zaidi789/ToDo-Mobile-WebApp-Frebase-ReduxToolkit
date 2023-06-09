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
import {addGoal, removeGoal, updateTodo, fetchToDos} from '../Redux/todoSlice';
import {addCompletedGoals} from '../Redux/completedGoalSlice';
import CustomAlert from '../components/CustomAlert';
import {
  collection,
  setDoc,
  doc,
  addDoc,
  getDocs,
  getDoc,
  getFirestore,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import {db} from '../Firebase/config';
import {getAuth} from 'firebase/auth';
import app from '../Firebase/config';
import uuid from 'react-native-uuid';
// import firestore from '@react-native-firebase/firestore';

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
  const [delKey, setDelKey] = useState();
  const [delIndex, setDelIndex] = useState();
  const [fskey, setFsKey] = useState();

  const auth = getAuth(app);
  const id = auth.currentUser.uid;
  const email = auth.currentUser.email;
  // console.log(id);
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);
  const completeTodos = useSelector(state => state.completedTodos);

  // console.log(todos);
  // const usersCollection = firestore().collection('Users');
  // const userDocument = firestore().collection('Users').doc(id);

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
    // console.log(fskey);
    setIsVisible(true);
    setUpdateButton(true);
    setenteredGoalText(obj.text);
    setgoalTitle(obj.title);
    setEditGoalIndex(idx);
    setGoalKey(fskey);
  }

  function deleteGoal() {
    dispatch(removeGoal(delIndex));
    deleteGoalOnCloud();
    alert('Goal Deleted Sucessfully');
  }
  const deleteGoalOnCloud = async () => {
    let id = delKey;
    const docRef = doc(db, 'ToDo', email, 'ToDo-List', id);
    await deleteDoc(docRef);
  };
  const updateGoalOnCloud = async () => {
    let id = fskey;
    const data = {
      title: goalTitle,
      text: enteredGoalText,
    };
    const docRef = doc(db, 'ToDo', email, 'ToDo-List', id);
    await updateDoc(docRef, data)
      .then(() => {
        console.log('data updated');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const addGoalsOnCloud = async () => {
    let listId = uuid.v4();

    // let id = uuid.v4();
    const data = {
      id: listId,
      title: goalTitle,
      text: enteredGoalText,
    };
    try {
      await setDoc(doc(db, 'ToDo', email, 'ToDo-List', listId), {
        id: listId,
        title: goalTitle,
        text: enteredGoalText,
      });
      dispatch(addGoal(data));
      alert('Note successfully saved!');
    } catch (e) {
      console.log(e);
      alert('Something bad happened!');
    }

    //////////////////////////////////
    //firestore()
    //   .collection('ToDo')
    //   .doc(id)
    //   .collection('ToDo-List')
    //   .add({
    //     Title: goalTitle,
    //     Description: enteredGoalText,
    //   })
    //   .then(() => {
    //     console.log('User added!');
    //   });
    //////fire store method///////////////
    //   try {
    //     const docRef = await addDoc(
    //       collection(db, 'ToDo'),
    //       {
    //         Title: goalTitle,
    //         Description: enteredGoalText,
    //       },
    //       {merge: true},
    //     );
    //     console.log('data uploaded', docRef.id);
    //   } catch (error) {
    //     console.log('something went wrong');
    //   }

    // const res = await setDoc(doc(db, 'ToDos', uid), {
    //   Title: goalTitle,
    //   Description: enteredGoalText,
    // });
    // console.log(res);
    // try {
    //   const newToDo = {
    //     Title: goalTitle,
    //     Description: enteredGoalText,
    //     createdAt: new Date().toDateString(),
    //   };
    //   const resTodo = collection(db, 'ToDo', uid);
    //   const docRef = await addDoc(resTodo, newToDo);
    //   console.log('Created sucessfully', docRef.id);
    // } catch (error) {
    //   console.log(error);
    // }
    // const data = {
    //   Title: goalTitle,
    //   Description: enteredGoalText,
    // };
    // const res = await addDoc(collection(db, 'ToDo', uid));
    // console.log(res);
    // try {
    //   const docRef = await addDoc(collection(db, 'ToDoS', user.uid), {
    //     Title: goalTitle,
    //     Description: enteredGoalText,
    //   });
    //   console.log('doc with id ', docRef.id);
    // } catch (error) {
    //   console.error('error adding doc', error);
    // // }
    // firestore()
    //   .collection('Users')
    //   .doc(user.uid)
    //   .set({
    //     Title: goalTitle,
    //     Description: enteredGoalText,
    //   })
    //   .then(() => {
    //     console.log('User added!');
    //   });
    // setDoc(doc(db, 'ToDoS', user.uid), {
    //   Title: goalTitle,
    //   Description: enteredGoalText,
    // });
  };

  const fetchTodos = async () => {
    // const docRef = doc(db, 'ToDoS', user);
    // const docSnap = await getDocs(docRef);
    // console.log('Data is', docSnap);
    //////////////////////////////////////////////////////////////
    // await getDocs(collection(db, 'ToDo', id, 'ToDo-List')).then(
    //   querySnapshot => {
    //     const newData = querySnapshot.docs.map(doc => ({
    //       ...doc.data(),
    //       id: doc.id,
    //     }));
    //     setFtoDos(newData);
    //     console.log(ftoDos, newData);
    //   },
    // );
    //////////////////////////////////////////////////////////////////////
    const querySnapshot = await getDocs(
      collection(db, 'ToDo', email, 'ToDo-List'),
    );
    try {
      querySnapshot.forEach(doc => {
        // const res = [];
        const data = {
          id: doc.id,
          title: doc.data().title,
          text: doc.data().text,
        };
        // res.push(data);
        // console.log(data.id);
        dispatch(fetchToDos(data));
      });
    } catch (error) {
      console.log(error);
    }
    //  querySnapshot.forEach(doc => {
    //     const res = [];
    //     const data = {
    //       id: doc.id,
    //       Title: doc.data().Title,
    //       Description: doc.data().Description,
    //     };
    //     res.push(data);
    //     console.log(res);

    // dispatch(fetchTodos(data));

    // console.log(
    //   'data id is',
    //   doc.id,
    //   'data title is',
    //   doc.data().Title,
    //   'data des is',
    //   doc.data().Description,
    // );
    // if (data.id !== doc.id) {
    //   goalsArray.push(data);
    //   alert('already exist');
    // }

    // const dataArray = [];
    // dataArray.push(doc.data());
    // ftoDos.push(doc.data());
    // console.log(goalsArray);
    // });
  };

  useEffect(() => {
    fetchTodos();
    console.log(fskey);

    // console.log(res);
    // console.log(ftoDos);
  }, []);

  function addGoalHandler() {
    if (editGoalIndex >= 0) {
      let updatedGoals = {
        title: goalTitle,
        text: enteredGoalText,
        id: fskey,
      };
      dispatch(updateTodo(updatedGoals));
      updateGoalOnCloud();
      setUpdateButton(false);
      setgoalTitle('');
      setenteredGoalText('');
      setEditGoalIndex(-1);
      setIsVisible(!isVisible);
      alert('Task Updated Successfully');
    } else if (enteredGoalText !== '' && goalTitle !== '') {
      // let key = Math.random().toString();
      // let obj = {
      //   key: key,
      //   title: goalTitle,
      //   text: enteredGoalText,
      // };
      addGoalsOnCloud();

      setenteredGoalText('');
      setgoalTitle('');
      setIsVisible(!isVisible);
      setDesError(false);
      setTitleError(false);
      // alert('Task Added Successfully');
    } else {
      alert(
        'Failed to Add',
        'Please enter a todo to add. Blank notes cannot be added.',
      );
    }
  }
  // console.log(ftoDos);

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
        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
            padding: 10,
          }}>
          <Button buttonName={'fetch data'} onPress={() => fetchTodos()} />
        </View> */}

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
            // console.log(itemData.item.id);
            return (
              <RenderItem
                outputTitle={itemData?.item?.title}
                //make changes older was title and new is Title
                outputDes={itemData?.item?.text}
                //older was text new is description
                deleteAlertOnpress={() => {
                  setDelKey(itemData.item.id);
                  setDelIndex(itemData.index);
                  setAlertModalVisible(!alertModalVisible);
                  // console.log(delKey);
                }}
                completeGoalOnpress={() => completeGoal(itemData.item)}
                editGoalHandlerOnpress={() =>
                  editGoalHandler(
                    itemData.item,
                    itemData.index,
                    setFsKey(itemData.item.id),
                  )
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
    paddingBottom: 90,
    // backgroundColor: 'green',
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
