import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { CartItem, CartSummary, ConfirmModal, Container, FText, Header, Padding } from '../components';
import { navigation } from '../navigation/navigationRef';
import { ChevronRightSvg, GpsSvg, IncrementSvg } from '../assets/svg';
import { Colors } from '../constants/colors';
import { setValue, setXAxisValue, setYAxisValue, toCorrectImageUri } from '../utils';
import { cartStore, homeStore, orderStore, userStore } from '../stores';
import { Observer, useLocalObservable } from 'mobx-react-lite';
import { HomeActions } from '../actions';
import { orderProgresses, OrderStatus, OrderStatusCode, OrderStatusColor, PaymentMethods } from '../constants/data';
import orderActions from '../actions/orderActions';
import { Layout } from '../constants';
const SUGGEST_ITEM_WIDTH = setValue(250) + setXAxisValue(10);
const OrderDetail = ({ navigation, route }) => {
  const { data, isFromOrderManagement = false } = route.params;
  const observableOrder = orderStore.getOrder(data.id);
  const confirmSheetRef = useRef();
  const statusSheetRef = useRef();
  useEffect(() => {
    if (!isFromOrderManagement) {
      const categoryIds = [];
      const restaurantIds = [];
      const productIds = [];
      for (let item of data.products) {
        if (!categoryIds.includes(item.cat_id)) {
          categoryIds.push(item.cat_id);
        }
        if (!productIds.includes(item.id)) {
          productIds.push(item.id);
        }
        if (!restaurantIds.includes(item.res_id)) {
          restaurantIds.push(item.res_id);
        }
      }
      HomeActions.fetchSuggestProducts({
        categoryIds,
        restaurantIds,
        productIds
      });
    }
  }, []);
  const onBackPress = () => {
    navigation.goBack();
  };

  const renderSuggestItem = React.useCallback(({ item }) => {
    const onPress = () => {
      navigation.navigate('FoodDetail', {
        data: item,
        animated: false
      });
    };
    return (
      <Pressable onPress={onPress} style={styles.suggestItem}>
        <Image source={{ uri: toCorrectImageUri(item.image) }} style={styles.suggestImage} />
        <View style={styles.suggestItemInfor}>
          <FText>{item.name}</FText>
          <View style={styles.suggestItemPrice}>
            <FText style={styles.suggestItemPriceText}>${item.price}</FText>
          </View>
        </View>
      </Pressable>
    );
  }, []);
  const renderProgressItem = progress => (
    <Observer key={progress.status}>
      {() => {
        const isRejectOrCancel = [OrderStatusCode.REJECTED, OrderStatusCode.CANCELLED].includes(observableOrder.status_code);
        const isActive = observableOrder.status_code >= progress.status && !isRejectOrCancel;
        return (
          <View style={styles.progressItem}>
            <FText color={isActive ? Colors.primary : Colors.gray}>{progress.description}</FText>
          </View>
        );
      }}
    </Observer>
  );
  const renderProgressSideItem = (progress, index) => (
    <Observer key={progress.status}>
      {() => {
        const isRejectOrCancel = [OrderStatusCode.REJECTED, OrderStatusCode.CANCELLED].includes(observableOrder.status_code);
        const isActivePoint = observableOrder.status_code >= progress.status && !isRejectOrCancel;
        const isActiveLine = observableOrder.status_code >= progress.status + 1 && !isRejectOrCancel;
        return (
          <React.Fragment>
            <View
              style={[
                styles.sidePoint,
                isActivePoint && {
                  backgroundColor: Colors.primary
                }
              ]}
            />
            {index < orderProgresses.length - 1 && (
              <View
                style={[
                  styles.sideLine,
                  isActiveLine && {
                    backgroundColor: Colors.primary
                  }
                ]}
              />
            )}
          </React.Fragment>
        );
      }}
    </Observer>
  );
  const onCancelOrder = () => {
    confirmSheetRef.current?.snapTo?.(1);
  };
  const onConfirmCancelOrder = () => {
    orderActions.updateOrderStatus({
      statusCode: OrderStatusCode.CANCELLED,
      orderId: data.id
    });
    navigation.goBack();
  };
  const onNextStatusPress = () => {
    statusSheetRef.current?.snapTo?.(1);
  };
  const onConfirmNextStatus = () => {
    if (observableOrder.status_code < OrderStatusCode.DELIVERED) {
      orderActions.updateOrderStatus({
        statusCode: observableOrder.status_code + 1,
        orderId: data.id
      });
    }
  };
  return (
    <Container>
      <Header title="Order Detail" onLeftPress={onBackPress} />
      <ScrollView style={styles.container}>
        <View style={styles.progressContainer}>
          <View
            style={[
              styles.progressSideBar,
              {
                height: setValue(44) * (orderProgresses.length - 1) + setValue(10)
              }
            ]}>
            {orderProgresses.map(renderProgressSideItem)}
          </View>
          <View
            style={[
              styles.progressContent,
              {
                height: setValue(44) * (orderProgresses.length - 1) + setValue(10)
              }
            ]}>
            {orderProgresses.map(renderProgressItem)}
          </View>
        </View>
        <View style={styles.addressContainer}>
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
        </View>
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
          <View style={styles.order}>
            {isFromOrderManagement ? (
              <View style={styles.customerInfor}></View>
            ) : (
              <View style={styles.restaurantInfor}>
                <Image style={styles.restaurantIcon} source={require('../assets/images/shop.png')} />
                <FText color={Colors.smoky}>{data.restaurant_name}</FText>
              </View>
            )}
            {data.products.map(product => (
              <View style={styles.productItem}>
                <Image
                  style={styles.productImage}
                  source={{
                    uri: toCorrectImageUri(product.image)
                  }}
                />
                <View style={styles.productInfor}>
                  <FText>{product.quantity} x</FText>
                  <View style={styles.productName}>
                    <FText numberOfLines={2}>
                      {product.name} + {product.addons.length > 0 ? `(${product.addons.length} addons)` : ''}
                    </FText>
                  </View>
                  <FText color={Colors.smoky}>${product.unit_price}</FText>
                </View>
              </View>
            ))}
          </View>
          <View style={styles.separate} />
        </View>

        <Padding paddingHorizontal={20}>
          <View>
            <View style={styles.footerLine}>
              <FText fontSize={16} lineHeight={16}>
                Subtotal
              </FText>
              <FText fontSize={19} lineHeight={19}>
                ${(data.total_price - cartStore.tax * (data.total_price - cartStore.fee) - cartStore.fee).toFixed(2)}
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
                ${(cartStore.tax * (data.total_price - cartStore.fee) + cartStore.fee).toFixed(2)}
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
                ${data.delivery_fee}
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
                ${data.total_price}
                <FText color={Colors.grey_suit} fontSize={14} lineHeight={19}>
                  {' '}
                  USD
                </FText>
              </FText>
            </View>
          </View>
        </Padding>
        {!isFromOrderManagement && (
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
        )}
      </ScrollView>
      <View style={styles.bottomContainer}>
        <Observer>
          {() =>
            !isFromOrderManagement &&
            observableOrder.status_code === OrderStatusCode.PENDING && (
              <TouchableOpacity
                onPress={onCancelOrder}
                style={[
                  styles.btnConfirm,
                  {
                    backgroundColor: Colors.white,
                    borderColor: Colors.primary,
                    borderWidth: 1,
                    marginBottom: 10
                  }
                ]}>
                <FText color={Colors.primary}>Cancel Order</FText>
              </TouchableOpacity>
            )
          }
        </Observer>
        <Observer>
          {() =>
            isFromOrderManagement &&
            observableOrder.status_code < OrderStatusCode.DELIVERED && (
              <TouchableOpacity
                onPress={onNextStatusPress}
                style={[
                  styles.btnConfirm,
                  {
                    backgroundColor: Colors.white,
                    borderColor: Colors.primary,
                    borderWidth: 1,
                    marginBottom: 10
                  }
                ]}>
                <Observer>
                  {() => {
                    console.log(observableOrder);
                    const statusKey = observableOrder.status_code;
                    return (
                      <FText color={Colors.primary}>
                        Next status:{' '}
                        <FText color={OrderStatusColor[Object.keys(OrderStatusCode)[statusKey]]}>
                          {Object.keys(OrderStatusCode)[statusKey]}
                        </FText>
                      </FText>
                    );
                  }}
                </Observer>
              </TouchableOpacity>
            )
          }
        </Observer>
        <TouchableOpacity onPress={onBackPress} style={styles.btnConfirm}>
          <FText color={Colors.white}>Go Back</FText>
        </TouchableOpacity>
      </View>
      <ConfirmModal ref={confirmSheetRef} onConfirm={onConfirmCancelOrder} title="Are you sure you want to cancel this order?" />
      <ConfirmModal ref={statusSheetRef} onConfirm={onConfirmNextStatus} title="Are you sure you want to update status of this order?" />
    </Container>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  addressContainer: {
    paddingHorizontal: setXAxisValue(20),
    paddingTop: setYAxisValue(10),
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
    height: setValue(44),
    width: setValue(44),
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
  },
  progressContainer: {
    paddingTop: setYAxisValue(20),
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: setXAxisValue(26),
    paddingBottom: setYAxisValue(20),
    borderBottomColor: Colors.border,
    borderBottomWidth: 1
  },
  progressContent: {
    justifyContent: 'space-between'
  },
  progressItem: {
    justifyContent: 'center'
  },
  progressSideBar: {
    width: setValue(44),
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  sidePoint: {
    width: setValue(10),
    height: setValue(10),
    borderRadius: setValue(5),
    backgroundColor: Colors.gray
  },
  sideLine: {
    width: setValue(2),
    height: setValue(20),
    backgroundColor: Colors.gray,
    zIndex: -1
  },
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
