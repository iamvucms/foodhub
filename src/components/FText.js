import { StyleSheet, Text } from 'react-native';
import React from 'react';
import { Colors } from '../constants/colors';
import { setYAxisValue } from '../utils';
export const FontWeights = {
  100: 'SofiaPro-UltraLight',
  200: 'SofiaPro-ExtraLight',
  300: 'SofiaPro-Light',
  400: 'SofiaPro-Medium',
  500: 'SofiaPro-Medium',
  600: 'SofiaPro-Medium',
  700: 'SofiaPro-SemiBold',
  800: 'SofiaPro-Bold',
  900: 'SofiaPro-Black'
};
export const FontSizes = {
  normal: setYAxisValue(16),
  small: setYAxisValue(14),
  medium: setYAxisValue(18),
  large: setYAxisValue(20),
  h6: setYAxisValue(24),
  h5: setYAxisValue(28),
  h4: setYAxisValue(32),
  h3: setYAxisValue(36),
  h2: setYAxisValue(40),
  h1: setYAxisValue(44)
};
const FText = ({
  children,
  fontWeight = 400,
  fontSize = 'normal',
  color = Colors.typography,
  lineHeightRatio,
  lineHeight,
  style,
  align = 'left',
  ...restProps
}) => {
  const size = isNaN(fontSize) ? FontSizes[fontSize] : fontSize;
  const textStyles = {
    fontFamily: FontWeights[fontWeight],
    color,
    fontSize: size,
    ...(lineHeightRatio && { lineHeight: size * lineHeightRatio }),
    ...(lineHeight && { lineHeight }),
    textAlign: align
  };
  return (
    <Text style={[styles.base, textStyles, style]} {...restProps}>
      {children}
    </Text>
  );
};

export default FText;

const styles = StyleSheet.create({
  base: {
    color: Colors.typography
  }
});
