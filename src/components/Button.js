import { Text, TouchableOpacity, StyleSheet, View, Alert } from 'react-native';

export default function Button({ onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text >ADD</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: 'green',
    width: '30%',
    height: '20%',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
