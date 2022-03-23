import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { CartSvg, DiscoverSvg, OrderSvg, ProfileSvg } from '../assets/svg';
import { setValue, setXAxisValue, setYAxisValue } from '../utils';
import { Colors } from '../constants/colors';
import Animated, { BounceIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Observer } from 'mobx-react-lite';
import { useStore } from '../stores';
import FText from './FText';
const tabBarData = [
  {
    name: 'Home',
    icon: DiscoverSvg,
    routeName: 'Home'
  },
  {
    name: 'Cart',
    icon: CartSvg,
    routeName: 'Cart'
  },
  {
    name: 'Orders',
    icon: OrderSvg,
    routeName: 'Orders'
  },
  {
    name: 'Profile',
    icon: ProfileSvg,
    routeName: 'Profile'
  }
];
const BottomTabBar = ({ navigation, state }) => {
  const cartStore = useStore('cart');
  const renderTabBarItem = (item, index) => {
    const isActive = state.index === index;
    const isCart = item.routeName === 'Cart';
    const onPress = () => navigation.navigate(item.routeName);
    return (
      <Observer key={item.name}>
        {() => (
          <Pressable onPress={onPress} style={styles.tabItem}>
            {isActive && <Animated.View entering={BounceIn} style={styles.activeLine} />}
            {isActive ? (
              <Animated.View entering={FadeInUp}>
                <item.icon color={Colors.primary} />
              </Animated.View>
            ) : (
              <item.icon color={Colors.typography_40} />
            )}
            {isCart && (
              <View style={styles.cartBadge}>
                <FText fontSize={10} color={Colors.white}>{`${cartStore.cartItemsTotalAmount}`}</FText>
              </View>
            )}
          </Pressable>
        )}
      </Observer>
    );
  };
  return (
    <View>
      <View style={styles.bottomTabBar}>{tabBarData.map(renderTabBarItem)}</View>
    </View>
  );
};

export default BottomTabBar;

const styles = StyleSheet.create({
  bottomTabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: setYAxisValue(74),
    backgroundColor: Colors.white,
    borderTopColor: Colors.border,
    borderTopWidth: StyleSheet.hairlineWidth
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  activeLine: {
    width: setValue(40),
    height: setValue(3),
    backgroundColor: Colors.primary,
    position: 'absolute',
    top: 0,
    borderBottomRightRadius: setValue(3),
    borderBottomLeftRadius: setValue(3)
  },
  cartBadge: {
    position: 'absolute',
    top: setYAxisValue(10),
    right: setXAxisValue(30),
    padding: setValue(3),
    borderRadius: 99,
    backgroundColor: Colors.primary
  }
});
