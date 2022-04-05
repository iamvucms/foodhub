import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Portal } from '@gorhom/portal';
import ReBottomSheet from 'reanimated-bottom-sheet';
import { Layout } from '../constants';
import { Colors } from '../constants/colors';
import { setValue } from '../utils';
const { height } = Layout.window;
const BottomSheet = React.forwardRef(({ snapPoints = [-height, height / 2, height], children }, bottomSheetRef) => {
  const renderContent = () => <View style={styles.container}>{children}</View>;
  return (
    <Portal>
      <ReBottomSheet renderContent={renderContent} snapPoints={snapPoints} ref={bottomSheetRef} />
    </Portal>
  );
});

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.white,
    borderTopRightRadius: setValue(20),
    borderTopLeftRadius: setValue(20),
    borderColor: Colors.lighter_border,
    borderWidth: 1
  }
});
