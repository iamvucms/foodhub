import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import FText from './FText';
import { Colors } from '../constants/colors';
import { setValue, setYAxisValue } from '../utils';
import { observer } from 'mobx-react-lite';
import { cartStore } from '../stores';
import { Layout } from '../constants';
import Animated, { FadeInDown } from 'react-native-reanimated';

const CartSummary = observer(() => {
  const isEmpty = cartStore.cartItems.length === 0;
  if (isEmpty) {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.emptyCartContainer}>
          <Animated.View entering={FadeInDown}>
            <Image style={styles.emptyCart} source={require('../assets/images/empty-cart.png')} />
          </Animated.View>
          <FText fontSize={14} color={Colors.aslo_gray}>
            Your cart is now empty
          </FText>
        </View>
      </View>
    );
  }

  return (
    <View>
      <View style={styles.footerLine}>
        <FText fontSize={16} lineHeight={16}>
          Subtotal
        </FText>
        <FText fontSize={19} lineHeight={19}>
          ${cartStore.subTotal}
          <FText color={Colors.grey_suit} fontSize={14} lineHeight={19}>
            {' '}
            USD
          </FText>
        </FText>
      </View>
      <View style={styles.footerLine}>
        <FText fontSize={16} lineHeight={16}>
          Tax and Fees ({cartStore.tax * 100}% + {cartStore.fee}$)
        </FText>
        <FText fontSize={19} lineHeight={19}>
          ${cartStore.taxAndFee}
          <FText color={Colors.grey_suit} fontSize={14} lineHeight={19}>
            {' '}
            USD
          </FText>
        </FText>
      </View>
      <View style={styles.footerLine}>
        <FText fontSize={16} lineHeight={16}>
          Delivery
        </FText>
        <FText fontSize={19} lineHeight={19}>
          ${cartStore.deliveryFee}
          <FText color={Colors.grey_suit} fontSize={14} lineHeight={19}>
            {' '}
            USD
          </FText>
        </FText>
      </View>
      <View style={styles.footerLine}>
        <FText fontSize={16} lineHeight={16}>
          Total
        </FText>
        <FText fontSize={19} lineHeight={19}>
          ${cartStore.total}
          <FText color={Colors.grey_suit} fontSize={14} lineHeight={19}>
            {' '}
            USD
          </FText>
        </FText>
      </View>
    </View>
  );
});

export default CartSummary;

const styles = StyleSheet.create({
  footerLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: setYAxisValue(17),
    borderBottomColor: Colors.border,
    borderBottomWidth: setValue(1)
  },
  deliveryInfo: {
    paddingVertical: setYAxisValue(17)
  },
  emptyCartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Layout.window.height / 2
  },
  emptyCart: {
    marginBottom: setYAxisValue(15),
    width: setValue(80),
    height: setValue(80)
  }
});
