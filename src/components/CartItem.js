import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { setValue, setXAxisValue, setYAxisValue } from '../utils';
import FText from './FText';
import { Colors } from '../constants/colors';
import Padding from './Padding';
import AmountInput from './AmountInput';
import { cartStore } from '../stores';
import { observer } from 'mobx-react-lite';

const CartItem = observer(({ item }) => {
  const onChangeAmount = React.useCallback(value => {
    cartStore.updateCartItemAmount(item.id, value);
  }, []);
  const onRemoveCartItem = React.useCallback(() => {
    cartStore.removeCartItem(item.id);
  }, []);
  return (
    <View style={styles.container}>
      <Image
        style={styles.foodImage}
        source={{
          uri: item.image
        }}
      />
      <View style={styles.cartInfo}>
        <View style={styles.cartInfoHeader}>
          <View style={styles.cartInfoHeaderName}>
            <FText numberOfLines={1} fontSize={18} lineHeight={18}>
              {item.name}
            </FText>
            <Padding paddingTop={8} />
            <FText numberOfLines={1} color={Colors.grey_suit} fontSize={14} lineHeight={14}>
              {item.options.map(x => x.name).join(',')}
            </FText>
          </View>
          <TouchableOpacity onPress={onRemoveCartItem} style={styles.btnRemove}>
            <Image style={styles.removeIcon} source={require('../assets/images/close.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.cartInfoPrice}>
          <FText fontSize={16} color={Colors.primary} lineHeight={16}>
            ${item.price}
          </FText>
          <AmountInput allowZero onChangeValue={onChangeAmount} value={item.amount} size={28} />
        </View>
      </View>
    </View>
  );
});

export default CartItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: setYAxisValue(25.7)
  },
  foodImage: {
    height: setValue(82),
    width: setValue(82),
    borderRadius: setValue(10),
    marginRight: setXAxisValue(21)
  },
  cartInfo: {
    flex: 1
  },
  cartInfoHeader: {
    flexDirection: 'row',
    paddingBottom: setYAxisValue(13)
  },
  cartInfoHeaderName: {
    flex: 1,
    paddingRight: setXAxisValue(10)
  },
  removeIcon: {
    width: setValue(22),
    height: setValue(22)
  },
  cartInfoPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
