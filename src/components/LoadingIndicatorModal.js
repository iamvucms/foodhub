import { View, StyleSheet, ActivityIndicator } from 'react-native';
import React from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Colors } from '../constants/colors';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Portal } from '@gorhom/portal';

const LoadingIndicatorModal = () => {
  const isFocused = useIsFocused();
  if (!isFocused) return null;
  return (
    <Portal>
      <Animated.View entering={FadeIn} style={styles.container}>
        <View style={styles.modalContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
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
    backgroundColor: Colors.black_75,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
