import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import FText from './FText';
import { setValue, setXAxisValue, setYAxisValue } from '../utils';
import { Colors } from '../constants/colors';

const Header = ({ title, onLeftPress, onRightPress, rightIcon }) => {
  return (
    <View style={styles.container}>
      {onLeftPress && (
        <TouchableOpacity onPress={onLeftPress} style={styles.btnBack}>
          <Image style={styles.backIcon} source={require('../assets/images/chevron-left.png')} />
        </TouchableOpacity>
      )}
      <FText lineHeight={20} fontSize={20} fontWeight={600}>
        {title}
      </FText>
      {onRightPress && (
        <TouchableOpacity onPress={onRightPress} style={styles.btnRight}>
          {typeof rightIcon === 'function' ? rightIcon() : rightIcon}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: setYAxisValue(38),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: setXAxisValue(26)
  },
  btnBack: {
    height: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: setValue(10),
    backgroundColor: Colors.white,
    position: 'absolute',
    left: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.05,
    shadowRadius: 4.65,

    elevation: 6
  },
  backIcon: {
    width: setXAxisValue(5),
    height: setYAxisValue(9.5)
  },
  btnRight: {
    height: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    zIndex: 99
  }
});
