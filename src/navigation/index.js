import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { autorun } from 'mobx';
import { Observer, observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Image, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import userActions from '../actions/userActions';
import { LogoutSvg } from '../assets/svg';
import { BottomTabBar, FText, Padding } from '../components';
import { Layout } from '../constants';
import { Colors } from '../constants/colors';
import { drawerMenus } from '../constants/data';
import AddAddress from '../screens/AddAddress';
import AddressProvinceAndDistrict from '../screens/AddressProvinceAndDistrict';
import Cart from '../screens/Cart';
import CategoryDetail from '../screens/CategoryDetail';
import ChangePassword from '../screens/ChangePassword';
import Checkout from '../screens/Checkout';
import Discover from '../screens/Discover';
import FoodDetail from '../screens/FoodDetail';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Onboarding from '../screens/Onboarding';
import OrderDetail from '../screens/OrderDetail';
import RestaurantManagement from '../screens/RestaurantManagement';
import Orders from '../screens/Orders';
import OTPVerification from '../screens/OTPVerification';
import PhoneNumber from '../screens/PhoneNumber';
import Profile from '../screens/Profile';
import ResetPassword from '../screens/ResetPassword';
import RestaurantDetail from '../screens/RestaurantDetail';
import RestaurantReviews from '../screens/RestaurantReviews';
import RestaurantReview from '../screens/RestaurantReviews';
import SignUp from '../screens/SignUp';
import SignUpRestaurant from '../screens/SignUpRestaurant';
import SignUpRole from '../screens/SignUpRole';
import UserAddress from '../screens/UserAddress';
import { appStore, userStore } from '../stores';
import { setValue, setXAxisValue, setYAxisValue } from '../utils';
import { config } from './config';
import { navigation, navigationRef } from './navigationRef';
import ProductsManagement from '../screens/ProductsManagement';
import CustomersManagement from '../screens/CustomersManagement';
import OrdersManagement from '../screens/OrdersManagement';
import UpdateRestaurantInfo from '../screens/UpdateRestaurantInfo';
import CreateProduct from '../screens/CreateProduct';
import CreateProductCategory from '../screens/CreateProductCategory';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const AppNavigation = React.memo(() => {
  const HomeTab = () => (
    <Tab.Navigator tabBar={props => <BottomTabBar {...props} />} screenOptions={config}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Orders" component={Orders} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
  const HomeStack = () => (
    <Stack.Navigator screenOptions={config}>
      <Stack.Screen name="HomeTab" component={HomeTab} />
      <Stack.Screen
        name="FoodDetail"
        options={{
          animation: 'none'
        }}
        component={FoodDetail}
      />
      <Stack.Screen name="RestaurantReview" component={RestaurantReview} />
      <Stack.Screen name="CategoryDetail" component={CategoryDetail} />
      <Stack.Screen
        options={{
          gestureEnabled: false,
          animation: 'none'
        }}
        name="RestaurantDetail"
        component={RestaurantDetail}
      />
      <Stack.Screen name="RestaurantReviews" component={RestaurantReviews} />
      <Stack.Screen name="Discover" component={Discover} />
      <Stack.Screen name="UserAddress" component={UserAddress} />
      <Stack.Screen name="AddAddress" component={AddAddress} />
      <Stack.Screen name="AddressProvinceAndDistrict" component={AddressProvinceAndDistrict} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="OrderDetail" component={OrderDetail} />
      <Stack.Screen name="RestaurantManagement" component={RestaurantManagement} />
      <Stack.Screen name="ProductsManagement" component={ProductsManagement} />
      <Stack.Screen name="CustomersManagement" component={CustomersManagement} />
      <Stack.Screen name="OrdersManagement" component={OrdersManagement} />
      <Stack.Screen name="UpdateRestaurantInfo" component={UpdateRestaurantInfo} />
      <Stack.Screen name="CreateProduct" component={CreateProduct} />
      <Stack.Screen name="CreateProductCategory" component={CreateProductCategory} />
    </Stack.Navigator>
  );
  const OnboardingStack = () => (
    <Stack.Navigator screenOptions={config}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="OTPVerification" component={OTPVerification} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="PhoneNumber" component={PhoneNumber} />
      <Stack.Screen name="SignUpRole" component={SignUpRole} />
      <Stack.Screen name="SignUpRestaurant" component={SignUpRestaurant} />
    </Stack.Navigator>
  );
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={config}>
        <Stack.Screen name="OnboardingStack" component={OnboardingStack} />
        <Stack.Screen name="HomeStack" component={HomeStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
});
const { width } = Layout.window;
const menuWidth = width * 0.5;
export const AnimatedAppNavigation = () => {
  const anim = useSharedValue(0);
  useEffect(() => {
    autorun(() => {
      anim.value = withTiming(appStore.drawerMenuVisible ? 1 : 0);
    });
  }, []);
  const menuStyle = useAnimatedStyle(
    () => ({
      transform: [
        { translateX: (1 - anim.value) * menuWidth },
        {
          scale: interpolate(anim.value, [0, 1], [0.8, 1])
        }
      ]
    }),
    []
  );
  const appStyle = useAnimatedStyle(
    () => ({
      transform: [
        { translateX: anim.value * menuWidth },
        {
          scale: interpolate(anim.value, [0, 1], [1, 0.8])
        }
      ],
      borderRadius: anim.value * 20
    }),
    []
  );
  const renderMenuItem = item => {
    const onPress = () => {
      appStore.toggleDrawerMenu();
      setTimeout(() => {
        navigation.navigate(item.routeName);
      }, 500);
    };
    return (
      <TouchableOpacity onPress={onPress} key={item.routeName} style={styles.btnMenu}>
        <View style={styles.menuIcon}>
          {item.iconSrc ? <Image style={styles.icon} source={item.iconSrc} /> : <item.iconComponent color={Colors.drawer_icon_color} />}
        </View>
        <FText>{item.name}</FText>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.menuContainer, menuStyle]}>
        <Observer>
          {() => (
            <Image
              style={styles.avatar}
              source={{
                uri: userStore.user.avatar
              }}
            />
          )}
        </Observer>
        <Padding paddingTop={21} />
        <Observer>
          {() => (
            <FText fontSize="large" fontWeight={700}>
              {userStore.user.name}
            </FText>
          )}
        </Observer>
        <Padding paddingTop={7} />
        <Observer>
          {() => (
            <FText fontSize="small" color={Colors.grey_suit}>
              {userStore.user.emailOrPhone}
            </FText>
          )}
        </Observer>
        <View style={styles.menuList}>{drawerMenus.map(renderMenuItem)}</View>
        <TouchableOpacity
          onPress={() => {
            appStore.toggleDrawerMenu();
            userActions.logout();
          }}
          style={styles.btnLogout}>
          <View style={styles.logoutIcon}>
            <LogoutSvg />
          </View>
          <FText color={Colors.white}>Log Out</FText>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.appContainer, appStyle]}>
        <Observer>
          {() => (
            <React.Fragment>
              {appStore.drawerMenuVisible && <Pressable onPress={() => appStore.toggleDrawerMenu()} style={styles.overlay} />}
            </React.Fragment>
          )}
        </Observer>
        <AppNavigation />
      </Animated.View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.app_background
  },
  appContainer: {
    flex: 1,
    overflow: 'hidden'
  },
  menuContainer: {
    width: menuWidth,
    paddingLeft: setXAxisValue(26),
    paddingVertical: setYAxisValue(50),
    position: 'absolute',
    height: '100%',
    left: 0
  },
  avatar: {
    width: setValue(80),
    height: setValue(80),
    borderRadius: 99,
    backgroundColor: Colors.white
  },
  menuList: {
    marginTop: setYAxisValue(25),
    flex: 1
  },
  btnMenu: {
    paddingVertical: setYAxisValue(18),
    flexDirection: 'row',
    alignItems: 'center'
  },
  btnLogout: {
    height: setYAxisValue(43),
    padding: setValue(9),
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 99,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    paddingRight: setXAxisValue(14)
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999
  },
  menuIcon: {
    marginRight: setXAxisValue(14)
  },
  icon: {
    width: setValue(23),
    height: setValue(23)
  },
  logoutIcon: {
    width: setValue(26),
    height: setValue(26),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 99,
    marginRight: setXAxisValue(9)
  }
});
