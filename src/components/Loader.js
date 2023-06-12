import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function Loader({isLoading}) {
  return (
    <Modal animationType="slide" transparent={true} visible={isLoading}>
      <View style={styles.container}>
        <View style={styles.loader}>
          <ActivityIndicator
            animating={isLoading}
            size={'large'}
            color={'red'}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'black',
  },
  loader: {
    height: '40%',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'yellow',
  },
});
