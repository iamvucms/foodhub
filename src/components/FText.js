import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../contants/colors';

const FText = ({children}) => {
  return <Text style={styles.base}>{children}</Text>;
};

export default FText;

const styles = StyleSheet.create({
  base: {
    color: Colors.typography,
    fontFamily: 'SofiaPro-Regular',
  },
});
