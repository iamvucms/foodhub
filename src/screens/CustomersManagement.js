import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { Container, FText, Header, Padding } from '../components';
import userActions from '../actions/userActions';
import { userStore } from '../stores';
import { setValue, setXAxisValue, setYAxisValue } from '../utils';
import { Colors } from '../constants/colors';

const ProductsManagement = ({ navigation }) => {
  useEffect(() => {
    userActions.fetchRestaurantCustomers();
  }, []);
  const onBackPress = React.useCallback(() => {
    navigation.goBack();
  }, []);
  const renderCustomerItem = React.useCallback(({ item, index }) => {
    return (
      <View style={styles.customerItem}>
        <View style={styles.customerItemCol}>
          <View style={styles.noContainer}>
            <FText fontSize="h6" color={index <= 2 ? Colors.primary : Colors.typography} fontWeight={700}>
              {index + 1}
            </FText>
          </View>
          <Image
            style={styles.avatar}
            source={{
              uri: item.avatar
            }}
          />
          <View>
            <FText fontWeight={700}>{item.name}</FText>
            <Padding paddingTop={4} />
            <FText fontSize={12} color={Colors.typography_60}>
              {item.total_orders} order{item.total_orders > 1 ? 's' : ''}
            </FText>
          </View>
        </View>
        <View style={styles.customerItemCol}>
          <View style={styles.customerItemColPart}>
            <FText color={Colors.primary} fontWeight={700}>
              ${item.total_spent}
            </FText>
            <Padding paddingTop={4} />
            <FText fontSize={12} color={Colors.typography_60}>
              Total spent
            </FText>
          </View>
          <View style={styles.customerItemColPart}>
            <FText color={Colors.success} fontWeight={700}>
              {item.total_completed}
            </FText>
            <Padding paddingTop={4} />
            <FText fontSize={12} color={Colors.typography_60}>
              Total completed
            </FText>
          </View>
        </View>
      </View>
    );
  }, []);
  return (
    <Container>
      <Header title="Manage Customers" onLeftPress={onBackPress} />
      <View style={styles.container}>
        <FlatList data={userStore.restaurantCustomers.slice()} renderItem={renderCustomerItem} keyExtractor={item => `${item.id}`} />
      </View>
    </Container>
  );
};

export default ProductsManagement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: setYAxisValue(20)
  },
  customerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: setXAxisValue(20),
    paddingVertical: setYAxisValue(10)
  },
  customerItemCol: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  noContainer: {
    justifyContent: 'center',
    width: setXAxisValue(30)
  },
  avatar: {
    height: setValue(50),
    width: setValue(50),
    borderRadius: setValue(5),
    marginRight: setXAxisValue(10)
  },
  customerItemColPart: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: setXAxisValue(15)
  }
});
