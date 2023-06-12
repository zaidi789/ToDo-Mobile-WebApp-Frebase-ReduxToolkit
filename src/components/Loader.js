import {StyleSheet, ActivityIndicator, View} from 'react-native';
import React from 'react';

export default function Loader(isLoading) {
  return (
    <View>
      <ActivityIndicator animating={isLoading} size={100} color={'red'} />
    </View>
  );
}

const styles = StyleSheet.create({});
