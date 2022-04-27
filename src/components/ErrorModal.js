import { View, StyleSheet, Image, Pressable } from 'react-native';
import React from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Colors } from '../constants/colors';
import { setValue, setYAxisValue } from '../utils';
import FText from './FText';
import Padding from './Padding';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Portal } from '@gorhom/portal';

const LoadingIndicatorModal = ({ error = 'Something went wrong. Try again', onRequestClose }) => {
  const isFocused = useIsFocused();
  if (!isFocused) return null;

  return (
    <Portal>
      <Animated.View style={styles.container} entering={FadeIn}>
        <View style={styles.modalContainer}>
          <Pressable onPress={onRequestClose} style={styles.backdrop} />
          <View style={styles.errorModal}>
            <Image style={styles.errorImage} source={require('../assets/images/close-circle.png')} />
            <Padding paddingTop={25} />
            <FText fontSize="large" fontWeight={800}>
              OOPS!
            </FText>
            <Padding paddingTop={5} />
            <FText fontSize={15} fontWeight={300}>
              {error}
            </FText>
          </View>
        </View>
      </Animated.View>
    </Portal>
  );
};

export default LoadingIndicatorModal;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 99
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.black_75
  },
  errorModal: {
    width: '80%',
    paddingVertical: setYAxisValue(25),
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: setValue(8)
  },
  errorImage: {
    height: setValue(80),
    width: setValue(80)
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -99
  }
});
