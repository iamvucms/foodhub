import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { setValue, setXAxisValue, setYAxisValue } from '../utils';
import { Colors } from '../constants/colors';
import FText from './FText';
import Padding from './Padding';
import { OrderStatusColor, OrderStatusDescription } from '../constants/data';
import dayjs from 'dayjs';
import { Layout } from '../constants';
const OrderCard = ({ item }) => {
  const orderColor = OrderStatusColor[item.status];
  const orderDescription = OrderStatusDescription[item.status];
  const lastUpdateInMins = -dayjs(item.last_update).diff(dayjs(), 'minutes');
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={{ uri: item.restaurant.logo }} />
        </View>
        <View style={styles.orderInfoContainer}>
          <View style={styles.orderInfo}>
            <View>
              <FText color={Colors.grey_suit} fontSize="small">
                {item.items.length} Items
              </FText>
            </View>
            <FText color={Colors.primary} lineHeight={16}>
              #{item.id}
            </FText>
          </View>
          <Padding paddingVertical={10}>
            <FText fontWeight={600}>{item.restaurant.name}</FText>
          </Padding>
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
              {item.status}
            </FText>
          </View>
        </View>
      </View>
      <View style={styles.timing}>
        <View>
          <FText color={Colors.grey_suit} fontSize="small">
            Estimated Arrival
          </FText>
          <View style={styles.estimateTime}>
            <FText fontSize="h2" fontWeight={700} lineHeight={40}>
              25
            </FText>
            <FText fontSize={15}>mins</FText>
          </View>
        </View>
        <View style={styles.orderDescription}>
          <FText color={Colors.grey_suit} fontSize="small">
            {lastUpdateInMins > 0 ? `${lastUpdateInMins} minutes` : 'Just now'}
          </FText>
          <Padding paddingTop={11} />
          <FText fontSize={14}>{orderDescription}</FText>
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.btnAction}>
          <FText fontSize={15}>Cancel</FText>
        </TouchableOpacity>
        <TouchableOpacity
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
  }
});
