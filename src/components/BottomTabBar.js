import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { CartSvg, DiscoverSvg, OrderSvg, ProfileSvg } from '../assets/svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { setValue, setYAxisValue } from '../utils';
import { Colors } from '../constants/colors';
import Animated, { BounceIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
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
  const renderTabBarItem = (item, index) => {
    const isActive = state.index === index;
    const onPress = () => navigation.navigate(item.routeName);
    return (
      <TouchableOpacity onPress={onPress} key={item.name} style={styles.tabItem}>
        {isActive && <Animated.View entering={BounceIn} style={styles.activeLine} />}
        {isActive ? (
          <Animated.View entering={FadeInUp}>
            <item.icon color={Colors.primary} />
          </Animated.View>
        ) : (
          <item.icon color={Colors.typography_40} />
        )}
      </TouchableOpacity>
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
  }
});
