import React, {useState} from 'react';
import {StyleSheet, View, FlatList, Dimensions} from 'react-native';
import TextBox from '../components/TextBox';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors} from '../components/Colors';
import {useDispatch, useSelector} from 'react-redux';
import CustomAlert from '../components/CustomAlert';
import {removeGoal} from '../Redux/todoSlice';
import {db} from '../Firebase/config';
import {doc, deleteDoc} from 'firebase/firestore';
import Loader from '../components/Loader';
import {getAuth} from 'firebase/auth';
import app from '../Firebase/config';

export default function CompleteTaskList() {
  const [key, setKey] = useState('');
  const [index, setIndex] = useState();
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const auth = getAuth(app);
  const completeTodos = useSelector(state => state.todos);
  const user = useSelector(state => state.user);
  const email = user.email;

  const deleteGoalOnCloud = async () => {
    console.log(key);
    let id = key;
    const docRef = doc(db, 'ToDo', email, 'ToDo-List', id);
    setIsLoading(true);
    dispatch(removeGoal(index));
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
      <Loader isLoading={isLoading} />

      <CustomAlert
        modalVisible={alertModalVisible}
        setModalVisible={setAlertModalVisible}
        onPressOK={() => {
          deleteGoalOnCloud();
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
                  setIndex(itemData.index);
                  setKey(itemData.item.id, index);
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
    marginBottom: 25,
    margin: wp(2),
    padding: wp(2),
    borderRadius: wp(3),
    borderWidth: wp(0.5),
    justifyContent: 'center',
    backgroundColor: Colors.flatListMainViewBackgroundColor,
  },
});
