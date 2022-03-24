import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { setValue } from '../utils';
import FText from './FText';
import { Colors } from '../constants/colors';

const ButtonIcon = ({ text, icon: Icon, onPress }) => {
  console.log('render button icon');
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        Icon && {
          width: undefined
        }
      ]}>
      {Icon && (
        <View style={styles.iconContainer}>
          <Icon color={Colors.primary} />
        </View>
      )}
      <View
        style={[
          styles.textContainer,
          Icon && {
            flex: 0,
            paddingLeft: setValue(13),
            paddingRight: setValue(23)
          }
        ]}>
        <FText fontSize={15} lineHeight={15} fontWeight={600} color={Colors.white}>
          {text}
        </FText>
      </View>
    </TouchableOpacity>
  );
};

export default ButtonIcon;

const styles = StyleSheet.create({
  container: {
    width: setValue(248),
    height: setValue(60),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 99,
    alignSelf: 'center'
  },
  iconContainer: {
    width: setValue(40),
    height: setValue(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: setValue(20),
    backgroundColor: Colors.white,
    marginLeft: setValue(10)
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
