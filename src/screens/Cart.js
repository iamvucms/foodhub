import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ButtonIcon, CartItem, CartSummary, Container, FText, Header, Padding } from '../components';
import { setValue, setXAxisValue, setYAxisValue } from '../utils';
import { Colors } from '../constants/colors';
import { useStore } from '../stores';
import { observer } from 'mobx-react-lite';
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
  return (
    <Container>
      <Header title="Cart" />
      <View style={styles.cartContainer}>
        <CartList renderListHeader={renderListHeader} renderListFooter={renderListFooter} />
      </View>
      <ButtonIcon text="CHECK OUT" />
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
