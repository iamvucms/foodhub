import { Observer, observer } from 'mobx-react-lite';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Animated, { FadeOutDown } from 'react-native-reanimated';
import { ButtonIcon, CartItem, CartSummary, Container, FText, Header, Padding } from '../components';
import { navigation } from '../navigation/navigationRef';
import { cartStore, useStore } from '../stores';
import { setXAxisValue, setYAxisValue } from '../utils';
const Cart = () => {
  const renderListHeader = React.useCallback(() => {
    return (
      <React.Fragment>
        <FText fontSize={16}>Your Cart:</FText>
        <Padding paddingTop={15} />
      </React.Fragment>
    );
  });
  const renderListFooter = React.useCallback(() => {
    return <CartSummary />;
  }, []);
  const onCheckoutPress = React.useCallback(() => {
    navigation.navigate('Checkout');
  }, []);
  return (
    <Container disableLast>
      <Header title="Cart" />
      <View style={styles.cartContainer}>
        <CartList renderListHeader={renderListHeader} renderListFooter={renderListFooter} />
      </View>
      <Observer>
        {() => (
          <React.Fragment>
            {cartStore.cartItemsTotalAmount > 0 && (
              <Animated.View exiting={FadeOutDown}>
                <Padding paddingTop={10} />
                <ButtonIcon onPress={onCheckoutPress} text="CHECK OUT" />
                <Padding paddingTop={10} />
              </Animated.View>
            )}
          </React.Fragment>
        )}
      </Observer>
    </Container>
  );
};

export default Cart;
const CartList = observer(({ renderListFooter, renderListHeader }) => {
  const cartStore = useStore('cart');
  const cartItems = cartStore.cartItems.slice();
  const renderCartItem = React.useCallback(({ item }) => {
    return <CartItem item={item} />;
  }, []);
  const cartKeyExtractor = React.useCallback(item => `${item.id}`, []);
  return (
    <FlatList
      ListHeaderComponent={renderListHeader}
      data={cartItems}
      renderItem={renderCartItem}
      keyExtractor={cartKeyExtractor}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={renderListFooter}
    />
  );
});
const styles = StyleSheet.create({
  cartContainer: {
    flex: 1,
    paddingTop: setYAxisValue(30),
    paddingHorizontal: setXAxisValue(26)
  }
});
