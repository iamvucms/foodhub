import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import FText from './FText';
import { setXAxisValue, setYAxisValue } from '../utils';
import { Colors } from '../constants/colors';

const ListPicker = ({ data = [], value, onChange, containerStyle }) => {
  const renderItem = React.useCallback(
    ({ item }) => {
      const onPress = () => onChange && onChange(item);
      const isSelected = item === value;
      return (
        <Pressable
          onPress={onPress}
          style={[
            styles.item,
            isSelected && {
              backgroundColor: Colors.primary
            }
          ]}>
          <FText color={isSelected ? Colors.white : Colors.grey_suit}>{item}</FText>
        </Pressable>
      );
    },
    [value]
  );
  const itemKeyExtractor = React.useCallback(item => `${item}`, []);
  return (
    <View style={containerStyle}>
      <FlatList horizontal showsHorizontalScrollIndicator={false} data={data} renderItem={renderItem} keyExtractor={itemKeyExtractor} />
    </View>
  );
};

export default ListPicker;

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: setXAxisValue(15),
    paddingVertical: setYAxisValue(7),
    backgroundColor: Colors.white,
    borderColor: Colors.lighter_border,
    borderWidth: 1,
    borderRadius: 999,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: setXAxisValue(10)
  },
  itemBg: {
    backgroundColor: Colors.primary,
    ...StyleSheet.absoluteFillObject,
    zIndex: -1
  }
});
