import { View } from 'react-native';
import React from 'react';
import { setValue, setXAxisValue, setYAxisValue } from '../utils';

const Padding = ({
  paddingBottom = 0,
  paddingLeft = 0,
  paddingRight = 0,
  paddingTop = 0,
  padding = 0,
  paddingHorizontal = 0,
  paddingVertical = 0,
  children
}) => {
  return (
    <View
      style={{
        ...(paddingBottom && { paddingBottom: setYAxisValue(paddingBottom) }),
        ...(paddingLeft && { paddingLeft: setXAxisValue(paddingLeft) }),
        ...(paddingRight && { paddingRight: setXAxisValue(paddingRight) }),
        ...(paddingTop && { paddingTop: setYAxisValue(paddingTop) }),
        ...(padding && { padding: setValue(padding) }),
        ...(paddingHorizontal && {
          paddingHorizontal: setXAxisValue(paddingHorizontal)
        }),
        ...(paddingVertical && {
          paddingVertical: setYAxisValue(paddingVertical)
        })
      }}>
      {children}
    </View>
  );
};

export default React.memo(Padding);
