import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import BottomSheet from './BottomSheet';
import { autorun } from 'mobx';
import { Layout } from '../constants';
import FText from './FText';
import { setValue, setYAxisValue } from '../utils';
import { Colors } from '../constants/colors';
import ButtonIcon from './ButtonIcon';
import Padding from './Padding';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const { height } = Layout.window;
const ConfirmModal = React.forwardRef(
  (
    { title = 'Are you sure you want to do this action?', subTitle = 'Please make sure that you confirm this action', onConfirm, onCancel },
    bottomSheetRef
  ) => {
    const { bottom } = useSafeAreaInsets();
    const onCancelPress = () => {
      bottomSheetRef.current?.snapTo?.(0);
      onCancel && onCancel();
    };
    const onConfirmPress = () => {
      bottomSheetRef.current?.snapTo?.(0);
      onConfirm && onConfirm();
    };
    return (
      <BottomSheet snapPoints={[-height / 2, height / 3]} ref={bottomSheetRef}>
        <View style={styles.container}>
          <FText fontWeight={700} align="center" fontSize="large">
            {title}
          </FText>
          <Padding paddingTop={15} />
          <FText color={Colors.typography_60} align="center" fontSize={15}>
            {subTitle}
          </FText>
        </View>
        <ButtonIcon onPress={onConfirmPress} text="Confirm" />
        <Padding paddingTop={15} />
        <TouchableOpacity onPress={onCancelPress} style={styles.btnCancel}>
          <FText fontSize={15}>Cancel</FText>
        </TouchableOpacity>
        <Padding paddingTop={bottom > 0 ? bottom : setYAxisValue(20)} />
      </BottomSheet>
    );
  }
);

export default ConfirmModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: setValue(26),
    paddingTop: setYAxisValue(40)
  },
  btnConfirm: {
    paddingVertical: setYAxisValue(20),
    backgroundColor: Colors.primary
  },
  btnCancel: {
    alignSelf: 'center'
  }
});
