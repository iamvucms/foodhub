import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { StarSvg } from '../assets/svg';
import { setValue } from '../utils';
import { Colors } from '../constants/colors';

const RatingInput = ({ value, onChangeValue }) => {
  return (
    <View style={styles.container}>
      {new Array(5).fill(0).map((_, index) => (
        <TouchableOpacity onPress={() => onChangeValue && onChangeValue(index + 1)} style={styles.starItem} key={index}>
          <StarSvg size={30} color={value > index ? Colors.secondary : Colors.typography} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default RatingInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  starItem: {
    padding: setValue(10)
  }
});
