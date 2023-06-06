import {
  Alert,
  Modal,
  StyleSheet,
  Platform,
  Dimensions,
  View,
} from 'react-native';
import Input from './Input';
import Button from './Button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors} from './Colors';
const isWeb = Platform.OS === 'web';
const Model = ({
  modalVisible = false,
  setModalVisible,
  onPress,
  buttonName,
  Titleplaceholder,
  Desplaceholder,
  Titlevalue,
  Desvalue,
  TitleonChangeText,
  DesonChangeText,
  desStyle,
  titleStyle,
}) => {
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
          <Input
            placeholder={Titleplaceholder}
            onChangeText={TitleonChangeText}
            value={Titlevalue}
            style={titleStyle}
          />
          <Input
            placeholder={Desplaceholder}
            onChangeText={DesonChangeText}
            value={Desvalue}
            style={desStyle}
          />
          <Button buttonName={buttonName} onPress={onPress} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    height: isWeb ? Dimensions.get('window').height : '100%',
    width: isWeb ? Dimensions.get('window').width : '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: isWeb ? '70%' : '90%',
    margin: wp(5),
    backgroundColor: Colors.modalBackgroundColor,
    borderRadius: isWeb ? 15 : 15,
    padding: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.modalShaddowcolor,
    shadowOffset: {
      width: wp(0),
      height: hp(5),
    },
    shadowOpacity: wp(0.1),
    shadowRadius: hp(10),
    elevation: wp(10),
    height: isWeb ? '70%' : null,
  },
});

export default Model;
