import { StyleSheet, View, TextInput, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { setValue, setXAxisValue, setYAxisValue } from '../utils';
import { Colors } from '../contants/colors';
import FText, { FontSizes, FontWeights } from './FText';
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const FInput = React.forwardRef(
  (
    {
      title,
      placeholder,
      isPassword,
      color,
      titleColor = Colors.typography_60,
      containerStyle,
      inputStyle,
      inputContainerStyle,
      ...restProps
    },
    inputRef
  ) => {
    const [showPassword, setShowPassword] = React.useState(isPassword);
    const toggleShowPassword = React.useCallback(() => setShowPassword(!showPassword), [showPassword]);
    const animBorder = useSharedValue(0);
    const onFocus = React.useCallback(() => {
      animBorder.value = withTiming(1);
    }, []);
    const onBlur = React.useCallback(() => {
      animBorder.value = withTiming(0);
    }, []);
    const inputContainerExtraStyle = useAnimatedStyle(() => {
      return {
        borderColor: interpolateColor(animBorder.value, [0, 1], [Colors.border, Colors.primary])
      };
    });
    return (
      <View style={containerStyle}>
        <FText style={styles.title} color={titleColor}>
          {title}
        </FText>
        <Animated.View style={[styles.inputContainerBase, inputContainerExtraStyle, inputContainerStyle]}>
          <TextInput
            onFocus={onFocus}
            onBlur={onBlur}
            ref={inputRef}
            secureTextEntry={showPassword}
            placeholderTextColor={Colors.typography_20}
            placeholder={placeholder}
            style={[styles.inputBase, { color }, inputStyle]}
            {...restProps}></TextInput>
          {isPassword && (
            <TouchableOpacity onPress={toggleShowPassword} style={styles.btnEye}>
              {showPassword ? (
                <Image style={styles.eyeIcon} source={require('../assets/images/eye-on.png')} />
              ) : (
                <Image style={styles.eyeIcon} source={require('../assets/images/eye-off.png')} />
              )}
            </TouchableOpacity>
          )}
        </Animated.View>
      </View>
    );
  }
);

export default React.memo(FInput);

const styles = StyleSheet.create({
  inputContainerBase: {
    width: '100%',
    height: setYAxisValue(65),
    borderRadius: setValue(10),
    borderColor: Colors.border,
    borderWidth: 1
  },
  title: {
    marginBottom: setYAxisValue(10)
  },
  inputBase: {
    width: '100%',
    height: '100%',
    paddingHorizontal: setXAxisValue(20),
    fontSize: FontSizes['medium'],
    fontFamily: 'Sofia Pro',
    color: Colors.typography
  },
  btnEye: {
    position: 'absolute',
    top: setXAxisValue(65 - 12) / 2,
    right: setXAxisValue(20)
  },
  eyeIcon: {
    width: setXAxisValue(18),
    height: setYAxisValue(12)
  }
});
