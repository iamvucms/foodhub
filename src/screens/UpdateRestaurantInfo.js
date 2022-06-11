import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ButtonIcon, Container, FInput, Header } from '../components';
import { Observer, useLocalObservable } from 'mobx-react-lite';
import { setXAxisValue, setYAxisValue } from '../utils';
import { userStore } from '../stores';
import { UserActions } from '../actions';

const ProductsManagement = ({ navigation }) => {
  const state = useLocalObservable(() => ({
    name: userStore.restaurant.name,
    address: userStore.restaurant.address,
    deliveryFee: userStore.restaurant.delivery_fee,
    setName: e => (state.name = e),
    setAddress: e => (state.address = e),
    setDeliveryFee: e => (state.deliveryFee = e),
    get isAllValid() {
      return !!this.name.trim() && !!this.address.trim() && !isNaN(this.deliveryFee);
    }
  }));
  const onBackPress = React.useCallback(() => {
    navigation.goBack();
  }, []);
  const onSavePress = React.useCallback(() => {
    UserActions.updateRestaurant({
      name: state.name,
      address: state.address,
      delivery_fee: state.deliveryFee
    });
    onBackPress();
  }, []);
  return (
    <Container>
      <Header title="Restaurant Information" onLeftPress={onBackPress} />
      <ScrollView style={styles.container}>
        <Observer>
          {() => (
            <FInput
              value={state.name}
              onChangeText={txt => state.setName(txt)}
              containerStyle={styles.inputContainer}
              title="Restaurant Name"
              placeholder="Enter restaurant name"
            />
          )}
        </Observer>
        <Observer>
          {() => (
            <FInput
              value={state.address}
              onChangeText={txt => state.setAddress(txt)}
              containerStyle={styles.inputContainer}
              title="Restaurant Address"
              placeholder="Enter restaurant address"
            />
          )}
        </Observer>
        <Observer>
          {() => (
            <FInput
              keyboardType="numeric"
              value={`${state.deliveryFee}`}
              onChangeText={txt => state.setDeliveryFee(txt)}
              containerStyle={styles.inputContainer}
              title="Delivery Fee (per order)"
              placeholder="Enter delivery fee"
            />
          )}
        </Observer>
      </ScrollView>
      <ButtonIcon onPress={onSavePress} text="Save" />
    </Container>
  );
};

export default ProductsManagement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: setYAxisValue(20),
    paddingHorizontal: setXAxisValue(26)
  },
  inputContainer: {
    marginBottom: setYAxisValue(20)
  }
});
