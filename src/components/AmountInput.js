import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { setValue, setXAxisValue } from '../utils';
import { DecrementSvg, IncrementSvg } from '../assets/svg';
import { Colors } from '../constants/colors';
import FText from './FText';
import { observer } from 'mobx-react-lite';

const AmountInput = ({ value, onChangeValue, size = 30.6, allowZero = false }) => {
  console.log('render amount');
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => value > (allowZero ? 0 : 1) && onChangeValue && onChangeValue(value - 1)}
        style={[
          styles.btn,
          {
            width: setValue(size),
            height: setValue(size)
          },
          styles.noFill
        ]}>
        <DecrementSvg color={Colors.primary} />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <FText lineHeight={18} fontSize={18} fontWeight={600}>
          {`0${value}`.slice(-2)}
        </FText>
      </View>
      <TouchableOpacity
        onPress={() => onChangeValue && onChangeValue(value + 1)}
        style={[
          styles.btn,
          {
            width: setValue(size),
            height: setValue(size)
          }
        ]}>
        <IncrementSvg color={Colors.white} />
      </TouchableOpacity>
    </View>
  );
};

export default AmountInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    height: setValue(30.6),
    width: setValue(30.6)
  },
  btn: {
    width: setValue(30.6),
    height: setValue(30.6),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 99,
    borderColor: Colors.primary,
    borderWidth: 1,
    backgroundColor: Colors.primary
  },
  textContainer: {
    width: setXAxisValue(44),
    justifyContent: 'center',
    alignItems: 'center'
  },
  noFill: {
    backgroundColor: Colors.transparent
  }
});
