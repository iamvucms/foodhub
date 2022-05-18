import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { CartItem, CartSummary, Container, FText, Header, Padding } from '../components';
import { navigation } from '../navigation/navigationRef';
import { ChevronRightSvg, GpsSvg, IncrementSvg } from '../assets/svg';
import { Colors } from '../constants/colors';
import { setValue, setXAxisValue, setYAxisValue } from '../utils';
import { cartStore, homeStore, userStore } from '../stores';
import { Observer, useLocalObservable } from 'mobx-react-lite';
import { HomeActions } from '../actions';
import { uid } from 'uid';
import { PaymentMethods } from '../constants/data';
import orderActions from '../actions/orderActions';
import { toJS } from 'mobx';
const SUGGEST_ITEM_WIDTH = setValue(250) + setXAxisValue(10);
const Checkout = () => {
  const state = useLocalObservable(() => ({
    paymentType: PaymentMethods.CASH_ON_DELIVERY,
    setPaymentType: paymentType => {
      state.paymentType = paymentType;
    },
    get isCashPayment() {
      return this.paymentType === PaymentMethods.CASH_ON_DELIVERY;
    },
    get isCardPayment() {
      return this.paymentType === PaymentMethods.CARD;
    }
  }));
  useEffect(() => {
    const orders = cartStore.cartToOrders;
    const categoryIds = [];
    const restaurantIds = [];
    const productIds = [];
    for (let order of orders) {
      for (let item of order.cartItems) {
        if (!categoryIds.includes(item.cat_id)) {
          categoryIds.push(item.cat_id);
        }
        if (!productIds.includes(item.product_id)) {
          productIds.push(item.product_id);
        }
      }

      if (!restaurantIds.includes(order.restaurantId)) {
        restaurantIds.push(order.restaurantId);
      }
    }
    HomeActions.fetchSuggestProducts({
      categoryIds,
      restaurantIds,
      productIds
    });
  }, []);
  const onBackPress = () => {
    navigation.goBack();
  };
  const onAddressPress = () => {
    navigation.navigate('UserAddress');
  };
  const renderSuggestItem = React.useCallback(({ item }) => {
    const onPress = () => {
      cartStore.addCartItem({
        ...item,
        id: uid(),
        product_id: item.id,
        amount: 1,
        options: [] // remove reference
      });
    };
    return (
      <View style={styles.suggestItem}>
        <Image source={{ uri: item.image }} style={styles.suggestImage} />
        <View style={styles.suggestItemInfor}>
          <FText>{item.name}</FText>
          <View style={styles.suggestItemPrice}>
            <FText style={styles.suggestItemPriceText}>${item.price}</FText>
            <TouchableOpacity onPress={onPress} style={styles.btnAddToOrder}>
              <IncrementSvg color={Colors.white} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }, []);
  const renderOrderItem = order => {
    return (
      <React.Fragment key={order.restaurantId}>
        <View style={styles.order}>
          <View style={styles.restaurantInfor}>
            <Image style={styles.restaurantIcon} source={require('../assets/images/shop.png')} />
            <FText color={Colors.smoky}>{order.restaurant.name}</FText>
          </View>
          {order.cartItems.map(product => (
            <View style={styles.productItem}>
              <Image
                style={styles.productImage}
                source={{
                  uri: product.image
                }}
              />
              <View style={styles.productInfor}>
                <FText>{product.amount} x</FText>
                <View style={styles.productName}>
                  <FText numberOfLines={2}>{product.name}</FText>
                </View>
                <FText color={Colors.smoky}>${product.price}</FText>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.separate} />
      </React.Fragment>
    );
  };
  const onConfirmPress = () => {
    orderActions.createOrder({
      address: JSON.stringify(toJS(userStore.mainAddress)),
      products: cartStore.cartItems.map(item => ({
        id: item.product_id,
        quantity: item.amount,
        price: item.price,
        res_id: item.res_id,
        addons: item.options.map(option => ({
          id: option.id,
          quantity: 1,
          price: option.price
        }))
      })),
      paymentMethod: state.paymentType
    });
    navigation.goBack();
    cartStore.emptyCart();
  };
  return (
    <Container>
      <Header title="Confirm Order" onLeftPress={onBackPress} />
      <ScrollView style={styles.container}>
        <Pressable onPress={onAddressPress} style={styles.addressContainer}>
          <View style={styles.addressHeader}>
            <GpsSvg color={Colors.primary} size={18} />
            <Padding paddingLeft={10} />
            <FText>Delivery Address</FText>
          </View>
          <Observer>
            {() => (
              <View style={styles.address}>
                <FText color={Colors.smoky}>
                  {userStore.mainAddress.name} - {userStore.mainAddress.phone_number}
                </FText>
                <Padding paddingTop={5} />
                <FText fontSize="small" color={Colors.smoky}>
                  {userStore.mainAddress.street}, {userStore.mainAddress.district}, {userStore.mainAddress.province}
                </FText>
              </View>
            )}
          </Observer>
          <View style={styles.addressRightIcon}>
            <ChevronRightSvg size={16} color={Colors.smoky} />
          </View>
        </Pressable>
        <View style={styles.addressBar}>
          {new Array(15).fill(0).map((_, index) => {
            const isOdd = index % 2 === 0;
            return (
              <View
                key={index}
                style={[
                  styles.addressBarItem,
                  isOdd && {
                    backgroundColor: Colors.smoky
                  }
                ]}
              />
            );
          })}
        </View>
        <View style={styles.orderInformationContainer}>
          <Observer>{() => cartStore.cartToOrders.map(renderOrderItem)}</Observer>
        </View>
        <View style={styles.suggestProducts}>
          <Padding padding={20}>
            <FText color={Colors.smoky}>Suggested Products</FText>
          </Padding>
          <Observer>
            {() => (
              <FlatList
                snapToInterval={SUGGEST_ITEM_WIDTH}
                decelerationRate="fast"
                data={homeStore.suggestProducts.slice()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={renderSuggestItem}
              />
            )}
          </Observer>
        </View>
        <Padding paddingHorizontal={20}>
          <CartSummary />
        </Padding>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <Observer>
          {() => (
            <View style={styles.paymentMethods}>
              <TouchableOpacity
                onPress={() => state.setPaymentType(PaymentMethods.CARD)}
                style={[
                  styles.btnPaymentMethod,
                  state.isCardPayment && {
                    borderColor: Colors.primary
                  }
                ]}>
                <FText color={state.isCardPayment ? Colors.primary : Colors.aslo_gray}>Visa/Mastercard</FText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => state.setPaymentType(PaymentMethods.CASH_ON_DELIVERY)}
                style={[
                  styles.btnPaymentMethod,
                  state.isCashPayment && {
                    borderColor: Colors.primary
                  }
                ]}>
                <FText color={state.isCashPayment ? Colors.primary : Colors.aslo_gray}>Cash on delivery</FText>
              </TouchableOpacity>
            </View>
          )}
        </Observer>
        <TouchableOpacity onPress={onConfirmPress} style={styles.btnConfirm}>
          <FText color={Colors.white}>Confirm Order - ${cartStore.total}</FText>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  addressContainer: {
    paddingHorizontal: setXAxisValue(20),
    paddingTop: setYAxisValue(26),
    justifyContent: 'center'
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  address: {
    paddingVertical: setYAxisValue(10),
    paddingLeft: setValue(18) + setXAxisValue(10),
    paddingRight: setXAxisValue(10)
  },
  addressRightIcon: {
    position: 'absolute',
    right: setXAxisValue(20)
  },
  addressBar: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  addressBarItem: {
    height: setYAxisValue(5),
    width: setXAxisValue(25),
    backgroundColor: Colors.primary,
    marginHorizontal: setXAxisValue(5)
  },
  orderInformationContainer: {
    marginTop: setYAxisValue(20)
  },
  order: {
    paddingHorizontal: setXAxisValue(20)
  },
  productItem: {
    marginBottom: setYAxisValue(15),
    flexDirection: 'row',
    alignItems: 'center'
  },
  productImage: {
    height: setValue(36),
    width: setValue(36),
    borderRadius: setValue(5)
  },
  productInfor: {
    flexDirection: 'row',
    flex: 1,
    paddingLeft: setXAxisValue(10)
  },
  productName: {
    flex: 1,
    paddingLeft: setXAxisValue(5)
  },
  restaurantInfor: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: setYAxisValue(10),
    borderBottomColor: Colors.app_background,
    borderBottomWidth: 0.5,
    marginBottom: setYAxisValue(15)
  },
  restaurantIcon: {
    height: setValue(20),
    width: setValue(20),
    marginRight: setXAxisValue(7)
  },
  separate: {
    height: setYAxisValue(10),
    backgroundColor: Colors.app_background
  },
  suggestProducts: {
    backgroundColor: Colors.app_background,
    paddingVertical: setYAxisValue(10),
    marginTop: setYAxisValue(20)
  },
  suggestItem: {
    height: setValue(100),
    width: setValue(250),
    backgroundColor: Colors.white,
    marginRight: setXAxisValue(10),
    flexDirection: 'row'
  },
  suggestImage: {
    height: '100%',
    aspectRatio: 1
  },
  suggestItemInfor: {
    padding: setValue(15),
    justifyContent: 'space-between',
    flex: 1
  },
  suggestItemPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  btnAddToOrder: {
    height: setValue(30),
    width: setValue(30),
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: setValue(3)
  },
  bottomContainer: {
    paddingTop: setYAxisValue(15)
  },
  paymentMethods: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: setXAxisValue(15),
    marginBottom: setYAxisValue(15)
  },
  btnPaymentMethod: {
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.aslo_gray,
    borderWidth: 1,
    height: setYAxisValue(50),
    borderRadius: setValue(3)
  },
  btnConfirm: {
    height: setYAxisValue(44),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    marginHorizontal: setXAxisValue(15),
    borderRadius: setValue(3)
  }
});
