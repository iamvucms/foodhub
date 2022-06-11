import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useRef } from 'react';
import { getDiffTimeString, setValue, setXAxisValue, setYAxisValue } from '../utils';
import { Colors } from '../constants/colors';
import FText from './FText';
import Padding from './Padding';
import { OrderStatus, OrderStatusCode, OrderStatusColor, OrderStatusDescription } from '../constants/data';
import { Layout } from '../constants';
import { Observer } from 'mobx-react-lite';
import ConfirmModal from './ConfirmModal';
import orderActions from '../actions/orderActions';
import { navigationRef } from '../navigation/navigationRef';
import { toJS } from 'mobx';
import { uid } from 'uid';
import { cartStore } from '../stores';
import { useNavigation } from '@react-navigation/native';
const OrderCard = ({ item }) => {
  const navigation = useNavigation();
  const bottomSheetRef = useRef();

  const onCancelPress = () => {
    bottomSheetRef.current?.snapTo?.(1);
  };
  const onConfirmCancelOrder = () => {
    bottomSheetRef.current?.snapTo?.(0);
    orderActions.updateOrderStatus({
      statusCode: OrderStatusCode.CANCELLED,
      orderId: item.id
    });
  };
  const onHideModal = () => {
    bottomSheetRef.current?.snapTo?.(0);
  };
  const onReorderPress = () => {
    const products = toJS(item.products).map(product => ({
      ...toJS(product),
      id: uid(),
      product_id: product.id,
      amount: product.quantity,
      price: product.unit_price,
      options: product.addons.slice().map(addon => ({
        ...addon,
        price: addon.addon_unit_price
      }))
    }));
    cartStore.addCartItems(products);
    navigationRef.navigate('Cart');
  };
  const onDetailPress = () => {
    navigation.navigate('OrderDetail', {
      data: item
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={{ uri: item.restaurant_logo }} />
        </View>
        <View style={styles.orderInfoContainer}>
          <View style={styles.orderInfo}>
            <View>
              <FText color={Colors.grey_suit} fontSize="small">
                {item.products.length} item{item.products.length > 1 ? 's' : ''}
              </FText>
            </View>
            <FText color={Colors.primary} lineHeight={16}>
              #{item.id}
            </FText>
          </View>
          <Padding paddingVertical={10}>
            <FText fontWeight={600}>{item.restaurant_name}</FText>
          </Padding>
          <Observer>
            {() => {
              const orderColor = Object.values(OrderStatusColor)[item.status_code - 1];
              return (
                <View style={styles.status}>
                  <View
                    style={[
                      styles.statusPoint,
                      {
                        backgroundColor: orderColor
                      }
                    ]}
                  />
                  <FText color={orderColor} lineHeight={15} fontSize="small">
                    {' '}
                    {Object.values(OrderStatus)[item.status_code - 1]}
                  </FText>
                </View>
              );
            }}
          </Observer>
        </View>
      </View>
      <View style={styles.timing}>
        <View>
          <FText color={Colors.grey_suit} fontSize="small">
            Last Updated
          </FText>
          <View style={styles.estimateTime}>
            <Observer>
              {() => {
                const { dateString, type } = getDiffTimeString(item.updated_at);
                return (
                  <React.Fragment>
                    <FText fontSize="h2" fontWeight={700} lineHeight={40}>
                      {` ${dateString} `}
                    </FText>
                    {type !== 'date' && <FText fontSize={15}>{type}</FText>}
                  </React.Fragment>
                );
              }}
            </Observer>
          </View>
        </View>
        <View style={styles.orderDescription}>
          <Observer>
            {() => {
              const orderDescription = Object.values(OrderStatusDescription)[item.status_code - 1];
              const { dateString, postfix } = getDiffTimeString(item.created_at);
              return (
                <React.Fragment>
                  <FText color={Colors.grey_suit} fontSize="small">
                    {`${dateString} ${postfix}`}
                  </FText>
                  <Padding paddingTop={11} />
                  <FText fontSize={14} color={Colors.gray}>
                    {orderDescription}
                  </FText>
                </React.Fragment>
              );
            }}
          </Observer>
        </View>
      </View>
      <View style={styles.orderProducts}>
        <Observer>
          {() =>
            item.products.slice(0, 1).map(product => (
              <View key={product.id} style={styles.orderProductItem}>
                <Image
                  style={styles.productImage}
                  source={{
                    uri: product.image
                  }}
                />
                <Padding paddingLeft={10} />
                <View style={{ flex: 1 }}>
                  <View style={styles.productInforHeader}>
                    <FText numberOfLines={1} fontSize="small">
                      {product.name} x {product.quantity}
                    </FText>
                    <FText numberOfLines={1} fontSize="small" color={Colors.aslo_gray}>
                      ${product.unit_price}
                    </FText>
                  </View>
                  <FText fontSize="small" color={Colors.aslo_gray}>
                    +{product.addons.length} addon{product.addons.length > 0 ? 's' : ''} ($
                    {product.addons.reduce((acc, cur) => acc + cur.addon_unit_price * cur.addon_quantity, 0)})
                  </FText>
                </View>
              </View>
            ))
          }
        </Observer>
        <View style={styles.orderPrice}>
          <FText>Total: </FText>
          <FText>{`$${item.total_price}`}</FText>
        </View>
      </View>
      <View style={styles.actions}>
        {item.status_code === OrderStatusCode.PENDING && (
          <TouchableOpacity onPress={onCancelPress} style={styles.btnAction}>
            <FText fontSize={15}>Cancel</FText>
          </TouchableOpacity>
        )}
        {[OrderStatusCode.CANCELLED, OrderStatusCode.REJECTED, OrderStatusCode.DELIVERED].includes(item.status_code) && (
          <TouchableOpacity onPress={onReorderPress} style={styles.btnAction}>
            <FText fontSize={15}>Re order</FText>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={onDetailPress}
          style={[
            styles.btnAction,
            {
              backgroundColor: Colors.primary
            }
          ]}>
          <FText fontSize={15} color={Colors.white}>
            Detail
          </FText>
        </TouchableOpacity>
      </View>
      <ConfirmModal
        ref={bottomSheetRef}
        onConfirm={onConfirmCancelOrder}
        onCancel={onHideModal}
        title="Are you sure you want to cancel this order?"
      />
    </View>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  container: {
    padding: setValue(18),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: Colors.white,
    marginHorizontal: setXAxisValue(26),
    marginBottom: setYAxisValue(20),
    borderRadius: setValue(18)
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  logoContainer: {
    borderRadius: setValue(11),
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: Colors.white,
    width: setValue(65),
    height: setValue(65),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: setXAxisValue(18)
  },
  logo: {
    width: '75%',
    aspectRatio: 1,
    borderRadius: setValue(11)
  },
  statusPoint: {
    width: setValue(7),
    height: setValue(7),
    borderRadius: setValue(7 / 2)
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  orderInfoContainer: {
    flex: 1
  },
  orderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  timing: {
    paddingTop: setYAxisValue(21),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  estimateTime: {
    flexDirection: 'row',
    marginTop: setYAxisValue(11)
  },
  orderDescription: {
    alignItems: 'flex-end'
  },
  actions: {
    marginTop: setYAxisValue(24),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  btnAction: {
    height: setYAxisValue(43),
    width: (Layout.window.width - setXAxisValue(108)) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    shadowColor: '#000',
    borderRadius: 99,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,

    elevation: 5
  },
  orderProductItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: setYAxisValue(10),
    borderBottomColor: 'rgba(0,0,0,0.05)',
    borderBottomWidth: 0.5
  },
  productImage: {
    height: setValue(30),
    width: setValue(30),
    borderRadius: setValue(5)
  },
  productInforHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: setYAxisValue(2)
  },
  orderPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: setYAxisValue(15)
  }
});
