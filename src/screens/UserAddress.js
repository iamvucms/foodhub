import { FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Container, FText, Header, Padding } from '../components';
import { userStore } from '../stores';
import { Observer } from 'mobx-react-lite';
import { setValue, setXAxisValue, setYAxisValue } from '../utils';
import { Colors } from '../constants/colors';
import Animated, { BounceIn } from 'react-native-reanimated';
import { UserActions } from '../actions';
const UserAddress = ({ navigation }) => {
  const address = userStore.addresses.slice();
  const onBackPress = () => navigation.goBack();
  const renderAddressItem = ({ item }) => (
    <Observer>
      {() => {
        const selected = item.selected;
        const onPress = () => UserActions.markAddressAsMain({ address: item });
        return (
          <Pressable
            onPress={onPress}
            style={[
              styles.addressItem,
              selected && {
                borderColor: Colors.primary
              }
            ]}>
            <View style={styles.addressIcon}>
              <Image style={styles.icon} source={require('../assets/images/gps.png')} />
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.addressName}>
                <FText fontSize={15}>Nguyen Hoang Vu</FText>
                <TouchableOpacity style={styles.btnEdit}>
                  <Image style={styles.penIcon} source={require('../assets/images/pen.png')} />
                </TouchableOpacity>
              </View>
              <Padding paddingTop={5} />
              <FText fontSize={13} color={Colors.smoky}>{`${item.street}, ${item.district}, ${item.province}`}</FText>
              <FText fontSize={13} color={Colors.smoky}>{`${item.phone_number}`}</FText>
            </View>
            <View style={styles.circle}>{!!selected && <Animated.View entering={BounceIn} style={styles.circleInner} />}</View>
          </Pressable>
        );
      }}
    </Observer>
  );
  const renderAddButton = () => (
    <TouchableOpacity style={styles.btnAddress}>
      <Image style={styles.icon} source={require('../assets/images/gps.png')} />
      <Padding paddingLeft={5} />
      <FText fontSize={15} color={Colors.white}>
        Add new address
      </FText>
    </TouchableOpacity>
  );
  const renderListEmptyComponent = () => (
    <Padding paddingHorizontal={26} paddingVertical={20}>
      <FText align="center" fontSize={15} color={Colors.smoky}>
        You don't have any address yet.
      </FText>
    </Padding>
  );
  return (
    <Container>
      <Header title="Delivery Address" onLeftPress={onBackPress} />
      <View style={styles.container}>
        <Padding paddingHorizontal={26} paddingBottom={15}>
          <FText fontSize="medium">Your Delivery Address</FText>
        </Padding>
        <FlatList
          ListEmptyComponent={renderListEmptyComponent}
          ListFooterComponent={renderAddButton}
          data={address}
          renderItem={renderAddressItem}
        />
      </View>
    </Container>
  );
};

export default UserAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: setYAxisValue(20)
  },
  addressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: setXAxisValue(26),
    paddingVertical: setYAxisValue(15),
    backgroundColor: Colors.primary_overlay,
    marginBottom: setYAxisValue(15),
    paddingHorizontal: setXAxisValue(10),
    borderRadius: setValue(8),
    borderWidth: 1,
    borderColor: Colors.primary_overlay
  },
  addressIcon: {
    width: setValue(40),
    height: setValue(40),
    borderRadius: 99,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: setXAxisValue(12)
  },
  icon: {
    height: setValue(20),
    width: setValue(20)
  },
  btnAddress: {
    marginHorizontal: setXAxisValue(26),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: setXAxisValue(10),
    backgroundColor: Colors.primary,
    paddingVertical: setYAxisValue(10),
    borderRadius: setValue(8),
    marginTop: setYAxisValue(5)
  },
  circle: {
    width: setValue(18),
    height: setValue(18),
    borderRadius: 99,
    borderColor: Colors.primary,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circleInner: {
    width: setValue(10),
    height: setValue(10),
    borderRadius: 99,
    backgroundColor: Colors.primary
  },
  addressName: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  penIcon: {
    width: setValue(15),
    height: setValue(15)
  },
  btnEdit: {
    paddingHorizontal: setXAxisValue(5),
    transform: [
      {
        translateY: setValue(-3)
      }
    ]
  }
});
