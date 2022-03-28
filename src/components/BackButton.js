import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { setValue, setXAxisValue, setYAxisValue } from '../utils';
import { Colors } from '../constants/colors';
import { useNavigation } from '@react-navigation/native';

const BackButton = () => {
  const navigation = useNavigation();
  const onPress = () => navigation.goBack();
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonBase}>
      <Image style={styles.icon} source={require('../assets/images/chevron-left.png')} />
    </TouchableOpacity>
  );
};

export default React.memo(BackButton);

const styles = StyleSheet.create({
  buttonBase: {
    width: setValue(38),
    height: setValue(38),
    position: 'absolute',
    top: setYAxisValue(53),
    left: setXAxisValue(27),
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: setValue(10),
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  icon: {
    width: setValue(5),
    height: setYAxisValue(10)
  }
});
