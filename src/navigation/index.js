import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from '../screens/Onboarding';
import Animated, { FadeIn } from 'react-native-reanimated';
import { config } from './config';
import Login from '../screens/Login';
import Home from '../screens/Home';
import SignUp from '../screens/SignUp';
import CategoryDetail from '../screens/CategoryDetail';
import Orders from '../screens/Orders';
import OTPVerification from '../screens/OTPVerification';
import PhoneNumber from '../screens/PhoneNumber';
import ResetPassword from '../screens/ResetPassword';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Cart from '../screens/Cart';
import Profile from '../screens/Profile';
import { BottomTabBar } from '../components';
import { Colors } from '../constants/colors';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const AppNavigation = () => {
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
    </Stack.Navigator>
  );
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={config}>
        {/* <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="OTPVerification" component={OTPVerification} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="PhoneNumber" component={PhoneNumber} />
        <Stack.Screen name="CategoryDetail" component={CategoryDetail} /> */}
        <Stack.Screen name="HomeStack" component={HomeStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
