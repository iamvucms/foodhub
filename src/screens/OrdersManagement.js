import { FlatList, Image, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { ConfirmModal, Container, FText, Header, Padding } from '../components';
import { Observer, useLocalObservable } from 'mobx-react-lite';
import userActions from '../actions/userActions';
import { userStore } from '../stores';
import { getDiffTimeString, setValue, setXAxisValue, setYAxisValue, toCorrectImageUri } from '../utils';
import { Layout } from '../constants';
import { Colors } from '../constants/colors';
import { OrderStatusCode, OrderStatusColor } from '../constants/data';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import orderActions from '../actions/orderActions';
import { toJS } from 'mobx';

const ProductsManagement = ({ navigation }) => {
  const rejectModalRef = React.useRef();
  const confirmModalRef = React.useRef();
  const { bottom } = useSafeAreaInsets();
  const state = useLocalObservable(() => ({
    selectedOrderId: null,
    setSelectedOrderId: id => {
      state.selectedOrderId = id;
    }
  }));
  useEffect(() => {
    userActions.fetchRestaurantOrders();
  }, []);
  const onBackPress = React.useCallback(() => {
    navigation.goBack();
  }, []);
  const onConfirmOrder = React.useCallback(() => {
    confirmModalRef.current.snapTo(0);
    orderActions.updateOrderStatus({
      statusCode: OrderStatusCode.CONFIRMED,
      orderId: state.selectedOrderId
    });
    state.setSelectedOrderId(null);
  }, []);
  const onRejectOrder = React.useCallback(() => {
    rejectModalRef.current.snapTo(0);
    orderActions.updateOrderStatus({
      statusCode: OrderStatusCode.REJECTED,
      orderId: state.selectedOrderId
    });
    state.setSelectedOrderId(null);
  }, []);
  const renderListHeader = React.useCallback(
    () => (
      <Observer>
        {() => {
          const completedOrders = userStore.restaurantOrders.filter(x => x.status_code === OrderStatusCode.DELIVERED);
          const totalIncome = completedOrders.reduce((acc, order) => acc + order.total_price, 0);
          const totalOrders = userStore.restaurantOrders.length;
          const totalCompleted = completedOrders.length;
          const totalPending = userStore.restaurantOrders.filter(x => x.status_code === OrderStatusCode.PENDING).length;
          return (
            <View style={styles.listHeaderContainer}>
              <View style={styles.infoBox}>
                <FText fontSize="large" fontWeight={700} color={Colors.white}>
                  ${totalIncome.toFixed(2)}
                </FText>
                <Padding paddingTop={10} />
                <FText fontSize={14} color={Colors.white}>
                  Total income
                </FText>
              </View>
              <View
                style={[
                  styles.infoBox,
                  {
                    backgroundColor: Colors.typography
                  }
                ]}>
                <FText fontSize="large" fontWeight={700} color={Colors.white}>
                  {totalOrders}
                </FText>
                <Padding paddingTop={10} />
                <FText fontSize={14} color={Colors.white}>
                  Total orders
                </FText>
              </View>
              <View
                style={[
                  styles.infoBox,
                  {
                    backgroundColor: Colors.success
                  }
                ]}>
                <FText fontSize="large" fontWeight={700} color={Colors.white}>
                  {totalCompleted}
                </FText>
                <Padding paddingTop={10} />
                <FText fontSize={14} color={Colors.white}>
                  Total completed
                </FText>
              </View>
              <View
                style={[
                  styles.infoBox,
                  {
                    backgroundColor: OrderStatusColor.PENDING
                  }
                ]}>
                <FText fontSize="large" fontWeight={700} color={Colors.white}>
                  {totalPending}
                </FText>
                <Padding paddingTop={10} />
                <FText fontSize={14} color={Colors.white}>
                  Total pending
                </FText>
              </View>
            </View>
          );
        }}
      </Observer>
    ),
    []
  );
  const renderOrderItem = React.useCallback(({ item }) => {
    const address = JSON.parse(item.address_text);
    const totalQuantity = item.products.reduce((acc, item) => acc + item.quantity, 0);
    const diffTime = getDiffTimeString(item.created_at);

    const onConfirmPress = () => {
      state.setSelectedOrderId(item.id);
      confirmModalRef.current.snapTo(1);
    };
    const onRejectPress = () => {
      state.setSelectedOrderId(item.id);
      rejectModalRef.current.snapTo(1);
    };
    const onViewOrderPress = () => {
      navigation.navigate('OrderDetail', { data: toJS(item), isFromOrderManagement: true });
    };
    return (
      <Pressable onPress={onViewOrderPress} style={styles.orderItem}>
        <View style={styles.orderHeader}>
          <View style={styles.orderHeaderCol}>
            <FText fontSize={14}>Products</FText>
            <Padding paddingTop={5} />
            <FText fontSize={14} fontWeight={700} color={Colors.primary}>
              {item.products.length}
            </FText>
          </View>
          <View style={styles.orderHeaderCol}>
            <FText fontSize={14}>Quantity</FText>
            <Padding paddingTop={5} />
            <FText fontSize={14} fontWeight={700} color={Colors.primary}>
              {totalQuantity}
            </FText>
          </View>
          <View style={styles.orderHeaderCol}>
            <FText fontSize={14}>Total</FText>
            <Padding paddingTop={5} />
            <FText fontSize={14} fontWeight={700} color={Colors.primary}>
              ${item.total_price.toFixed(2)}
            </FText>
          </View>
          <View style={styles.orderHeaderCol}>
            <FText fontSize={14} fontWeight={700}>
              {diffTime.dateString} {diffTime.postfix}
            </FText>
          </View>
        </View>
        <View style={styles.products}>
          {item.products.map(product => (
            <View key={product.id} style={styles.orderProduct}>
              <View style={styles.orderProductCol}>
                <Image
                  source={{
                    uri: toCorrectImageUri(product.image)
                  }}
                  style={styles.productImage}
                />
                <FText>{product.name}</FText>
              </View>
              <FText>
                {product.quantity} x ${product.unit_price.toFixed(2)}
              </FText>
            </View>
          ))}
        </View>
        <Padding>
          <Observer>
            {() => {
              const statusKey = Object.keys(OrderStatusCode)[item.status_code - 1];
              return (
                <FText>
                  Status:{' '}
                  <FText fontWeight={700} color={OrderStatusColor[statusKey]}>
                    {statusKey}
                  </FText>
                </FText>
              );
            }}
          </Observer>
        </Padding>
        <Padding paddingTop={10}>
          <FText fontSize={12}>Delivery to: </FText>
          <Padding paddingTop={3} />
          <FText fontSize={14}>
            {address.name}, {address.phone_number}
          </FText>
          <FText fontSize={14}>
            {address.street},{address.district} {address.province}
          </FText>
        </Padding>
        <View style={styles.orderActions}>
          <Observer>
            {() =>
              item.status_code === OrderStatusCode.PENDING && (
                <React.Fragment>
                  <TouchableOpacity
                    onPress={onRejectPress}
                    style={[
                      styles.btnAction,
                      {
                        backgroundColor: Colors.danger
                      }
                    ]}>
                    <FText color={Colors.white}>Reject Order</FText>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={onConfirmPress} style={styles.btnAction}>
                    <FText color={Colors.white}>Confirm Order</FText>
                  </TouchableOpacity>
                </React.Fragment>
              )
            }
          </Observer>
          <TouchableOpacity
            onPress={onViewOrderPress}
            style={[
              styles.btnAction,
              {
                width: '100%',
                backgroundColor: Colors.primary,
                marginTop: setYAxisValue(20)
              }
            ]}>
            <FText color={Colors.white}>View Order</FText>
          </TouchableOpacity>
        </View>
      </Pressable>
    );
  }, []);
  return (
    <Container disableLast>
      <Header title="Manage Orders" onLeftPress={onBackPress} />
      <View style={styles.container}>
        <Observer>
          {() => (
            <FlatList
              ListHeaderComponent={renderListHeader}
              data={userStore.restaurantOrders.slice()}
              renderItem={renderOrderItem}
              keyExtractor={item => `${item.id}`}
              ListFooterComponent={<Padding paddingBottom={bottom || 20} />}
            />
          )}
        </Observer>
      </View>
      <ConfirmModal
        onConfirm={onRejectOrder}
        ref={rejectModalRef}
        title="Reject Order"
        subTitle="Are you sure you want to reject this order?"
      />
      <ConfirmModal
        onConfirm={onConfirmOrder}
        ref={confirmModalRef}
        title="Confirm Order"
        subTitle="Are you sure you want to confirm this order?"
      />
    </Container>
  );
};

export default ProductsManagement;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listHeaderContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: setYAxisValue(20),
    justifyContent: 'space-evenly'
  },
  infoBox: {
    height: setYAxisValue(100),
    width: (Layout.window.width - setXAxisValue(45)) / 2,
    borderRadius: setValue(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    marginBottom: setYAxisValue(15)
  },
  orderItem: {
    marginHorizontal: setXAxisValue(15),
    backgroundColor: Colors.white,
    padding: setValue(15),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 3,
    borderRadius: setValue(10),
    marginBottom: setYAxisValue(10)
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  orderActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: setYAxisValue(10)
  },
  btnAction: {
    width: '48%',
    height: setYAxisValue(44),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.success,
    borderRadius: setValue(5)
  },
  products: {
    marginTop: setYAxisValue(10)
  },
  orderProduct: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.gray_40,
    borderRadius: setValue(5),
    overflow: 'hidden',
    marginBottom: setYAxisValue(10),
    paddingRight: setXAxisValue(10)
  },
  orderProductCol: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  productImage: {
    height: setValue(30),
    width: setValue(30),
    margin: setValue(5),
    borderRadius: setValue(5)
  }
});
