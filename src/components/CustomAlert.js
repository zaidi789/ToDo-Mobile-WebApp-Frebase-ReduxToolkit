import {
  Alert,
  Modal,
  StyleSheet,
  Platform,
  Text,
  Dimensions,
  View,
  TouchableOpacity,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors} from './Colors';
const isWeb = Platform.OS === 'web';
const CustomAlert = ({modalVisible = false, setModalVisible, onPressOK}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{height: '60%'}}>
            <Text style={{fontSize: isWeb ? 35 : 35, color: 'red'}}>
              Alert!
            </Text>
            <Text style={{fontSize: isWeb ? 30 : 25, color: 'red'}}>
              Are you sure?
            </Text>
          </View>
          <View style={styles.btnView}>
            <TouchableOpacity style={styles.goalButton} onPress={onPressOK}>
              <Text style={styles.buttonText}>Ok</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.goalButton}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: isWeb ? '25%' : '90%',
    height: isWeb ? '28%' : '23%',
    backgroundColor: Colors.modalBackgroundColor,
    borderRadius: isWeb ? 15 : 15,
    padding: isWeb ? 20 : 15,
    shadowColor: Colors.modalShaddowcolor,
    shadowOffset: {
      width: wp(0),
      height: hp(5),
    },
    shadowOpacity: wp(0.1),
    shadowRadius: hp(10),
    elevation: wp(10),
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goalButton: {
    width: isWeb ? 100 : 120,
    height: isWeb ? 0 : 40,
    borderRadius: isWeb ? 20 : 15,
    backgroundColor: Colors.flatListMainViewBackgroundColor,
    marginTop: hp(2),
    borderWidth: isWeb ? 1 : 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: isWeb ? 15 : 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: isWeb ? 20 : 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomAlert;
