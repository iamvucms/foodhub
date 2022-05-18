import { StyleSheet, Pressable, FlatList, View, ScrollView, Image } from 'react-native';
import React, { useRef } from 'react';
import { Container, FText, Header, OrderCard, Padding } from '../components';
import { setValue, setXAxisValue, setYAxisValue } from '../utils';
import Animated, {
  BounceIn,
  FadeIn,
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { Layout } from '../constants';
import { Colors } from '../constants/colors';
import { FontWeights } from '../components/FText';
import { uid } from 'uid';
import { OrderStatus } from '../constants/data';
import { Observer } from 'mobx-react-lite';
import { orderStore } from '../stores';
const { width } = Layout.window;
const mockOrders = [
  {
    id: uid(5),
    restaurant: {
      name: 'KFC',
      logo: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    },
    price: 10.5,
    status: OrderStatus.Delivering,
    last_update: new Date().getTime(),
    items: [
      {
        id: uid(5),
        name: 'Chicken Burger',
        price: 10.5,
        amount: 1
      },
      {
        id: uid(5),
        name: 'Chicken Burger',
        price: 10.5,
        amount: 1
      }
    ]
  },
  {
    id: uid(5),
    restaurant: {
      name: 'KFC',
      logo: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    },
    price: 10.5,
    status: OrderStatus.Delivering,
    last_update: new Date().getTime(),
    items: [
      {
        id: uid(5),
        name: 'Chicken Burger',
        price: 10.5,
        amount: 1
      },
      {
        id: uid(5),
        name: 'Chicken Burger',
        price: 10.5,
        amount: 1
      }
    ]
  },
  {
    id: uid(5),
    restaurant: {
      name: 'KFC',
      logo: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    },
    price: 10.5,
    status: OrderStatus.Delivering,
    last_update: new Date().getTime(),
    items: [
      {
        id: uid(5),
        name: 'Chicken Burger',
        price: 10.5,
        amount: 1
      },
      {
        id: uid(5),
        name: 'Chicken Burger',
        price: 10.5,
        amount: 1
      }
    ]
  }
];
const tabItemWidth = (width - setXAxisValue(52 + 12)) / 2;
const Orders = () => {
  const animTab = useSharedValue(0);
  const listRef = useRef();
  const onTabPress = index => {
    animTab.value = withTiming(index);
    listRef.current?.scrollTo?.({
      x: width * index
    });
  };
  const activeTabStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: interpolate(animTab.value, [0, 1], [0, tabItemWidth]) }]
  }));
  const tab1NameStyle = useAnimatedStyle(() => ({
    color: interpolateColor(animTab.value, [0, 1], [Colors.white, Colors.primary])
  }));
  const tab2NameStyle = useAnimatedStyle(() => ({
    color: interpolateColor(animTab.value, [0, 1], [Colors.primary, Colors.white])
  }));
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      animTab.value = event.contentOffset.x / width;
    }
  });
  const renderEmptyOrdersComponent = React.useCallback(() => {
    return (
      <View style={styles.emptyOrderContainer}>
        <Animated.View entering={BounceIn}>
          <Image style={styles.emptyOrder} source={require('../assets/images/empty-box.png')} />
        </Animated.View>
        <Animated.View entering={FadeIn}>
          <FText color={Colors.aslo_gray}>You don't have any orders yet.</FText>
        </Animated.View>
      </View>
    );
  }, []);
  const renderEmptyHistoryComponent = React.useCallback(() => {
    return (
      <View style={styles.emptyOrderContainer}>
        <Animated.View entering={BounceIn}>
          <Image style={styles.emptyOrder} source={require('../assets/images/empty-box.png')} />
        </Animated.View>
        <Animated.View entering={FadeIn}>
          <FText color={Colors.aslo_gray}>You didn't have any orders in history.</FText>
        </Animated.View>
      </View>
    );
  }, []);
  const renderListHeader = React.useCallback(() => <Padding paddingTop={29} />, []);
  return (
    <Container disableLast>
      <Header title="My Orders" />
      <View style={styles.mainContainer}>
        <View style={styles.tabSwitcher}>
          <Pressable onPress={() => onTabPress(0)} style={styles.tab}>
            <Animated.Text style={[styles.tabName, tab1NameStyle]}>Upcoming</Animated.Text>
          </Pressable>
          <Pressable onPress={() => onTabPress(1)} style={styles.tab}>
            <Animated.Text style={[styles.tabName, tab2NameStyle]}>History</Animated.Text>
          </Pressable>
          <Animated.View style={[styles.tab, styles.activeTab, activeTabStyle]}></Animated.View>
        </View>
        <Animated.ScrollView
          ref={listRef}
          scrollEventThrottle={20}
          onScroll={scrollHandler}
          pagingEnabled
          style={styles.horizontalContainer}
          horizontal
          showsHorizontalScrollIndicator={false}>
          <View style={styles.listPage}>
            <Observer>
              {() => (
                <FlatList
                  ListHeaderComponent={renderListHeader}
                  data={orderStore.orders.slice()}
                  renderItem={({ item }) => <OrderCard item={item} />}
                  ListEmptyComponent={renderEmptyOrdersComponent}
                />
              )}
            </Observer>
          </View>
          <View style={styles.listPage}>
            <Observer>
              {() => (
                <FlatList
                  ListHeaderComponent={renderListHeader}
                  ListEmptyComponent={renderEmptyHistoryComponent}
                  data={orderStore.orderHistory.slice()}
                  renderItem={({ item }) => <OrderCard item={item} />}
                />
              )}
            </Observer>
          </View>
        </Animated.ScrollView>
      </View>
    </Container>
  );
};

export default Orders;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: setYAxisValue(33)
  },
  tabSwitcher: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: setXAxisValue(26),
    paddingHorizontal: setXAxisValue(6),
    borderRadius: 99,
    borderColor: Colors.border,
    borderWidth: setValue(1),
    paddingVertical: setYAxisValue(4)
  },
  tab: {
    height: setYAxisValue(47),
    width: tabItemWidth,
    justifyContent: 'center',
    alignItems: 'center'
  },
  activeTab: {
    backgroundColor: Colors.primary,
    position: 'absolute',
    zIndex: -1,
    left: setXAxisValue(6),
    borderRadius: 99
  },
  tabName: {
    fontFamily: FontWeights['400'],
    fontSize: setYAxisValue(14),
    lineHeight: setYAxisValue(14)
  },
  listPage: {
    width,
    flex: 1
  },
  horizontalContainer: {
    flex: 1
  },
  emptyOrderContainer: {
    paddingVertical: setYAxisValue(100),
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyOrder: {
    marginBottom: setYAxisValue(20),
    height: setValue(80),
    width: setValue(80)
  }
});
